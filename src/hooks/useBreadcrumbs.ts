
import { useLocation } from 'react-router-dom';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export const useBreadcrumbs = (): BreadcrumbItem[] => {
  const location = useLocation();
  
  const breadcrumbMap: Record<string, BreadcrumbItem[]> = {
    '/': [{ label: 'Home' }],
    '/about': [
      { label: 'Home', href: '/' },
      { label: 'About Us' }
    ],
    '/list-property': [
      { label: 'Home', href: '/' },
      { label: 'List Property' }
    ],
    '/rent-predictor': [
      { label: 'Home', href: '/' },
      { label: 'Tools' },
      { label: 'Rent Predictor' }
    ],
    '/contact-us': [
      { label: 'Home', href: '/' },
      { label: 'Contact Us' }
    ],
    '/privacy-policy': [
      { label: 'Home', href: '/' },
      { label: 'Legal' },
      { label: 'Privacy Policy' }
    ],
    '/refund-policy': [
      { label: 'Home', href: '/' },
      { label: 'Legal' },
      { label: 'Refund Policy' }
    ],
    '/terms-of-use': [
      { label: 'Home', href: '/' },
      { label: 'Legal' },
      { label: 'Terms of Use' }
    ],
    '/tenants': [
      { label: 'Home', href: '/' },
      { label: 'For Tenants' }
    ]
  };

  return breadcrumbMap[location.pathname] || [{ label: 'Home', href: '/' }];
};
