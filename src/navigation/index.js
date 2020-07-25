import React from 'react';
import { Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { NavigationContainer, DrawerActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import { Home, Dashboard as DashboardScreen, Profile as ProfileScreen } from '../screens';
import { Signup, Login } from '../components';
import { getHeaderTitle } from '../utils/getHeaderTitle';
import { logout } from '../utils/logout';

const SCREEN_HEIGHT = Dimensions.get('window').height;

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const CustomDrawerContent = (props) => {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Logout"
        labelStyle={styles.label}
        style={styles.logout}
        icon={() => <Image source={require('../assets/images/logout.png')} style={styles.icon} />}
        onPress={() => { logout(props); }}
      />
      <DrawerItem
        label="Version 1.0.0"
        labelStyle={styles.label}
        style={styles.version}
      />
    </DrawerContentScrollView>
  );
}

DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen
        name="DashboardScreen"
        component={DashboardScreen}
        options={{
          title: 'Dashboard',
          drawerLabel: 'Dashboard',
          drawerIcon: () => <Image source={require('../assets/images/home.png')} style={styles.icon} />
        }}
      />
      <Drawer.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          title: 'Profile',
          drawerLabel: 'Profile',
          drawerIcon: () =>  <Image source={require('../assets/images/user.png')} style={styles.icon} />
        }}
      />
    </Drawer.Navigator>
  );
}

MainNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen
        name="Dashboard"
        component={DrawerNavigator}
        options={({ navigation, route }) => ({
          headerTitle: getHeaderTitle(route),
          headerLeft: () => (
            <TouchableOpacity
              style={styles.menuWrapper}
              onPress={() => { navigation.dispatch(DrawerActions.toggleDrawer()); }}
            >
              <Image source={require('../assets/images/menu.png')} style={styles.icon} />
            </TouchableOpacity>
          )
        })}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  menuWrapper: {
    marginLeft: 10
  },
  icon: {
    width: 30,
    height: 30
  },
  label: {
    fontSize: 16,
  },
  logout: {
    position: 'absolute',
    top: 0,
    marginTop: SCREEN_HEIGHT * 0.78,
  },
  version: {
    position: 'absolute',
    top: 0,
    marginTop: SCREEN_HEIGHT * 0.81,
  }
});

export default createAppContainer = () => {
  return (
    <NavigationContainer>
      <MainNavigator />
    </NavigationContainer>
  );
}
