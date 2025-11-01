import React, { useState, useRef, useCallback, useEffect } from 'react';
import SoundControl from './components/SoundControl';
import AuthModal from './components/AuthModal';
import SubscriptionModal from './components/SubscriptionModal';
import UserMenu from './components/UserMenu';
import { SOUNDS } from './constants';
import type { Sound } from './types';
import { useAuth } from './context/AuthContext';
import { Power } from './components/icons';

const App: React.FC = () => {
  const { user, isPremium } = useAuth();
  const [isInitialized, setIsInitialized] = useState(false);
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [volumes, setVolumes] = useState<Record<string, number>>(
    Object.fromEntries(SOUNDS.map(sound => [sound.id, 0]))
  );
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'yearly'>('monthly');

  const handleInit = useCallback(() => {
    const context = new (window.AudioContext || (window as any).webkitAudioContext)();
    setAudioContext(context);
    setIsInitialized(true);
  }, []);

  const handleVolumeChange = useCallback(async (soundId: string, volume: number) => {
    // Resume AudioContext on any interaction
    if (audioContext && audioContext.state === 'suspended') {
      try {
        await audioContext.resume();
      } catch (err) {
        console.error('Failed to resume AudioContext:', err);
      }
    }
    
    setVolumes(prev => ({ ...prev, [soundId]: volume }));
  }, [audioContext]);

  const handleStopAll = useCallback(() => {
    setVolumes(Object.fromEntries(SOUNDS.map(sound => [sound.id, 0])));
  }, []);

  const handlePremiumClick = useCallback((plan: 'monthly' | 'yearly') => {
    if (!user) {
      setShowAuthModal(true);
    } else {
      setSelectedPlan(plan);
      setShowSubscriptionModal(true);
    }
  }, [user]);

  // Calculate active sounds for gradient
  const activeSounds = SOUNDS.filter(sound => volumes[sound.id] > 0);
  const hasActiveSounds = activeSounds.length > 0;

  // Generate dynamic gradient based on active sounds
  const getBackgroundGradient = () => {
    if (!hasActiveSounds) {
      return 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
    }

    const colors = activeSounds.map(sound => sound.color);
    
    if (colors.length === 1) {
      return `linear-gradient(135deg, ${colors[0][0]} 0%, ${colors[0][1]} 100%)`;
    }

    // Blend multiple colors
    const gradientStops = colors.map((color, index) => {
      const position = (index / (colors.length - 1)) * 100;
      return `${color[0]} ${position}%`;
    }).join(', ');

    return `linear-gradient(135deg, ${gradientStops})`;
  };

  if (!isInitialized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 to-blue-600">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">🎵 Natural Sound Mixer</h1>
          <p className="text-white/80 mb-8">Mix natural sounds for focus and relaxation</p>
          <button
            onClick={handleInit}
            className="px-8 py-4 bg-white text-purple-600 rounded-full font-semibold text-lg hover:bg-purple-50 transition-colors shadow-lg"
          >
            Begin Relaxation 🎵
          </button>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen transition-all duration-1000 ease-in-out"
      style={{ background: getBackgroundGradient() }}
    >
      {/* Header */}
      <header className="bg-white/10 backdrop-blur-md border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-2xl">🎵</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Natural Sound Mixer</h1>
                <p className="text-sm text-white/80">Mix natural sounds for focus and relaxation</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {hasActiveSounds && (
                <button
                  onClick={handleStopAll}
                  className="flex items-center space-x-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors shadow-lg"
                  title="Stop All Sounds"
                >
                  <Power className="w-5 h-5" />
                  <span className="font-medium">Stop All</span>
                </button>
              )}
              
              {user ? (
                <UserMenu />
              ) : (
                <button
                  onClick={() => setShowAuthModal(true)}
                  className="px-6 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg font-medium transition-colors backdrop-blur-sm"
                >
                  Sign In
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Sound Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {SOUNDS.map(sound => (
            <SoundControl
              key={sound.id}
              sound={sound}
              audioContext={audioContext!}
              volume={volumes[sound.id]}
              onVolumeChange={handleVolumeChange}
              isPremium={isPremium}
              onPremiumClick={handlePremiumClick}
            />
          ))}
        </div>

        {/* Premium CTA */}
        {!isPremium && (
          <div className="mt-12 bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-white mb-4">
                🌟 Unlock All Premium Sounds
              </h2>
              <p className="text-xl text-white/90 mb-8">
                Get access to all 15 premium sounds and create your perfect ambient environment
              </p>
              
              <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
                {/* Monthly Plan */}
                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-white/30 transition-all">
                  <div className="text-white/70 text-sm font-medium mb-2">MONTHLY</div>
                  <div className="text-5xl font-bold text-white mb-2">$3</div>
                  <div className="text-white/70 mb-6">per month</div>
                  <button
                    onClick={() => handlePremiumClick('monthly')}
                    className="w-full py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-lg font-semibold transition-colors"
                  >
                    Get Premium
                  </button>
                </div>

                {/* Yearly Plan */}
                <div className="bg-gradient-to-br from-purple-500/20 to-blue-500/20 backdrop-blur-sm rounded-xl p-6 border-2 border-purple-400 relative">
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-4 py-1 rounded-full text-xs font-bold">
                      BEST VALUE
                    </span>
                  </div>
                  <div className="text-white/70 text-sm font-medium mb-2">YEARLY</div>
                  <div className="text-5xl font-bold text-white mb-2">$20</div>
                  <div className="text-white/70 mb-2">per year</div>
                  <div className="text-green-300 text-sm font-medium mb-4">Save 44%!</div>
                  <button
                    onClick={() => handlePremiumClick('yearly')}
                    className="w-full py-3 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white rounded-lg font-semibold transition-all shadow-lg"
                  >
                    Get Premium
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Modals */}
      {showAuthModal && (
        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
        />
      )}

      {showSubscriptionModal && (
        <SubscriptionModal
          isOpen={showSubscriptionModal}
          onClose={() => setShowSubscriptionModal(false)}
          plan={selectedPlan}
        />
      )}
    </div>
  );
};

export default App;
