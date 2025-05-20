export interface VoiceProfile {
  id: string;
  name: string;
  createdAt: Date;
  sampleUrl?: string;
  isDefault?: boolean;
}

export interface VoiceSettings {
  pitch: number;
  speed: number;
  emotion: 'neutral' | 'happy' | 'sad' | 'angry' | 'excited';
}

export interface TextToSpeechRequest {
  text: string;
  voiceId: string;
  settings: VoiceSettings;
}

export interface GeneratedAudio {
  id: string;
  text: string;
  audioUrl: string;
  voiceId: string;
  createdAt: Date;
  settings: VoiceSettings;
}