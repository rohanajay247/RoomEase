import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

const RoomDetails = () => {
  const navigation = useNavigation();
  const [location, setLocation] = useState('');
  const [numRooms, setNumRooms] = useState('');
  const [otherDetails, setOtherDetails] = useState('');

  const handleNext = () => {
    // Navigate to the RoomPhoto screen with the entered data
    navigation.navigate('RoomPhoto', { location, numRooms, otherDetails });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="#4B0082" />
        </TouchableOpacity>
      </View>

      <View style={styles.titleContainer}>
        <Text style={styles.title}>Room Details</Text>
        <Text style={styles.pageIndicator}>2/3</Text>
      </View>

      <View style={styles.contentContainer}>
        <Text style={styles.questionText}>
          Add necessary details
        </Text>

        <Text style={styles.label}>Location</Text>
        <TextInput
          style={styles.input}
          value={location}
          onChangeText={setLocation}
          placeholder="Enter location"
        />

        <Text style={styles.label}>No. of Rooms</Text>
        <TextInput
          style={styles.input}
          value={numRooms}
          onChangeText={(text) => setNumRooms(text.replace(/[^0-9]/g, ''))}
          placeholder="Enter number of rooms"
          keyboardType="numeric"
        />

        <Text style={styles.label}>Other Details</Text>
        <TextInput
          style={[styles.input, styles.multilineInput]}
          value={otherDetails}
          onChangeText={setOtherDetails}
          placeholder="Enter other details"
          multiline
        />
      </View>

      <TouchableOpacity 
        style={[styles.nextButton, (!location || !numRooms) && styles.disabledButton]} 
        onPress={handleNext}
        disabled={!location || !numRooms}
      >
        <Text style={styles.nextButtonText}>Next</Text>
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
  input: {
    borderWidth: 1,
    borderColor: '#4B0082',
    borderRadius: 25,
    padding: 15,
    fontSize: 16,
    marginBottom: 12,
  },
  multilineInput: {
    height: 100,
    textAlignVertical: 'top',
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

export default RoomDetails;