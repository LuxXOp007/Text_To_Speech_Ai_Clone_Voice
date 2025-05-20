import React from 'react';
import { Settings } from 'lucide-react';
import { useVoice } from '../context/VoiceContext';

interface VoiceSettingsProps {
  compact?: boolean;
}

const VoiceSettings: React.FC<VoiceSettingsProps> = ({ compact = false }) => {
  const { voiceSettings, updateVoiceSettings } = useVoice();
  
  const emotions = [
    { value: 'neutral', label: 'Neutral' },
    { value: 'happy', label: 'Happy' },
    { value: 'sad', label: 'Sad' },
    { value: 'angry', label: 'Angry' },
    { value: 'excited', label: 'Excited' },
  ];
  
  const handlePitchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateVoiceSettings({ pitch: parseFloat(e.target.value) });
  };
  
  const handleSpeedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateVoiceSettings({ speed: parseFloat(e.target.value) });
  };
  
  const handleEmotionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateVoiceSettings({ 
      emotion: e.target.value as 'neutral' | 'happy' | 'sad' | 'angry' | 'excited' 
    });
  };
  
  return (
    <div className={`${compact ? 'p-2' : 'p-4'} bg-white rounded-lg shadow-sm border border-gray-100`}>
      <div className="flex items-center mb-3">
        <Settings className="h-4 w-4 text-gray-500 mr-2" />
        <h3 className={`${compact ? 'text-sm' : 'text-base'} font-medium text-gray-900`}>Voice Settings</h3>
      </div>
      
      <div className="space-y-4">
        <div>
          <div className="flex items-center justify-between mb-1">
            <label htmlFor="pitch" className="text-sm font-medium text-gray-700">
              Pitch
            </label>
            <span className="text-xs text-gray-500">{voiceSettings.pitch.toFixed(1)}</span>
          </div>
          <input
            id="pitch"
            type="range"
            min="0.5"
            max="2"
            step="0.1"
            value={voiceSettings.pitch}
            onChange={handlePitchChange}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>Low</span>
            <span>High</span>
          </div>
        </div>
        
        <div>
          <div className="flex items-center justify-between mb-1">
            <label htmlFor="speed" className="text-sm font-medium text-gray-700">
              Speed
            </label>
            <span className="text-xs text-gray-500">{voiceSettings.speed.toFixed(1)}x</span>
          </div>
          <input
            id="speed"
            type="range"
            min="0.5"
            max="2"
            step="0.1"
            value={voiceSettings.speed}
            onChange={handleSpeedChange}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>Slow</span>
            <span>Fast</span>
          </div>
        </div>
        
        <div>
          <label htmlFor="emotion" className="block text-sm font-medium text-gray-700 mb-1">
            Emotion
          </label>
          <select
            id="emotion"
            value={voiceSettings.emotion}
            onChange={handleEmotionChange}
            className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
          >
            {emotions.map((emotion) => (
              <option key={emotion.value} value={emotion.value}>
                {emotion.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default VoiceSettings;