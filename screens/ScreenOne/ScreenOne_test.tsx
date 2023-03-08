import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import SelectedPost_test from './SelectedPost_test';
import SelectedUser_test from './SelectedUser_test';
import SelectedComment_test from './SelectedComment_test'
import { User, Post, Comment } from './types'

export const ScreenOne_test = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error(error));

    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((response) => response.json())
      .then((data) => setPosts(data))
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    if (selectedPost) {
    fetch(`https://jsonplaceholder.typicode.com/posts/${selectedPost.id}/comments`)
    .then((response) => response.json())
    .then((data) => setComments(data))
    .catch((error) => console.error(error));
    }
    }, [selectedPost]);

 
 return (
        <View style={styles.screen}>
          <SelectedUser_test 
            users={users} 
            onSelectUser={setSelectedUser}
          />
          <SelectedPost_test 
            posts={posts} 
            selectedUser={selectedUser}
            setSelectedUser={setSelectedUser} 
            setSelectedPost={setSelectedPost} 
            setIsModalVisible={setIsModalVisible} 
          />
          <SelectedComment_test 
          comments={comments}
          setComments={setComments}
          selectedPost={selectedPost}
          setSelectedPost={setSelectedPost} 
          setIsModalVisible={setIsModalVisible}
          />
        </View>
    )

}

const styles = StyleSheet.create({
    screen: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
})
export default ScreenOne_test;