// lib/utils/generate-sonic-profile.ts
import { ClassType, EnergyLevel, SonicProfile } from '@/lib/types/music-system';
import { 
  LATIN_POWERHOUSES, 
  LATIN_INDIE_VIBES, 
  LATIN_SOUL_ACOUSTIC, 
  RNB_SUPPORT 
} from '@/lib/constants/artists';

// Helper to shuffle and pick N items from an array
const pickRandom = (arr: string[], count: number) => {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

export const generateSonicProfile = (
  classType: ClassType, 
  energy: EnergyLevel
): SonicProfile => {
  let primaryPool: string[] = [];
  let supportPool: string[] = RNB_SUPPORT;
  let bpmRange = { min: 100, max: 120 };
  let targetEnergyVal = 0.6;

  // 1. Determine Pools and Attributes based on Class Type & Energy
  switch (classType) {
    case 'hiit':
    case 'dance':
      primaryPool = LATIN_POWERHOUSES;
      bpmRange = energy === 'high' ? { min: 128, max: 150 } : { min: 115, max: 130 };
      targetEnergyVal = energy === 'high' ? 0.9 : 0.75;
      break;

    case 'strength':
      // Strength usually needs steady beats, slightly heavier reggaeton
      primaryPool = [...LATIN_POWERHOUSES, ...LATIN_INDIE_VIBES];
      bpmRange = { min: 105, max: 125 };
      targetEnergyVal = 0.8;
      break;

    case 'yoga':
    case 'recovery':
      primaryPool = LATIN_SOUL_ACOUSTIC;
      bpmRange = { min: 60, max: 90 };
      targetEnergyVal = 0.3;
      break;
      
    default:
      primaryPool = LATIN_POWERHOUSES;
  }

  // 2. Adjust for Energy Level Inputs (Fine tuning)
  if (energy === 'low' && classType !== 'yoga') {
    // If it's a "Low Energy Strength" class, mix in some Indie Vibes
    primaryPool = [...LATIN_INDIE_VIBES];
    targetEnergyVal -= 0.1;
  }

  // 3. Select Seeds (4-6 Latin, 1-2 R&B)
  const selectedLatin = pickRandom(primaryPool, 5); // Aiming for 5
  const selectedRnB = pickRandom(supportPool, 2);   // Aiming for 2

  return {
    seedArtists: [...selectedLatin, ...selectedRnB],
    targetTempo: bpmRange,
    targetEnergy: targetEnergyVal,
  };
};