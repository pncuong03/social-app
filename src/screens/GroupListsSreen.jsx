import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { MaterialIcons } from "@expo/vector-icons";
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { getGroupLists } from '../context/GroupContext';

export default function GroupListsScreen() {
    const navigation = useNavigation();
    const [groupData, setGroupData] = useState([]);
    useFocusEffect(
        React.useCallback(() => {
            const getGroup = async () => {
                try {
                    const data = await getGroupLists();
                    console.log(data.content);
                    setGroupData(data.content);
                } catch (error) {
                    console.error(error);
                }
            };

            getGroup();
        }, [])
    );
    const handlePress = (groupId) => {
        navigation.navigate('GroupDetail', { groupId });
    };
    return (
        <ScrollView>
            {groupData.map((group) => (
                <TouchableOpacity
                    onPress={() => handlePress(group.idGroup)}
                    key={group.idGroup}
                    style={{ flexDirection: 'row', padding: 10, alignItems: 'center' }}>
                    <MaterialIcons name={'group'} style={{ color: 'blue', fontSize: 24 }} />
                    <View style={{ display: 'flex', flexDirection: 'column' }}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', marginLeft: 10 }}>{group.name}</Text>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', marginLeft: 10 }}>Member:{group.memberCount}</Text>
                    </View>
                </TouchableOpacity>
            ))}
        </ScrollView>
    );
}