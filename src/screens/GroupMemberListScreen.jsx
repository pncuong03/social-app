import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';
import { getGroupMember } from '../context/GroupContext';
import { AuthContext } from '../context/AuthContext';
import { getPostsOfGroup } from '../context/PostContext';

export default function GroupMemberListScreen({ route }) {
    // Get the groupId from route params
    const { userInfo } = useContext(AuthContext);
    console.log(userInfo);
    const { groupId } = route.params;
    console.log(groupId);
    const [member, setMembers] = useState([]);
    useEffect(() => {
        const fetchMembers = async () => {
            console.log(userInfo.accessToken); // Log the access token
            try {
                const memberData = await getPostsOfGroup(userInfo.accessToken,groupId);
                console.log(memberData); 
                setMembers(memberData);
            } catch (error) {
                console.error("Error:", error);
            }
        };
        fetchMembers();
    }, []);
    console.log(member);
    return (
        <View>
            <Text>ALO</Text>
        </View>
        // <ScrollView style={{ padding: 10, }}>
        //     <View style={{
        //         flexDirection: 'row',
        //         alignItems: 'center',
        //         marginBottom: 10,
        //     }}>
        //         <Image source={group.admin.image} style={{
        //             width: 50,
        //             height: 50,
        //             borderRadius: 25,
        //             marginRight: 10,
        //         }} />
        //         <Text style={{
        //             fontSize: 18,
        //             fontWeight: 'bold',
        //         }}>Admin: {group.admin.name}</Text>
        //     </View>
        //     <Text style={{
        //         fontSize: 16,
        //         fontWeight: 'bold',
        //         marginBottom: 10,
        //     }}>Members:</Text>
        //     {group.members.map((member) => (
        //         <View key={member.id} style={{
        //             flexDirection: 'row',
        //             alignItems: 'center',
        //             marginBottom: 10,
        //         }}>
        //             <Image source={member.image} style={{
        //                 width: 50,
        //                 height: 50,
        //                 borderRadius: 25,
        //                 marginRight: 10,
        //             }} />
        //             <Text style={{
        //                 fontSize: 16,
        //                 fontWeight: 'bold',
        //                 marginBottom: 10,
        //             }}>{member.name}</Text>
        //         </View>
        //     ))}
        // </ScrollView>
    );
}

