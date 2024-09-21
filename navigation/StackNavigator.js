import { StyleSheet, Text, View } from "react-native";
import React from "react";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";
import ChatScreen from "../screens/ChatScreen";
import InterestScreen from "../screens/InterestScreen";
import LoginScreen from "../screens/LoginScreen";
import ModalScreen from "../screens/ModalScreen";
import useAuth from "../hooks/useAuth";
import MatchScreen from "../screens/MatchScreen";
import MessageScreen from "../screens/MessageScreen";
import ProfileScreen from "../screens/ProfileScreen";
import QuestionScreen from "../screens/QuestionScreen";
import LocationScreen from "../screens/LocationScreen";
import RoomLocation from "../screens/RoomLocation";
import RoomDetails from "../screens/RoomDetails";
import RoomPhotoUploadScreen from "../screens/RoomPhotoUploadScreen";
import StartScreen from "../screens/StartScreen";

const Stack = createStackNavigator();

const StackNavigator = () => {
  const { user } = useAuth();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {user ? (
        <>
          <Stack.Group>
            <Stack.Screen name="Start" component={StartScreen} />
            <Stack.Screen name="Login" component={LoginScreen}/>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Chat" component={ChatScreen} />
            <Stack.Screen name="Message" component={MessageScreen} />
            <Stack.Screen name="Profile" component={ProfileScreen} />
            <Stack.Screen name="Interest" component={InterestScreen} />
            <Stack.Screen name="Question" component={QuestionScreen} />
            <Stack.Screen name="Location" component={LocationScreen} />
            <Stack.Screen name="RoomLocation" component={RoomLocation} />
            <Stack.Screen name="RoomDetails" component={RoomDetails} />
            <Stack.Screen name="RoomPhoto" component={RoomPhotoUploadScreen} />



            
          </Stack.Group>
          <Stack.Group
            screenOptions={{
              presentation: "modal",
              ...TransitionPresets.ModalPresentationIOS,
            }}
          >
            <Stack.Screen name="Modal" component={ModalScreen} />
          </Stack.Group>
          <Stack.Group
            screenOptions={{
              presentation: "transparentModal",
              ...TransitionPresets.ModalPresentationIOS,
            }}
          >
            <Stack.Screen name="Match" component={MatchScreen} />
          </Stack.Group>
        </>
      ) : (
        <Stack.Screen name="Login" component={LoginScreen} />
      )}
    </Stack.Navigator>
  );
};

export default StackNavigator;
