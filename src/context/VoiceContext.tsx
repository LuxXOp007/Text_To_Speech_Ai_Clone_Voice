import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { VoiceProfile, VoiceSettings, GeneratedAudio } from '../types';

interface VoiceContextType {
  voiceProfiles: VoiceProfile[];
  selectedVoice: VoiceProfile | null;
  voiceSettings: VoiceSettings;
  generatedAudios: GeneratedAudio[];
  setSelectedVoice: (voice: VoiceProfile | null) => void;
  updateVoiceSettings: (settings: Partial<VoiceSettings>) => void;
  addVoiceProfile: (profile: VoiceProfile) => void;
  removeVoiceProfile: (id: string) => void;
  addGeneratedAudio: (audio: GeneratedAudio) => void;
  removeGeneratedAudio: (id: string) => void;
}

const defaultVoiceSettings: VoiceSettings = {
  pitch: 1.0,
  speed: 1.0,
  emotion: 'neutral',
};

// Sample data
const sampleVoiceProfiles: VoiceProfile[] = [
  {
    id: '1',
    name: 'Default Voice',
    createdAt: new Date(),
    isDefault: true,
  },
];

const VoiceContext = createContext<VoiceContextType | undefined>(undefined);

export const VoiceProvider = ({ children }: { children: ReactNode }) => {
  const [voiceProfiles, setVoiceProfiles] = useState<VoiceProfile[]>(sampleVoiceProfiles);
  const [selectedVoice, setSelectedVoice] = useState<VoiceProfile | null>(sampleVoiceProfiles[0]);
  const [voiceSettings, setVoiceSettings] = useState<VoiceSettings>(defaultVoiceSettings);
  const [generatedAudios, setGeneratedAudios] = useState<GeneratedAudio[]>([]);

  // Load saved data from localStorage on initial render
  useEffect(() => {
    const savedProfiles = localStorage.getItem('voiceProfiles');
    const savedGeneratedAudios = localStorage.getItem('generatedAudios');
    
    if (savedProfiles) {
      try {
        const parsedProfiles = JSON.parse(savedProfiles);
        // Convert createdAt strings back to Date objects
        const profilesWithDates = parsedProfiles.map((profile: VoiceProfile) => ({
          ...profile,
          createdAt: new Date(profile.createdAt)
        }));
        setVoiceProfiles(profilesWithDates);
        
        // Set the default voice or the first one as selected
        const defaultVoice = profilesWithDates.find((v: VoiceProfile) => v.isDefault) || profilesWithDates[0];
        setSelectedVoice(defaultVoice || null);
      } catch (e) {
        console.error('Failed to parse saved voice profiles', e);
      }
    }
    
    if (savedGeneratedAudios) {
      try {
        const parsedAudios = JSON.parse(savedGeneratedAudios);
        // Convert createdAt strings back to Date objects for generated audios
        const audiosWithDates = parsedAudios.map((audio: GeneratedAudio) => ({
          ...audio,
          createdAt: new Date(audio.createdAt)
        }));
        setGeneratedAudios(audiosWithDates);
      } catch (e) {
        console.error('Failed to parse saved generated audios', e);
      }
    }
  }, []);

  // Save to localStorage when data changes
  useEffect(() => {
    localStorage.setItem('voiceProfiles', JSON.stringify(voiceProfiles));
  }, [voiceProfiles]);

  useEffect(() => {
    localStorage.setItem('generatedAudios', JSON.stringify(generatedAudios));
  }, [generatedAudios]);

  const updateVoiceSettings = (settings: Partial<VoiceSettings>) => {
    setVoiceSettings(prev => ({ ...prev, ...settings }));
  };

  const addVoiceProfile = (profile: VoiceProfile) => {
    // Ensure createdAt is a Date object
    const profileWithDate = {
      ...profile,
      createdAt: profile.createdAt instanceof Date ? profile.createdAt : new Date(profile.createdAt)
    };
    setVoiceProfiles(prev => [...prev, profileWithDate]);
  };

  const removeVoiceProfile = (id: string) => {
    // Don't remove if it's the only profile or if it's the default
    if (voiceProfiles.length <= 1 || voiceProfiles.find(v => v.id === id)?.isDefault) {
      return;
    }
    
    setVoiceProfiles(prev => prev.filter(v => v.id !== id));
    
    // If the removed profile was selected, select the default or first available
    if (selectedVoice?.id === id) {
      const defaultVoice = voiceProfiles.find(v => v.isDefault) || voiceProfiles[0];
      setSelectedVoice(defaultVoice);
    }
  };

  const addGeneratedAudio = (audio: GeneratedAudio) => {
    // Ensure createdAt is a Date object
    const audioWithDate = {
      ...audio,
      createdAt: audio.createdAt instanceof Date ? audio.createdAt : new Date(audio.createdAt)
    };
    setGeneratedAudios(prev => [audioWithDate, ...prev]);
  };

  const removeGeneratedAudio = (id: string) => {
    setGeneratedAudios(prev => prev.filter(a => a.id !== id));
  };

  return (
    <VoiceContext.Provider
      value={{
        voiceProfiles,
        selectedVoice,
        voiceSettings,
        generatedAudios,
        setSelectedVoice,
        updateVoiceSettings,
        addVoiceProfile,
        removeVoiceProfile,
        addGeneratedAudio,
        removeGeneratedAudio,
      }}
    >
      {children}
    </VoiceContext.Provider>
  );
};

export const useVoice = () => {
  const context = useContext(VoiceContext);
  if (context === undefined) {
    throw new Error('useVoice must be used within a VoiceProvider');
  }
  return context;
};