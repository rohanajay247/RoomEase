import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import tw from "tailwind-react-native-classnames";
import { collection, onSnapshot, query, where, getDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import useAuth from "../hooks/useAuth";
import ChatRow from "./ChatRow";
import { useNavigation } from "@react-navigation/native";

const ChatList = () => {
  const [matches, setMatches] = useState([]);
  const [matchedUserInfo, setMatchedUserInfo] = useState({});
  const { user } = useAuth();
  const navigation = useNavigation();

  useEffect(() => {
    if (!user) {
      console.log("User  is undefined");
      return;
    }

    console.log("Fetching matches for user ID:", user.uid);

    const unsubscribe = onSnapshot(
      query(collection(db, "matches"), where("usersMatched", "array-contains", user.uid)),
      (snapShot) => {
        if (snapShot.empty) {
          console.log("No matches found for this user."); // Debug log
          setMatches([]);
        } else {
          const matchesArray = snapShot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          console.log("Matches found:", matchesArray); // Debug log
          setMatches(matchesArray);
        }
      },
      (error) => {
        console.log("Error fetching matches:", error);
      }
    );

    return unsubscribe;
  }, [user]);

  useEffect(() => {
    if (matches.length > 0) {
      matches.forEach((match) => {
        const userId = match.usersMatched[0] === user.uid ? match.usersMatched[1] : match.usersMatched[0];
        console.log("Fetching info for user ID:", userId);

        getDoc(doc(db, "users", userId))
          .then((doc) => {
            if (doc.exists()) {
              console.log("Matched user info:", doc.data());
              setMatchedUserInfo((prevUserInfo) => ({ ...prevUserInfo, [match.id]: doc.data() }));
            } else {
              console.log("No such user document!");
            }
          })
          .catch((error) => {
            console.log("Error fetching user info:", error);
          });
      });
    }
  }, [matches]);

  const handleSwipeRight = (matchId) => {
    // Implement swipe right logic here
    // Update the matches array and matched user info accordingly
  };

  return matches.length > 0 ? (
    <FlatList
      style={tw.style("h-full")}
      data={matches}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <ChatRow
          matchDetails={item}
          navigation={navigation}
          matchedUserInfo={matchedUserInfo[item.id]}
          onSwipeRight={() => handleSwipeRight(item.id)}
        />
      )}
    />
  ) : (
    <View style={tw.style("p-5")}>
      <Text style={tw.style("text-center text-lg")}>No matches at the moment</Text>
    </View>
  );
};

export default ChatList;  