
import React from "react";
import { Users, Shield, Smartphone, MapPin, Clock, Building, TrendingUp, Heart } from "lucide-react";
import LazyImage from "./performance/LazyImage";

const CompanyStorySection = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Main Header Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold theme-primary-text mb-6">
              About Propico
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8">
              Guaranteed Rental Income. Complete Peace of Mind.
            </p>
            <p className="text-lg text-gray-700 max-w-4xl mx-auto">
              At Propico, we believe property ownership should generate stress-free income, not sleepless nights. We're India's rental guarantee property management company, ensuring property owners receive guaranteed monthly rent regardless of tenant issues or vacancies.
            </p>
          </div>

          {/* Our Story Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            <div className="order-2 lg:order-1">
              <h2 className="text-3xl md:text-4xl font-bold theme-primary-text mb-6">
                Our Story
              </h2>
              <p className="text-lg text-gray-700 mb-6">
                Propico was founded by three homeowners who each experienced the frustrations of property ownership firsthand - from the hassles of filling up vacant flats to chasing late rent payments to dealing with tenant issues and unexpected maintenance problems. Combining their backgrounds in technology, finance and business operations, they realized the Indian rental market needed a fundamental shift from traditional property management to guaranteed rental income.
              </p>
              <p className="text-lg text-gray-700">
                Today, Propico is transforming how property owners across India experience rental income through our innovative rental guarantee program.
              </p>
            </div>
            
            <div className="order-1 lg:order-2 relative">
              <div className="w-full max-w-md mx-auto">
                <LazyImage 
                  src="https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                  alt="Propico team working together" 
                  className="object-cover w-full h-64 rounded-xl shadow-lg"
                  width={400}
                  height={256}
                />
              </div>
            </div>
          </div>

          {/* What Makes Us Different */}
          <div className="mb-20">
            <h2 className="text-3xl md:text-4xl font-bold theme-primary-text mb-12 text-center">
              What Makes Us Different
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-xl shadow-lg">
                <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center mb-6">
                  <Shield className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold theme-primary-text mb-4">Guaranteed Monthly Rent</h3>
                <p className="text-gray-700">
                  Unlike traditional property management, we guarantee your rent payment every month. No more worrying about tenant delays or vacancy periods.
                </p>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-lg">
                <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center mb-6">
                  <Heart className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold theme-primary-text mb-4">Complete Property Care</h3>
                <p className="text-gray-700">
                  From tenant screening to maintenance coordination, we handle every aspect of property management so you can focus on what matters most.
                </p>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-lg">
                <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center mb-6">
                  <Smartphone className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold theme-primary-text mb-4">Technology-Driven</h3>
                <p className="text-gray-700">
                  We use modern technology for efficient property management, transparent reporting, and seamless communication.
                </p>
              </div>
            </div>
          </div>

          {/* Who We Serve */}
          <div className="mb-20">
            <h2 className="text-3xl md:text-4xl font-bold theme-primary-text mb-12 text-center">
              Who We Serve
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-lg text-center">
                <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="font-bold theme-primary-text text-lg mb-2">Busy Professionals</h3>
                <p className="text-gray-600 text-sm">Focus on your career while we ensure consistent rental income</p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-lg text-center">
                <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-4">
                  <MapPin className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="font-bold theme-primary-text text-lg mb-2">NRIs</h3>
                <p className="text-gray-600 text-sm">Manage your Indian properties remotely with complete confidence</p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-lg text-center">
                <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="font-bold theme-primary-text text-lg mb-2">Property Investors</h3>
                <p className="text-gray-600 text-sm">Scale your portfolio without management complexities</p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-lg text-center">
                <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-4">
                  <Users className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="font-bold theme-primary-text text-lg mb-2">Retirees</h3>
                <p className="text-gray-600 text-sm">Enjoy reliable monthly income without tenant management stress</p>
              </div>
            </div>
          </div>

          {/* Service Areas */}
          <div className="mb-20">
            <h2 className="text-3xl md:text-4xl font-bold theme-primary-text mb-8 text-center">
              Our Service Areas
            </h2>
            <div className="bg-white p-8 rounded-xl shadow-lg text-center">
              <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-6">
                <Building className="h-8 w-8 text-purple-600" />
              </div>
              <p className="text-lg text-gray-700">
                We currently serve property owners in <span className="font-semibold theme-primary-text">Bangalore, Mumbai, Delhi NCR, Pune, and Hyderabad</span>, with plans to expand to additional cities.
              </p>
            </div>
          </div>

          {/* Call to Action */}
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl p-8 text-center text-white">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to Experience Stress-Free Rental Income?
            </h2>
            <p className="text-lg mb-8 opacity-90">
              Contact us today for a free consultation and discover why property owners across India choose Propico for guaranteed rental income and complete property management.
            </p>
            <a 
              href="/list-property" 
              className="inline-block bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Get Started Today
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompanyStorySection;
