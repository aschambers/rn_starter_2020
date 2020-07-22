import React, { useState, useEffect } from 'react';
import {
  View,
  Dimensions,
  StyleSheet,
  TextInput
} from 'react-native';
import { Button } from 'react-native-elements';
import Loader from '../components/Loading';
import Toast from 'react-native-simple-toast';
import validateEmailHelper from '../utils/validateEmail';
import { connect } from 'react-redux';
import * as actions from '../redux';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const Signup = props => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    if (props.signupError) {
      Toast.showWithGravity(
        'Email or Username already in use',
        Toast.SHORT,
        Toast.CENTER,
      );
      props.resetValues();
    }
  }, [props]);

  useEffect(() => {
    if (props.signupSuccess) {
      setEmail('');
      setUsername('');
      setPassword('');
      setConfirmPassword('');

      Toast.showWithGravity(
        'You signed up successfully, and may now login!',
        Toast.SHORT,
        Toast.CENTER,
      );
      props.resetValues();
      props.navigation.navigate('Login');
    }
  }, [props]);

  const createUser = () => {
    if (password !== confirmPassword) {
      Toast.showWithGravity('Passwords must match', Toast.SHORT, Toast.CENTER);
    } else if (!email || !username || !password) {
      Toast.showWithGravity(
        'All fields are required to signup',
        Toast.SHORT,
        Toast.CENTER,
      );
    } else if (!validateEmailHelper.validateEmail(email)) {
      Toast.showWithGravity(
        'Email must be valid in order to sign up',
        Toast.SHORT,
        Toast.CENTER,
      );
    } else {
      const params = {
        email: email,
        username: username,
        password: password
      };
      props.createUser(params);
    }
  };

  if (props.isLoading) {
    return <Loader />;
  }

  return (
    <View style={styles.formContainer}>
      <TextInput
        underlineColorAndroid="black"
        placeholder="Email"
        placeholderTextColor="black"
        style={styles.formInput}
        value={email}
        autoCapitalize="none"
        onChangeText={email => setEmail(email)}
      />
      <TextInput
        underlineColorAndroid="black"
        placeholder="Username"
        placeholderTextColor="black"
        style={styles.formInput}
        value={username}
        autoCapitalize="none"
        onChangeText={username => setUsername(username)}
      />
      <TextInput
        underlineColorAndroid="black"
        placeholder="Password"
        placeholderTextColor="black"
        style={styles.formInput}
        value={password}
        autoCapitalize="none"
        secureTextEntry={true}
        onChangeText={password => setPassword(password)}
      />
      <TextInput
        underlineColorAndroid="black"
        placeholder="Confirm Password"
        placeholderTextColor="black"
        style={styles.formInput}
        value={confirmPassword}
        autoCapitalize="none"
        secureTextEntry={true}
        onChangeText={password => setConfirmPassword(password)}
      />
      <Button
        onPress={createUser}
        buttonStyle={styles.buttonStyle}
        title="Sign-Up"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  formInput: {
    marginTop: 5,
    fontSize: 18,
    width: SCREEN_WIDTH * 0.5,
    color: 'black',
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    marginTop: 15
  },
  buttonStyle: {
    marginTop: 15,
    backgroundColor: '#323232',
    width: SCREEN_WIDTH * 0.5,
    borderRadius: 2,
    marginBottom: 35,
  },
});

const mapStateToProps = state => {
  return {
    success: state.usersReducer.success,
    isLoading: state.usersReducer.isLoading,
    error: state.usersReducer.error,
  };
};

export default connect(mapStateToProps, actions)(Signup);