import React, {useEffect, useState} from 'react';
import Login from './components/Login/';
import MainScreen from './components/MainScreen/';
import Register from './components/Register';
import ChatView from './components/ChatView';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {StyleSheet} from 'react-native';
import {Button, Grid, Icon, View} from 'native-base';
import {Components, Colors} from './components/styles';
import {BASE_URL} from './env';

const StackA = createStackNavigator();
const StackB = createStackNavigator();

const App = () => {
  // Login state and user
  const [isLogged, setLogged] = useState(false);
  const [userLogged, setUserLogged] = useState(null);
  // MainScreens dialog visibility must be here, otherwise React.useLayoutEffect breaks render
  const [dialogVisible, setDialogVisible] = useState(false);

  const [groups, setGroups] = useState(null);
  const [isLoadingGroups, setLoadingGroups] = useState(false);

  useEffect(() => {
    if (userLogged) {
      // console.log('User logged in @ App.js');
      setLoadingGroups(true);
      getGroups();
    }
    return () => {};
  }, [isLogged]);

  const logOut = () => {
    console.log('User logout');
    setUserLogged(null);
    setLogged(false);
  };

  // Start getting the groups
  const getGroups = async () => {
    // console.log('Getting groups...');
    try {
      setLoadingGroups(true);
      fetchGroups();
    } catch (error) {
      setLoadingGroups(false);
      console.log(error.message);
      console.log('Error while loading groups.');
    }
  };

  const fetchGroups = async () => {
    let userId = userLogged.user.id;
    let response = await fetch(`${BASE_URL}/api/users/get/${userId}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${userLogged.token}`,
        Accept: 'application/json',
      },
    })
      .then((res) => {
        return res.json();
      })
      .catch((e) => {
        console.log('ERROR');
        console.log(e);
        throw e;
      });
    // Simulate load time
    setTimeout(() => {
      setGroups(response.groups);
      setLoadingGroups(false);
    }, 1000);
  };

  if (!isLogged) {
    return (
      <NavigationContainer>
        <StackA.Navigator
          screenOptions={{
            headerStyle: {
              ...Components.header,
            },
            headerTintColor: Colors.font,
          }}>
          <StackA.Screen name="Login">
            {(props) => (
              <Login
                {...props}
                loginState={isLogged}
                setLogged={setLogged}
                setUser={setUserLogged}
              />
            )}
          </StackA.Screen>
          <StackA.Screen name="Register" options={{title: 'Register'}}>
            {(props) => <Register {...props} />}
          </StackA.Screen>
        </StackA.Navigator>
      </NavigationContainer>
    );
  } else {
    return (
      <NavigationContainer>
        <StackB.Navigator
          screenOptions={{
            headerStyle: {
              ...Components.header,
            },
            headerTintColor: Colors.font,
          }}>
          {/* Main screen */}
          <StackB.Screen
            name="OurChat"
            options={{
              headerLeft: () => {
                return (
                  <Button transparent onPress={() => logOut()}>
                    <Icon type="MaterialIcons" name="exit-to-app" style={styles.icon}></Icon>
                  </Button>
                );
              },
              headerRight: () => {
                return (
                  <>
                    <View style={styles.view}>
                      <Button
                        transparent
                        onPress={() => {
                          setDialogVisible(!dialogVisible);
                        }}>
                        <Icon type="MaterialIcons" name="group-add" style={styles.icon} />
                      </Button>
                      <Button
                        transparent
                        onPress={() => {
                          getGroups();
                        }}>
                        <Icon type="MaterialIcons" name="refresh" style={styles.icon}/>
                      </Button>
                    </View>
                  </>
                );
              },
            }}>
            {(props) => (
              <MainScreen
                {...props}
                userLogged={userLogged}
                logOut={logOut}
                dialogVisible={dialogVisible}
                setDialogVisible={setDialogVisible}
                loadG={isLoadingGroups}
                groups={groups}
              />
            )}
          </StackB.Screen>
          {/* Chat screen when ChatPreview is pressed */}
          <StackB.Screen
            name="ChatScreen"
            options={({route}) => ({
              title: route.params.group.groupName,
            })}>
            {(props) => <ChatView {...props} userObj={userLogged} />}
          </StackB.Screen>
        </StackB.Navigator>
      </NavigationContainer>
    );
  }
};

const styles = StyleSheet.create({
  view: {
    flexDirection: 'row',
  },
  icon: {
    ...Components.icons
  }
})

export default App;
