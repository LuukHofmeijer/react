import * as React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import Constants from 'expo-constants';

// You can import from local files
import AssetExample from './components/AssetExample';

// or any pure javascript modules available in npm
import { Card } from 'react-native-paper';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// hierin komen de verschillende stack.screen te staan
const Stack = createStackNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Het Assink AT-uren' }}
        />
        <Stack.Screen name="Profile" component={ProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const OldApp  = () => {
  return (
    <NavigationContainer>
    <View style={styles.container}>
      <Text style={styles.paragraph}>
        Lorem
      </Text>
      <Card>
        <AssetExample />
      </Card>
      <Button
      title="Go to Jane's profile"
      onPress={() =>
        navigation.navigate('Profile', { name: 'Jane' })
      }
    />
    </View>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  button: {
    padding: 10,
    color: "#ff0000"
  }
});

const HomeScreen = ({ navigation }) => {
  return (
    <Button
      title="Go to Jane's profile"
      style={styles.button}
      onPress={() =>
        navigation.navigate('Profile', { name: 'Jane' })
      }
    />
  );
};
const ProfileScreen = ({ navigation, route }) => {
  return <Text>This is {route.params.name}'s profile</Text>;
};





export default App;