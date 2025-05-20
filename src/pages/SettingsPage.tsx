import React from 'react';
import { Save, Trash2, AlertCircle } from 'lucide-react';

const SettingsPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Account Settings</h2>
          
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value="user@example.com"
                readOnly
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              />
            </div>
            
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Display Name
              </label>
              <input
                type="text"
                id="name"
                placeholder="Your Name"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              />
            </div>
            
            <div className="pt-4">
              <button className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-colors flex items-center">
                <Save className="mr-1.5 h-4 w-4" />
                Save Changes
              </button>
            </div>
          </div>
        </div>
        
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900 mb-4">API Access</h2>
          
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-4">
            <div className="flex items-start">
              <AlertCircle className="h-5 w-5 text-amber-500 mr-2 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-gray-600">
                This is a demo application. In a real-world scenario, this section would allow you to manage API keys for integrating with the voice cloning service.
              </p>
            </div>
          </div>
          
          <div>
            <label htmlFor="apiKey" className="block text-sm font-medium text-gray-700 mb-1">
              API Key
            </label>
            <div className="flex">
              <input
                type="password"
                id="apiKey"
                value="••••••••••••••••••••••••••••••"
                readOnly
                className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md shadow-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              />
              <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-r-md border border-gray-300 border-l-0 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-colors">
                Show
              </button>
            </div>
          </div>
        </div>
        
        <div className="p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Data Management</h2>
          
          <div className="space-y-4">
            <div>
              <button className="px-4 py-2 bg-red-50 text-red-700 rounded-md border border-red-200 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors flex items-center">
                <Trash2 className="mr-1.5 h-4 w-4" />
                Clear Voice History
              </button>
              <p className="mt-1 text-xs text-gray-500">
                This will delete all your generated audio history, but keep your voice profiles.
              </p>
            </div>
            
            <div className="pt-2">
              <button className="px-4 py-2 bg-red-50 text-red-700 rounded-md border border-red-200 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors flex items-center">
                <Trash2 className="mr-1.5 h-4 w-4" />
                Delete All Voice Profiles
              </button>
              <p className="mt-1 text-xs text-gray-500">
                This will delete all your custom voice profiles. The default voice will remain.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;