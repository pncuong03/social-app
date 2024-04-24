import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { MaterialIcons } from "@expo/vector-icons";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { getGroupLists } from "../context/GroupContext";
import { Colors } from "../utils/Colors";
import VectorIcon from "../utils/VectorIcon";

export default function GroupListsScreen() {
  const navigation = useNavigation();
  const [groupData, setGroupData] = useState([]);
  useFocusEffect(
    React.useCallback(() => {
      const getGroup = async () => {
        try {
          const data = await getGroupLists();
          setGroupData(data.content);
        } catch (error) {
          console.error(error);
        }
      };

      getGroup();
    }, [])
  );
  console.log(11, groupData);
  const handlePress = (groupId) => {
    navigation.navigate("GroupDetail", { groupId });
  };
  return (
    <ScrollView style={{ backgroundColor: "#f0f2f5" }}>
      {groupData.map((group) => (
        <TouchableOpacity
          onPress={() => handlePress(group.idGroup)}
          key={group.idGroup}
          style={{
            flexDirection: "row",
            padding: 20,
            alignItems: "center",
            backgroundColor: "#fff",
            marginBottom: 10,
            borderRadius: 5,
            borderWidth: 1,
            borderColor: "#ddd",
          }}
        >
          <MaterialIcons
            name={"group"}
            style={{ color: "blue", fontSize: 30 }}
          />
          <View
            style={{ display: "flex", flexDirection: "column", marginLeft: 10 }}
          >
            <Text style={{ fontSize: 24, fontWeight: "bold" }}>
              {group.name}
            </Text>
            {group.tagList && group.tagList.length > 0 && (
              <Text style={{ fontSize: 20, color: "#65676b" }}>
                - {group.tagList[0]}
              </Text>
            )}
            <Text style={{ fontSize: 20, color: "#65676b" }}>
              Members: {group.memberCount}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const style = StyleSheet.create({
  header: {
    margin: 5,
    padding: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  checkBox: {
    marginLeft: "40%",
  },
  headerleft: {
    flexDirection: "row",
    alignContent: "space-between",
    alignItems: "center",
  },
  chatsText: {
    fontWeight: "400",
    fontSize: 26,
    marginLeft: 10,
  },
  headerright: {
    flexDirection: "row",
    alignContent: "space-between",
    alignItems: "center",
    gap: 10,
  },
  search: {
    flexDirection: "row",
    width: "100%",
    marginBottom: 10,
  },
  unread: {
    display: "flex",
    alignItems: "center",
    width: "21%",
    marginTop: 10,
    backgroundColor: Colors.borderGrey,
    borderRadius: 15,
    padding: 8,
    marginLeft: 10,
  },
  searchView: {
    alignItems: "center",
    width: "70%",
    flexDirection: "row",
    backgroundColor: Colors.borderGrey,
    borderRadius: 15,
    marginLeft: 10,
    marginTop: 10,
    padding: 5,
  },
  imgHeader: {
    width: 50,
    height: 50,
    borderRadius: 30,
  },
});
