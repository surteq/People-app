import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, SafeAreaView, ScrollView } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { Comment } from './types'

interface CommentsProps{
  comments: Comment[],
  setComments: any,
  selectedPost: any,
  setSelectedPost: any,
  setIsModalVisible: any,
}

const SelectedCommentsPage = ({ comments, setComments, selectedPost, setSelectedPost, setIsModalVisible  }: CommentsProps) => {


  const handleCloseModal = () => {
    setSelectedPost(null);
    setComments([]);
    setIsModalVisible(false);
    };

  return (
    <View>
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
              <TouchableOpacity onPress={handleCloseModal} style={styles.backButton}>
            <Text style={styles.backButtonText}>Back to Posts</Text>
          </TouchableOpacity>
            </View>
          </SafeAreaView>
        </Modal>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingTop: 16,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
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
    backButton: {
      backgroundColor: '#e6e3e3',
      padding: 10,
      marginTop: 10,
      marginBottom: -30,
      borderRadius: 5,
    },
    backButtonText: {
      fontWeight: 'bold',
      color: '#333',
      textAlign: 'center',
    },
  })

export default SelectedCommentsPage

