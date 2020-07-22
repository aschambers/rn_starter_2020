import React from 'react';
// redux setup
import configureStore from './redux/store';
export const store = configureStore();
import { Provider } from 'react-redux';
// navigation setup
import MainNavigator from './navigation';

const Main = () => {
  return (
    <Provider store={store}>
      <MainNavigator />
    </Provider>
  );
};

export default Main;