import {Container, Spinner} from 'native-base';
import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import {Colors, Components} from '../styles';

// Pass title as parameter
// e.g. title={"This is a title"}
const Loading = ({title}) => {
  return (
    <Container style={styles.container}>
      <View style={styles.view}>
      <Text style={styles.text}>{title}</Text>
      <Spinner color="white" />
      <Text style={styles.text}>If this takes a long time, check your internet connection.</Text>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
  },
  text: {
    ...Components.texts
  },
  view: {
    ...Components.view,
    marginTop: 90
  }
})

export default Loading;
