import { configureStore } from '@reduxjs/toolkit';
import categoryReducer from './slices/category';
import exerciseReducer from './slices/exercise';
import splitReducer from './slices/split';

export const store = configureStore({
  reducer: {
    category: categoryReducer,
    exercise: exerciseReducer,
    split: splitReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
