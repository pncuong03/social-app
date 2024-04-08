import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import React from "react";
import VectorIcon from "../utils/VectorIcon";
import { Colors } from "../utils/Colors";
import { useNavigation } from "@react-navigation/native";

const MessageDetail = ({ route }) => {
  const navigation = useNavigation();
  const { chatId1, fullname1, img1 } = route.params;
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{ marginLeft: 10 }}
        onPress={() =>
          navigation.push("ChatPrivate", {
            chatId: chatId1,
            fullname: fullname1,
            img: img1,
          })
        }
      >
        <VectorIcon
          name="arrowleft"
          type="AntDesign"
          size={24}
          color={Colors.primaryColor}
        />
      </TouchableOpacity>
      <View style={styles.info}>
        <Image
          style={{
            width: 100,
            height: 100,
            borderRadius: 5,
            marginBottom: 15,
          }}
          source={{ uri: img1 }}
        />
        <Text style={{ fontSize: 22, fontWeight: 600 }}>{fullname1}</Text>
        <View style={styles.icon}>
          <TouchableOpacity
            style={{ alignItems: "center" }}
            onPress={() => navigation.push("ManageMember")}
          >
            <VectorIcon
              name="person-add-alt-1"
              type="MaterialIcons"
              size={24}
              color={Colors.primaryColor}
            />
            <Text style={{ fontSize: 15, fontWeight: 400 }}>Add</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ alignItems: "center" }}>
            <VectorIcon
              name="notifications"
              type="MaterialIcons"
              size={24}
              color={Colors.primaryColor}
            />
            <Text style={{ fontSize: 15, fontWeight: 400 }}>Mute</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.section}>
        <Text style={{ fontSize: 12, color: Colors.borderGrey }}>
          More Actions
        </Text>
        <TouchableOpacity>
          <Text style={{ fontSize: 15, fontWeight: 400 }}>
            View photos & videos
          </Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={{ fontSize: 15, fontWeight: 400 }}>
            Search in conversation
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.push("ManageMember")}>
          <Text style={{ fontSize: 15, fontWeight: 400 }}>View members</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={{ fontSize: 12, color: Colors.borderGrey }}>Privacy</Text>
        <TouchableOpacity>
          <Text style={{ fontSize: 15, fontWeight: 400 }}>Notifications</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={{ fontSize: 15, fontWeight: 400 }}>Block</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={{ fontSize: 15, fontWeight: 400 }}>Report</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 25,
  },
  info: {
    alignItems: "center",
    gap: 10,
    marginBottom: 20,
  },
  icon: {
    flexDirection: "row",
    gap: 50,
  },
  section: {
    borderTopWidth: 1,
    borderTopColor: Colors.borderGrey,
    gap: 10,
    padding: 12,
  },
});

export default MessageDetail;
