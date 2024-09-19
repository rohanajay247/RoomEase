import React, { useState } from "react";
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/MaterialIcons';

const QuestionScreen = () => {
  const navigation = useNavigation();
  const [selected, setSelected] = useState(null);

  const handleSelect = (option) => {
    setSelected(option);
  };

  const handleNext = () => {
    if (selected === 'yes') {
      navigation.navigate("RoomLocation");
    } else if (selected === 'no') {
      navigation.navigate("Location");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="#4B0082" />
        </TouchableOpacity>
      </View>

      <View style={styles.titleContainer}>
        <Text style={styles.title}>Accomodation</Text>
      </View>

      <View style={styles.contentContainer}>
        <Text style={styles.questionText}>
          Do you have a house/ a place to stay?
        </Text>

        <TouchableOpacity
          style={[styles.optionButton, selected === 'yes' && styles.selectedOption]}
          onPress={() => handleSelect('yes')}
        >
          <Text style={[styles.optionText, selected === 'yes' && styles.selectedOptionText]}>
            Yes, I do have a place
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.optionButton, selected === 'no' && styles.selectedOption]}
          onPress={() => handleSelect('no')}
        >
          <Text style={[styles.optionText, selected === 'no' && styles.selectedOptionText]}>
            No, I'm looking for a place
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={[styles.nextButton, !selected && styles.disabledButton]}
        onPress={handleNext}
        disabled={!selected}
      >
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  header: {
    paddingTop: 40,
    marginBottom: 10,
  },
  backButton: {
    padding: 5,
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4B0082',
    textAlign: 'center',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingBottom: 170,
  },
  questionText: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  optionButton: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#4B0082",
    padding: 15,
    borderRadius: 25,
    marginBottom: 15,
  },
  selectedOption: {
    backgroundColor: "#4B0082",
  },
  optionText: {
    color: "#4B0082",
    textAlign: "center",
    fontSize: 16,
  },
  selectedOptionText: {
    color: "white",
  },
  nextButton: {
    backgroundColor: "#4B0082",
    padding: 15,
    borderRadius: 25,
    marginBottom: 20,
  },
  disabledButton: {
    backgroundColor: "#A0A0A0",
  },
  nextButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default QuestionScreen;