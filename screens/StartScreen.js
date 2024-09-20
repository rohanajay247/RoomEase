import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const StartScreen = () => {
    const navigation = useNavigation();

    const handleGetStarted = () => {
        navigation.navigate('Home');
    };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.purpleContainer}>
          <Text style={styles.title}>RoomEase</Text>
        </View>
      </View>
      
      <Text style={styles.descriptionText}>
      Connect through shared vibes - your ideal roommate is just a swipe away!
      </Text>
      
      <View style={styles.imageContainer}>
        <Image
          source={require('../assets/startimage.png')}
          style={styles.image}
        />
      </View>
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleGetStarted}>
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
        
        <Text style={styles.signUpText}>
          Don't have an account?{' '}
          <Text style={styles.signUpLink}>Sign Up</Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#E8E6F7', //change here
    paddingVertical: 50,
  },
  header: {
    width: '100%',
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  purpleContainer: {
    width: '100%',
    height: 90,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4B0082',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
  },
  descriptionText: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#4B0082',
    textAlign: 'justify',
    marginVertical: 10,
    paddingHorizontal: 20,
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    flex: 1,
  },
  image: {
    // width: '100%',
    height: '100%',
    resizeMode: 'contain',
    backgroundColor: 'lightgray',
  },
  buttonContainer: {
    width: '100%',
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#4B0082',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
  },
  signUpText: {
    fontSize: 16,
    color: '#4B0082',
    textAlign: 'center',
    marginTop: 10,
  },
  signUpLink: {
    fontSize: 16,
    color: '#4B0082',
    fontWeight: 'bold',
  },
});

export default StartScreen;
