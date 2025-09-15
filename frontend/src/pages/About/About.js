import React from 'react';
import Navigation from '../../components/Navigation/Navigation';
import Footer from '../../components/Footer/Footer';
import ChatWidget from '../../components/ChatWidget/ChatWidget';
import bluebg from '../../assets/bluebg.jpg';

const About = () => {
  const teamMembers = [
    {
      name: "Aazan Shami",
      role: "Software Developer & Business Analyst",
      image: "/images/aazan.jpg"
    },
    {
      name: "Hajra Raja",
      role: "Business Developer & Market Research",
      image: "/images/hajra.png"
    },
    {
      name: "Alishba Gul",
      role: "Social Media Manager",
      image: "/images/alishba.png"
    },
    {
      name: "Rayyan Hasan",
      role: "Finance Manager",
      image: "/images/rayyan.png"
    },
    {
      name: "Shahmir Khan",
      role: "Social Media Marketing",
      image: "/images/shahmir.jpg"
    },
    {
      name: "Javaria Malik",
      role: "Sales Manager",
      image: "/images/javaria.png"
    },
    {
      name: "Hamza Bin Masood",
      role: "Business Developer & Marketing",
      image: "/images/hamza.png"
    }
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section with Page Title & Intro */}
      <div 
        className="relative min-h-screen flex items-center"
        style={{
          backgroundImage: `url(${bluebg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-left">
          <div className="text-white animate-fade-in-up">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 mt-20 leading-tight">
              About{' '}
              <span className="text-yellow-400">Us</span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 leading-relaxed max-w-3xl text-left">
              Elite Filing is an authorized partner of Companies House, making UK Limited Company formation simple, fast, and compliant. With our reliable in-house system, we deliver seamless registrations, accurate documentation, and professional support—helping entrepreneurs and businesses start strong with confidence.
            </p>
          </div>
        </div>
      </div>

      {/* CEO Message Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* CEO Photo */}
            <div className="flex justify-center lg:justify-start">
              <div className="relative">
                <div className="w-[400px] h-[400px] rounded-full overflow-hidden border-4 border-yellow-400 shadow-2xl">
                  <img 
    src={`${process.env.PUBLIC_URL}/images/ceo.png`}
    alt="CEO - Elite Filing" 
    className="w-full h-full object-cover"
    onError={(e) => {
      e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjMyMCIgdmlld0JveD0iMCAwIDMyMCAzMjAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMjAiIGhlaWdodD0iMzIwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xNjAgMTAwQzE4MS4wNDMgMTAwIDIwMCAxMTguOTU3IDIwMCAxNDBDMjAwIDE2MS4wNDMgMTgxLjA0MyAxODAgMTYwIDE4MEM4OC45NTcgMTgwIDEyMCAxNjEuMDQzIDEyMCAxNDBDMTIwIDExOC45NTcgMTM4Ljk1NyAxMDAgMTYwIDEwMFoiIGZpbGw9IiM5Q0EzQUYiLz4KPHBhdGggZD0iTTEwMCAyNDBDMTAwIDIxNS4xNDcgMTI1LjE0NyAxOTAgMTUwIDE5MEgxNzBDMTk0Ljg1MyAxOTAgMjIwIDIxNS4xNDcgMjIwIDI0MFYyNjBIMTAwVjI0MFoiIGZpbGw9IiM5Q0EzQUYiLz4KPC9zdmc+';
    }}
/>
                  
                </div>
              </div>
            </div>
            
            {/* CEO Message Content */}
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                CEO <span className="text-yellow-400">Message</span>
              </h2>
              
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p className="text-lg">
                  <strong className="text-blue-900">Vision:</strong> A world where launching and managing a business is as effortless as imagining it.
                </p>
                
                <p className="text-lg">
                  <strong className="text-blue-900">Mission:</strong> Remove barriers of red tape, paperwork, and confusion → replace with clarity, efficiency, confidence.
                </p>
                
                <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-yellow-400">
                  <p className="text-lg mb-4">
                    <strong className="text-blue-900">Transformation:</strong> Turning "what if" into "what's next" by supporting:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                    <li>Entrepreneurs</li>
                    <li>Startups</li>
                    <li>Established businesses</li>
                  </ul>
                  <p className="mt-4 text-lg">
                    Services cover: registration, compliance, and growth.
                  </p>
                </div>
                
                <p className="text-lg">
                  Elite Filing is positioned as more than a service — it's a movement, making business ownership accessible to all.
                </p>
                
                <p className="text-lg">
                  <strong className="text-blue-900">Core values:</strong> innovation, vision-driven approach, redefining business creation.
                </p>
                
                <blockquote className="text-xl font-semibold text-blue-900 italic border-l-4 border-yellow-400 pl-6 mt-8">
                  "Together, let's build something extraordinary."
                  <footer className="text-gray-600 text-base mt-2 not-italic">— CEO, Elite Filing</footer>
                </blockquote>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Team Behind Our <span className="text-yellow-400">Work</span>
            </h2>
          </div>
          
          {/* Team Leader */}
          <div className="mb-16">
            <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl mx-auto text-center">
              <div className="relative mb-6">
                <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-yellow-400 shadow-lg">
                  <img 
                    src="/images/mahjabeen.jpg" 
                    alt="Mahjabeen Shah - Country Head & Team Lead" 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTI4IiBoZWlnaHQ9IjEyOCIgdmlld0JveD0iMCAwIDEyOCAxMjgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMjgiIGhlaWdodD0iMTI4IiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik02NCA0MEM3Mi44MzY2IDQwIDgwIDQ3LjE2MzQgODAgNTZDODAgNjQuODM2NiA3Mi44MzY2IDcyIDY0IDcyQzU1LjE2MzQgNzIgNDggNjQuODM2NiA0OCA1NkM0OCA0Ny4xNjM0IDU1LjE2MzQgNDAgNjQgNDBaIiBmaWxsPSIjOUNBM0FGIi8+CjxwYXRoIGQ9Ik00MCA5NkM0MCA4Ni4wNTg5IDQ4LjA1ODkgNzggNTggNzhINzBDNzkuOTQxMSA3OCA4OCA4Ni4wNTg5IDg4IDk2VjEwNEg0MFY5NloiIGZpbGw9IiM5Q0EzQUYiLz4KPC9zdmc+';
                    }}
                  />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Mahjabeen Shah</h3>
              <p className="text-yellow-600 font-semibold text-lg mb-4">Country Head & Team Lead</p>
            </div>
          </div>
          
          {/* Team Members Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow duration-300">
                <div className="relative mb-4">
                  <div className="w-24 h-24 mx-auto rounded-full overflow-hidden border-3 border-yellow-400 shadow-md">
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOTYiIGhlaWdodD0iOTYiIHZpZXdCb3g9IjAgMCA5NiA5NiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9Ijk2IiBoZWlnaHQ9Ijk2IiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik00OCAzMEM1NC42Mjc0IDMwIDYwIDM1LjM3MjYgNjAgNDJDNjAgNDguNjI3NCA1NC42Mjc0IDU0IDQ4IDU0QzQxLjM3MjYgNTQgMzYgNDguNjI3NCAzNiA0MkMzNiAzNS4zNzI2IDQxLjM3MjYgMzAgNDggMzBaIiBmaWxsPSIjOUNBM0FGIi8+CjxwYXRoIGQ9Ik0zMCA3MkMzMCA2NC4yNjggMzYuMjY4IDU4IDQ0IDU4SDUyQzU5LjczMiA1OCA2NiA2NC4yNjggNjYgNzJWNzhIMzBWNzJaIiBmaWxsPSIjOUNBM0FGIi8+Cjwvc3ZnPg==';
                      }}
                    />
                  </div>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{member.name}</h3>
                <p className="text-yellow-600 font-medium text-sm">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
      <ChatWidget />
    </div>
  );
};

export default About;