import React from 'react';
import { StyleSheet } from 'react-native';
import { Body, Text, Card, CardItem } from 'native-base';
import { Components } from '../styles';

const Message = (props) => {
  return (
    <Card style={styles.msg}>
      <CardItem header style={styles.msgTop}>
        <Text style={styles.msgSender}>{props.message.sender}</Text>
      </CardItem>
      <CardItem style={styles.msgBottom}>
        <Body style={styles.msgBody}>
          <Text style={styles.msgText}>{props.message.content}</Text>
        </Body>
      </CardItem>
    </Card>
  );
};

const styles = StyleSheet.create({
  msg: {
    ...Components.msg
  },
  msgTop: {
    ...Components.msgTop
  },
  msgBottom: {
    ...Components.msgBottom
  },
  msgBody: {
    ...Components.msgBody
  },
  msgText: {
    ...Components.msgText
  },
  msgSender: {
    ...Components.msgSender
  }
})

export default Message;
