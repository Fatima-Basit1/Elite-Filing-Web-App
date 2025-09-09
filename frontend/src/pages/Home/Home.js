import React from 'react';
import Navigation from '../../components/Navigation/Navigation';
import Hero from '../../components/Hero/Hero';
import ChatWidget from '../../components/ChatWidget/ChatWidget';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900">
      <Navigation />
      <Hero />
      <ChatWidget />
    </div>
  );
};

export default Home;