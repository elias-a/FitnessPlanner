import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import Base from './Base';

const App = () => {
  return (
    <Provider store={store}>
      <Base />
    </Provider>
  );
};

export default App;
