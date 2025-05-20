import React from 'react';
import { Mic, Plus, Check } from 'lucide-react';
import { VoiceProfile } from '../types';
import { useVoice } from '../context/VoiceContext';

interface VoiceSelectorProps {
  onAddVoice?: () => void;
  compact?: boolean;
}

const VoiceSelector: React.FC<VoiceSelectorProps> = ({ onAddVoice, compact = false }) => {
  const { voiceProfiles, selectedVoice, setSelectedVoice } = useVoice();

  return (
    <div className={`${compact ? 'p-2' : 'p-4'} bg-white rounded-lg shadow-sm border border-gray-100`}>
      <div className="flex items-center justify-between mb-3">
        <h3 className={`${compact ? 'text-sm' : 'text-base'} font-medium text-gray-900`}>Voice Selection</h3>
        {onAddVoice && (
          <button 
            onClick={onAddVoice}
            className="p-1.5 text-gray-500 hover:text-purple-600 hover:bg-purple-50 rounded-full transition-colors"
            aria-label="Add new voice"
          >
            <Plus className="h-4 w-4" />
          </button>
        )}
      </div>
      
      <div className="space-y-2">
        {voiceProfiles.map((voice) => (
          <button
            key={voice.id}
            onClick={() => setSelectedVoice(voice)}
            className={`w-full flex items-center justify-between p-2 rounded-md transition-colors ${
              selectedVoice?.id === voice.id
                ? 'bg-purple-50 text-purple-700 border border-purple-200'
                : 'bg-gray-50 text-gray-700 border border-gray-100 hover:bg-gray-100'
            }`}
          >
            <div className="flex items-center">
              <Mic className={`h-4 w-4 mr-2 ${selectedVoice?.id === voice.id ? 'text-purple-600' : 'text-gray-500'}`} />
              <span className={`${compact ? 'text-sm' : 'text-base'} font-medium truncate max-w-[150px]`}>
                {voice.name}
              </span>
              {voice.isDefault && (
                <span className="ml-2 px-1.5 py-0.5 text-xs bg-gray-100 text-gray-500 rounded">
                  Default
                </span>
              )}
            </div>
            
            {selectedVoice?.id === voice.id && (
              <Check className="h-4 w-4 text-purple-600" />
            )}
          </button>
        ))}
        
        {voiceProfiles.length === 0 && (
          <div className="text-center py-4">
            <p className="text-sm text-gray-500">No voices available</p>
            {onAddVoice && (
              <button
                onClick={onAddVoice}
                className="mt-2 text-sm text-purple-600 hover:text-purple-700"
              >
                Add a voice
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default VoiceSelector;