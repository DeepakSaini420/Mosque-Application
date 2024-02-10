import React, { useEffect, useState } from "react";
import { SafeAreaView,StatusBar,StyleSheet,Platform,View } from "react-native";
import * as Notifications from 'expo-notifications'
import NotificationMessage from "../../components/NotificationMessage/NotificationMessage.component";

const Notification = ():JSX.Element =>{
    const [token,setToken] = useState<string>();
    useEffect(()=>{
        (async()=>{
            let token = await Notifications.getExpoPushTokenAsync({
                projectId: '66fbdec8-f5a2-4f30-95cd-89c6032e986f',
              });
              setToken(token.data);
              console.log(token.data)
        })();
    },[])
    const onPress = async()=>{
        const body = JSON.stringify({
            "to": [token],
            "sound": "default",
            "body": "Al-Aqusa mosque prayer updated"
        })
        const resp = await fetch('https://exp.host/--/api/v2/push/send',{
            method:'POST',
            headers:{
                "host": "exp.host",
                "accept": "application/json",
                "accept-encoding": "gzip, deflate",
                "content-type": "application/json",
            },
            body:body
        })
        console.log(resp.status);
    }
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.NotificationContainer}>
                <NotificationMessage/>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor: '#fff'
    },
    NotificationContainer:{
        width:'95%',
        height:'87%',
        bottom:35,
        borderRadius: 6,
        backgroundColor: '#fbf4ee',
        alignItems:'center'
    }
});

export default Notification;