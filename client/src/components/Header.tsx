import React from 'react';
import { Brain, Layers } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-blue-900 to-blue-700 text-white p-6 rounded-xl shadow-lg mb-8">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center mb-4 md:mb-0">
          <div className="bg-white p-2 rounded-full mr-4">
            <Brain className="h-8 w-8 text-blue-700" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">AI Material Recommendation System</h1>
            <p className="text-blue-100">Advanced material selection powered by artificial intelligence</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-1 bg-blue-800 bg-opacity-40 px-4 py-2 rounded-lg">
          <Layers className="h-5 w-5 text-blue-300" />
          <span className="text-sm font-medium">Intelligent Material Analysis</span>
        </div>
      </div>
      
      <div className="mt-6 bg-blue-800 bg-opacity-30 p-4 rounded-lg text-sm">
        <p className="text-blue-100">
          Enter your project requirements below to receive AI-powered material recommendations optimized for your specific needs.
          Our system analyzes cost, durability, environmental compatibility, and more to provide you with the best options.
        </p>
      </div>
    </header>
  );
};

export default Header;