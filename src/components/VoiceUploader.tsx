import React, { useState, useRef } from 'react';
import { Upload, X, Mic } from 'lucide-react';

interface VoiceUploaderProps {
  onUpload: (file: File, name: string) => void;
  isUploading?: boolean;
}

const VoiceUploader: React.FC<VoiceUploaderProps> = ({ onUpload, isUploading = false }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [voiceName, setVoiceName] = useState('');
  const [dragActive, setDragActive] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      
      // Auto-set a voice name based on file name
      const fileName = file.name.replace(/\.[^/.]+$/, ''); // Remove extension
      setVoiceName(fileName);
    }
  };
  
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setSelectedFile(file);
      
      // Auto-set a voice name based on file name
      const fileName = file.name.replace(/\.[^/.]+$/, ''); // Remove extension
      setVoiceName(fileName);
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedFile || !voiceName.trim() || isUploading) return;
    
    onUpload(selectedFile, voiceName.trim());
  };
  
  const handleRemoveFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <h3 className="text-lg font-medium text-gray-900 mb-3">Upload Voice Sample</h3>
      
      <form onSubmit={handleSubmit}>
        <div 
          className={`border-2 border-dashed rounded-lg p-6 text-center ${
            dragActive ? 'border-purple-400 bg-purple-50' : 'border-gray-300'
          }`}
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
        >
          {!selectedFile ? (
            <>
              <Mic className="mx-auto h-12 w-12 text-gray-400" />
              <p className="mt-2 text-sm text-gray-600">
                Drag and drop an audio file, or{' '}
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="text-purple-600 hover:text-purple-700 font-medium"
                >
                  browse
                </button>
              </p>
              <p className="mt-1 text-xs text-gray-500">
                MP3, WAV or M4A up to 10MB
              </p>
            </>
          ) : (
            <div>
              <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg border border-gray-200">
                <div className="flex items-center">
                  <Mic className="h-8 w-8 text-purple-600 mr-3" />
                  <div className="overflow-hidden">
                    <p className="text-sm font-medium text-gray-900 truncate">{selectedFile.name}</p>
                    <p className="text-xs text-gray-500">
                      {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                
                <button
                  type="button"
                  onClick={handleRemoveFile}
                  className="p-1.5 text-gray-400 hover:text-gray-500 hover:bg-gray-100 rounded-full transition-colors"
                  aria-label="Remove file"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
          )}
          
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="audio/mpeg,audio/wav,audio/mp4"
            className="hidden"
          />
        </div>
        
        <div className="mt-4">
          <label htmlFor="voiceName" className="block text-sm font-medium text-gray-700 mb-1">
            Voice Name
          </label>
          <input
            type="text"
            id="voiceName"
            value={voiceName}
            onChange={(e) => setVoiceName(e.target.value)}
            placeholder="e.g., My Voice, Professional Voice"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            disabled={!selectedFile || isUploading}
          />
        </div>
        
        <div className="mt-4">
          <button
            type="submit"
            className={`w-full px-4 py-2 rounded-md font-medium flex items-center justify-center ${
              !selectedFile || !voiceName.trim() || isUploading
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-purple-600 text-white hover:bg-purple-700'
            } transition-colors`}
            disabled={!selectedFile || !voiceName.trim() || isUploading}
          >
            {isUploading ? 'Uploading...' : 'Upload Voice Sample'}
            <Upload className="ml-1.5 h-4 w-4" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default VoiceUploader;