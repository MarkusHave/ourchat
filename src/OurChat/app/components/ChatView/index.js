import React, {useState, useEffect, useRef} from 'react';
import {StyleSheet, ScrollView, ToastAndroid, Keyboard} from 'react-native';
import {
  Button,
  Body,
  Icon,
  Text,
  Container,
  Item,
  Input,
  Right,
  Footer,
  Form,
  View,
} from 'native-base';
import {Dialog} from 'react-native-simple-dialogs';
import Message from './Message';
import {io} from 'socket.io-client';
import {BASE_URL} from '../../env';
import {Components} from '../styles';

// Init global socket var
const socket = io(BASE_URL);

const ChatView = ({userObj, route, navigation}) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [dialogVisible, setDialogVisible] = useState(false);
  const [newGroupUser, setNewGroupUser] = useState('');

  // Chat vars
  const rp = route.params;
  const groupId = rp.group.id;
  const groupName = rp.group.groupName;
  const userId = userObj.user.id;
  const sender = userObj.user.userName;
  const JWT_TOKEN = `Bearer ${userObj.token}`;

  // This runs once component mounts
  useEffect(() => {
    // Test if socket is connected and connect
    if (!socket.connected) {
      socket.connect(BASE_URL);
      console.log('Socket join');
    }

    // Emit when when component mounts
    socket.emit('joinChat', {
      room: `${groupName}${groupId}`,
    });

    // Get group messages when component mounts
    getMessages();

    return () => {
      console.log('socket disconnected');
      socket.disconnect();
    };
  }, []);

  // Listen for new messages
  socket.on('newMsg', (data) => {
    // console.log(data);
    setMessages([...messages, data]);
  });

  const getMessages = async () => {
    let URL = `${BASE_URL}/api/groups/get/${groupId}`;

    await fetch(URL, {
      method: 'GET',
      headers: {
        Authorization: JWT_TOKEN,
      },
    })
      .then(async (res) => {
        let data = await res.json();
        setMessages(data.messages);
      })
      .catch((err) => {
        ToastAndroid.show(
          `Error when fetching messages. ${err}`,
          ToastAndroid.SHORT,
        );
        console.log(err);
      });
  };

  const sendMessage = async () => {
    // Create local message
    let localMsg = {
      // Generate random id
      id: Date.now(),
      sender: sender,
      content: message,
    };

    // Emit new message to backend
    socket.emit('chat', {
      groupId: groupId,
      userId: userId,
      message: message,
    });

    // Update state
    setMessages([...messages, localMsg]);
  };

  const addUserToGroup = async () => {
    let URL = `${BASE_URL}/api/groups/addUser`;
    let username = newGroupUser;

    await fetch(URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: JWT_TOKEN,
      },
      body: JSON.stringify({
        userName: username,
        groupId: groupId,
      }),
    })
      .then((res) => {
        console.log(res);
        if (res.status === 201) {
          ToastAndroid.show('User added to group!', ToastAndroid.SHORT);
          setNewGroupUser('');
        } else if (res.status === 400) {
          throw 'Error when adding user to group';
        }
      })
      .catch((err) => {
        console.log(err);
        ToastAndroid.show(err, ToastAndroid.SHORT);
      });
  };

  // Send message button handler
  const handleSend = () => {
    sendMessage();
    Keyboard.dismiss();
    setMessage('');
    scrollViewRef.current.scrollToEnd();
  };

  // Refs
  let scrollViewRef = useRef();

  // Add a button to the header
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <Button
            transparent
            onPress={() => {
              setDialogVisible(!dialogVisible);
            }}>
            <Icon type="MaterialIcons" name="person-add" style={styles.icon} />
          </Button>
        );
      },
    });
  });

  return (
    <Container style={styles.container}>
      <Dialog
        visible={dialogVisible}
        title="Add user to group"
        onTouchOutside={() => {
          setDialogVisible(!dialogVisible);
        }}>
        <View>
          <Form>
            <Item style={styles.input}>
              <Input
                value={newGroupUser}
                placeholder="Username"
                onChangeText={(text) => {
                  setNewGroupUser(text);
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
                  addUserToGroup();
                }}>
                <Text>Add</Text>
              </Button>
            </Right>
          </View>
        </View>
      </Dialog>

      <ScrollView
        ref={scrollViewRef}
        onContentSizeChange={() => {
          scrollViewRef.current.scrollToEnd();
        }}>
        {messages.map((msg) => {
          return <Message style={styles.scroll} key={msg.id} message={msg} />;
        })}
      </ScrollView>

      <Footer style={styles.msgFooter}>
        <Body>
          <Item style={styles.msgInput}>
            <Input
              value={message}
              placeholder="Message..."
              onChangeText={(text) => {
                setMessage(text);
              }}
            />
          </Item>

          <Button transparent>
            <Icon
              type="MaterialIcons"
              name="send"
              style={styles.icon}
              onPress={() => {
                handleSend();
              }}
            />
          </Button>
        </Body>
      </Footer>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    ...Components.container,
  },
  msgFooter: {
    ...Components.msgFooter,
  },
  msgInput: {
    ...Components.msgInput,
  },
  icon: {
    ...Components.icons,
  },
  dialogButtonsContainer: {
    ...Components.dialogBtnCont,
  },
  dialogButtons: {
    ...Components.dialogBtn,
  },
  input: {
    ...Components.input,
  },
  scroll: {
    ...Components.scroll,
  },
});

export default ChatView;
