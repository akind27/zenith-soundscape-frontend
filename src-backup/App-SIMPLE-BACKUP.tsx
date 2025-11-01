import React, { useState, useEffect, useCallback } from 'react';
import SoundControl from './components/SoundControl';
import { SOUNDS } from './constants';
import { Power } from './components/icons';

const App: React.FC = () => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [volumes, setVolumes] = useState<{ [key: string]: number }>({});

  // Generate dynamic background gradient based on active sounds (volume > 0)
  const getBackgroundGradient = useCallback(() => {
    const activeSounds = SOUNDS.filter(sound => (volumes[sound.id] || 0) > 0);
    
    if (activeSounds.length === 0) {
      return 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
    }

    const soundColors: { [key: string]: string[] } = {
      'rain': ['#4facfe', '#00f2fe'],
      'waves': ['#43e97b', '#38f9d7'],
      'birds': ['#fa709a', '#fee140'],
      'fire': ['#ff6b6b', '#ffa500'],
      'wind': ['#a8edea', '#fed6e3'],
      'crickets': ['#2e3192', '#1bffff'],
      'thunder': ['#4b79a1', '#283e51'],
      'stream': ['#56ccf2', '#2f80ed'],
      'meditation-bell': ['#f093fb', '#f5576c'],
      'tibetan-bowl': ['#ffecd2', '#fcb69f'],
      'wind-chimes': ['#e0c3fc', '#8ec5fc'],
      'forest-night': ['#0f2027', '#203a43'],
      'white-noise': ['#e6e9f0', '#eef1f5'],
      'brown-noise': ['#b79891', '#94716b'],
      'waterfall': ['#00d2ff', '#3a7bd5'],
      'cat-purr': ['#ff9a9e', '#fecfef'],
      'ocean-deep': ['#1e3c72', '#2a5298'],
      'coffee-shop': ['#c79081', '#dfa579'],
      'heartbeat': ['#ee0979', '#ff6a00'],
      'fan': ['#89f7fe', '#66a6ff'],
    };

    const colors = activeSounds.map(sound => soundColors[sound.id] || ['#667eea', '#764ba2']);
    
    if (colors.length === 1) {
      return `linear-gradient(135deg, ${colors[0][0]} 0%, ${colors[0][1]} 100%)`;
    } else if (colors.length === 2) {
      return `linear-gradient(135deg, ${colors[0][0]} 0%, ${colors[1][0]} 50%, ${colors[1][1]} 100%)`;
    } else {
      const firstColor = colors[0][0];
      const middleColor = colors[Math.floor(colors.length / 2)][0];
      const lastColor = colors[colors.length - 1][1];
      return `linear-gradient(135deg, ${firstColor} 0%, ${middleColor} 50%, ${lastColor} 100%)`;
    }
  }, [volumes]);

  const handleBegin = useCallback(() => {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    setAudioContext(ctx);
    setIsInitialized(true);
  }, []);

  const handleVolumeChange = useCallback((id: string, volume: number) => {
    setVolumes(prev => ({ ...prev, [id]: volume }));
  }, []);

  const handleStopAll = useCallback(() => {
    const newVolumes: { [key: string]: number } = {};
    SOUNDS.forEach(sound => {
      newVolumes[sound.id] = 0;
    });
    setVolumes(newVolumes);
  }, []);

  const handlePremiumClick = useCallback(() => {
    alert('Premium feature! Visit your account to upgrade.');
  }, []);

  useEffect(() => {
    const initialVolumes: { [key: string]: number } = {};
    SOUNDS.forEach(sound => {
      initialVolumes[sound.id] = 0;
    });
    setVolumes(initialVolumes);
  }, []);

  const freeSounds = SOUNDS.filter(s => !s.isPremium);
  const premiumSounds = SOUNDS.filter(s => s.isPremium);
  const hasActiveSounds = Object.values(volumes).some(v => v > 0);

  if (!isInitialized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-white mb-4">Zenith</h1>
          <p className="text-2xl text-white/90 mb-8">Ambient Soundscape Generator</p>
          <button
            onClick={handleBegin}
            className="px-8 py-4 bg-white text-purple-600 rounded-full font-semibold text-lg hover:bg-purple-50 transition-colors shadow-lg"
          >
            Begin Relaxation
          </button>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen transition-all duration-1000 ease-in-out p-8"
      style={{ background: getBackgroundGradient() }}
    >
      {/* Header */}
      <header className="mb-8 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Power className="w-8 h-8 text-white" />
          <h1 className="text-3xl font-bold text-white">Zenith</h1>
        </div>
        {hasActiveSounds && (
          <button
            onClick={handleStopAll}
            className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-full font-semibold transition-colors shadow-lg flex items-center gap-2"
          >
            <Power className="w-5 h-5" />
            Stop All
          </button>
        )}
      </header>

      {/* Main Content */}
      <main className="container mx-auto">
        {/* Free Sounds */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Free Sounds</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {freeSounds.map(sound => (
              <SoundControl
                key={sound.id}
                sound={sound}
                audioContext={audioContext!}
                volume={volumes[sound.id] || 0}
                onVolumeChange={(volume) => handleVolumeChange(sound.id, volume)}
                isPremium={false}
                onPremiumClick={handlePremiumClick}
              />
            ))}
          </div>
        </section>

        {/* Premium Sounds */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-6">Premium Sounds</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {premiumSounds.map(sound => (
              <SoundControl
                key={sound.id}
                sound={sound}
                audioContext={audioContext!}
                volume={volumes[sound.id] || 0}
                onVolumeChange={(volume) => handleVolumeChange(sound.id, volume)}
                isPremium={false}
                onPremiumClick={handlePremiumClick}
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default App;
