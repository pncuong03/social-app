import { View, Text, TouchableOpacity, Image, ScrollView, TextInput } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";

export default function EditProfile() {
    const navigation = useNavigation();
    const [selectedImage, setSelectedImage] = useState("https://gravatar.com/avatar/f5cf89b54d6c4eef3bc102862eae46f0?s=400&d=robohash&r=x");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [password, setPassword] = useState("");
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


    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: '#fff',
            // paddingHorizontal: 22,
        }}>
            <View
                style={{
                    // marginHorizontal: 12,
                    // flexDirection: "row",
                    // justifyContent: "center",
                    width: "100%",
                }}
            >
                <Image
                    source={{ uri: "https://plainbackground.com/download.php?imagename=39569c.png" }}
                    style={{
                       height:228,
                        width: "100%",
                    }}
                />

                <TouchableOpacity
                    onPress={() => navigation.push('MainScreen')}
                    style={{
                        zIndex: 99,
                        position: "absolute",
                        left: 0,
                        top: 10,
                    }}
                >
                    <MaterialIcons
                        name="keyboard-arrow-left"
                        size={35}
                        color={"black"}
                    />
                </TouchableOpacity>

                <Text style={{
                    fontSize: 18,
                    position: "absolute",
                    top: 10,
                    left: 0,
                    right: 0,
                    textAlign: "center"
                }} >Edit Profile</Text>
            </View>
            {/* <ScrollView > */}


                <View style={{
                    alignItems: 'center',
                    marginHorizontal: 22,
                    paddingHorizontal: 22,
                   
                }}>
                    <TouchableOpacity
                        onPress={handleImageSelection}
                    >
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
                            <Image
                                source={{ uri: selectedImage }}
                                style={{
                                    height: "100%",
                                    width: "100%",
                                }}
                            />
                            <View
                                style={{
                                    position: "absolute",
                                    bottom: 0,
                                    right: 10,
                                    zIndex: 9999,
                                }}
                            >
                                <MaterialIcons
                                    name="photo-camera"
                                    size={32}
                                    color={'#242760'}
                                />
                            </View>
                        </View>
                    </TouchableOpacity>

                </View>
                <View style={{paddingHorizontal: 22,}}>
                <View style={{
                    marginTop: 10,
                    
                }}>
                    <View
                        style={{
                            flexDirection: "column",
                            marginBottom: 6,
                        }}>
                        <Text style={{ fontSize: 16 }}>UserName</Text>
                        <View
                            style={{
                                height: 44,
                                width: "100%",
                                borderColor: 'rgba(84, 76, 76, 0.14)',
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
                <View style={{
                    marginTop: 10
                }}>
                    <View
                        style={{
                            flexDirection: "column",
                            marginBottom: 6,
                        }}>
                        <Text style={{ fontSize: 16 }}>Email</Text>
                        <View
                            style={{
                                height: 44,
                                width: "100%",
                                borderColor: 'rgba(84, 76, 76, 0.14)',
                                borderWidth: 1,
                                borderRadius: 4,
                                marginVertical: 6,
                                justifyContent: "center",
                                paddingLeft: 8,
                            }}
                        >
                            <TextInput
                                value={email}
                                onChangeText={(value) => setEmail(value)}
                                editable={true}
                            />
                        </View>

                    </View>
                </View>
                <View style={{
                    marginTop: 10
                }}>
                    <View
                        style={{
                            flexDirection: "column",
                            marginBottom: 6,
                        }}>
                        <Text style={{ fontSize: 16 }}>Phone Number</Text>
                        <View
                            style={{
                                height: 44,
                                width: "100%",
                                borderColor: 'rgba(84, 76, 76, 0.14)',
                                borderWidth: 1,
                                borderRadius: 4,
                                marginVertical: 6,
                                justifyContent: "center",
                                paddingLeft: 8,
                            }}
                        >
                            <TextInput
                                value={phoneNumber}
                                onChangeText={(value) => setPhoneNumber(value)}
                                editable={true}
                            />
                        </View>

                    </View>
                </View>
                <View style={{
                    marginTop: 30
                }}>
                    <View
                        style={{
                            flexDirection: "column",
                            marginBottom: 6,
                        }}>
                        <Text style={{ fontSize: 16 }}>Password</Text>
                        <View
                            style={{
                                height: 44,
                                width: "100%",
                                borderColor: 'rgba(84, 76, 76, 0.14)',
                                borderWidth: 1,
                                borderRadius: 4,
                                marginVertical: 6,
                                justifyContent: "center",
                                paddingLeft: 8,
                            }}
                        >
                            <TextInput
                                value={password}
                                onChangeText={(value) => setPassword(value)}
                                editable={true}
                            />
                        </View>

                    </View>
                    </View>
                </View>
                <View style={{paddingHorizontal:22}}>

               
                <TouchableOpacity
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
                        Update
                    </Text>
                </TouchableOpacity>
                </View>
            {/* </ScrollView> */}

        </SafeAreaView>

    );
}