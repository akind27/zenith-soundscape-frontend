import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { User, LogOut, Star } from './icons';

const UserMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();

  if (!user) return null;

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-full backdrop-blur-sm transition-colors"
      >
        <User className="w-5 h-5" />
        <span className="font-medium">{user.email}</span>
        {user.isPremium && (
          <Star className="w-4 h-4 text-yellow-400" />
        )}
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown Menu */}
          <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl overflow-hidden z-20">
            <div className="p-4 bg-gradient-to-r from-purple-500 to-pink-500">
              <p className="text-white font-semibold truncate">{user.email}</p>
              <p className="text-white/80 text-sm mt-1">
                {user.isPremium ? (
                  <span className="flex items-center gap-1">
                    <Star className="w-4 h-4" />
                    Premium Member
                  </span>
                ) : (
                  'Free Account'
                )}
              </p>
            </div>

            <div className="p-2">
              <button
                onClick={() => {
                  logout();
                  setIsOpen(false);
                }}
                className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <LogOut className="w-5 h-5" />
                <span className="font-medium">Logout</span>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default UserMenu;
