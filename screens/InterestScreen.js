import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Make sure to install this package
import { getAuth } from 'firebase/auth';
import { updateDoc, doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase'; // Ensure you import your Firestore instance correctly

const interestsList = [
  'Art', 'Design', 'Photography', 'Camping', 'Makeup', 'Guitar',
  'Reading', 'Collecting stamps', 'DIY projects', 'Meditation', 'Astronomy'
];

const sportsList = [
  'Football', 'Baseball', 'Basketball', 'Swimming', 'Kabaddi', 'Tennis',
  'MMA', 'Table tennis', 'Badminton', 'Cricket', 'Golf', 'Soccer',
  'Gym', 'Running', 'Yoga'
];

const InterestScreen = () => {
  const [selectedInterests, setSelectedInterests] = useState([]);
  const navigation = useNavigation();
  const auth = getAuth();
  const user = auth.currentUser;

  const handleSelectInterest = (interest) => {
    setSelectedInterests(prevInterests => {
      if (prevInterests.includes(interest)) {
        return prevInterests.filter(item => item !== interest);
      } else {
        return [...prevInterests, interest];
      }
    });
  };

  const updateUserInterests = async () => {
    if (!user) {
      Alert.alert('Error', 'User not found');
      return;
    }

    const userDocRef = doc(db, 'users', user.uid);
    try {
      // Fetch current interests to append new ones
      const docSnap = await getDoc(userDocRef);
      let existingInterests = [];
      
      if (docSnap.exists()) {
        const data = docSnap.data();
        existingInterests = data.interests || []; // Use existing interests or empty array
      }

      const updatedInterests = [...new Set([...existingInterests, ...selectedInterests])]; // Avoid duplicates

      // Update Firestore with the new interests array
      await updateDoc(userDocRef, { interests: updatedInterests });
      Alert.alert('Success', 'Interests updated successfully');
      navigation.navigate('Home');
    } catch (err) {
      Alert.alert('Error', err.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Icon name="arrow-back" size={24} color="#4B0082" />
      </TouchableOpacity>
      <Text style={styles.title}>Select your interests!</Text>
      <Text style={styles.subtext}>Pick the things you love, it will help to find the ideal roommate!</Text>
      <Text style={styles.sectionTitle}>Hobbies</Text>
      
      <ScrollView style={styles.interestsContainer}>
        <View style={styles.interestsSection}>
          {interestsList.map((interest, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.interestButton,
                selectedInterests.includes(interest) && styles.selectedInterestButton
              ]}
              onPress={() => handleSelectInterest(interest)}
            >
              <Text style={[
                styles.interestButtonText,
                selectedInterests.includes(interest) && styles.selectedInterestButtonText
              ]}>{interest}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Sports</Text>
        <View style={styles.interestsSection}>
          {sportsList.map((sport, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.interestButton,
                selectedInterests.includes(sport) && styles.selectedInterestButton
              ]}
              onPress={() => handleSelectInterest(sport)}
            >
              <Text style={[
                styles.interestButtonText,
                selectedInterests.includes(sport) && styles.selectedInterestButtonText
              ]}>{sport}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {selectedInterests.length > 0 && (
        <View style={styles.selectedInterestsContainer}>
          <Text style={styles.selectedInterestsTitle}>Your Interests are:</Text>
          <View style={styles.selectedInterestsList}>
            {selectedInterests.map((interest, index) => (
              <TouchableOpacity
                key={index}
                style={styles.selectedInterestButton}
                onPress={() => handleSelectInterest(interest)}
              >
                <Text style={styles.selectedInterestText}>{interest}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}

      <Text style={styles.footerText}>You can always update this later.</Text>

      <TouchableOpacity style={styles.nextButton} onPress={updateUserInterests}>
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4B0082',
    textAlign: 'left',
    marginTop: 50,
    marginBottom: 10,
  },
  interestsContainer: {
    marginBottom: 20,
  },
  interestsSection: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4B0082',
    marginTop: 10,
    marginBottom: 10,
  },
  interestButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    borderColor: '#4B0082',
    borderWidth: 1,
    margin: 5,
  },
  selectedInterestButton: {
    backgroundColor: '#4B0082',
  },
  interestButtonText: {
    color: '#4B0082',
    fontSize: 14,
  },
  selectedInterestButtonText: {
    color: '#fff',
  },
  selectedInterestsContainer: {
    marginBottom: 20,
  },
  selectedInterestsTitle: {
    fontSize: 16,
    marginBottom: 10,
  },
  selectedInterestsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  selectedInterestButton: {
    backgroundColor: '#e0e0e0',
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 10,
    marginBottom: 10,
  },
  selectedInterestText: {
    color: '#4B0082',
  },
  footerText: {
    color: '#000',
    textAlign: 'center',
    marginBottom: 10,
  },
  nextButton: {
    backgroundColor: '#4B0082',
    paddingVertical: 15,
    alignItems: 'center',
    borderRadius: 15,
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default InterestScreen;