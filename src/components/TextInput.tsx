import React, { useState } from 'react';
import { Send, X, ClipboardCopy, Check } from 'lucide-react';

interface TextInputProps {
  onSubmit: (text: string) => void;
  isProcessing?: boolean;
}

const TextInput: React.FC<TextInputProps> = ({ onSubmit, isProcessing = false }) => {
  const [text, setText] = useState('');
  const [copied, setCopied] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim() || isProcessing) return;
    
    onSubmit(text.trim());
  };
  
  const handleClear = () => {
    setText('');
  };
  
  const handlePaste = async () => {
    try {
      const clipboardText = await navigator.clipboard.readText();
      setText(clipboardText);
    } catch (error) {
      console.error('Failed to read clipboard:', error);
    }
  };
  
  const handleCopy = () => {
    if (!text.trim()) return;
    
    navigator.clipboard.writeText(text)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch((error) => {
        console.error('Failed to copy text:', error);
      });
  };
  
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <form onSubmit={handleSubmit}>
        <div className="p-2">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter text to convert to speech..."
            className="w-full p-3 border-0 focus:ring-0 resize-none min-h-[120px] max-h-[300px] text-gray-800"
            disabled={isProcessing}
          />
        </div>
        
        <div className="flex items-center justify-between bg-gray-50 px-3 py-2 border-t border-gray-100">
          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={handleClear}
              className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Clear text"
              disabled={!text || isProcessing}
            >
              <X className="h-4 w-4" />
            </button>
            
            <button
              type="button"
              onClick={handlePaste}
              className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Paste from clipboard"
              disabled={isProcessing}
            >
              <ClipboardCopy className="h-4 w-4" />
            </button>
            
            <button
              type="button"
              onClick={handleCopy}
              className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Copy to clipboard"
              disabled={!text || isProcessing}
            >
              {copied ? <Check className="h-4 w-4 text-green-500" /> : <ClipboardCopy className="h-4 w-4" />}
            </button>
          </div>
          
          <div className="flex items-center">
            <span className="text-xs text-gray-500 mr-3">
              {text.length} characters
            </span>
            
            <button
              type="submit"
              className={`px-4 py-2 rounded-full font-medium ${
                isProcessing
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : text.trim()
                    ? 'bg-purple-600 text-white hover:bg-purple-700'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              } flex items-center transition-colors`}
              disabled={!text.trim() || isProcessing}
            >
              {isProcessing ? 'Processing...' : 'Generate'}
              <Send className="ml-1.5 h-4 w-4" />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default TextInput;