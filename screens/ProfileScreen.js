import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Make sure to install this package

const ProfileDetailsScreen = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [gender, setGender] = useState('');
  const [country, setCountry] = useState('');
  const [address, setAddress] = useState('');
  const [identityProof, setIdentityProof] = useState(null);
  const [photo, setPhoto] = useState(null);

  const handlePhotoUpload = () => {
    ImagePicker.launchImageLibrary({}, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorMessage) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else {
        const source = { uri: response.assets[0].uri };
        setPhoto(source);
      }
    });
  };

  const handleFileUpload = () => {
    // Logic for file upload
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Profile Details</Text>
      <View style={styles.photoButton}>
        <TouchableOpacity onPress={handlePhotoUpload}>
          {photo ? (
            <Image source={photo} style={styles.photo} />
          ) : (
            <View style={styles.uploadPhotoContainer}>
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
          placeholderTextColor="#000"
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
          placeholderTextColor="#000"
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
          placeholderTextColor="#000"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Date of Birth*</Text>
        <TextInput
          style={styles.input}
          value={dateOfBirth}
          onChangeText={setDateOfBirth}
          placeholder="DD/MM/YYYY"
          placeholderTextColor="#000"
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
          placeholderTextColor="#000"
        />
      </View>

      <Text style={styles.label}>ID Proof*</Text>
      <TouchableOpacity style={styles.uploadFileContainer} onPress={handleFileUpload}>
        <Icon name="folder" size={24} color="#4B0082" />
        <Text style={styles.uploadFileText}>Upload Digital Copy of Aadhar</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.submitButton} onPress={() => {/* Add submit logic */}}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: '#fff',
  },
  inputContainer: {
    marginBottom: 15,
  },
  title: {            // for Profile Details
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4B0082', // Purple color for the title
    textAlign: 'center',
    // marginBottom:10,
    marginTop: 60, // Margin at the top to ensure spacing from the top of the screen
  },
  label: {
    marginBottom: 5,
    color: '#4B0082', // Purple color for labels
    fontSize: 16,
    fontWeight: 'bold',
  },
  input: {
    height: 50,
    borderColor: '#4B0082', // Purple border
    borderWidth: 1,
    borderRadius: 10, // Rounded corners
    paddingHorizontal: 15,
    backgroundColor: '#f5f5f5', // Light gray background for inputs
    color: '#000', // Solid black text inside fields
  },
  pickerContainer: {
    borderColor: '#4B0082',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#f5f5f5',
    overflow: 'hidden', // Ensures that picker fits within rounded container
  },
  picker: {
    height: 50,
  },
  uploadPhotoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 130,
    width: 130,
    borderRadius: 70,
    backgroundColor: '#e0e0e0', // Light gray background
    marginBottom: 20,
    marginTop: 70, // Added margin to bring it lower
  },
  uploadPhotoText: {
    color: '#4B0082', // Purple color for text
  },
  photoButton: {
    alignItems: 'center',
    marginBottom: 20,
  },
  photo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  uploadFileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#4B0082',
    borderWidth: 1,
    borderRadius: 10,
    padding: 15,
    backgroundColor: '#f5f5f5',
    marginBottom: 15,
  },
  uploadFileText: {
    marginLeft: 10,
    color: '#4B0082',
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: '#4B0082', // Purple background for submit button
    marginTop: 5,
    padding: 15,
    alignItems: 'center',
    borderRadius: 40,
  },
  submitButtonText: {
    color: '#fff', // White text
    fontWeight: 'bold',
  },
});

export default ProfileDetailsScreen;
