import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, ScrollView, SafeAreaView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ProfileDetailsScreen = () => {
  const navigation = useNavigation();
  
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
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
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

      <TouchableOpacity style={styles.nextButton} onPress={() => {/* Add submit logic */}}>
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    padding: 20,
  },
  header: {
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
  subtext: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
    lineHeight: 22,
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
    borderColor: '#4B0082',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    backgroundColor: '#f5f5f5',
    color: '#333',
  },
  pickerContainer: {
    borderColor: '#4B0082',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#f5f5f5',
    overflow: 'hidden',
  },
  picker: {
    height: 50,
  },
  uploadPhotoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 130,
    width: 130,
    borderRadius: 65,
    backgroundColor: '#f0f0f0',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#4B0082',
    borderStyle: 'dashed',
  },
  uploadPhotoText: {
    color: '#4B0082',
    marginTop: 10,
    textAlign: 'center',
  },
  photoButton: {
    alignItems: 'center',
    marginBottom: 20,
  },
  photo: {
    width: 130,
    height: 130,
    borderRadius: 65,
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
  nextButton: {
    backgroundColor: '#4B0082',
    padding: 15,
    borderRadius: 25,
    margin: 20,
  },
  nextButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default ProfileDetailsScreen;