// Import alle nodige onderdelen van react en expo
import * as React from 'react';
import { useState, useEffect } from 'react';
import {
  Image,
  Text,
  View,
  StyleSheet,
  Button,
  TextInput,
  SectionList,
  Component,
  RefreshControl,
  Dimensions,
  Alert,
} from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { BarCodeScanner, Permissions } from 'expo-barcode-scanner';

// Import eigen files binnen het project
import styles from './components/stylesheet';
import mainTheme from './components/mainTheme';
import icon from './assets/plattegrond.png';

// Voor de plattegrond
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

// Het leerlingnummer van de ingelogde leerling
// In de database staan nu gegevens met lln 134000 en 134444
const lln = '134000';


// Alle mogelijke schermen
const Stack = createStackNavigator();
const App = () => {
  return (
    <NavigationContainer theme={mainTheme}>
      <Stack.Navigator>
        <Stack.Screen
          // Naam
          name="Home"
          // Bijbehorende functie
          component={HomeScreen}
          // Opties, hier alleen de titel die bovenaan komt te staan
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


// De gegevens voor de lijst met AT-uren
let listData = [
  {
    title: 'Uren',
    data: ['nog geen uren gekregen'],
  },
];

// HOMESCREEN
const HomeScreen = ({ navigation }) => {
  // Om ervoor te zorgen dat de lijst met AT-uren wordt geüpdatet
  // wanneer dit scherm tevoorschijn komt:

  // Variabele die het visuele element voor het refreshen controleert
  const [refreshing, setRefreshing] = React.useState(false);
  const wait = (timeout) => {
    // Wachtfunctie
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };
  // De functie voor het managen van de refresh van de lijst
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // De informatie van de server halen en hier updaten
    getRegistered();
    // Refreshen afronden na 2000 ms
    wait(2000).then(() => setRefreshing(false));
  }, []);
  // De functie onRefresh() laten activeren waneer
  // de focus weer op dit scherm komt
  useEffect(() => {
    return navigation.addListener('focus', () => {
      onRefresh();
    });
  });

  // Returnen wat er op het scherm komt te staan
  return (
    <View style={styles.body}>
      <Button
        // Tekst in de button
        title="Scan nieuw uur"
        // Kleur van de button (voor iOS de tekst, voor Android de achtergrond)
        color="orange"
        // De functie wanneer er geklikt wordt
        // Navigation.navigate() zorgt ervoor dat er een nieuw scherm in beeld komt
        onPress={() => navigation.navigate('Code')}
      />
      <Button
        title="Plattegrond"
        color="black"
        onPress={() => navigation.navigate('Plattegrond')}
      />
      <Button title="Refresh" color="blue" onPress={onRefresh} />
      {/* De lijst met AT-uren */}
      <SectionList
        // Gegevens
        sections={listData}
        // Hoe één item (1 AT-uur) gerenderd moet worden
        renderItem={({ item }) => <Text style={styles.item}>{item}</Text>}
        // Hoe een titel van gerenderd moet worden (nu alleen 'Uren')
        renderSectionHeader={({ section }) => (
          <Text style={styles.sectionHeader}>{section.title}</Text>
        )}
        keyExtractor={(item, index) => index}
        refreshControl={
          // Het laadicoontje voor het refreshen en mogelijkheid tot
          // omlaag vegen voor refresh
          // (alleen zichtbaar op iOS en android, niet op de webapp)
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
};


// CODESCREEN
const CodeScreen = ({ navigation }) => {
  // Variabele om ingevoerde text bij te houden
  const [text, setText] = useState('');

  // Returnen wat er op het scherm komt te staan
  return (
    <View style={styles.body}>
      {/* Text input voor de code */}
      <TextInput
        // Doorzichtige tekst in het tekstveld
        placeholder="Type hier de code"
        // Laat wanneer mogelijk numeric keyboard zien
        // Niet overal zichtbaar
        keyboardType={'numeric'}
        // Bij elke verandering de variabele text updaten
        onChangeText={(text) => setText(text)}
        // De ingevoerde code gebruiken wanneer op Enter wordt gedrukt
        onSubmitEditing={() => tryCode(navigation, text)}
      />
      <Button
        title="Bevestig"
        color="orange"
        // De code gebruiken wanneer op deze knop wordt gedrukt
        onPress={() => tryCode(navigation, text)}
      />
      <Button
        title="QR-code"
        color="blue"
        // Naar de QR scanner navigeren
        onPress={() => navigation.navigate('QR')}
      />
    </View>
  );
};


// Alles wat met de plattegrond te maken heeft is gemaakt
// door Boris, Ian en David
// PLATTEGRONDSCREEN
const PlattegrondScreen = ({ navigation, route }) => {
  return (
    <View style={styles.container}>
      <Image
        source={icon}
        style={{ width: windowWidth, height: windowHeight }}
      />
    </View>
  );
};


// QRSCREEN
const QRScreen = ({ navigation, route }) => {
  // Variabele voor het managen van de toegang tot de camera
  const [hasPermission, setHasPermission] = useState(null);

  // Variabele die bijhoudt of er iets gescand is
  const [scanned, setScanned] = useState(false);

  // Toestemming vragen
  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  // Wordt uitgevoerd wanneer er een code gescand is
  const handleBarCodeScanned = ({ type, data }) => {
    // Variabele scanned wordt true om te stoppen met scannen
    setScanned(true);
    // Geef een alert met de gescande informatie en de keuze om het te gebruiken
    Alert.alert('Gelukt!', `De gescande code is ${data}`, [
      {
        text: 'Scan opnieuw',
        onPress: () => setScanned(false),
        style: 'destructive',
      },
      {
        text: 'Gebruik',
        onPress: () => tryCode(navigation, data),
        style: 'default',
      },
    ]);
  };

  // Als er nog geen antwoord is op de vraag om toestemming
  if (hasPermission === null) {
    return (
      <View>
        <Text>Cameratoegang aan het aanvragen</Text>
      </View>
    );
  }
  // Als de toestemming is geweigerd
  if (hasPermission === false) {
    return (
      <View>
        <Text>Geen toegang tot de camera gekregen</Text>
      </View>
    );
  }

  // Returnen wat er op het scherm komt te staan
  return (
    <View style={styles.qrcamera}>
      <BarCodeScanner
        // De functie die moet worden uitgevoerd als er een code gescand is
        // Wanneer scanned true is, wordt undefined gebruikt
        // De scanner stopt dan totdat scanned weer false wordt
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
    </View>
  );
};


// De code komt van de input als eerst hier
const tryCode = (navigation, input) => {
  // De input wordt een integer
  let code = parseInt(input);
  // Als de code valide is of niet
  if (isValid(code)) {
    // Stuur de code naar de server
    postCode(navigation, code, resolvePostCode);
  } else {
    // Geef aan dat de code ongeldig is
    alert(`De code ${input} is ongeldig`);
    navigation.navigate('Code');
  }
};

// Test of de code goed is
const isValid = (code) => {
  // De code moet een getal zijn met vier cijfers
  return !isNaN(code) && code.toString().length === 4;
};

// Functie om de code met bijbehorende data naar de database te sturen
const postCode = (navigation, code, callback) => {
  let d = new Date();
  let positiveFeedback = 'succes';

  // Functie die een bericht stuurt naar het .php bestand op de server
  fetch('https://assinkat.000webhostapp.com/react/registratie.php', {
    method: 'post',
    header: {
      'Content-type': 'application/json',
      Accept: 'application/json',
    },
    // Meegegeven gegevens
    body: JSON.stringify({
      code: code,
      date: `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`,
      time: `${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`,
      lln: lln,
      positiveFeedback: positiveFeedback,
    }),
  })
    // Verwerken van de binnengekregen antwoord
    .then((response) => response.json())
    .then((response) => callback(navigation, code, response, positiveFeedback))
    .catch((error) => console.error(error));
};



// Vervolg van postCode(), om de gebruiker het resultaat te vertellen 
// en het terug te gaan naar de homescreen
const resolvePostCode = (navigation, code, response, positiveFeedback) => {
  console.log(response);
  // Als het antwoord van de server zoals verwacht is of niet
  if (response == positiveFeedback) {
    alert('AT-uur succesvol');
  } else {
    alert('Er is iets fout gegaan, probeer later opnieuw');
  }
  navigation.navigate('Home');
};


// Functie om data van de database op te halen
const getRegistered = () => {
  // Bericht naar de server
  fetch('https://assinkat.000webhostapp.com/react/get-all.php', {
    method: 'post',
    body: JSON.stringify({
      lln: lln,
    }),
  })
    .then((response) => response.json())
    .then((response) => setListData(response))
    .catch((error) => console.error(error));
};

// Update de listData variabele, wat er in de lijst op de Homepage moet staan
const setListData = (data) => {
  // De data in listData wordt eerst tot een lege array gemaakt
  listData[0].data = [];
  // Elke rij uit de database wordt aan de listData toegevoegd
  // Elk onderdeel van een rij uit de database wordt samengevoegd tot één string met .join()
  for (let i = 0; i < data.length; i++) {
    listData[0].data[i] = data[i].join(' - ');
  }
};

// De app uitvoeren.
export default App;
