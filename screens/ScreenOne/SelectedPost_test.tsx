import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import {Post} from './types'

interface PostsProps {
  posts: Post[];
  selectedUser: any;
  setSelectedUser: any;
  setSelectedPost: any;
  setIsModalVisible: any;

}

const SelectedPost = ({ posts, selectedUser, setSelectedUser, setSelectedPost, setIsModalVisible  }: PostsProps) => {

  const handlePostPress = (post: Post) => {
    setSelectedPost(post);
    setIsModalVisible(true);
  };

  const filteredPosts = selectedUser
    ? posts.filter((post: { userId: any; }) => post.userId === selectedUser.id)
    : posts;

  return (
    <View>
      {selectedUser && (
        <View style={styles.selectedUserContainer}>
          <Text style={styles.selectedUserText}>{selectedUser.name}'s Posts</Text>
          <FlatList
            data={filteredPosts}
            renderItem={({ item }) => (
              <View style={styles.post}>
                <TouchableOpacity onPress={() => handlePostPress(item)}>
                  <Text style={styles.postTitle}>{item.title}</Text>
                  <Text style={styles.postBody}>{item.body}</Text>
                </TouchableOpacity>
              </View>
            )}
            keyExtractor={(item) => item.id.toString()}
          />
          <TouchableOpacity onPress={() => setSelectedUser(null)} style={styles.backButton}>
            <Text style={styles.backButtonText}>Back to Users</Text>
          </TouchableOpacity>
        </View>
        
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  selectedUserContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  selectedUserText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  post: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    width: '100%',
  },
  postTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
  },
  postBody: {
    color: '#888',
  },
  backButton: {
    backgroundColor: '#e6e3e3',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    marginBottom: -10,
    width: '100%',
    alignItems: 'center',
  },
  backButtonText: {
    fontWeight: 'bold',
    color: '#333',
  },
});

export default SelectedPost;
