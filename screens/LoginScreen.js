import { View, Text, TextInput, TouchableOpacity, Alert , StyleSheet} from "react-native";
import React, { useLayoutEffect, useState } from "react";
import tw from "tailwind-react-native-classnames";
import {
  updateProfile,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import Ionicons from "react-native-vector-icons/Ionicons"
import { auth } from "../firebase";
import useAuth from "../hooks/useAuth";
import { useNavigation } from "@react-navigation/native";
import { ImageBackground } from "react-native";

const colors = {
  primary: "#4B0082",  // Updated to indigo
  secondary: "#4B0082",  // Updated to indigo
  white: "#FFFFFF",
  gray: "#808080",
};

const LoginScreen = () => {
  const [type, setType] = useState(1); //1.signin 2.signup

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secureEntry, setSecureEntry] = useState(true);
  const { loading, setLoading } = useAuth();

  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const handleGoBack=()=>{
    navigation.goBack();
  };

  const handleForgotPassword = async () => {
    if (email.trim() === "") {
      return Alert.alert("Ohhh!!", "You have not entered your email");
    }
    setLoading(true);
    try{
    await auth.sendPasswordResetEmail(email)
      .then(() => {
        setLoading(false);
        Alert.alert("Success", "Password reset email sent successfully");
      })}
      catch(error) {
        setLoading(false);
        Alert.alert("Error", error.message);
      };
  };

  const signIn = () => {
    if (email.trim() === "" || password.trim === "") {
      return Alert.alert("Ohhh!!", "You have not entered all details");
    }
    setLoading(true);

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setLoading(false);
        navigation.navigate('Home');
      })
      .catch((error) => {
        setLoading(false);
      });
  };

  const signUp = () => {
    if (name.trim() === "" || email.trim() === "" || password.trim === "") {
      return Alert.alert("Ohhh!!", "You have not entered all details");
    }
    setLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        updateProfile(user, { displayName: name });
        setLoading(false);
        navigation.navigate('Home')
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
        setLoading(false);
      });
  };

  if (loading) {
    return (
      <View style={tw.style("flex-1 justify-center items-center")}>
        <Text style={tw.style("font-semibold text-red-400 text-2xl")}>
          Loading....
        </Text>
      </View>
    );
  }

  return (
    <ImageBackground
      style={tw.style("flex-1")}
      resizeMode="cover"
    >
      {type === 1 ? (
            <View style={styles.container}>
            <TouchableOpacity style={styles.backButtonWrapper} onPress={handleGoBack}>
              <Ionicons name ={"arrow-back-outline"} color={colors.primary} size={30}/>
              </TouchableOpacity>
          <View style={styles.textContainer}>
          <Text style={styles.Headingtext}>Hey,</Text>
          <Text style={styles.Headingtext}>Welcome</Text>
          <Text style={styles.Headingtext}>Back</Text>
          </View>
          <View style={styles.formContainer}>
            <View style={styles.inputContainer}>
              <Ionicons name={"person"} size={30} color={colors.gray}/>
              <TextInput style={styles.textInput} 
              placeholder='Enter your Email'
              placeholderTextColor={colors.gray}
              value={email}
              onChangeText={(text) => setEmail(text)}
              />
            </View>
            <View style={styles.formContainer}>
            <View style={styles.inputContainer}>
              <Ionicons name={"lock-closed"} size={30} color={colors.gray}/>
              <TextInput style={styles.textInput} 
              placeholder='Enter your password'
              placeholderTextColor={colors.gray}
              secureTextEntry={secureEntry}
              value={password}
              onChangeText={(text) => setPassword(text)}/>
              <TouchableOpacity
              onPress={() => {
                setSecureEntry((prev) => !prev);
              }}
              >
                <Ionicons name={"eye"} size={20} color={colors.gray}/>
              </TouchableOpacity>
            </View>
            </View>
            <TouchableOpacity>
              <Text style={styles.forgotText} onPress={handleForgotPassword}>Forgot Password</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.loginButtonWrapper} onPress={signIn}>
              <Text style={styles.loginText}>Login</Text>
            </TouchableOpacity>
          <View style={styles.footerText}>
            <Text style={styles.accountText}>Don't have an Account?</Text>
            <Text style={styles.signUpText} onPress={()=> setType(2)}>Register</Text>
          </View>
          </View>
      
          </View>
      ) : (
        <View style={styles.container}>
        <TouchableOpacity style={styles.backButtonWrapper} onPress={handleGoBack}>
          <Ionicons name ={"arrow-back-outline"} color={colors.primary} size={30}/>
          </TouchableOpacity>
      <View style={styles.textContainer}>
      <Text style={styles.Headingtext}>Let's Get</Text>
      <Text style={styles.Headingtext}>Started</Text>
      </View>
      <View style={styles.formContainer}>
      <View style={styles.inputContainer}>
          <Ionicons name={"person"} size={30} color={colors.gray}/>
          <TextInput style={[styles.textInput, styles.type2Input]} 
          placeholder='Enter your Name'
          placeholderTextColor={colors.gray}
          value={name}
          onChangeText={(text) => setName(text)}/>
        </View>
        </View>
        <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <Ionicons name={"person"} size={30} color={colors.gray}/>
          <TextInput style={styles.textInput} 
          placeholder='Enter your Email'
          placeholderTextColor={colors.gray}
          value={email}
          onChangeText={(text) => setEmail(text)}
          secureTextEntry={false}/>
        </View>
        </View>
        <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <Ionicons name={"lock-closed"} size={30} color={colors.gray}/>
          <TextInput style={styles.textInput} 
          placeholder='Enter your password'
          placeholderTextColor={colors.gray}
          secureTextEntry={secureEntry}
          value={password}
          onChangeText={(text) => setPassword(text)}/>
          <TouchableOpacity
          onPress={() => {
            setSecureEntry((prev) => !prev);
          }}
          >
            <Ionicons name={"eye"} size={20} color={colors.gray}/>
          </TouchableOpacity>
        </View>
        </View>
        <TouchableOpacity>
          <Text style={styles.forgotText}>Forgot Password</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.loginButtonWrapper} onPress={signUp}>
          <Text style={styles.loginText}>Sign Up</Text>
        </TouchableOpacity>
      <View style={styles.footerText}>
        <Text style={styles.accountText}>Have an Account?</Text>
        <Text style={styles.signUpText} onPress={() => setType(1)}>Login</Text>
      </View>
      </View>
 
      )}
    </ImageBackground>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:colors.white,
    padding:20,
  },
  backButtonWrapper:{
    height:40,
    width:40,
    backgroundColor:colors.gray,
    borderRadius:20,
    justifyContent:'center',
    alignItems:'center',
  },
  textContainer:{
    marginVertical:20,
  },
  Headingtext:{
    fontSize:32,
    color:colors.secondary,
    fontWeight:"bold"
  },
  formContainer:{
    marginTop:20,
  },
  inputContainer:{
    borderWidth:1,
    borderColor:colors.primary,
    borderRadius:20,
    paddingHorizontal:20,
    flexDirection:'row',
    alignItems:'center',
    padding:2,
  },
  textInput:{
    flex:1,
    paddingHorizontal:10,
    fontFamily:"System"
  },
    type2Input: {
    // Add your custom styles for type2 input here // Example style
    borderRadius: 10, // Example style
  },
  forgotText:{
    textAlign:"right",
    color:colors.primary,
    marginVertical:10,
  },
  loginButtonWrapper:{
    backgroundColor:colors.secondary,
    borderRadius:100,
    marginVertical:10,
  },
  loginText:{
    color:colors.white,
    fontSize:20,
    textAlign:'center',
    padding:12,
  },
  continueText:{
    marginVertical:20,
    textAlign:'center',
    fontSize:14,
    color:colors.primary,
    fontWeight:'bold'
  },
  footerText:{
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    marginVertical:20,
    gap:5,
  },
  accountText:{
    color:colors.gray,
  },
  signUpText:{
    color:colors.gray,
  }
});