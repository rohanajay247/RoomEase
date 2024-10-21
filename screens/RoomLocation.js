import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { getAuth } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../firebase'; // Ensure your Firebase Firestore instance is imported

const RoomLocation = () => {
  const navigation = useNavigation();
  const auth = getAuth();
  const user = auth.currentUser;

  const [roomType, setRoomType] = useState('');
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false); // Added loading state for async operations

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        try {
          const docRef = doc(db, 'rooms', user.uid); // Using UID as document ID
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const data = docSnap.data();
            setRoomType(data.roomType || '');
            setAddress(data.address || '');
          }
        } catch (error) {
          Alert.alert('Error', 'Failed to fetch room data: ' + error.message);
        }
      }
    };

    fetchData();
  }, [user]);

  const handleNext = async () => {
    if (!user) {
      Alert.alert('Error', 'User not authenticated');
      return;
    }

    if (!roomType || !address) {
      Alert.alert('Error', 'Please fill out all fields');
      return;
    }

    const roomData = {
      roomType,
      address,
      timestamp: new Date(), // Saving the current timestamp for reference
    };

    try {
      setLoading(true); // Start loading

      const roomDocRef = doc(db, 'rooms', user.uid); // Using user's UID as the document ID
      await setDoc(roomDocRef, roomData, { merge: true }); // Merge ensures existing data isn't overwritten

      setLoading(false); // End loading

      // Navigate to RoomDetails screen and pass the data
      navigation.navigate('RoomDetails', { roomType, address });
    } catch (error) {
      setLoading(false);
      Alert.alert('Error', 'Failed to save room data: ' + error.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="#4B0082" />
        </TouchableOpacity>
      </View>

      <View style={styles.titleContainer}>
        <Text style={styles.title}>Accommodation</Text>
        <Text style={styles.pageIndicator}>1/3</Text>
      </View>

      <View style={styles.contentContainer}>
        <Text style={styles.questionText}>
          If yes, please enter the following details
        </Text>

        <Text style={styles.label}>Is it an apartment or an independent house?</Text>
        <TouchableOpacity
          style={[styles.option, roomType === 'Apartment' && styles.selectedOption]}
          onPress={() => setRoomType('Apartment')}
        >
          <Text style={[styles.optionText, roomType === 'Apartment' && styles.selectedOptionText]}>Apartment</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.option, roomType === 'Independent House' && styles.selectedOption]}
          onPress={() => setRoomType('Independent House')}
        >
          <Text style={[styles.optionText, roomType === 'Independent House' && styles.selectedOptionText]}>
            Independent House
          </Text>
        </TouchableOpacity>

        <Text style={styles.label}>Address:</Text>
        <TextInput
          style={styles.input}
          value={address}
          onChangeText={setAddress}
          placeholder="Enter address"
          multiline
        />

        <Text style={styles.label}>Location on Maps*</Text>
        <View style={styles.mapPlaceholder}>
          <Icon name="location-on" size={24} color="#888" />
        </View>
      </View>

      <TouchableOpacity
        style={[styles.nextButton, (!roomType || !address) && styles.disabledButton]}
        onPress={handleNext}
        disabled={!roomType || !address || loading} // Disabled while loading or if fields are incomplete
      >
        <Text style={styles.nextButtonText}>{loading ? 'Saving...' : 'Next'}</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 20,
  },
  header: {
    paddingTop: 40,
    marginBottom: 10,
  },
  backButton: {
    padding: 5,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4B0082',
  },
  pageIndicator: {
    fontSize: 16,
    color: '#666',
  },
  contentContainer: {
    flex: 1,
    paddingBottom: 20,
  },
  questionText: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  label: {
    fontSize: 16,
    color: '#666',
    marginTop: 16,
    marginBottom: 8,
  },
  option: {
    borderWidth: 1,
    borderColor: '#4B0082',
    borderRadius: 25,
    padding: 15,
    marginBottom: 12,
  },
  selectedOption: {
    backgroundColor: '#4B0082',
  },
  optionText: {
    fontSize: 16,
    color: '#4B0082',
    textAlign: 'center',
  },
  selectedOptionText: {
    color: 'white',
  },
  input: {
    borderWidth: 1,
    borderColor: '#4B0082',
    borderRadius: 25,
    padding: 15,
    fontSize: 16,
    marginBottom: 12,
  },
  mapPlaceholder: {
    height: 150,
    backgroundColor: '#f0f0f0',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  nextButton: {
    backgroundColor: '#4B0082',
    padding: 15,
    borderRadius: 25,
    marginBottom: 20,
  },
  disabledButton: {
    backgroundColor: '#A0A0A0',
  },
  nextButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default RoomLocation;
