import React, { useState, useEffect } from 'react';
import {
  View,
  TextInput,
  Dimensions,
  StyleSheet,
  Platform,
  Keyboard,
} from 'react-native';
import { Button } from 'react-native-elements';
import Toast from 'react-native-simple-toast';
import Loader from '../components/Loading';
import { connect } from 'react-redux';
import * as actions from '../redux';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const Login = props => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (props.error) {
      Toast.showWithGravity(
        'Email or password is incorrect, please try again',
        Toast.SHORT,
        Toast.CENTER,
      );
      props.resetValues();
    }
  }, [props]);

  useEffect(() => {
    if (props.success) {
      Keyboard.dismiss();
      props.navigation.navigate('Dashboard');
      props.resetValues();
    }
  }, [props]);

  const loginUser = () => {
    if (!email || !password) {
      return Toast.show(
        'Email and password are required',
        Toast.SHORT,
        Toast.CENTER,
      );
    }

    let params = {
      email: email,
      password: password,
      os: Platform.OS,
    };

    props.loginUser(params);
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
        placeholder="Password"
        placeholderTextColor="black"
        style={styles.formInput}
        value={password}
        secureTextEntry={true}
        onChangeText={password => setPassword(password)}
      />
      <Button
        onPress={loginUser}
        buttonStyle={styles.buttonStyle}
        title="Login"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
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
    marginTop: 12,
    backgroundColor: '#323232',
    width: SCREEN_WIDTH * 0.5,
    borderRadius: 2,
  },
});

const mapStateToProps = state => {
  return {
    success: state.usersReducer.success,
    isLoading: state.usersReducer.isLoading,
    error: state.usersReducer.error,
  };
};

export default connect(mapStateToProps, actions)(Login);