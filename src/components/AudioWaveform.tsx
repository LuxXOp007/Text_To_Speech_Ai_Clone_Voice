import React, { useEffect, useRef } from 'react';

interface AudioWaveformProps {
  isPlaying: boolean;
  audioUrl?: string;
}

const AudioWaveform: React.FC<AudioWaveformProps> = ({ isPlaying, audioUrl }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number | null>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const width = canvas.width;
    const height = canvas.height;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    if (!isPlaying) {
      // Draw a static waveform when not playing
      ctx.lineWidth = 2;
      ctx.strokeStyle = '#8B5CF6';
      
      ctx.beginPath();
      
      // Draw a static waveform shape
      const baseY = height / 2;
      const amplitude = height / 4;
      const segments = 40;
      const segmentWidth = width / segments;
      
      for (let i = 0; i <= segments; i++) {
        const x = i * segmentWidth;
        const y = baseY + Math.sin(i * 0.5) * amplitude * 0.3;
        
        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      
      ctx.stroke();
      return;
    }
    
    // Gradient for the waveform
    const gradient = ctx.createLinearGradient(0, 0, width, 0);
    gradient.addColorStop(0, '#8B5CF6');   // Purple
    gradient.addColorStop(0.5, '#EC4899'); // Pink
    gradient.addColorStop(1, '#8B5CF6');   // Purple

    let animationPhase = 0;
    
    // Animation function for playing state
    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      
      ctx.lineWidth = 2;
      ctx.strokeStyle = gradient;
      
      ctx.beginPath();
      
      const baseY = height / 2;
      const amplitude = height / 3;
      const segments = 80;
      const segmentWidth = width / segments;
      
      for (let i = 0; i <= segments; i++) {
        const x = i * segmentWidth;
        
        // Create a more complex wave pattern
        const y = baseY + 
                  Math.sin(i * 0.2 + animationPhase) * amplitude * 0.5 + 
                  Math.sin(i * 0.1 + animationPhase * 0.7) * amplitude * 0.3;
        
        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      
      ctx.stroke();
      
      animationPhase += 0.05;
      rafRef.current = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [isPlaying, audioUrl]);
  
  return (
    <div className="w-full overflow-hidden rounded-lg bg-white">
      <canvas 
        ref={canvasRef} 
        width={600} 
        height={100} 
        className="w-full h-auto"
      />
    </div>
  );
};

export default AudioWaveform;