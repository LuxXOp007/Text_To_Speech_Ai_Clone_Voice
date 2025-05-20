import React, { useState } from 'react';
import { Plus, Mic, Trash2 } from 'lucide-react';
import { useVoice } from '../context/VoiceContext';
import VoiceUploader from '../components/VoiceUploader';
import { VoiceProfile } from '../types';

const VoicesPage: React.FC = () => {
  const { voiceProfiles, addVoiceProfile, removeVoiceProfile, selectedVoice, setSelectedVoice } = useVoice();
  const [showUploader, setShowUploader] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const handleAddVoice = (file: File, name: string) => {
    setIsUploading(true);
    
    // Simulate upload and processing
    setTimeout(() => {
      const newVoice: VoiceProfile = {
        id: Date.now().toString(),
        name,
        createdAt: new Date(), // Ensure we create a new Date object
        sampleUrl: URL.createObjectURL(file),
      };
      
      addVoiceProfile(newVoice);
      setShowUploader(false);
      setIsUploading(false);
    }, 1500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">My Voices</h1>
        
        <button
          onClick={() => setShowUploader(!showUploader)}
          className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-colors flex items-center"
        >
          {showUploader ? 'Cancel' : 'Add New Voice'}
          {!showUploader && <Plus className="ml-1.5 h-4 w-4" />}
        </button>
      </div>
      
      {showUploader && (
        <div className="mb-8">
          <VoiceUploader onUpload={handleAddVoice} isUploading={isUploading} />
        </div>
      )}
      
      {voiceProfiles.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-200">
          <Mic className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-lg font-medium text-gray-900">No voices yet</h3>
          <p className="mt-1 text-gray-500">Get started by adding your first voice.</p>
          <div className="mt-6">
            <button
              onClick={() => setShowUploader(true)}
              className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-colors"
            >
              Add Voice
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {voiceProfiles.map((voice) => (
            <div
              key={voice.id}
              className={`p-4 rounded-lg border ${
                selectedVoice?.id === voice.id
                  ? 'border-purple-200 bg-purple-50'
                  : 'border-gray-200 bg-white'
              } transition-colors`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center">
                  <div className={`p-2 rounded-full ${
                    selectedVoice?.id === voice.id ? 'bg-purple-100' : 'bg-gray-100'
                  }`}>
                    <Mic className={`h-5 w-5 ${
                      selectedVoice?.id === voice.id ? 'text-purple-600' : 'text-gray-500'
                    }`} />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-base font-medium text-gray-900">{voice.name}</h3>
                    <p className="text-sm text-gray-500">
                      Created {voice.createdAt instanceof Date ? voice.createdAt.toLocaleDateString() : new Date(voice.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                
                {!voice.isDefault && (
                  <button
                    onClick={() => removeVoiceProfile(voice.id)}
                    className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                    aria-label={`Remove ${voice.name}`}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                )}
              </div>
              
              {voice.sampleUrl && (
                <div className="mt-4">
                  <p className="text-xs text-gray-500 mb-1">Voice sample:</p>
                  <audio 
                    controls 
                    src={voice.sampleUrl} 
                    className="w-full h-8"
                    preload="metadata"
                  />
                </div>
              )}
              
              <div className="mt-4 flex">
                <button
                  onClick={() => setSelectedVoice(voice)}
                  className={`flex-1 px-3 py-1.5 text-sm font-medium rounded-md ${
                    selectedVoice?.id === voice.id
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  } transition-colors`}
                >
                  {selectedVoice?.id === voice.id ? 'Selected' : 'Select Voice'}
                </button>
                
                {voice.isDefault && (
                  <span className="ml-2 px-2 py-1.5 text-xs bg-gray-100 text-gray-600 rounded-md flex items-center">
                    Default
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default VoicesPage;