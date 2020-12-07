import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import PhoneInput from 'phone-number-with-country-code';

export default function App() {
  const [mobileNumber, setMobileNumber] = useState('');

  return (
    <View style={styles.container}>
      <PhoneInput phoneNumber={(data) => { setMobileNumber(data) }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: Dimensions.get("screen").height / 2
  },
});
