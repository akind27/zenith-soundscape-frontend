import type React from 'react';

export interface Sound {
  id: string;
  name: string;
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
  src: string;
  isPremium: boolean;
}

export interface User {
  id: string;
  email: string;
  isPremium: boolean;
  subscriptionId?: string;
  subscriptionEndDate?: string;
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}
