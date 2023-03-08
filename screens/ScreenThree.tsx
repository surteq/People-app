import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const ScreenThree = () => {
  return (
    <View style={styles.screen}>
      <Text>Screen Three</Text>
    </View>
  );
}

const styles = StyleSheet.create({
    screen: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

  export default ScreenThree;