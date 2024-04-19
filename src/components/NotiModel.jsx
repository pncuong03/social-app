import React, { useState, useEffect } from "react";
import { View, Text, Modal, TouchableOpacity } from "react-native";

const NotificationModal = ({ isVisible, message, type, onClose }) => {
  const [backgroundColor, setBackgroundColor] = useState("grey");
  const [textColor, setTextColor] = useState("black");

  useEffect(() => {
    determineColors(type);
  }, [type]);

  const determineColors = (type) => {
    if (type === "success") {
      setBackgroundColor("white");
      setTextColor("black");
    } else if (type === "error") {
      setBackgroundColor("white");
      setTextColor("red");
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={() => onClose()}
    >
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(0,0,0,0.5)",
        }}
      >
        <View
          style={{
            flexDirection: "column",
            gap: 20,
            backgroundColor: backgroundColor,
            padding: 20,
            borderRadius: 10,
            alignItems: "center",
          }}
        >
          <Text style={{ color: textColor, fontSize: 20 }}>{message}</Text>
          <TouchableOpacity
            onPress={() => onClose()}
            style={{
              marginTop: 10,
              backgroundColor: "#ddd",
              padding: 10,
              borderRadius: 5,
            }}
          >
            <Text style={{ color: "#333", fontSize: 18 }}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default NotificationModal;
