export interface Sound {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  path: string;
  isPremium: boolean;
  color: [string, string]; // Gradient colors [start, end]
}
