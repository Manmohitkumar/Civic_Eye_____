// Performance monitoring utilities
export const measurePerformance = (name: string, fn: () => void) => {
  if (typeof performance !== 'undefined' && performance.mark) {
    performance.mark(`${name}-start`);
    fn();
    performance.mark(`${name}-end`);
    performance.measure(name, `${name}-start`, `${name}-end`);
  } else {
    fn();
  }
};

// Preload critical resources
export const preloadResource = (href: string, as: 'style' | 'script' | 'image' | 'font') => {
  if (typeof document !== 'undefined') {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = href;
    link.as = as;
    if (as === 'font') {
      link.crossOrigin = 'anonymous';
    }
    document.head.appendChild(link);
  }
};

// Prefetch resources for next page
export const prefetchResource = (href: string) => {
  if (typeof document !== 'undefined') {
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = href;
    document.head.appendChild(link);
  }
};

// Web Vitals reporting - updated for v5.0.1
export const reportWebVitals = () => {
  if (typeof window !== 'undefined') {
    import('web-vitals').then(({ onCLS, onINP, onFCP, onLCP, onTTFB }) => {
      onCLS(console.log);
      onINP(console.log); // INP replaced FID in v5.0.1
      onFCP(console.log);
      onLCP(console.log);
      onTTFB(console.log);
    }).catch(() => {
      // Silently handle web-vitals import errors
      console.log('Web vitals monitoring not available');
    });
  }
};
