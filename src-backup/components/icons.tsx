import React from 'react';

export const Rain: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
    <path d="M8 19v2M12 17v2M16 19v2" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
  </svg>
);

export const Wave: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <path d="M2 12c.6-.6 1.2-1 2.2-1 2 0 2 2 4 2s2-2 4-2 2 2 4 2 2-2 4-2c1 0 1.6.4 2.2 1" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
    <path d="M2 17c.6-.6 1.2-1 2.2-1 2 0 2 2 4 2s2-2 4-2 2 2 4 2 2-2 4-2c1 0 1.6.4 2.2 1" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
  </svg>
);

export const Bird: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <path d="M16 7h.01M3.4 18H12a8 8 0 0 0 8-8V7a4 4 0 0 0-7.28-2.3L2 20" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
    <path d="M20 7v13a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" opacity="0.3"/>
  </svg>
);

export const Fire: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
  </svg>
);

export const Wind: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
  </svg>
);

export const Cricket: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <circle cx="12" cy="12" r="3" strokeWidth="2"/>
    <path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.64 5.64l2.12 2.12M16.24 16.24l2.12 2.12M5.64 18.36l2.12-2.12M16.24 7.76l2.12-2.12" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
  </svg>
);

export const Thunder: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <path d="M13 2L3 14h8l-1 8 10-12h-8l1-8z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
  </svg>
);

export const Stream: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <path d="M3 12c.6-.6 1.2-1 2.2-1 2 0 2 2 4 2s2-2 4-2 2 2 4 2 2-2 4-2c1 0 1.6.4 2.2 1M3 6c.6-.6 1.2-1 2.2-1 2 0 2 2 4 2s2-2 4-2 2 2 4 2 2-2 4-2c1 0 1.6.4 2.2 1M3 18c.6-.6 1.2-1 2.2-1 2 0 2 2 4 2s2-2 4-2 2 2 4 2 2-2 4-2c1 0 1.6.4 2.2 1" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
  </svg>
);

export const MeditationBell: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <path d="M6 19h12M12 3v3" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
    <path d="M6 19V9a6 6 0 0 1 12 0v10" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
  </svg>
);

export const TibetanBowl: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <path d="M3 13c0-3.9 3.1-7 7-7h4c3.9 0 7 3.1 7 7v1c0 3.9-3.1 7-7 7h-4c-3.9 0-7-3.1-7-7v-1z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
    <path d="M8 6V4M16 6V4" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
  </svg>
);

export const WindChimes: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <path d="M6 3v7M12 3v11M18 3v7M6 17v4M12 19v2M18 17v4" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
    <circle cx="6" cy="14" r="2" strokeWidth="2"/>
    <circle cx="12" cy="16" r="2" strokeWidth="2"/>
    <circle cx="18" cy="14" r="2" strokeWidth="2"/>
  </svg>
);

export const ForestNight: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <path d="M12 3L8 10h8l-4-7zM12 10L8 17h8l-4-7zM10 17h4v4h-4z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
    <path d="M21 11A2 2 0 0 0 19 9a2 2 0 0 0-4 0 2 2 0 1 0-2 2" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" opacity="0.5"/>
  </svg>
);

export const WhiteNoise: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <rect x="3" y="3" width="18" height="18" rx="2" strokeWidth="2"/>
    <path d="M3 8h18M3 12h18M3 16h18" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" opacity="0.3"/>
  </svg>
);

export const BrownNoise: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <rect x="3" y="3" width="18" height="18" rx="2" strokeWidth="2"/>
    <path d="M7 8v8M12 6v12M17 9v6" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
  </svg>
);

export const Waterfall: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <path d="M4 3h16v8H4z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
    <path d="M7 11v10M12 11v10M17 11v10M4 21h16" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
  </svg>
);

export const CatPurr: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <path d="M12 5c-6 0-9 4-9 9 0 1.5.5 3 1.5 4C5.5 19 7 20 9 20h6c2 0 3.5-1 4.5-2 1-1 1.5-2.5 1.5-4 0-5-3-9-9-9z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
    <path d="M9 10h.01M15 10h.01M9 15c.5.5 1.5 1 3 1s2.5-.5 3-1" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
    <path d="M8 3l2 2M16 3l-2 2" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
  </svg>
);

export const OceanDeep: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <circle cx="12" cy="12" r="10" strokeWidth="2"/>
    <path d="M2 12c.6-.6 1.2-1 2.2-1 2 0 2 2 4 2s2-2 4-2 2 2 4 2 2-2 4-2c1 0 1.6.4 2.2 1" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
    <path d="M2 8c.6-.6 1.2-1 2.2-1 2 0 2 2 4 2s2-2 4-2 2 2 4 2 2-2 4-2c1 0 1.6.4 2.2 1" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" opacity="0.5"/>
  </svg>
);

export const CoffeeShop: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <path d="M17 8h1a4 4 0 1 1 0 8h-1" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
    <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V8z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
    <path d="M6 1v3M10 1v3M14 1v3" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
  </svg>
);

export const Heartbeat: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
    <path d="M3 12h4l2-4 2 8 2-4h4" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
  </svg>
);

export const Fan: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <circle cx="12" cy="12" r="2" strokeWidth="2" fill="currentColor"/>
    <path d="M12 2v4M12 18v4M22 12h-4M6 12H2M19.07 4.93l-2.83 2.83M7.76 16.24l-2.83 2.83M19.07 19.07l-2.83-2.83M7.76 7.76L4.93 4.93" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
  </svg>
);

export const ZenGarden: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <rect x="3" y="3" width="18" height="18" rx="2" strokeWidth="2"/>
    <circle cx="9" cy="9" r="2" strokeWidth="2"/>
    <circle cx="15" cy="15" r="2" strokeWidth="2"/>
    <path d="M3 18c3-2 6-2 9 0s6 2 9 0" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
  </svg>
);

export const DistantThunder: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <path d="M13 2L3 14h8l-1 8 10-12h-8l1-8z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" opacity="0.3"/>
    <circle cx="12" cy="12" r="10" strokeWidth="2" opacity="0.2"/>
  </svg>
);

export const NightForest: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <path d="M12 3L8 10h8l-4-7zM12 10L8 17h8l-4-7zM10 17h4v4h-4z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
    <circle cx="18" cy="8" r="2" strokeWidth="2" fill="currentColor"/>
  </svg>
);

export const Power: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <path d="M12 2v10M18.36 5.64A9 9 0 1 1 5.64 5.64" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
  </svg>
);

export const Lock: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" strokeWidth="2"/>
    <path d="M7 11V7a5 5 0 0 1 10 0v4" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
  </svg>
);

export const User: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
    <circle cx="12" cy="7" r="4" strokeWidth="2"/>
  </svg>
);

export const Star: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" stroke="currentColor">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
  </svg>
);

export const LogOut: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
  </svg>
);
