import React from 'react';
import {
  View,
  Image,
  Text,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const Home = props => {
  const loginAction = () => {
    props.navigation.navigate('Login');
  };

  const signupAction = () => {
    props.navigation.navigate('Signup');
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/icon.png')}
        style={styles.logoStyle}
      />
      <Text style={styles.textStyle}>
        Login to this demo app!
      </Text>
      <TouchableOpacity onPress={() => loginAction()} title="Log In">
        <Text style={styles.loginText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => signupAction()} title="Sign Up">
        <Text style={styles.signupText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  logoStyle: {
    marginTop: SCREEN_HEIGHT * 0.2,
    height: SCREEN_WIDTH * 0.25,
    width: SCREEN_WIDTH * 0.25,
  },
  textStyle: {
    width: SCREEN_WIDTH * 0.6,
    textAlign: 'center',
    fontSize: 18,
    marginTop: 30,
    color: '#000',
  },
  loginText: {
    color: '#6F9ED4',
    fontWeight: 'bold',
    fontSize: 18,
    borderColor: 'black',
    borderWidth: 1,
    width: SCREEN_WIDTH * 0.3,
    height: 40,
    textAlign: 'center',
    borderRadius: 7,
    paddingTop: 8,
    marginTop: 40,
  },
  signupText: {
    color: '#6F9ED4',
    fontWeight: 'bold',
    fontSize: 18,
    borderColor: 'black',
    borderWidth: 1,
    width: SCREEN_WIDTH * 0.3,
    height: 40,
    textAlign: 'center',
    borderRadius: 7,
    paddingTop: 8,
    marginTop: 20,
  },
});

export default Home;