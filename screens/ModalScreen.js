import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import useAuth from '../hooks/useAuth';
import { doc, setDoc } from 'firebase/firestore';
import { db, timestamp } from '../firebase';

const ModalScreen = () => {
  const { user } = useAuth();
  const navigation = useNavigation();
  const [image, setImage] = useState('');
  const [job, setJob] = useState('');
  const [age, setAge] = useState('');

  const incompleteForm = !image || !job || !age;

  const updateUserProfile = () => {
    setDoc(doc(db, 'users', user.uid), {
      id: user.uid,
      displayName: user.displayName,
      photoURL: image,
      job,
      age,
      timestamp,
    })
      .then(() => {
        navigation.navigate('Home');
      })
      .catch((err) => {
        Alert.alert('Error', err.message);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
      >
        <View style={styles.content}>
          <Text style={styles.welcomeText}>
            WELCOME <Text style={styles.nameText}>{user.displayName.toUpperCase()}</Text>
          </Text>
          
          <View style={styles.stepContainer}>
            <Text style={styles.stepTitle}>Step 1: The Profile Pic</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter a profile pic url"
              placeholderTextColor="rgba(75, 0, 130, 0.6)"
              value={image}
              onChangeText={setImage}
            />
          </View>

          <View style={styles.stepContainer}>
            <Text style={styles.stepTitle}>Step 2: The Job</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your occupation"
              placeholderTextColor="rgba(75, 0, 130, 0.6)"
              value={job}
              onChangeText={setJob}
            />
          </View>

          <View style={styles.stepContainer}>
            <Text style={styles.stepTitle}>Step 3: The Age</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your age"
              placeholderTextColor="rgba(75, 0, 130, 0.6)"
              keyboardType="numeric"
              value={age}
              onChangeText={setAge}
              maxLength={2}
            />
          </View>

          <TouchableOpacity
            style={[styles.updateButton, incompleteForm && styles.disabledButton]}
            onPress={updateUserProfile}
            disabled={incompleteForm}
          >
            <Text style={styles.updateButtonText}>Update Profile</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4B0082',
    textAlign: 'center',
    marginBottom: 30,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  nameText: {
    fontSize: 26,
    fontWeight: '900',
    letterSpacing: 2,
    textShadowColor: 'rgba(75, 0, 130, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  stepContainer: {
    marginBottom: 20,
  },
  stepTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#4B0082',
    marginBottom: 10,
  },
  input: {
    height: 50,
    borderColor: '#4B0082',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#4B0082',
  },
  updateButton: {
    backgroundColor: '#4B0082',
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
  },
  updateButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
  },
  disabledButton: {
    backgroundColor: 'rgba(75, 0, 130, 0.5)',
  },
});

export default ModalScreen; 