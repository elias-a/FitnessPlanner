import type { Category } from './category';
import type { Exercise } from './exercise';
import type { Split } from './split';
import type { UseBaseMutationResult } from 'react-query';

export type Item = Category | Exercise | Split;

export interface FormProps<T> {
  item: T;
  update: <P>(name: string, value: P) => void;
}

export type AddMutation<T> = UseBaseMutationResult<
  T,
  unknown,
  {
    item: T;
    editing: boolean;
  },
  unknown
>;

export type DeleteMutation<T> = UseBaseMutationResult<
  T,
  unknown,
  {
    item: T;
  },
  unknown
>;
