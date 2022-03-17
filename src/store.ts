import { configureStore } from '@reduxjs/toolkit';
import categoryReducer from './slices/category';
import exerciseReducer from './slices/exercise';

export default configureStore({
  reducer: {
    category: categoryReducer,
    exercise: exerciseReducer,
  },
});
