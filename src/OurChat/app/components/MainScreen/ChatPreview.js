import {Body, Card, CardItem} from 'native-base';
import React from 'react';
import {Text, StyleSheet} from 'react-native';
import {Components} from '../styles';

// Chat preview component
const ChatPreview = ({group, navigation}) => {
  return (
    <>
      <Card style={styles.groupCard}>
        <CardItem
          style={styles.group}
          button
          onPress={() => {
            navigation.navigate('ChatScreen', {
              group,
            });
          }}>
          <Body style={styles.groupBody}>
            <Text style={styles.groupText}>{group.groupName}</Text>
          </Body>
        </CardItem>
      </Card>
    </>
  );
};

const styles = StyleSheet.create({
  group: {
    ...Components.group,
  },
  groupCard: {
    ...Components.groupCard,
  },
  groupBody: {
    ...Components.groupBody,
  },
  groupText: {
    ...Components.groupNames,
  },
});

export default ChatPreview;
