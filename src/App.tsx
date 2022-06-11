import React from 'react';
import { QueryClientProvider, QueryClient } from 'react-query';
import Base from './Base';
import { LogBox } from 'react-native';

export const queryClient = new QueryClient();

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
]);

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Base />
    </QueryClientProvider>
  );
};

export default App;
