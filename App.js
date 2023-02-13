import React, { useState } from 'react';
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';

import * as Speech from 'expo-speech';

export default function App() {
  const [language1, setLanguage1] = useState('English');
  const [language2, setLanguage2] = useState('French');
  const [text, setText] = useState('');
  const [translation, setTranslation] = useState('');
  const [pronunciation, setPronunciation] = useState('');

  const languages = ["English", "French", "Portuguese", "German", "Russian"];

  const buttonList1 = languages.map((language)=>
        <TouchableOpacity
            style={styles.languageButton}
            onPress={()=>setLanguage1(language)}>
            <Image
              source={{
                uri: 'https://procodingclass.github.io/TranslatorApp-Tynker-Module7/'+language+'.png',
              }}
              style={styles.logo}
            />
            <Text style={styles.languageName}>{language}</Text>
          </TouchableOpacity>
  )
  const buttonList2 = languages.map((language)=>
        <TouchableOpacity
            style={styles.languageButton}
            onPress={() => getTranslation(language)}>
            <Image
              source={{
                uri: 'https://procodingclass.github.io/TranslatorApp-Tynker-Module7/'+language+'.png',
              }}
              style={styles.logo}
            />
            <Text style={styles.languageName}>{language}</Text>
          </TouchableOpacity>
  )

  const getTranslation = (language) => {
    setLanguage2(language);
    url ='https://pro-transltor.onrender.com/?text=' + text + '&srcLang=' + language1+ '&destLang=' + language;
    return fetch(url)
      .then((response) => response.json())
      .then((json) => {
        setTranslation(json.phrase + '\n' + json.pronunciation);
        setPronunciation(json.pronunciation)
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const speak =()=>{
    Speech.speak(pronunciation, {
      language: language2,
    });
  };


  return (
    <View style={styles.container}>
      <View style={styles.upperContainer}>
        <Text style={styles.headerText}>Translate</Text>
      </View>
      <View style={styles.lowerContainer}>
        <View style={styles.languageContainer}>
          {buttonList1}
        </View>
      </View>
      <View style={styles.middleContainer}>
        <View style={styles.inputContainer}>
          <View style={styles.flagContainer}>
            <Image
              style={styles.logo}
              source={{
                uri:
                  'https://procodingclass.github.io/TranslatorApp-Tynker-Module7/' +
                  language1 +
                  '.png',
              }}
            />
            <Text style={styles.heading}>{language1}</Text>
          </View>
          <TextInput
            style={styles.textinput}
            placeholder="Type here to translate!"
            multiline={true}
            numberOfLines={4}
            onChangeText={setText}
          />
        </View>
        <View style={styles.inputContainer}>
          <View style={styles.flagContainer}>
            <Image
              style={styles.logo}
              source={{
                uri:
                  'https://procodingclass.github.io/TranslatorApp-Tynker-Module7/' +
                  language2 +
                  '.png',
              }}
            />
            <Text style={styles.heading}>{language2}</Text>
            <TouchableOpacity
            style={styles.languageButton}
            onPress={() => speak()}>
            <Image
              source={{
                uri: 'https://procodingclass.github.io/TranslatorApp-Tynker-Module7/speakerIcon.png',
              }}
              style={styles.speaker}
            />
          </TouchableOpacity>
          </View>
          <TextInput
            style={styles.textinput}
            multiline={true}
            editable={false}
            numberOfLines={4}
            value={translation}
          />
        </View>
      </View>
      <View style={styles.lowerContainer}>
        <View style={styles.languageContainer}>
          {buttonList2}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 100,
  },
  upperContainer: {
    flex: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1f6fe5',
  },
  headerText: {
    fontSize: 30,
    color: '#ffffff',
    paddingBottom: 10,
  },
  middleContainer: {
    flex: 60,
  },
  inputContainer: {
    flex: 50,
    paddingHorizontal: '5%',
  },
  textinput: {
    flex: 1,
    fontSize: 16,
    borderRadius: 10,
    color: 'grey',
    padding: 10,
    backgroundColor: '#ffffff',
    boxShadow: `0px 1px 3px #333333`,
    elevation: 3,
  },
  flagContainer: {
    flexDirection: 'row',
    padding: 20,
  },
  logo: {
    height: 26,
    width: 26,
    borderRadius: 13,
  },
  heading: {
    fontWeight: 'bold',
    color: 'navy',
    paddingBottom: '2%',
    paddingLeft: '4%',
  },
  speaker:{
    height: 20,
    width: 20,
    borderRadius: 13,
    marginLeft: 40
  },
  lowerContainer: {
    flex: 20,
    justifyContent: 'space-evenly',
  },
  languageContainer: { flexDirection: 'row', justifyContent: 'space-evenly' },
  languageButton: { alignItems: 'center' },
  languageName: { fontWeight: 'bold', color: 'navy' },
});
