import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const NumericInput = ({ value, onChange, minValue, maxValue, step }) => {
  const increment = () => {
    if (value < maxValue) {
      onChange(value + step);
    }
  };

  const decrement = () => {
    if (value > minValue) {
      onChange(value - step);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.valueContainer}>
        <Text style={styles.valueText}>{value}</Text>
      </View>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity onPress={increment} style={[styles.button, styles.buttonTop]}>
          <Ionicons name="chevron-up" size={20} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity onPress={decrement} style={styles.button}>
          <Ionicons name="chevron-down" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: "5%",
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 15,
    width: 125,
    overflow: 'hidden',
  },
  buttonsContainer: {
    backgroundColor: 'teal',
    justifyContent: 'space-between',
  },
  button: {
    paddingVertical: 3,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonTop: {
    borderBottomWidth: 1,
    borderBottomColor: '#fff',
  },
  valueContainer: {
    backgroundColor: '#fff',
    paddingHorizontal: 25,
    justifyContent: 'center',
    borderRightWidth: 1,
    borderColor: '#ccc',
  },
  valueText: {
    fontSize: 18,
  },
});

export default NumericInput;
