import type { Exercise } from '../types/exercise';
import { legsId, backId } from './category';
import uuid from 'react-native-uuid';

export const initialExercises: Exercise[] = [
  {
    id: uuid.v4().toString(),
    name: 'RDLs',
    categories: [legsId],
  },
  {
    id: uuid.v4().toString(),
    name: 'Back Squats',
    categories: [legsId],
  },
  {
    id: uuid.v4().toString(),
    name: 'Front Squats',
    categories: [legsId],
  },
  {
    id: uuid.v4().toString(),
    name: 'Lunges',
    categories: [legsId],
  },
  {
    id: uuid.v4().toString(),
    name: 'Calf Raises',
    categories: [legsId],
  },
  {
    id: uuid.v4().toString(),
    name: 'Lat Pulldowns',
    categories: [backId],
  },
  {
    id: uuid.v4().toString(),
    name: 'Cable Rows',
    categories: [backId],
  },
  {
    id: uuid.v4().toString(),
    name: 'Bent-Over Rows',
    categories: [backId],
  },
  {
    id: uuid.v4().toString(),
    name: 'Pull-Ups',
    categories: [backId],
  },
];
