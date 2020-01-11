import React from 'react';
//import { StyleSheet, Text, View } from 'react-native';
import Main from './components/mainComponent';
import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/configureStore';

const store = ConfigureStore();

export default function App() {
  return (
    /*<View style={styles.container}>
      <Text>Hello World!</Text>
    </View>*/
    <Provider store={store}>
      <Main />
    </Provider>
  );
}

/*
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0ff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
*/