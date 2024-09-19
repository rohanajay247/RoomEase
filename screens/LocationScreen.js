import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const LocationScreen = () => {
  const navigation = useNavigation();
  const [selectedLocation, setSelectedLocation] = useState('');

  const locations = [
    'JP Nagar',
    'Jayanagar',
    'Indiranagar',
    'Koramangala',
    'Yeshwanthpur',
    'HSR Layout',
    'Whitefield',
  ];

  const handleNext = () => {
    // Navigate to the next screen or process the selected location
    navigation.navigate('Home', { selectedLocation });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="#4B0082" />
        </TouchableOpacity>
      </View>

      <View style={styles.titleContainer}>
        <Text style={styles.title}>Room Location</Text>
        <Text style={styles.pageIndicator}>1/1</Text>
      </View>

      <View style={styles.contentContainer}>
        <Text style={styles.questionText}>Where would you like your home?</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedLocation}
            onValueChange={(itemValue) => setSelectedLocation(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Select a location" value="" />
            {locations.map((location, index) => (
              <Picker.Item key={index} label={location} value={location} />
            ))}
          </Picker>
        </View>
      </View>

      <TouchableOpacity 
        style={[styles.nextButton, !selectedLocation && styles.disabledButton]} 
        onPress={handleNext}
        disabled={!selectedLocation}
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
    marginBottom: 10,
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
    justifyContent: 'center',
    paddingBottom: 170,
  },
  questionText: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#4B0082',
    borderRadius: 25,
    marginBottom: 20,
    overflow: 'hidden',
  },
  picker: {
    height: 50,
    color: '#4B0082',
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

export default LocationScreen;