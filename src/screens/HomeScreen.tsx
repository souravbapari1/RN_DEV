import * as React from 'react';
import { View, StyleSheet, Text, Alert, ScrollView, Modal, Pressable } from 'react-native';
import { Appbar, Button } from 'react-native-paper';

export default function HomePage() {
  const [modalVisible, setModalVisible] = React.useState(false);

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
        <Appbar.Content title="Home Page" subtitle="Welcome to the app" />
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

        
        <Button
          mode="contained-tonal"
          onPress={() => setModalVisible(true)}
          style={styles.button}
          icon="information"
        >
          Open Modal
        </Button>

        {/* Spacer to show scrolling */}
        <View style={{ height: 800 }} />
      </ScrollView>

      {/* Modal Component */}
      <Modal
        statusBarTranslucent
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Modal Title</Text>
            <Text style={styles.modalText}>
              This is some modal content. You can put anything here!
            </Text>
            <Pressable
              style={({ pressed }) => [
                styles.closeButton,
                pressed && { opacity: 0.7 }
              ]}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
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
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});
