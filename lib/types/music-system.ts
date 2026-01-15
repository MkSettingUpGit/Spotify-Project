export type EnergyLevel = 'low' | 'medium' | 'high';

export type ClassType = 'yoga' | 'strength' | 'hiit' | 'dance' | 'recovery';

// The configuration object that your app will generate
export interface SonicProfile {
  seedArtists: string[]; // List of Artist IDs or Names
  targetTempo: {
    min: number;
    max: number;
  };
  targetEnergy: number; // 0.0 to 1.0 (Spotify standard)
  valence?: number; // Optional: 0.0 (sad) to 1.0 (happy)
}