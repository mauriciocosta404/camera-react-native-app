import { Camera, CameraType } from 'expo-camera';
import { useState, useEffect } from 'react';
import {  StyleSheet, Text, TouchableOpacity, View , SafeAreaView , ActivityIndicator} from 'react-native';
import {FontAwesome} from "@expo/vector-icons";

export default function App() {
  const [type, setType] = useState(CameraType.front);
  const [permission, setPermission] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setPermission(status === 'granted');
    })();
  }, []);

  if (!permission) {
    return <View><Text>No access to camera</Text><ActivityIndicator color="blue" size={25}/></View>;
  }

  return (
    <SafeAreaView style={styles.container}>
      <Camera style={styles.camera} type={type}>
        <View style={styles.contentButtons}>
          <TouchableOpacity style={styles.buttonFlip} onPress={()=>{setType(type === CameraType.front ? CameraType.back : CameraType.front)}}>
            <FontAwesome name="exchange" size={23} color="red">
            </FontAwesome>
          </TouchableOpacity>
        </View>  
      </Camera>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  camera:{
    width:"100%",
    height:"100%",
  },
  contentButtons:{
    flex:1,
    backgroundColor:"transparent",
    flexDirection:"row"
  },
  buttonFlip:{
    position:'absolute',
    bottom:50,
    left:30,
    alignItems:"center",
    justifyContent:"center",
    backgroundColor:"#fff",
    margin:20,
    height:50,
    width:50,
    borderRadius:50    
  },
  button:{

  },
  text:{
    
  } 
});
