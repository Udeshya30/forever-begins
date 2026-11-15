// Date and Time Utilities
export const calculateCountdown = (targetDate, now = new Date()) => {
  const target = new Date(targetDate);
  
  const difference = target - now;
  
  if (!Number.isFinite(difference) || difference <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      isOver: true,
    };
  }
  
  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((difference / 1000 / 60) % 60);
  const seconds = Math.floor((difference / 1000) % 60);
  
  return {
    days,
    hours,
    minutes,
    seconds,
    isOver: false,
  };
};

export const formatDate = (dateString, options = {}) => {
  const date = new Date(dateString);
  const defaultOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  
  return date.toLocaleDateString('en-IN', { ...defaultOptions, ...options });
};

export const formatTime = (timeString) => {
  const [hours, minutes] = timeString.split(':');
  const hour = parseInt(hours);
  const minute = minutes;
  const period = hour >= 12 ? 'PM' : 'AM';
  const displayHour = hour % 12 || 12;
  
  return `${displayHour}:${minute} ${period}`;
};

export const getIndianStandardTime = () => {
  const now = new Date();
  const istTime = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
  return istTime;
};

// String Utilities
export const slugify = (text) => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

export const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const truncateText = (text, length = 100) => {
  if (text.length <= length) return text;
  return text.substring(0, length).trim() + '...';
};

// Image Utilities
export const getImageAlt = (imageName = 'Wedding photo') => {
  return imageName;
};

export const handleImageError = (e) => {
  e.target.src = 'https://via.placeholder.com/400x300?text=Image+Not+Found';
  e.target.alt = 'Placeholder image';
};

export const preloadImage = (src) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
};

// Storage Utilities
export const getFromLocalStorage = (key, defaultValue = null) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error reading from localStorage: ${error}`);
    return defaultValue;
  }
};

export const setToLocalStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error(`Error writing to localStorage: ${error}`);
    return false;
  }
};

export const removeFromLocalStorage = (key) => {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error(`Error removing from localStorage: ${error}`);
    return false;
  }
};

// Animation Utilities
export const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px',
};

export const prefersReducedMotion = () => {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

// Share Utilities
export const shareWebsite = async (title, text, url) => {
  if (navigator.share) {
    try {
      await navigator.share({
        title,
        text,
        url,
      });
    } catch (error) {
      if (error.name !== 'AbortError') {
        console.error(`Error sharing: ${error}`);
      }
    }
  } else {
    // Fallback: copy to clipboard
    try {
      await navigator.clipboard.writeText(url);
      alert('Link copied to clipboard!');
    } catch (error) {
      console.error(`Error copying to clipboard: ${error}`);
    }
  }
};

// Scroll Utilities
export const scrollToElement = (elementId, offset = 0) => {
  const element = document.getElementById(elementId);
  if (element) {
    const elementPosition = element.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({
      top: elementPosition - offset,
      behavior: 'smooth',
    });
  }
};

export const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};

// Validation Utilities
export const isValidEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const isValidPhone = (phone) => {
  const re = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
  return re.test(phone);
};

export default {
  calculateCountdown,
  formatDate,
  formatTime,
  getIndianStandardTime,
  slugify,
  capitalizeFirstLetter,
  truncateText,
  getImageAlt,
  handleImageError,
  preloadImage,
  getFromLocalStorage,
  setToLocalStorage,
  removeFromLocalStorage,
  observerOptions,
  prefersReducedMotion,
  shareWebsite,
  scrollToElement,
  scrollToTop,
  isValidEmail,
  isValidPhone,
};
