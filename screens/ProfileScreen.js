import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, ScrollView, SafeAreaView, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker'; // Use Expo ImagePicker
import Icon from 'react-native-vector-icons/MaterialIcons';
import { getAuth } from 'firebase/auth';
import { updateDoc, doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebase'; // Ensure you import db (your Firestore instance)

const ProfileDetailsScreen = () => {
  const navigation = useNavigation();
  const auth = getAuth();
  const user = auth.currentUser;

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [gender, setGender] = useState('');
  const [country, setCountry] = useState('');
  const [address, setAddress] = useState('');
  const [identityProof, setIdentityProof] = useState(null);
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setName(data.name || '');
          setPhone(data.phone || '');
          setEmail(data.email || '');
          setDateOfBirth(data.dateOfBirth || '');
          setGender(data.gender || '');
          setCountry(data.country || '');
          setAddress(data.address || '');
          setPhoto(data.photoURL ? { uri: data.photoURL } : null);
          setIdentityProof(data.identityProof ? { uri: data.identityProof } : null);
        }
      }
    };

    fetchData();
  }, [user]);

  const handlePhotoUpload = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1], // Square photo
      quality: 1,
    });

    if (!result.canceled) {
      setPhoto({ uri: result.assets[0].uri });
    }
  };

  const handleFileUpload = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setIdentityProof({ uri: result.assets[0].uri });
    }
  };

  const updateUserProfile = async () => {
    if (!user) {
      Alert.alert('Error', 'User not found');
      return;
    }

    const userDocRef = doc(db, 'users', user.uid);

    const updatedData = {
      photoURL: photo ? photo.uri : null, // Append new photo if available
      identityProof: identityProof ? identityProof.uri : null, // Append new identity proof
      name,
      phone,
      email,
      dateOfBirth,
      gender,
      country,
      address,
      timestamp: new Date(),
    };

    try {
      const docSnap = await getDoc(userDocRef);

      if (docSnap.exists()) {
        await updateDoc(userDocRef, updatedData);
      } else {
        await setDoc(userDocRef, updatedData, { merge: true });
      }

      navigation.navigate('Home');
    } catch (err) {
      Alert.alert('Error', err.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
      <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Home')}>
            <Icon name="arrow-back" size={24} color="#4B0082" />
          </TouchableOpacity>
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Profile Details</Text>
        </View>

        <Text style={styles.subtext}>Let's get the basics down! Fill in your details to complete your profile and get started.</Text>

        <View style={styles.photoButton}>
          <TouchableOpacity onPress={handlePhotoUpload}>
            {photo ? (
              <Image source={photo} style={styles.photo} />
            ) : (
              <View style={styles.uploadPhotoContainer}>
                <Icon name="add-photo-alternate" size={40} color="#4B0082" />
                <Text style={styles.uploadPhotoText}>Upload Profile Photo</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Name*</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Enter your name"
            placeholderTextColor="#999"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Phone No.*</Text>
          <TextInput
            style={styles.input}
            value={phone}
            keyboardType="phone-pad"
            onChangeText={setPhone}
            placeholder="Enter your phone number"
            placeholderTextColor="#999"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email*</Text>
          <TextInput
            style={styles.input}
            value={email}
            keyboardType="email-address"
            onChangeText={setEmail}
            placeholder="Enter your email"
            placeholderTextColor="#999"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Date of Birth*</Text>
          <TextInput
            style={styles.input}
            value={dateOfBirth}
            onChangeText={setDateOfBirth}
            placeholder="DD/MM/YYYY"
            placeholderTextColor="#999"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Gender*</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={gender}
              onValueChange={(itemValue) => setGender(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="Select Gender" value="" />
              <Picker.Item label="Male" value="male" />
              <Picker.Item label="Female" value="female" />
              <Picker.Item label="Other" value="other" />
            </Picker>
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Country*</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={country}
              onValueChange={(itemValue) => setCountry(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="Select Country" value="" />
              <Picker.Item label="Australia" value="Australia" />
              <Picker.Item label="Brazil" value="Brazil" />
              <Picker.Item label="Canada" value="Canada" />
              <Picker.Item label="France" value="France" />
              <Picker.Item label="Germany" value="Germany" />
              <Picker.Item label="India" value="India" />
              <Picker.Item label="Japan" value="Japan" />
              <Picker.Item label="Mexico" value="South Africa" />
              <Picker.Item label="United Kingdom" value="United Kingdom" />
              <Picker.Item label="United States Of America" value="United States Of America" />
            </Picker>
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Address*</Text>
          <TextInput
            style={styles.input}
            value={address}
            onChangeText={setAddress}
            placeholder="Enter your address"
            placeholderTextColor="#999"
          />
        </View>

        <Text style={styles.label}>ID Proof*</Text>
        <TouchableOpacity style={styles.uploadFileContainer} onPress={handleFileUpload}>
          <Icon name="folder" size={24} color="#4B0082" />
          <Text style={styles.uploadFileText}>Upload Digital Copy of Aadhar</Text>
        </TouchableOpacity>
      </ScrollView>

      <TouchableOpacity style={styles.nextButton} onPress={updateUserProfile}>
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  // Same styles as your existing ProfileDetailsScreen
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    padding: 20,
  },
  titleContainer: {
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4B0082',
  },
  subtext: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    marginBottom: 5,
    color: '#4B0082',
    fontSize: 16,
    fontWeight: 'bold',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  pickerContainer: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
  },
  picker: {
    height: 50,
  },
  uploadFileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  uploadFileText: {
    marginLeft: 10,
    color: '#4B0082',
    fontSize: 16,
    fontWeight: 'bold',
  },
  uploadPhotoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 150,
    width: 150,
    borderRadius: 75,
    backgroundColor: '#eee',
    marginBottom: 20,
  },
  uploadPhotoText: {
    color: '#666',
    fontSize: 14,
  },
  photoButton: {
    alignItems: 'center',
    marginBottom: 20,
  },
  photo: {
    height: 150,
    width: 150,
    borderRadius: 75,
    resizeMode: 'cover',
    marginBottom: 20,
  },
  nextButton: {
    backgroundColor: '#4B0082',
    padding: 15,
    borderRadius: 10,
    margin: 20,
    alignItems: 'center',
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ProfileDetailsScreen;
