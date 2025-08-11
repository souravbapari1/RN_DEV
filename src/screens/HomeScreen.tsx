import * as React from 'react';
import { View, StyleSheet, Text, Alert, ScrollView } from 'react-native';
import { Appbar, Button } from 'react-native-paper';

export default function HomePage() {
  const _goBack = () => {
    Alert.alert('Back button pressed');
  };

  const _handleSearch = () => {
    Alert.alert('Search button pressed');
  };

  const _handleMore = () => {
    Alert.alert('More options pressed');
  };

  const _onPressButton1 = () => {
    Alert.alert('Button 1 pressed');
  };

  const _onPressButton2 = () => {
    Alert.alert('Button 2 pressed');
  };

  return (
    <>
      <Appbar.Header style={{ backgroundColor: '#ffffff' }}>
        {/* <Appbar.BackAction onPress={_goBack} /> */}
        <Appbar.Action icon={"menu"} />
        <Appbar.Content title="Home Page"  subtitle="Welcome to the app" />
        <Appbar.Action icon="magnify" onPress={_handleSearch} />
        <Appbar.Action icon="dots-vertical" onPress={_handleMore} />
      </Appbar.Header>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Hello, welcome to the Home Page!</Text>

        <Button
          mode="contained"
          onPress={_onPressButton1}
          style={styles.button}
          icon="camera"
        >
          Take a Photo
        </Button>

        <Button
          mode="outlined"
          onPress={_onPressButton2}
          style={styles.button}
          icon="email"
        >
          Send Email
        </Button>

        {/* You can add more content here to test scrolling */}
        <View style={{ height: 800 }} />
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#f6f6f6',
  },
  title: {
    fontSize: 22,
    marginBottom: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  button: {
    marginVertical: 10,
    width: '80%',
  },
});
