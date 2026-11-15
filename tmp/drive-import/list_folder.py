import concurrent.futures
import json
from pathlib import Path
import re
import urllib.request

BASE = Path(__file__).resolve().parent


def read_folder(entry, parent=''):
    path = f"{parent}/{entry['name']}".strip('/')
    request = urllib.request.Request(
        f"https://drive.google.com/drive/folders/{entry['id']}",
        headers={'User-Agent': 'Mozilla/5.0'},
    )
    with urllib.request.urlopen(request, timeout=60) as response:
        html = response.read().decode('utf-8')
    match = re.search(r"window\['_DRIVE_ivd'\] = '(.*?)';", html)
    if not match:
        raise RuntimeError(f'Cannot list shared folder: {path}')
    decoded = re.sub(r'\\x([0-9a-fA-F]{2})', lambda m: chr(int(m.group(1), 16)), match.group(1))
    data = json.loads(decoded)
    children = [
        {'id': item[0], 'name': item[2], 'mime': item[3], 'folder': path}
        for item in (data[0] or [])
    ]
    return path, children


if __name__ == '__main__':
    pending = [(entry, '') for entry in json.loads((BASE / 'root.json').read_text())]
    files = []
    folders = []
    with concurrent.futures.ThreadPoolExecutor(max_workers=4) as pool:
        while pending:
            futures = [pool.submit(read_folder, entry, parent) for entry, parent in pending]
            pending = []
            for future in futures:
                path, children = future.result()
                folders.append({'path': path, 'count': len(children)})
                print(f'{path}: {len(children)} entries', flush=True)
                for child in children:
                    if child['mime'] == 'application/vnd.google-apps.folder':
                        pending.append((child, path))
                    else:
                        files.append(child)
    (BASE / 'manifest.json').write_text(json.dumps({'folders': folders, 'files': files}, indent=2), encoding='utf-8')
    for folder in folders:
        count = sum(item['folder'] == folder['path'] and item['mime'].startswith('image/') for item in files)
        print(f"Photos in {folder['path']}: {count}")
