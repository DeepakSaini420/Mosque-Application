import React from "react";
import { View,StyleSheet,Text } from "react-native"; 

const NotificationMessage = ():JSX.Element => {
    return (
        <View style={styles.MessageContainer}>
            <View>
                <Text style={styles.mosqueName}>Al Aqusa</Text>
            </View>
            <View style={styles.notificationMessage}>
                <Text>Hey This is My Notification Component</Text> 
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    MessageContainer:{
        width:'95%',
        backgroundColor:'white',
        height:'13%',
        borderRadius:5,
        padding:2,
        alignItems:'center',
        justifyContent:'center',
        marginTop:15,
    },
    mosqueName:{
        fontWeight:'bold'
    },
    notificationMessage:{
        marginTop:8
    }
});

export default NotificationMessage;