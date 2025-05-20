import React, { useState } from 'react';
import { Sparkles, Mic, Download, Info } from 'lucide-react';
import { useVoice } from '../context/VoiceContext';
import TextInput from '../components/TextInput';
import VoiceSelector from '../components/VoiceSelector';
import VoiceSettings from '../components/VoiceSettings';
import AudioPlayer from '../components/AudioPlayer';
import { useNavigate } from 'react-router-dom';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { selectedVoice, voiceSettings, addGeneratedAudio } = useVoice();
  const [isProcessing, setIsProcessing] = useState(false);
  const [generatedAudio, setGeneratedAudio] = useState<string | null>(null);
  const [inputText, setInputText] = useState<string>('');

  const handleGenerateSpeech = (text: string) => {
    if (!selectedVoice) {
      alert('Please select a voice first');
      return;
    }

    setInputText(text);
    setIsProcessing(true);

    // Simulate API call to TTS service
    setTimeout(() => {
      // In a real application, this would be the URL returned from the TTS service
      const mockAudioUrl = 'https://example.com/audio.mp3';
      
      setGeneratedAudio(mockAudioUrl);
      
      // Add to history
      addGeneratedAudio({
        id: Date.now().toString(),
        text: text,
        audioUrl: mockAudioUrl,
        voiceId: selectedVoice.id,
        createdAt: new Date(),
        settings: voiceSettings,
      });
      
      setIsProcessing(false);
    }, 2000);
  };

  const handleAddVoice = () => {
    navigate('/voices');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Voice Cloning Text-to-Speech
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Create natural-sounding speech in your own voice or choose from our voice library.
          No word limit, unlimited possibilities.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-xl border border-purple-100 mb-6">
            <div className="flex items-start mb-4">
              <div className="p-2 bg-purple-100 rounded-full mr-4">
                <Sparkles className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Unlimited Text-to-Speech</h2>
                <p className="text-gray-600">
                  Type or paste any text below and convert it to natural-sounding speech.
                </p>
              </div>
            </div>

            <TextInput onSubmit={handleGenerateSpeech} isProcessing={isProcessing} />
          </div>

          {generatedAudio && (
            <div className="mt-6 animate-fade-in">
              <AudioPlayer 
                audioUrl={generatedAudio} 
                text={inputText}
                onClose={() => setGeneratedAudio(null)}
              />
            </div>
          )}

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mt-6">
            <h3 className="text-lg font-medium text-gray-900 flex items-center mb-4">
              <Info className="h-5 w-5 text-gray-500 mr-2" />
              How it works
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex flex-col items-center text-center p-4 rounded-lg bg-gray-50">
                <div className="p-3 bg-purple-100 rounded-full mb-3">
                  <Mic className="h-6 w-6 text-purple-600" />
                </div>
                <h4 className="font-medium text-gray-900 mb-2">Upload Voice Sample</h4>
                <p className="text-sm text-gray-600">
                  Upload a short audio clip of your voice or choose from our library.
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center p-4 rounded-lg bg-gray-50">
                <div className="p-3 bg-teal-100 rounded-full mb-3">
                  <Sparkles className="h-6 w-6 text-teal-600" />
                </div>
                <h4 className="font-medium text-gray-900 mb-2">AI Voice Cloning</h4>
                <p className="text-sm text-gray-600">
                  Our AI analyzes your voice patterns to create a perfect digital clone.
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center p-4 rounded-lg bg-gray-50">
                <div className="p-3 bg-pink-100 rounded-full mb-3">
                  <Download className="h-6 w-6 text-pink-600" />
                </div>
                <h4 className="font-medium text-gray-900 mb-2">Generate & Download</h4>
                <p className="text-sm text-gray-600">
                  Type any text and convert it to natural speech. Download in MP3 format.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <VoiceSelector onAddVoice={handleAddVoice} />
          <VoiceSettings />
        </div>
      </div>
    </div>
  );
};

export default HomePage;