import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { MaterialIcons } from "@expo/vector-icons";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { getGroupLists } from "../context/GroupContext";

export default function GroupListsScreen() {
  const navigation = useNavigation();
  const [groupData, setGroupData] = useState([]);
  useFocusEffect(
    React.useCallback(() => {
      const getGroup = async () => {
        try {
          const data = await getGroupLists();
          // console.log(data.content);
          setGroupData(data.content);
        } catch (error) {
          console.error(error);
        }
      };

      getGroup();
    }, [])
  );
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
