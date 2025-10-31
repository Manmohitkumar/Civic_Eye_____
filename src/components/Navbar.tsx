import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
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
  return <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-5'}`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center text-2xl font-bold theme-primary-text gap-1">
          <img src="/lovable-uploads/7b314dd5-c766-4046-8e2f-02a35e9e67c2.png" alt="Propico Logo" className="h-8 w-12" />
          Propico
        </Link>
        
        <div className="hidden md:flex items-center space-x-8">
          <NavLink to="/#guarantee" onClick={() => scrollToSection('triple-guarantee')}>Our Guarantee</NavLink>
          <NavLink to="/#how-it-works" onClick={() => scrollToSection('how-it-works')}>Notification</NavLink>
          <NavLink to="/#packages" onClick={() => scrollToSection('packages')}>AI Query</NavLink>
          <NavLink to="/#faq" onClick={() => scrollToSection('faq')}>Sign up / Login</NavLink>
          <NavLink to="/tenants">For Tenants</NavLink>
        </div>
        
        <button className="md:hidden text-gray-600 focus:outline-none" onClick={toggleMobileMenu}>
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      <div className={`md:hidden absolute w-full bg-white transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'max-h-screen shadow-md' : 'max-h-0 overflow-hidden'}`}>
        <div className="container mx-auto px-4 py-4 space-y-4">
          <MobileNavLink to="/#guarantee" onClick={() => {
          scrollToSection('triple-guarantee');
          setIsMobileMenuOpen(false);
        }}>
            Our Guarantee
          </MobileNavLink>
          <MobileNavLink to="/#how-it-works" onClick={() => {
          scrollToSection('how-it-works');
          setIsMobileMenuOpen(false);
        }}>
            How it Works
          </MobileNavLink>
          <MobileNavLink to="/#packages" onClick={() => {
          scrollToSection('packages');
          setIsMobileMenuOpen(false);
        }}>
            Pricing
          </MobileNavLink>
          <MobileNavLink to="/#faq" onClick={() => {
          scrollToSection('faq');
          setIsMobileMenuOpen(false);
        }}>
            FAQ
          </MobileNavLink>
          <MobileNavLink to="/tenants" onClick={() => setIsMobileMenuOpen(false)}>
            For Tenants
          </MobileNavLink>
        </div>
      </div>
    </nav>;
};
const NavLink = ({
  to,
  onClick,
  children
}: {
  to: string;
  onClick?: () => void;
  children: React.ReactNode;
}) => {
  const isHashLink = to.includes('#');
  if (isHashLink) {
    return <a href={to} className="text-gray-700 hover:text-[var(--theme-primary)] transition-colors font-medium" onClick={e => {
      e.preventDefault();
      if (onClick) onClick();
    }}>
        {children}
      </a>;
  }
  return;
};
const MobileNavLink = ({
  to,
  onClick,
  children
}: {
  to: string;
  onClick: () => void;
  children: React.ReactNode;
}) => {
  const isHashLink = to.includes('#');
  if (isHashLink) {
    return <a href={to} className="block py-2 text-gray-700 hover:text-[var(--theme-primary)] transition-colors font-medium" onClick={e => {
      e.preventDefault();
      onClick();
    }}>
        {children}
      </a>;
  }
  return <Link to={to} className="block py-2 text-gray-700 hover:text-[var(--theme-primary)] transition-colors font-medium" onClick={onClick}>
      {children}
    </Link>;
};
export default Navbar;