import * as React from 'react';
import { StyleSheet, Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  qrcamera: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  button: {
    padding: 50,
      backgroundColor: '#0bf',
      borderColor: 'red',
      borderWidth: 5,
      borderRadius: 15       
   },
  body: {
    flex: 1,
    padding: 20
  },
  item: {
    backgroundColor: '#ffc',
    padding: 15,
    margin: 3
  },
  image: {
    width: windowWidth,
    height: windowHeight,
    justifyContent: 'center'
  },
  sectionHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 5
  }
});

export default styles;