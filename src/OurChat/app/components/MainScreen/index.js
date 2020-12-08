import React, {useEffect, useState} from 'react';
import {StyleSheet, ToastAndroid} from 'react-native';
import {Button, Text, View, Form, Item, Input, Right, Container} from 'native-base';
import Loading from '../Loading/';
import ChatPreview from './ChatPreview';
import {Dialog} from 'react-native-simple-dialogs';
import {BASE_URL} from '../../env';
import {Components} from '../styles';

// Render all conversation elements here
// Render menus
const MainScreen = ({
  userLogged,
  logOut,
  dialogVisible,
  setDialogVisible,
  loadG,
  groups,
  navigation,
}) => {
  const [groupName, setGroupName] = useState('');

  const addNewGroup = async () => {
    const URL = `${BASE_URL}/api/groups/`;

    await fetch(URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userLogged.token}`,
      },
      body: JSON.stringify({
        userId: userLogged.user.id,
        groupName: groupName,
      }),
    })
      .then((res) => {
        console.log(res);
        if (res.status === 201) {
          // ToastAndroid.show('New group added!', ToastAndroid.SHORT);
          setDialogVisible(!dialogVisible);
          setGroupName('');
          getGroups();
        } else if (res.status === 400) {
          throw 'Error when adding user to group';
        }
      })
      .catch((err) => {
        console.log(err);
        // ToastAndroid.show(err, ToastAndroid.SHORT);
      });
  };
  // Load groups once at first render
  useEffect(() => {}, []);

  if (groups == null || loadG) {
    return (
      <>
        <Loading title={'Loading groups...'} />
      </>
    );
  } else {
    // Map chats after load
    let chats = groups.map((group) => {
      return (
        <ChatPreview
          key={Math.random()}
          group={group}
          navigation={navigation}
        />
      );
    });

    return (
      <>
        <Container style={styles.container}>
          <Text style={styles.user}>
            User {userLogged.user.userName} logged in
          </Text>

          {chats}

          <Dialog
            visible={dialogVisible}
            title="New chat"
            onTouchOutside={() => {
              setDialogVisible(!dialogVisible);
            }}>
            <View>
              <Form>
                <Item style={styles.input}>
                  <Input
                    value={groupName}
                    placeholder="Group name"
                    onChangeText={(text) => {
                      setGroupName(text);
                    }}
                  />
                </Item>
              </Form>
              <View style={styles.dialogButtonsContainer}>
                <Button
                  small
                  style={styles.dialogButtons}
                  onPress={() => {
                    setDialogVisible(!dialogVisible);
                  }}>
                  <Text>Cancel</Text>
                </Button>
                <Right>
                  <Button
                    small
                    style={styles.dialogButtons}
                    onPress={() => {
                      addNewGroup();
                    }}>
                    <Text>Add</Text>
                  </Button>
                </Right>
              </View>
            </View>
          </Dialog>
        </Container>
      </>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    ...Components.container
  },
  dialogButtonsContainer: {
     ...Components.dialogBtnCont
  },
  dialogButtons: {
    ...Components.dialogBtn
  },
  user: {
    ...Components.userTexts
  },
  input: {
    ...Components.input
  },
});

export default MainScreen;
