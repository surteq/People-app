import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import UsersPage from './UsersPage';
import SelectedPostsPage from './SelectedPostsPage';
import SelectedCommentsPage from './SelectedCommentsPage'
import { User, Post, Comment } from './types'

const ScreenOne = () => {
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
          <UsersPage
            users={users} 
            onSelectUser={setSelectedUser}
          />
          <SelectedPostsPage 
            posts={posts} 
            selectedUser={selectedUser}
            setSelectedUser={setSelectedUser} 
            setSelectedPost={setSelectedPost} 
            setIsModalVisible={setIsModalVisible} 
          />
          <SelectedCommentsPage
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
export default ScreenOne;