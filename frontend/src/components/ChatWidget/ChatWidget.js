import React, { useState } from 'react';
import { ChatBubbleLeftRightIcon, XMarkIcon } from '@heroicons/react/24/outline';

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat Window */}
      {isOpen && (
        <div className="mb-4 w-80 h-96 bg-white rounded-lg shadow-2xl border border-gray-200 flex flex-col">
          {/* Header */}
          <div className="p-4 rounded-t-lg flex justify-between items-center" style={{
            background: 'linear-gradient(135deg, #000e3d 0%, #f8bd0a 100%)'
          }}>
            <div className="flex items-center">
              <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center mr-2">
                <span className="text-sm font-bold text-white">EF</span>
              </div>
              <div>
                <h3 className="font-semibold text-white">Elite Filing Support</h3>
                <p className="text-xs opacity-90 text-yellow-100">We're here to help!</p>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-yellow-200 transition-colors"
            >
              <XMarkIcon className="w-5 h-5" />
            </button>
          </div>
          {/* Chat Content */}
          <div className="flex-1 p-4 overflow-y-auto">
            <div className="space-y-3">
              <div className="bg-gray-100 rounded-lg p-3 max-w-xs">
                <p className="text-sm text-gray-800">Hello! How can we help you with your business filing needs today?</p>
                <span className="text-xs text-gray-500 mt-1 block">Elite Filing Team</span>
              </div>
              
              <div className="bg-blue-100 rounded-lg p-3 max-w-xs ml-auto">
                <p className="text-sm text-gray-800">Hi! I'm interested in learning more about your services.</p>
                <span className="text-xs text-gray-500 mt-1 block text-right">You</span>
              </div>
              
              <div className="bg-gray-100 rounded-lg p-3 max-w-xs">
                <p className="text-sm text-gray-800">Great! We offer comprehensive business solutions including company formation, tax services, and legal compliance. What specific area interests you most?</p>
                <span className="text-xs text-gray-500 mt-1 block">Elite Filing Team</span>
              </div>
            </div>
          </div>
          
          {/* Input Area */}
         <div className="p-4 border-t border-gray-200">
            <div className="flex space-x-2">
              <input 
                type="text" 
                placeholder="Type your message..."
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              />
              <button 
                className="px-4 py-2 rounded-lg transition-colors text-white" 
                style={{
                  background: 'linear-gradient(135deg, #f8bd0a 0%, #ffd700 100%)'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = 'linear-gradient(135deg, #ffd700 0%, #f8bd0a 100%)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'linear-gradient(135deg, #f8bd0a 0%, #ffd700 100%)';
                }}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Chat Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="p-4 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 flex items-center space-x-2"
        style={{
          background: 'linear-gradient(135deg, #000e3d 0%, #f8bd0a 100%)',
          color: 'white'
        }}
        onMouseEnter={(e) => {
          e.target.style.background = 'linear-gradient(135deg, #f8bd0a 0%, #000e3d 100%)';
          e.target.style.boxShadow = '0 8px 25px rgba(248, 189, 10, 0.4)';
        }}
        onMouseLeave={(e) => {
          e.target.style.background = 'linear-gradient(135deg, #000e3d 0%, #f8bd0a 100%)';
          e.target.style.boxShadow = '0 4px 15px rgba(0, 14, 61, 0.3)';
        }}
      >
        {isOpen ? (
          <XMarkIcon className="w-6 h-6" style={{color: 'white'}} />
        ) : (
          <>
            <ChatBubbleLeftRightIcon className="w-6 h-6" style={{color: 'white'}} />
            <span className="hidden sm:block text-sm font-medium" style={{color: 'white', fontWeight: '600'}}>
              Chat with us
            </span>
          </>
        )}
      </button>
    </div>
  );
};

export default ChatWidget;