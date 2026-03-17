import type { PurdueLevel } from '../types/diagram';

export interface PurdueLevelDef {
  level: PurdueLevel;
  label: string;
  description: string;
  color: string;
  yStart: number;
  height: number;
}

export const PURDUE_LEVELS: PurdueLevelDef[] = [
  { level: 5,   label: 'Level 5',   description: 'Internet / Cloud',    color: 'rgba(156,39,176,0.08)',  yStart: -200, height: 200 },
  { level: 4,   label: 'Level 4',   description: 'Enterprise IT',       color: 'rgba(33,150,243,0.08)',  yStart: 0,    height: 200 },
  { level: 3.5, label: 'Level 3.5', description: 'DMZ',                 color: 'rgba(255,152,0,0.12)',   yStart: 200,  height: 150 },
  { level: 3,   label: 'Level 3',   description: 'Site Operations',     color: 'rgba(76,175,80,0.08)',   yStart: 350,  height: 200 },
  { level: 2,   label: 'Level 2',   description: 'Area Supervisory',    color: 'rgba(0,150,136,0.08)',   yStart: 550,  height: 200 },
  { level: 1,   label: 'Level 1',   description: 'Basic Control',       color: 'rgba(63,81,181,0.08)',   yStart: 750,  height: 200 },
  { level: 0,   label: 'Level 0',   description: 'Physical Process',    color: 'rgba(121,85,72,0.08)',   yStart: 950,  height: 200 },
];

export const ZONE_WIDTH = 2000;
