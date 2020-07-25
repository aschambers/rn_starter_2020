import { getItem as localStorageGetItem, removeItem as localStorageRemoveItem } from '../services/localStorage';
import configureStore from '../redux/store';
export const store = configureStore();
import { logoutUser } from '../redux/modules/users';

export const logout = async props => {
  let currentUser = await localStorageGetItem('user');
  if (currentUser) {
    let params = {
      id: currentUser.id,
    };
    localStorageRemoveItem('user');
    props.navigation.navigate('Home');
    store.dispatch(logoutUser(params));
  }
};
