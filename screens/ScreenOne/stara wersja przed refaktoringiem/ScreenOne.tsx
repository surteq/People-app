// import React, { useEffect, useState } from 'react';
// import { View, Text, StyleSheet } from 'react-native';
// import { FlatList } from 'react-native-gesture-handler';

// interface User {
//     id: number;
//     name: string;
//     username: string;
//     email: string;
// }

// export const ScreenOne = () => {
//     const [users, setUsers] = useState<User[]>([]);

//     useEffect(() => {
//         fetch('https://jsonplaceholder.typicode.com/users')
//         .then((response) => response.json())
//         .then((data) => setUsers(data))
//         .catch((error) => console.error(error))
//     }, [])

//     const renderItem = ({item} : {item: User}) => (
//         <View style={styles.user}>
//             <Text style={styles.userName}>{item.name}</Text>
//             <Text style={styles.userEmail}>{item.email}</Text>
//         </View>
//     )
//     return (
//         <View style={styles.screen}>
//             <FlatList
//             data={users}
//             renderItem={renderItem}
//             keyExtractor={(item) => item.id.toString()}
//             />
//         </View>
//       );
//     };
    
//     const styles = StyleSheet.create({
//       screen: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//       },
//       user: {
//         borderWidth: 1,
//         borderColor: '#ccc',
//         padding: 10,
//         marginBottom: 10,
//         borderRadius: 5,
//         width: 400,
//         alignItems: 'center',
//       },
//       userName: {
//         fontWeight: 'bold',
//         fontSize: 16,
//         marginBottom: 5,
//       },
//       userEmail: {
//         color: '#888',
//       },
//     });
    
//     export default ScreenOne;


import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, SafeAreaView } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}

interface Comment {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
}

export const ScreenOne = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

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

  const handleUserPress = (user: User) => {
    setSelectedUser(user);
  };
  

  const renderItem = ({ item }: { item: User }) => (
    <TouchableOpacity onPress={() => handleUserPress(item)}>
      <View style={styles.user}>
        <Text style={styles.userName}>{item.name}</Text>
        <Text style={styles.userEmail}>{item.email}</Text>
      </View>
    </TouchableOpacity>
  );

  const filteredPosts = selectedUser
    ? posts.filter((post) => post.userId === selectedUser.id)
    : posts;
  
  useEffect(() => {
    if (selectedPost) {
      fetch(`https://jsonplaceholder.typicode.com/posts/${selectedPost.id}/comments`)
        .then((response) => response.json())
        .then((data) => setComments(data))
        .catch((error) => console.error(error));
    }
  }, [selectedPost]);

  const handlePostPress = (post: Post) => {
    setSelectedPost(post);
    setIsModalVisible(true);
  };
  
  const handleCloseModal = () => {
    setSelectedPost(null);
    setComments([]);
    setIsModalVisible(false);
  };  

  return (
    <View style={styles.screen}>
      <FlatList
        data={users}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
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
      {selectedPost && (
        <Modal visible={selectedPost != null} onRequestClose={handleCloseModal}>
          <SafeAreaView style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>{selectedPost.title}</Text>
              <Text style={styles.modalBody}>{selectedPost.body}</Text>
              <Text style={styles.commentsTitle}>Comments:</Text>
              <FlatList
              data={comments}
              renderItem={({ item }) => (
                  <View style={styles.comment}>
                  <Text style={styles.commentName}>{item.name}</Text>
                  <Text style={styles.commentEmail}>{item.email}</Text>
                  <Text style={styles.commentBody}>{item.body}</Text>
                  </View>
              )}
              keyExtractor={(item) => item.id.toString()}
              />
              <TouchableOpacity style={styles.modalCloseButton} onPress={handleCloseModal}>
                <Text style={styles.modalCloseButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </Modal>
          )}
    </View>
  );
};

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
  post: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  postTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
  },
  postBody: {
    color: '#333',
    marginBottom: 5,
  },
  postAuthor: {
    color: '#888',
    fontStyle: 'italic',
  },
  backButton: {
    backgroundColor: '#eee',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  backButtonText: {
    fontWeight: 'bold',
    color: '#333',
  },
  selectedUserText: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 10,
  },
  selectedUserContainer: {
    backgroundColor: '#eee',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  modalContent: {
    paddingBottom: 32,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  modalBody: {
    marginBottom: 16,
  },
  commentsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  comment: {
    paddingVertical: 8,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  commentName: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  commentEmail: {
    color: '#666',
    marginBottom: 4,
  },
  commentBody: {
    color: '#666',
  },
  modalCloseButton: {
    backgroundColor: '#2196F3',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
    alignSelf: 'flex-end',
  },
  modalCloseButtonText: {
    color: '#fff',
    },
});

export default ScreenOne;