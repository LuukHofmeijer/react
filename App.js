// Import alle nodige onderdelen van react
import * as React from 'react';
import { useState } from 'react';
import {
  Image,
  Text,
  View,
  StyleSheet,
  Button,
  TextInput,
  SectionList,
  Component,
} from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Import eigen files binnen het project
import styles from './components/stylesheet';
import mainTheme from './components/mainTheme';
import QrReader from './qr/index';
import icon from './assets/plattegrond.png';

// SCREENS
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
          options={{ title: 'Voer de code in' }}
        />

        <Stack.Screen
          name="QR"
          component={QRScreen}
          options={{ title: 'Scan qr-code' }}
        />

        <Stack.Screen
          name="Plattegrond"
          component={PlattegrondScreen}
          options={{ title: 'Plattegrond' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

// HOMESCREEN
const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.view}>
      <Button
        title="Scan nieuw uur"
        color="orange"
        onPress={() => navigation.navigate('Code', { name: 'Jane' })}
      />
      <Button
        title="Plattegrond"
        color="black"
        onPress={() => navigation.navigate('Plattegrond', { name: 'Jan' })}
      />

      <SectionList
        sections={[
          { title: '01-01-2021', data: ['4', 'Dan', 'Dominic'] },
          {
            title: '03-01-2021',
            data: [
              'Jackson',
              'James',
              'Jillian',
              'Jimmy',
              'Joel',
              'John',
              'Julie',
            ],
          },
        ]}
        renderItem={({ item }) => <Text style={styles.item}>{item}</Text>}
        renderSectionHeader={({ section }) => (
          <Text style={styles.sectionHeader}>{section.title}</Text>
        )}
        keyExtractor={(item, index) => index}
      />
    </View>
  );
};

// CODESCREEN
const CodeScreen = ({ navigation, route }) => {
  const [text, setText] = useState('');
  return (
    <View>
      <TextInput
        placeholder="type"
        keyboardType={'numeric'}
        onChangeText={(text) => setText(text)}
        onSubmitEditing={() => registerCode(text)}
      />
      <Button
        title="Bevestig"
        color="orange"
        onPress={() => registerCode(text)}
      />
      <Button
        title="QR-code"
        color="orange"
        onPress={() => navigation.navigate('QR', { name: 'Jane' })}
      />
    </View>
  );
};

// PLATTEGRONDSCREEN
const PlattegrondScreen = ({ navigation, route }) => {
  return (
    <View style={styles.container}>
      <Image source={icon} style={{ width: 305, height: 159 }} />
    </View>
  );
};

// QRSCREEN
const QRScreen = ({ navigation, route }) => {
  return (
    <View>
      <Test />
    </View>
  );
};

class Test extends React.Component {
  state = {
    result: 'No result',
  };

  handleScan = (data) => {
    if (data) {
      this.setState({
        result: data,
      });
    }
  };
  handleError = (err) => {
    console.error(err);
  };
  render() {
    return (
      /*
      <div>
              <QrReader
          delay={300}
          onError={this.handleError}
          onScan={this.handleScan}
          style={{ width: '100%' }}
        />
</div>
*/
      null
    );
  }
}

const registerCode = (input) => {
  alert(parseInt(input));
  /*
		fetch('https://assinkat.000webhostapp.com/react/example.json', {
      method: "GET",
      //mode: 'no-cors'
    })
    .then(response => response.json()
  .then(data => console.log(data)))
    .catch((error)=>{
      alert(error);
      console.error(error);
    });
*/
//FETCH RETURNS HTML, INSTEAD OF JSON WHEN MAKING CONNECTION TO THE DATABASE, RESEARCH!

  fetch('https://assinkat.000webhostapp.com/react/registratie.php', {
    method: 'post',
    //mode: 'no-cors',
    header: {
      'Content-type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      code: input,
      timestamp: Date().toLocaleString(),
    }),
  })
    .then((response) => {
        console.log(response.ok);
        response.text(); 
    })
    .then(response => console.log(response))
    .catch((error) => {
      alert('3' + error);
      console.error(error);
    });
};

export default App;
//https://reactnative.dev/docs/getting-started/
