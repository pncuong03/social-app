import React from "react";
import { View, Text, Modal, TouchableOpacity, StyleSheet } from "react-native";

const LikedByModal = ({ visible, onClose, likedBy }) => {
  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Liked By</Text>
          <TouchableOpacity onPress={onClose}>
            <Text style={styles.closeButton}>Close</Text>
          </TouchableOpacity>
        </View>
        {/* <View style={styles.content}>
          {likedBy.map((user, index) => (
            <Text key={index} style={styles.user}>
              {user}
            </Text>
          ))}
        </View> */}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  closeButton: {
    fontSize: 16,
    color: "#007BFF",
  },
  content: {
    flex: 1,
  },
  user: {
    fontSize: 18,
    marginBottom: 10,
  },
});

export default LikedByModal;
