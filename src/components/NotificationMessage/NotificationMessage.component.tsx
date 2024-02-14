import React from "react";
import { View,StyleSheet,Text } from "react-native"; 

interface NotificationMessageProps{
    mosqueName:string,
    message:string
}

const NotificationMessage = ({mosqueName,message}:NotificationMessageProps):JSX.Element => {
    return (
        <View style={styles.MessageContainer}>
            <View>
                <Text style={styles.mosqueName}>{mosqueName}</Text>
            </View>
            <View style={styles.notificationMessage}>
                <Text>{message}</Text> 
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    MessageContainer:{
        width:350,
        backgroundColor:'white',
        height:80,
        borderRadius:5,
        padding:2,
        alignItems:'center',
        justifyContent:'center',
        marginTop:15
    },
    mosqueName:{
        fontWeight:'bold'
    },
    notificationMessage:{
        marginTop:8
    }
});

export default NotificationMessage;