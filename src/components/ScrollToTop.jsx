import { ArrowUp } from 'lucide-react';
import { useScrollToTop } from '../hooks/useScrollToTop';
import './ScrollToTop.scss';

export const ScrollToTop = () => {
  const { isVisible, scrollToTop } = useScrollToTop();

  return (
    <button
      className={`scroll-to-top ${isVisible ? 'visible' : ''}`}
      onClick={scrollToTop}
      aria-label="Scroll to top"
    >
      <ArrowUp size={24} />
    </button>
  );
};

export default ScrollToTop;
