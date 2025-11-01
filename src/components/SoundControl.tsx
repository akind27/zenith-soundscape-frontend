import React, { useEffect, useRef, useState } from 'react';
import type { Sound } from '../types';
import { Lock } from './icons';

interface SoundControlProps {
  sound: Sound;
  audioContext: AudioContext;
  volume: number;
  onVolumeChange: (soundId: string, volume: number) => void;
  isPremium: boolean;
  onPremiumClick: (plan: 'monthly' | 'yearly') => void;
}

const SoundControl: React.FC<SoundControlProps> = ({
  sound,
  audioContext,
  volume,
  onVolumeChange,
  isPremium,
  onPremiumClick,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const audioBufferRef = useRef<AudioBuffer | null>(null);
  const sourceRef = useRef<AudioBufferSourceNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  const Icon = sound.icon;
  const isLocked = sound.isPremium && !isPremium;

  // Load audio when component mounts
  useEffect(() => {
    console.log(`🔄 Loading ${sound.name}...`);
    
    if (!audioContext || isLocked) {
      setIsLoading(false);
      return;
    }

    const loadAudio = async () => {
      try {
        setIsLoading(true);
        setError(null);

        if (audioContext.state === 'suspended') {
          await audioContext.resume();
        }

        const response = await fetch(sound.path);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        
        const arrayBuffer = await response.arrayBuffer();
        const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
        
        audioBufferRef.current = audioBuffer;
        setIsLoading(false);
        console.log(`✅ ${sound.name} loaded!`);
      } catch (err) {
        console.error(`❌ ${sound.name} load failed:`, err);
        setError('Failed to load');
        setIsLoading(false);
      }
    };

    loadAudio();
  }, [audioContext, sound.path, sound.name, isLocked]);

  // Play/stop based on volume
  useEffect(() => {
    if (!audioBufferRef.current || isLocked || !audioContext) return;

    const playSound = async () => {
      if (audioContext.state === 'suspended') {
        await audioContext.resume();
      }

      if (volume > 0) {
        if (!sourceRef.current) {
          // START NEW SOURCE
          console.log(`▶️ STARTING ${sound.name} at ${Math.round(volume * 100)}%`);
          
          const source = audioContext.createBufferSource();
          const gainNode = audioContext.createGain();

          source.buffer = audioBufferRef.current;
          source.loop = true;
          gainNode.gain.value = volume;

          source.connect(gainNode);
          gainNode.connect(audioContext.destination);

          source.start(0);

          sourceRef.current = source;
          gainNodeRef.current = gainNode;
          
          console.log(`✅ ${sound.name} PLAYING`);
        } else {
          // UPDATE VOLUME
          if (gainNodeRef.current) {
            gainNodeRef.current.gain.value = volume;
            console.log(`🔊 ${sound.name} volume: ${Math.round(volume * 100)}%`);
          }
        }
      } else {
        // STOP
        if (sourceRef.current) {
          console.log(`⏹️ STOPPING ${sound.name}`);
          try {
            sourceRef.current.stop();
            sourceRef.current.disconnect();
          } catch (e) {}
          
          // CRITICAL FIX: Clear the refs!
          sourceRef.current = null;
          gainNodeRef.current = null;
          console.log(`✅ ${sound.name} stopped and refs cleared`);
        }
      }
    };

    playSound();

    // Cleanup
    return () => {
      if (sourceRef.current) {
        try {
          sourceRef.current.stop();
          sourceRef.current.disconnect();
        } catch (e) {}
        // CRITICAL FIX: Clear refs in cleanup too!
        sourceRef.current = null;
        gainNodeRef.current = null;
      }
    };
  }, [volume, audioContext, isLocked, sound.name]);

  const handleClick = () => {
    if (isLocked) {
      onPremiumClick('monthly');
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isLocked) {
      onVolumeChange(sound.id, parseFloat(e.target.value));
    }
  };

  return (
    <div
      className={`bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 transition-all ${
        isLocked ? 'cursor-pointer hover:bg-white/15' : ''
      } ${volume > 0 ? 'ring-2 ring-white/40' : ''}`}
      onClick={isLocked ? handleClick : undefined}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div
            className="w-12 h-12 rounded-lg flex items-center justify-center"
            style={{
              background: `linear-gradient(135deg, ${sound.color[0]}, ${sound.color[1]})`,
            }}
          >
            <Icon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-white">{sound.name}</h3>
            {sound.isPremium && (
              <span className="text-xs text-yellow-300 font-medium">⭐ PREMIUM</span>
            )}
          </div>
        </div>

        {isLocked && (
          <div className="bg-purple-500 rounded-lg p-2">
            <Lock className="w-5 h-5 text-white" />
          </div>
        )}
      </div>

      {isLoading ? (
        <div className="text-white/60 text-sm">Loading...</div>
      ) : error ? (
        <div className="text-red-300 text-sm">{error}</div>
      ) : isLocked ? (
        <div className="text-white/80 text-sm">
          🔒 Unlock with Premium
        </div>
      ) : (
        <div className="space-y-2">
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
            className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
            style={{
              background: volume > 0
                ? `linear-gradient(to right, ${sound.color[0]} 0%, ${sound.color[1]} ${volume * 100}%, rgba(255,255,255,0.2) ${volume * 100}%, rgba(255,255,255,0.2) 100%)`
                : 'rgba(255,255,255,0.2)',
            }}
          />
          <div className="flex justify-between text-xs text-white/60">
            <span>Volume</span>
            <span>{Math.round(volume * 100)}%</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default SoundControl;
