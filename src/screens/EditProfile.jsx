import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
  Alert,
  Button
} from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from 'expo-file-system';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';
export default function EditProfile() {
  const navigation = useNavigation();

  const [selectedImage, setSelectedImage] = useState("http://res.cloudinary.com/ds9ipqi3z/image/upload/v1710954680/bpnracdpkspbzt0njy8n.png");

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [birthday, setBirthDay] = useState("");
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'android');
    setDate(currentDate);
    setBirthDay(currentDate.toISOString().split('T')[0]);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const handleImageSelection = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });



    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
    console.log(selectedImage)
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#fff",
      }}
    >
      <View
        style={{
          width: "100%",
        }}
      >
        <Image
          source={{
            uri: "https://plainbackground.com/download.php?imagename=39569c.png",
          }}
          style={{
            height: 228,
            width: "100%",
          }}
        />

        <TouchableOpacity
          onPress={() => navigation.push("ProfileScreen")}
          style={{
            zIndex: 99,
            position: "absolute",
            left: 0,
            top: 10,
          }}
        >
          <MaterialIcons name="keyboard-arrow-left" size={35} color={"black"} />
        </TouchableOpacity>

        <Text
          style={{
            fontSize: 30,
            fontWeight: "500",
            position: "absolute",
            top: 10,
            left: 0,
            right: 0,
            textAlign: "center",
          }}
        >
          Edit Profile
        </Text>
      </View>
      {/* <ScrollView > */}

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
            <Image
              source={
                typeof selectedImage === "string"
                  ? { uri: selectedImage }
                  : selectedImage
              }
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
            <Text style={{ fontSize: 16 }}>FullName</Text>
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
                value={fullName}
                onChangeText={(value) => setFullName(value)}
                editable={true}
              />
            </View>
          </View>
        </View>
        {/* <View
          style={{
            flexDirection: "column",
            marginBottom: 6,
          }}
        >
          <Text style={{ fontSize: 16 }}>Birthday</Text>
          <View>
            <Button onPress={showDatepicker} title="Show date picker!" />
          </View>
          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode={mode}
              is24Hour={true}
              display="default"
              onChange={onChange}
            />
          )}
        </View> */}
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
            <Text style={{ fontSize: 16 }}>Email</Text>
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
                value={email}
                onChangeText={(value) => setEmail(value)}
                editable={true}
              />
            </View>
          </View>
        </View>
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
            <Text style={{ fontSize: 16 }}>Phone Number</Text>
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
                value={phoneNumber}
                onChangeText={(value) => setPhoneNumber(value)}
                editable={true}
              />
            </View>
          </View>
        </View>
        <View
          style={{
            marginTop: 30,
          }}
        >
          <View
            style={{
              flexDirection: "column",
              marginBottom: 6,
            }}
          >
            <Text style={{ fontSize: 16 }}>Password</Text>
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
                value={password}
                onChangeText={(value) => setPassword(value)}
                editable={true}
              />
            </View>
          </View>
        </View>
      </View>
      <View style={{ paddingHorizontal: 22 }}>
        <TouchableOpacity
          onPress={handleUpdate}
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
