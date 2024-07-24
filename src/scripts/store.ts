import { atom } from 'nanostores';
import type { ActivityLabel } from './globals';

export const selectedActivities = atom<ActivityLabel[]>([]);