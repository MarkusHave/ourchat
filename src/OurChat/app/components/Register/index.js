import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {
  Container,
  Content,
  Form,
  Item,
  Input,
  Button,
  Title,
  Toast,
  Root,
  Text,
  View,
} from 'native-base';

import {BASE_URL} from '../../env';
import {Colors, Components} from '../styles';

var qs = require('qs');

const Register = ({navigation}) => {
  const [userName, setUsername] = useState(null);
  // Password vars
  const [passWord, setPassword] = useState(null);
  const [passWordConfirm, setPasswordConfirm] = useState(null);
  // Email vars
  const [email, setEmail] = useState(null);
  const [emailConfirm, setEmailConfirm] = useState(null);
  // Toast as const
  const toast = Toast;

  useEffect(() => {
    // console.log('Mount');
    return () => {
      // Hide toast if showing when unmounting
      toast.hide();
      // console.log('Unmount');
    };
  }, []);

  const showToast = (message) => {
    toast.hide();
    toast.show({
      text: message,
      buttonText: 'OK',
      duration: 2000,
    });
  };

  // compares passwords
  const comparePassword = () => {
    if (passWord != passWordConfirm) {
      // showToast('Passwords dont match.');
      throw {message: 'Passwords dont match!'};
    }
    return;
  };

  // Checks if email-input is correct
  const validate = (text) => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(text) === false) {
      showToast('Enter valid email!');
    }
    setEmail(text);
    // console.log(email);
  };

  const compareEmail = () => {
    if (email != emailConfirm) {
      // showToast("Email address doesn't match.");
      throw {message: 'Email addresses dont match!'};
    }
  };

  const regUser = async () => {
    try {
      comparePassword();
      compareEmail();
      // if (!canRegister) {
      //   // Check if user can register
      //   // console.log('Cant register');
      //   throw {message: 'Check credentials!'};
      // }
      let response = await fetch(`${BASE_URL}/api/users/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: qs.stringify({
          userName,
          email,
          passwd: passWord,
        }),
      })
        // Successful post
        .then((res) => {
          // This returns even though username/email is taken
          return res.json();
        })
        // If something goes wrong with the request
        .catch((error) => {
          // console.log(error);
          throw 'Something went wrong.';
        });
      // If response has errors (taken email/username)
      if (response.errors) {
        throw response;
      }
      console.log('Expected success');
      // Redirect to login screen
      showToast('Registration successful! You can now log in.');
      setTimeout(() => {
        navigation.navigate('Login');
      }, 2500);
    } catch (e) {
      console.log(e.message);
      showToast(e.message);
    }
  };

  return (
    <Root>
      <>
        <Container style={styles.container}>
          <Content>
            <Form style={styles.form}>
              <View style={styles.view}>
                <Item style={styles.input}>
                  <Input
                    placeholder="Username"
                    textContentType="username"
                    returnKeyType="next"
                    onChangeText={(text) => setUsername(text)}
                  />
                </Item>
                <Item style={styles.input}>
                  <Input
                    placeholder="Password"
                    textContentType="password"
                    secureTextEntry={true}
                    returnKeyType="next"
                    onChangeText={(text) => setPassword(text)}
                  />
                </Item>
                <Item style={styles.input}>
                  <Input
                    placeholder="Confirm password"
                    textContentType="password"
                    secureTextEntry={true}
                    returnKeyType="next"
                    onChangeText={(text) => setPasswordConfirm(text)}
                    // onEndEditing={(e) => comparePassword(e.nativeEvent.text)}
                  />
                </Item>
                <Item style={styles.input}>
                  <Input
                    placeholder="Email"
                    textContentType="emailAddress"
                    returnKeyType="go"
                    onEndEditing={(e) => validate(e.nativeEvent.text)}
                  />
                </Item>
                <Item style={styles.input}>
                  <Input
                    placeholder="Confirm email"
                    textContentType="emailAddress"
                    returnKeyType="go"
                    onChangeText={(text) => setEmailConfirm(text)}
                    // onEndEditing={(e) => compareEmail(e.nativeEvent.text)}
                  />
                </Item>
              </View>
              <Button
                block
                style={styles.button}
                onPress={() => {
                  // showToast('Test');
                  regUser();
                }}>
                <Text>Register</Text>
              </Button>
            </Form>
          </Content>
        </Container>
      </>
    </Root>
  );
};

const styles = StyleSheet.create({
  container: {
    ...Components.container,
  },
  form: {
    ...Components.form,
  },
  input: {
    ...Components.input,
  },
  button: {
    ...Components.button,
  },
  view: {
    ...Components.view,
  },
});

export default Register;
