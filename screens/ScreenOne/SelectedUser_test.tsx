import React, { useEffect, useState } from 'react'
import { FlatList } from 'react-native-gesture-handler';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { User } from './types'

interface UsersProps {
  users: User[];
  onSelectUser: (user: User) => void;

}
  
const SelectedUser_test = ({ users, onSelectUser }: UsersProps) => {

    const renderItem = ({ item }: { item: User }) => (
    <TouchableOpacity onPress={() => handleUserPress(item)}>
      <View style={styles.user}>
        <Text style={styles.userName}>{item.name}</Text>
        <Text style={styles.userEmail}>{item.email}</Text>
      </View>
    </TouchableOpacity>
  );

  const handleUserPress = (user: User) => {
    onSelectUser(user);
  };

    return (
        <FlatList
            data={users}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
        />
    )
}
const styles = StyleSheet.create({
    screen: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    user: {
      borderWidth: 1,
      borderColor: '#ccc',
      padding: 10,
      marginBottom: 10,
      borderRadius: 5,
      width: 400,
      alignItems: 'center',
    },
    userName: {
      fontWeight: 'bold',
      fontSize: 16,
      marginBottom: 5,
    },
    userEmail: {
      color: '#888',
    },
})
export default SelectedUser_test;