import React from 'react';
import { View, Text, Image, TouchableOpacity, Pressable } from 'react-native';
import { MaterialIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import GroupLists from './GroupListsSreen';
import NewGroup from './NewGroup';

const Tab = createBottomTabNavigator();

export default function GroupScreen() {
    const navigation = useNavigation();

    return (
        <View style={{ flex: 1 }}>
            <View style={{ marginBottom: 50 }}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={{
                        zIndex: 99,
                        position: "absolute",
                        left: 10,
                        top: 10,
                    }}
                >
                    <MaterialIcons name="arrow-back" size={35} color={"black"} />
                </TouchableOpacity>
            </View>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;

                        if (route.name === 'Group for you') {
                            iconName = focused ? 'group' : 'group';
                        } else if (route.name === 'New Group') {
                            iconName = focused ? 'group-add' : 'group-add';
                        }

                        return <MaterialIcons name={iconName} size={size} color={color} />;
                    },
                    tabBarActiveTintColor: 'blue',
                    tabBarInactiveTintColor: 'gray',
                    tabBarLabelStyle: { fontSize: 12 },
                    tabBarStyle: { backgroundColor: 'white' },
                })}
            >
                <Tab.Screen name="Group for you" component={GroupLists} />
                <Tab.Screen name="New Group" component={NewGroup} />
            </Tab.Navigator>
        </View>
    );
}