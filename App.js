// Import alle nodige onderdelen van react
import * as React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Import eigen files binnen het project
import styles from './components/stylesheet';
import mainTheme from "./components/mainTheme";

// Hierin staan alle schermen verzameld
const Stack = createStackNavigator();
const App = () => {
  return (
    <NavigationContainer theme={mainTheme}>
      <Stack.Navigator>

        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Het Assink AT-uren' }}
        />

        <Stack.Screen 
          name="Code" 
          component={CodeScreen} 
          options={{ title: 'Voer de code in'}}
        />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.view}>
    <Button
      title="Scan nieuw uur"
      color="orange"
      onPress={() =>
        navigation.navigate('Code', { name: 'Jane' })
      }
    />
    </View>
  );
};

const CodeScreen = ({ navigation, route }) => {
  return (
    <Text>Hier gaan we de code invoeren</Text>
  );
};

export default App;
//https://reactnative.dev/docs/