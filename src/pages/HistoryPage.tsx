import React, { useState } from 'react';
import { Clock, Download, Trash2, Search, Filter } from 'lucide-react';
import { useVoice } from '../context/VoiceContext';
import AudioPlayer from '../components/AudioPlayer';

const HistoryPage: React.FC = () => {
  const { generatedAudios, removeGeneratedAudio, voiceProfiles } = useVoice();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVoiceFilter, setSelectedVoiceFilter] = useState<string | 'all'>('all');
  
  // Filter audios based on search and voice filter
  const filteredAudios = generatedAudios.filter((audio) => {
    const matchesSearch = audio.text.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesVoice = selectedVoiceFilter === 'all' || audio.voiceId === selectedVoiceFilter;
    return matchesSearch && matchesVoice;
  });
  
  // Group audios by date
  const groupedAudios = filteredAudios.reduce((groups, audio) => {
    const date = new Date(audio.createdAt).toLocaleDateString();
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(audio);
    return groups;
  }, {} as Record<string, typeof filteredAudios>);
  
  const dateGroups = Object.keys(groupedAudios).sort(
    (a, b) => new Date(b).getTime() - new Date(a).getTime()
  );
  
  const handleDownload = (audioUrl: string) => {
    const a = document.createElement('a');
    a.href = audioUrl;
    a.download = `voice-clone-${Date.now()}.mp3`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">History</h1>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by text..."
              className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            />
          </div>
          
          <div className="relative w-full md:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Filter className="h-5 w-5 text-gray-400" />
            </div>
            <select
              value={selectedVoiceFilter}
              onChange={(e) => setSelectedVoiceFilter(e.target.value)}
              className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 appearance-none"
            >
              <option value="all">All Voices</option>
              {voiceProfiles.map((voice) => (
                <option key={voice.id} value={voice.id}>
                  {voice.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      
      {filteredAudios.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-200">
          <Clock className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-lg font-medium text-gray-900">No history found</h3>
          <p className="mt-1 text-gray-500">
            {generatedAudios.length === 0
              ? "You haven't generated any audio yet."
              : "No results match your search criteria."}
          </p>
        </div>
      ) : (
        <div>
          {dateGroups.map((date) => (
            <div key={date} className="mb-8">
              <h2 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                <Clock className="h-5 w-5 text-gray-500 mr-2" />
                {date}
              </h2>
              
              <div className="space-y-4">
                {groupedAudios[date].map((audio) => {
                  const voice = voiceProfiles.find((v) => v.id === audio.voiceId);
                  
                  return (
                    <div key={audio.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <div className="text-sm text-gray-500 mb-1">
                            Voice: {voice?.name || 'Unknown Voice'}
                          </div>
                          <p className="text-gray-700 line-clamp-2">{audio.text}</p>
                        </div>
                        
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleDownload(audio.audioUrl)}
                            className="p-1.5 text-gray-500 hover:text-purple-600 hover:bg-purple-50 rounded-full transition-colors"
                            aria-label="Download"
                          >
                            <Download className="h-4 w-4" />
                          </button>
                          
                          <button
                            onClick={() => removeGeneratedAudio(audio.id)}
                            className="p-1.5 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                            aria-label="Delete"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                      
                      <audio 
                        controls 
                        src={audio.audioUrl}
                        className="w-full h-8"
                        preload="metadata"
                      />
                      
                      <div className="mt-2 flex flex-wrap gap-2 text-xs text-gray-500">
                        <span className="px-2 py-1 bg-gray-100 rounded-full">
                          Pitch: {audio.settings.pitch.toFixed(1)}
                        </span>
                        <span className="px-2 py-1 bg-gray-100 rounded-full">
                          Speed: {audio.settings.speed.toFixed(1)}x
                        </span>
                        <span className="px-2 py-1 bg-gray-100 rounded-full capitalize">
                          {audio.settings.emotion}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HistoryPage;