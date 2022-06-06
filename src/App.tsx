import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import Base from './Base';
import { LogBox } from 'react-native';

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
]);

const App = () => {
  return (
    <Provider store={store}>
      <Base />
    </Provider>
  );
};

export default App;
