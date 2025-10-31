
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface SEOHelmetProps {
  title?: string;
  description?: string;
  canonicalUrl?: string;
  ogImage?: string;
}

const SEOHelmet: React.FC<SEOHelmetProps> = ({
  title,
  description,
  canonicalUrl,
  ogImage = "https://propico.in/og-image.png"
}) => {
  const location = useLocation();
  const baseUrl = "https://propico.in";
  
  useEffect(() => {
    // Update canonical URL
    const currentCanonical = canonicalUrl || `${baseUrl}${location.pathname}`;
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    
    if (canonicalLink) {
      canonicalLink.setAttribute('href', currentCanonical);
    } else {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      canonicalLink.setAttribute('href', currentCanonical);
      document.head.appendChild(canonicalLink);
    }

    // Update title if provided
    if (title) {
      document.title = title;
    }

    // Update meta description if provided
    if (description) {
      let metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', description);
      }
    }

    // Update OG URL
    let ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) {
      ogUrl.setAttribute('content', currentCanonical);
    }

    // Update Twitter URL
    let twitterUrl = document.querySelector('meta[name="twitter:url"]');
    if (twitterUrl) {
      twitterUrl.setAttribute('content', currentCanonical);
    }

  }, [location.pathname, title, description, canonicalUrl, baseUrl]);

  return null;
};

export default SEOHelmet;
