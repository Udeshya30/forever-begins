# Deployment Guide for Forever Begins

This guide walks you through deploying your wedding website to Vercel.

## Quick Start (5 minutes)

### Option 1: Deploy via Vercel Web Interface (Easiest)

1. **Push to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Forever Begins - Initial commit"
   git remote add origin https://github.com/yourusername/forever-begins.git
   git push -u origin main
   ```

2. **Deploy to Vercel:**
   - Visit [vercel.com](https://vercel.com)
   - Click **"New Project"**
   - Import your GitHub repository
   - Vercel will auto-detect the Vite configuration
   - Click **"Deploy"**

3. **Your site is live!** 🎉
   - Vercel provides a URL like `forever-begins.vercel.app`
   - Every push to GitHub automatically redeploys

### Option 2: Deploy via Vercel CLI

```bash
# Install Vercel CLI globally
npm i -g vercel

# Deploy from your project directory
cd D:\forever-begins
vercel

# Follow the prompts to link to your Vercel account
```

## Post-Deployment Steps

### 1. Update Website Configuration

Update `src/data/weddingConfig.js` with your deployed URL:

```javascript
website: {
  url: 'https://forever-begins.vercel.app', // Your actual Vercel URL
  ogImage: '/og-image.jpg',
}
```

Also update the canonical URL in `index.html`:

```html
<link rel="canonical" href="https://forever-begins.vercel.app" />
```

### 2. Generate QR Code

Use a QR code generator to create a code for your deployed URL:

**Popular options:**
- [qr-code-generator.com](https://www.qr-code-generator.com/)
- [qrserver.com](https://qrserver.com/)
- [goqr.me](https://goqr.me/)

**Example QR URL:**
```
https://qrserver.com/api/render/qr-code/?size=300x300&data=https://forever-begins.vercel.app
```

### 3. Share with Guests

Generate your shareable link:
- Direct URL: `https://forever-begins.vercel.app`
- QR Code for printing on invitations
- Share on social media (use OG images)
- Email to guests and family

### 4. Configure Custom Domain (Optional)

If you want a custom domain like `foreverbegins.com`:

1. In Vercel Dashboard:
   - Go to your project settings
   - Click **"Domains"**
   - Add your custom domain
   - Follow DNS configuration instructions

2. Popular domain registrars:
   - [Namecheap](https://www.namecheap.com)
   - [GoDaddy](https://www.godaddy.com)
   - [Google Domains](https://domains.google)
   - [Cloudflare](https://www.cloudflare.com)

## Continuous Deployment (Auto-Updates)

Once deployed to Vercel, your site automatically redeploys when you:

1. Push changes to GitHub
2. Vercel automatically rebuilds and deploys
3. Your changes go live instantly

**Workflow:**
```bash
# Make changes locally
# Update images, content, etc.

# Commit and push
git add .
git commit -m "Update wedding content"
git push origin main

# Vercel automatically deploys! ✨
```

## Environment Variables

No environment variables are required for the basic deployment. The application is fully static.

However, if you need to set any in the future:

1. Go to Vercel Dashboard
2. Project Settings → Environment Variables
3. Add your variables
4. Redeploy

## Troubleshooting Deployments

### Build Fails

**Check the build logs:**
1. Go to Vercel Dashboard
2. Click on your project
3. Click the **"Deployments"** tab
4. Click on the failed deployment to see logs
5. Look for error messages

**Common issues:**
- Missing dependencies → Run `npm install` and commit `package-lock.json`
- SCSS errors → Ensure all SCSS files use `@use` instead of `@import`
- Port already in use → Not applicable on Vercel

### Site Shows 404 Error

**Enable SPA routing:**
Vercel should auto-detect this from `vercel.json`, but you can verify:

1. Project Settings → Build & Development Settings
2. Make sure "Build Command" is: `npm run build`
3. Make sure "Output Directory" is: `dist`

### Images Not Loading

**Check image paths:**
- External images (Unsplash) require no action
- Local images in `public/` folder should work automatically
- Ensure alt text is provided for accessibility

### Custom Domain Not Working

1. **Check DNS propagation:** [mxtoolbox.com](https://mxtoolbox.com/dnslookup.aspx)
2. **Verify in Vercel:** Project Settings → Domains → Check DNS records
3. **Wait up to 48 hours** for DNS to propagate worldwide
4. **Clear browser cache:** Ctrl+Shift+Delete (Windows) or Cmd+Shift+Delete (Mac)

## Rollback to Previous Version

If something goes wrong:

1. Go to Vercel Dashboard → Deployments
2. Find the previous working deployment
3. Click the three dots menu → **"Promote to Production"**
4. Your site rolls back instantly

## Monitoring Performance

After deployment, monitor your site:

1. **Vercel Analytics:**
   - Go to Dashboard → Analytics
   - Monitor page load times
   - Check error rates

2. **Google Analytics (Optional):**
   Add Google Analytics code to track visitor behavior:
   
   ```html
   <!-- In index.html <head> -->
   <script async src="https://www.googletagmanager.com/gtag/js?id=GA_ID"></script>
   <script>
     window.dataLayer = window.dataLayer || [];
     function gtag(){dataLayer.push(arguments);}
     gtag('js', new Date());
     gtag('config', 'GA_ID');
   </script>
   ```

3. **PageSpeed Insights:**
   - Visit [pagespeed.web.dev](https://pagespeed.web.dev)
   - Enter your site URL
   - Get performance recommendations

## Security Best Practices

✅ **What we're doing right:**
- No backend or database vulnerabilities
- No authentication required
- No sensitive data collection
- Static files only
- HTTPS by default on Vercel

✅ **Keep it secure:**
- Don't commit any credentials to GitHub
- Don't hardcode API keys
- Keep dependencies updated: `npm update`
- Review the README for security guidelines

## Updating Your Site

**To update content after deployment:**

1. **Edit data files locally:**
   ```bash
   # Edit src/data/weddingConfig.js, storyData.js, etc.
   ```

2. **Commit and push:**
   ```bash
   git add src/data/
   git commit -m "Update wedding details"
   git push origin main
   ```

3. **Vercel auto-deploys** (usually within 30-60 seconds)

4. **Verify changes:**
   - Visit your website
   - Clear browser cache if needed (Ctrl+Shift+Delete)
   - Check Vercel Dashboard for build status

## Adding HTTPS (Already Included)

Vercel provides free HTTPS for all deployments. Your site is automatically secure.

## FAQ

**Q: Can I update the site after deployment?**
A: Yes! Just push changes to GitHub and Vercel automatically redeploys.

**Q: Does Vercel cost money?**
A: No, the Vercel Hobby plan is completely free for static sites.

**Q: What if I need a backend later?**
A: The current setup is frontend-only. You'd need to upgrade to a different hosting for serverless functions.

**Q: How do I redirect traffic to my domain?**
A: Configure DNS records with your domain registrar to point to Vercel's servers.

**Q: Can I use my own domain?**
A: Yes! Vercel supports custom domains. See "Configure Custom Domain" section above.

**Q: What happens if I delete my GitHub repo?**
A: Your Vercel deployment stays live, but you can't push updates. Re-create the GitHub repo to resume auto-deploys.

## Support Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Vite Deployment Guide](https://vite.dev/guide/static-deploy.html)
- [Forever Begins README](./README.md)

---

**You're all set! 🎉**

Share your website with guests and create memories together!

**Forever Begins — Two stories. One forever.** 💑
