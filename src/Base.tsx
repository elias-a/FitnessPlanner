import React from 'react';
import Navigation from './Navigation';
import { useAppDispatch } from './hooks';
import { getCategories } from './slices/category';
import { getExercises } from './slices/exercise';

const Base = () => {
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    // Load data
    dispatch(getCategories());
    dispatch(getExercises());
  }, [dispatch]);

  return <Navigation />;
};

export default Base;
