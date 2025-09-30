import React from 'react';
import Navigation from '../../components/Navigation/Navigation';
import Hero from '../../components/Hero/Hero';
import WhyChooseUs from '../../components/WhyChooseUs/WhyChooseUs';
import OurServices from '../../components/OurServices/OurServices';
import Statistics from '../../components/Statistics/Statistics';
import FormLaunchGrow from '../../components/FormLaunchGrow/FormLaunchGrow';
import BusinessSolutions from '../../components/BusinessSolutions/BusinessSolutions';
import Blogs from '../../components/Blogs/Blogs';
import Testimonials from '../../components/Testimonials/Testimonials';
import ServicesSection from '../../components/ServicesSection/ServicesSection';
import OurCollaborators from '../../components/OurCollaborators/OurCollaborators';
import Footer from '../../components/Footer/Footer';
import ChatWidget from '../../components/ChatWidget/ChatWidget';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900">
      <Navigation />
      <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900">
        <Hero />
      </div>
      <WhyChooseUs />
      <OurCollaborators />
      <OurServices />
      <Statistics />
      <FormLaunchGrow />
      <BusinessSolutions />
      <Blogs />
      <Testimonials />
      <ServicesSection />
      
      <Footer />
      <ChatWidget />
    </div>
  );
};

export default Home;