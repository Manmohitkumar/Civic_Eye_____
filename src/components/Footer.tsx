
import React from 'react';
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Linkedin, Shield, RefreshCw } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="bg-gray-50 pt-16 pb-8 relative">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
          <div className="space-y-4">
            <Link to="/" className="flex items-center text-2xl font-bold theme-primary-text gap-1">
              <img 
                src="/lovable-uploads/7b314dd5-c766-4046-8e2f-02a35e9e67c2.png" 
                alt="Propico Logo" 
                className="h-8 w-12"
              />
              Propico
            </Link>
            <p className="text-foreground/70 max-w-xs">
              Transforming the rental experience for property owners across India.
            </p>
            <div className="flex space-x-4">
              {socialIcons.map((item) => (
                <SocialIcon key={item.label} {...item} />
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 theme-primary-text">Useful Links</h4>
            <ul className="space-y-3">
              <li>
                <Link 
                  to="/about" 
                  className="text-foreground/70 hover:theme-primary-text hover:translate-x-1 transition-all inline-block"
                  onClick={scrollToTop}
                >
                  About Us
                </Link>
              </li>
              <FooterLink href="#guarantee" onClick={() => scrollToSection('triple-guarantee')}>Our Guarantee</FooterLink>
              <FooterLink href="#how-it-works" onClick={() => scrollToSection('how-it-works')}>How It Works</FooterLink>
              <FooterLink href="#packages" onClick={() => scrollToSection('packages')}>Pricing</FooterLink>
              <FooterLink href="#faq" onClick={() => scrollToSection('faq')}>FAQ</FooterLink>
              <li>
                <Link 
                  to="/terms-of-use" 
                  className="text-foreground/70 hover:theme-primary-text hover:translate-x-1 transition-all inline-block"
                  onClick={scrollToTop}
                >
                  Terms of Use
                </Link>
              </li>
              <li>
                <Link 
                  to="/contact-us" 
                  className="text-foreground/70 hover:theme-primary-text hover:translate-x-1 transition-all inline-block"
                  onClick={scrollToTop}
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-foreground/70">
          <div className="mb-4 md:mb-0">
            © {currentYear} Propico. All rights reserved.
          </div>
          
          <div className="flex flex-wrap justify-center gap-6">
            <Link 
              to="/terms-of-use" 
              className="hover:theme-primary-text transition-colors"
              onClick={scrollToTop}
            >
              Terms of Use
            </Link>
            <Link 
              to="/privacy-policy" 
              className="hover:theme-primary-text transition-colors flex items-center gap-1"
              onClick={scrollToTop}
            >
              <Shield size={14} />
              Privacy Policy
            </Link>
            <Link 
              to="/refund-policy" 
              className="hover:theme-primary-text transition-colors flex items-center gap-1"
              onClick={scrollToTop}
            >
              <RefreshCw size={14} />
              Refund Policy
            </Link>
            <Link 
              to="/contact-us" 
              className="hover:theme-primary-text transition-colors"
              onClick={scrollToTop}
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Preconfigured social icons to avoid repetitive JSX
const socialIcons = [
  { icon: Facebook, label: "Facebook" },
  { icon: Twitter, label: "Twitter" },
  { icon: Instagram, label: "Instagram" },
  { icon: Linkedin, label: "LinkedIn" }
];

const SocialIcon = ({ icon: Icon, label }: { icon: any; label: string }) => {
  return (
    <a 
      href="#" 
      aria-label={label}
      className="w-9 h-9 rounded-full flex items-center justify-center border border-gray-200 text-foreground/70 hover:theme-primary-bg hover:bg-opacity-10 hover:text-foreground hover:border-gray-300 transition-colors"
    >
      <Icon size={18} />
    </a>
  );
};

const FooterLink = ({ href, onClick, children }: { 
  href: string; 
  onClick?: () => void;
  children: React.ReactNode 
}) => {
  return (
    <li>
      <a 
        href={href} 
        className="text-foreground/70 hover:theme-primary-text hover:translate-x-1 transition-all inline-block"
        onClick={(e) => {
          e.preventDefault();
          if (onClick) onClick();
        }}
      >
        {children}
      </a>
    </li>
  );
};

export default Footer;
