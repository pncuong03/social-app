import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';
import GroupData from '../data/GroupData';

export default function GroupMemberListScreen({ route }) {
    // Get the groupId from route params
    const { groupId } = route.params;

    // Find the group with the matching ID
    const group = GroupData.find((g) => g.id === groupId);

    return (
        <ScrollView style={{ padding: 10, }}>
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 10,
            }}>
                <Image source={group.admin.image} style={{
                    width: 50,
                    height: 50,
                    borderRadius: 25,
                    marginRight: 10,
                }} />
                <Text style={{
                    fontSize: 18,
                    fontWeight: 'bold',
                }}>Admin: {group.admin.name}</Text>
            </View>
            <Text style={styles.membersText}>Members:</Text>
            {group.members.map((member) => (
                <View key={member.id} style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginBottom: 10,
                }}>
                    <Image source={member.image} style={{
                        width: 50,
                        height: 50,
                        borderRadius: 25,
                        marginRight: 10,
                    }} />
                    <Text style={{
                        fontSize: 16,
                        fontWeight: 'bold',
                        marginBottom: 10,
                    }}>{member.name}</Text>
                </View>
            ))}
        </ScrollView>
    );
}

