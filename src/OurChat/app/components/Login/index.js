import React, {useState, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {
  Title,
  Content,
  Button,
  Text,
  Container,
  Form,
  Item,
  Input,
} from 'native-base';
import Loading from '../Loading';
import {BASE_URL} from '../../env';
import {Colors, Components, Spacing} from '../styles';

var qs = require('qs');

const Login = ({loginState, setLogged, setUser, navigation}) => {
  const [userName, setUserName] = useState('');
  const [passWord, setPassWord] = useState('');

  const [loading, setLoading] = useState(false);

  // Auth user from database and send login
  // info to App.js
  const authUser = async () => {
    let response;

    // Try to authenticate user
    try {
      setLoading(true);
      response = await tryUserAuth();
    } catch (error) {
      setLoading(false);
      console.log('ERROR THROWN');
      console.log(error);
      return;
    }
    // If user is returned
    // console.log("Login response is \t")
    // console.log(response);

    setLoading(false);
    setUser(response);
    setLogged(true);
  };

  const tryUserAuth = async () => {
    // console.log("tryUserAuth\n")
    // sendAuth(); // manual axios hook / EMT TOIMIIKO sittenkään

    const response = await fetch(`${BASE_URL}/api/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: qs.stringify({
        userName: userName,
        passwd: passWord,
      }),
    })
      // Successful login
      .then((res) => {
        return res.json();
      })
      .catch((error) => {
        // console.log(error.message)
        throw 'Check login credentials.';
      });
    return response;
  };

  if (loading) {
    return (
      <>
        <Loading title={'Logging in...'} />
      </>
    );
  }
  return (
    <Container style={styles.container}>
      <Content>
        <Form style={styles.form}>
          <Title style={styles.title}>Log in</Title>
          <Item style={styles.input}>
            <Input
              placeholder="Username"
              textContentType="username"
              returnKeyType="next"
              onChangeText={(text) => setUserName(text)}
            />
          </Item>
          <Item style={styles.input}>
            <Input
              placeholder="Password"
              textContentType="password"
              secureTextEntry={true}
              returnKeyType="go"
              onSubmitEditing={() => {
                authUser();
              }}
              onChangeText={(text) => setPassWord(text)}
            />
          </Item>

          <Button block onPress={() => authUser()} style={styles.button}>
            <Text style={styles.text}>Log in</Text>
          </Button>
          <Text style={styles.text}>or</Text>
          <Button
            block
            onPress={() => navigation.navigate('Register')}
            style={styles.button}>
            <Text style={styles.text}>Register</Text>
          </Button>
        </Form>
      </Content>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    ...Components.container,
  },
  title: {
    ...Components.title,
  },
  button: {
    ...Components.button,
  },
  input: {
    ...Components.input,
  },
  form: {
    ...Components.form,
  },
  text: {
    ...Components.texts,
  },
});

export default Login;
