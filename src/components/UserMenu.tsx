import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const UserMenu: React.FC = () => {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!user) return null;

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg font-medium transition-colors backdrop-blur-sm"
      >
        <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-blue-500 rounded-full flex items-center justify-center">
          <span className="text-sm font-bold">
            {user.email.charAt(0).toUpperCase()}
          </span>
        </div>
        <span className="hidden sm:inline">{user.email.split('@')[0]}</span>
        {user.is_premium && (
          <span className="text-xs bg-yellow-400 text-yellow-900 px-2 py-0.5 rounded-full font-bold">
            ★ PRO
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden z-50">
          <div className="p-4 bg-gradient-to-br from-purple-50 to-blue-50 border-b border-gray-100">
            <div className="font-semibold text-gray-800">{user.email}</div>
            <div className="text-sm mt-1">
              {user.is_premium ? (
                <span className="text-purple-600 font-medium">★ Premium Member</span>
              ) : (
                <span className="text-gray-600">Free Account</span>
              )}
            </div>
          </div>

          <div className="p-2">
            <button
              onClick={() => {
                logout();
                setIsOpen(false);
              }}
              className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
