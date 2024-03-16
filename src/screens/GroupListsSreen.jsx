import React from 'react';
import { View, Text, Image, TouchableOpacity, Pressable } from 'react-native';
import GroupData from '../data/GroupData';
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

export default function GroupListsScreen() {
    const navigation = useNavigation();
    const handlePress = (groupId) => {
        navigation.navigate('GroupDetail', { groupId });
    };
    return (
        <ScrollView>
            {GroupData.map((group) => (
                <TouchableOpacity
                    onPress={() => handlePress(group.id)}
                    key={group.id}
                    style={{ flexDirection: 'row', padding: 10, alignItems: 'center' }}>
                    <Image source={group.image} style={{ width: 50, height: 50, borderRadius: 50 }} />
                    <View style={{ display: 'flex', flexDirection: 'column' }}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', marginLeft: 10 }}>{group.name}</Text>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', marginLeft: 10 }}>Member:{group.members.length}</Text>
                    </View>
                </TouchableOpacity>
            ))}
        </ScrollView>
    );
}
