import {
    View,
    Text,
    TouchableOpacity,
    Image,
    ScrollView,
    TextInput,
    Switch
} from "react-native";
import React, { useState, useEffect } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
import { friendRequests } from "../data/FriendData";
export default function NewGroup() {
    const [selectedImage, setSelectedImage] = useState("");
    const [name, setName] = useState("");
    const [selectedMember, setSelectedMember] = useState([]);
    const handleImageSelection = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 4],
            quality: 1,
        });

        console.log(result);

        if (!result.canceled) {
            setSelectedImage(result.assets[0].uri);
        }
    };
    const handleMemberSelection = (member,) => {
        setSelectedMember(prevState => {
            if (prevState.includes(member)) {
                return prevState.filter(m => m !== member);
            } else {
                return [...prevState, member];
            }
        });
    };
    return (
        <View style={{ marginTop: 100 }}>
            <View
                style={{
                    alignItems: "center",
                    marginHorizontal: 22,
                    paddingHorizontal: 22,
                }}
            >
                <TouchableOpacity onPress={handleImageSelection}>
                    <View
                        style={{
                            height: 170,
                            width: 170,
                            borderRadius: 20,
                            borderWidth: 2,
                            borderColor: "#242760",
                            overflow: "hidden",
                            marginTop: -90,
                        }}
                    >
                        {selectedImage ? ( // Add this condition
                            <Image
                                source={{ uri: selectedImage }}
                                style={{
                                    height: "100%",
                                    width: "100%",
                                }}
                            />
                        ) : null}
                        <View
                            style={{
                                position: "absolute",
                                bottom: 0,
                                right: 10,
                                zIndex: 9999,
                            }}
                        >
                            <MaterialIcons name="photo-camera" size={32} color={"#242760"} />
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
            <View style={{ paddingHorizontal: 22 }}>
                <View
                    style={{
                        marginTop: 10,
                    }}
                >
                    <View
                        style={{
                            flexDirection: "column",
                            marginBottom: 6,
                        }}
                    >
                        <Text style={{ fontSize: 16 }}>Group Name</Text>
                        <View
                            style={{
                                height: 44,
                                width: "100%",
                                borderColor: "rgba(84, 76, 76, 0.14)",
                                borderWidth: 1,
                                borderRadius: 4,
                                marginVertical: 6,
                                justifyContent: "center",
                                paddingLeft: 8,
                            }}
                        >
                            <TextInput
                                value={name}
                                onChangeText={(value) => setName(value)}
                                editable={true}
                            />
                        </View>
                    </View>
                </View>
            </View>
            <View style={{ paddingHorizontal: 22 }}>
                <Text style={{ fontSize: 24, marginBottom: 10 }}>Add member:</Text>
                <ScrollView>
                    {friendRequests.map((member) => (
                        <View key={member.id} style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Switch
                                value={selectedMember.includes(member)}
                                onValueChange={() => handleMemberSelection(member)}
                            />
                            <Image
                                source={member.image}
                                style={{
                                    width: 50,
                                    height: 50,
                                    borderRadius: 25,
                                    marginRight: 10,
                                }}
                            />
                            <Text style={{ fontSize: 18 }}>{member.name}</Text>
                        </View>
                    ))}
                </ScrollView>
            </View>
            <View style={{ paddingHorizontal: 22 }}>
                <TouchableOpacity
                    // onPress={handleUpdate}
                    style={{
                        backgroundColor: "black",
                        height: 44,
                        borderRadius: 6,
                        alignItems: "center",
                        justifyContent: "center",
                        marginTop: 20,
                    }}
                >
                    <Text
                        style={{
                            color: "white",
                            fontSize: 16,
                        }}
                    >
                        Create
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}