import { Mail, MapPin, Phone } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BreadcrumbNavigation from '@/components/navigation/BreadcrumbNavigation';
import SEOHelmet from '@/components/seo/SEOHelmet';

const ContactPage = () => {
  // Hardcoded last updated date for all users in DD-MM-YYYY HH:MM:SS format
  const lastUpdated = '05-04-2025 22:48:03';
  
  return (
    <div className="min-h-screen flex flex-col">
      <SEOHelmet 
        title="Contact Propico - Get Guaranteed Rental Income | Property Management Support"
        description="Contact Propico for guaranteed rental income services. Call +91-7738145442 or email info@propico.in. Office in HSR Layout, Bangalore. Get professional property management support."
      />
      <Navbar />
      <div className="pt-20">
        <BreadcrumbNavigation />
        
        <main className="flex-grow container mx-auto px-4 py-12 max-w-4xl">
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="theme-primary-bg py-8 px-6">
              <h1 className="text-3xl font-bold text-white">Contact Us</h1>
              <p className="text-white/80 text-sm mt-1">
                Last updated on: {lastUpdated}
              </p>
            </div>
            
            <div className="p-6 space-y-8">
              <p className="text-lg text-gray-700">
                You may contact us using the information below:
              </p>
              
              <div className="space-y-8">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-shrink-0 w-10 h-10 flex items-start justify-center mt-1">
                    <MapPin className="text-primary" />
                  </div>
                  <div className="space-y-4 flex-1">
                    <h3 className="font-semibold text-lg text-gray-900">Legal Entity & Address</h3>
                    <p className="text-gray-700 font-medium">
                      <span className="theme-primary-text">Merchant Legal entity name:</span> LEAP TO WIN TECHNOLOGIES PRIVATE LIMITED
                    </p>
                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                      <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                        <h4 className="text-base font-medium text-gray-900 mb-3">Registered Address:</h4>
                        <p className="text-gray-700 leading-relaxed">
                          3rd floor No. 502, Sharda, 4s Sector 3,<br />
                          HSR Layout, HSR Layout S.O, <br />
                          Bangalore South, Karnataka, India, <br />
                          PIN: 560102
                        </p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                        <h4 className="text-base font-medium text-gray-900 mb-3">Operational Address:</h4>
                        <p className="text-gray-700 leading-relaxed">
                          3rd floor no 502, Sharda, 4s Sector 3,<br />
                          HSR Layout, HSR Layout S.O, <br />
                          Bangalore South, Karnataka, India, <br />
                          PIN: 560102
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center">
                    <Phone className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900 mb-2">Telephone</h3>
                    <p className="text-gray-700">
                      <a href="tel:+917738145442" className="hover:theme-primary-text hover:underline transition-colors">
                        +91 77381 45442
                      </a>
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center">
                    <Mail className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900 mb-2">Email</h3>
                    <p className="text-gray-700">
                      <a href="mailto:info@propico.in" className="hover:theme-primary-text hover:underline transition-colors">
                        info@propico.in
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      
      <Footer />
    </div>
  );
};

export default ContactPage;
