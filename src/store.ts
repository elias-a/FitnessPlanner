import { configureStore } from '@reduxjs/toolkit';
import categoryReducer from './slices/category';

export default configureStore({
  reducer: {
    category: categoryReducer,
  },
});
