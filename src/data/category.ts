import type { Category } from '../types/category';
import uuid from 'react-native-uuid';

export const legsId = uuid.v4().toString();
export const backId = uuid.v4().toString();

export const initialCategories: Category[] = [
  {
    id: legsId,
    name: 'Legs',
  },
  {
    id: backId,
    name: 'Back',
  },
];
