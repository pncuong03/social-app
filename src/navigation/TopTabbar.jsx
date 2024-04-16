import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import VectorIcon from "../utils/VectorIcon";
import { Colors } from "../utils/Colors";
import { TabData } from "../data/TabData";
import { StyleSheet, Text, View } from "react-native";

const Tab = createMaterialTopTabNavigator();

const TopTabbar = ({ data }) => {
  return (
    <>
      <Tab.Navigator
        screenOptions={() => ({
          tabBarShowLabel: false,
          tabBarActiveTintColor: Colors.primaryColor,
          tabBarInactiveTintColor: Colors.grey,
        })}
      >
        {TabData.map((tab) => (
          <Tab.Screen
            key={tab.id}
            name={tab.name}
            component={tab.route}
            options={{
              tabBarIcon: ({ color, focused }) => (
                <>
                  <VectorIcon
                    type={focused ? tab.activeiconType : tab.inactiveIconType}
                    name={focused ? tab.activeIconName : tab.inactiveIconName}
                    size={focused ? tab.size : tab.unFocusSize}
                    color={color}
                  />
                  {tab.name === "Notification" && data.informCount > 0 && (
                    <View style={styles.notificationBadge}>
                      <Text style={styles.notificationText}>
                        {data.informCount}
                      </Text>
                    </View>
                  )}
                </>
              ),
            }}
          />
        ))}
      </Tab.Navigator>
    </>
  );
};

const styles = StyleSheet.create({
  notificationBadge: {
    position: "absolute",
    right: -2,
    backgroundColor: "red",
    borderRadius: 10,
    paddingHorizontal: 3,
    paddingVertical: 2,
  },
  notificationText: {
    color: "white",
    fontSize: 8,
    fontWeight: "bold",
  },
});

export default TopTabbar;
