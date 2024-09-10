import {
  Button,
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
// import useAuth from "../hooks/useAuth";
import { useNavigation } from "@react-navigation/native";
import tw from "tailwind-react-native-classnames";
import { AntDesign, Entypo, Ionicons } from "@expo/vector-icons";
import Swiper from "react-native-deck-swiper";
// import { db, timestamp } from "../firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  setDoc,
  where,
} from "firebase/firestore";
// import generateId from "../lib/generateId";

const RenderCard = (props) => {
  const { card } = props;

  return (
    <View key={card.id} style={tw.style("bg-white h-3/4 rounded-xl relative")}>
      <Image
        style={tw.style("absolute top-0 h-full w-full rounded-xl")}
        source={{ uri: card.photoURL }}
      />

      <View
        style={tw.style(
          "absolute bottom-0 bg-white w-full h-20 justify-between items-center flex-row px-6 py-2 rounded-b-xl shadow-xl"
        )}
      >
        <View>
          <Text style={tw.style("text-xl font-bold")}>{card.displayName}</Text>
          <Text>{card.job}</Text>
        </View>
        <Text style={tw.style("text-2xl font-bold")}>{card.age}</Text>
      </View>
    </View>
  );
};

export default RenderCard;
