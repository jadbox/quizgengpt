import { atom } from 'nanostores';
import { activities } from './globals';
import type { ActivityLabel } from './globals';

export const isSelected = atom<ActivityLabel[]>([]);