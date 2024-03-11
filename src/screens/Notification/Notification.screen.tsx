import React, { useEffect, useState } from "react";
import { SafeAreaView,StatusBar,StyleSheet,Platform,View, Button,Text, FlatList} from "react-native";
import { useSelector,useDispatch } from "react-redux";
import { selectSelectedMosque,selectNotifications } from "../../redux/mosques/mosqueSelector";
import { addMessageToMosque, getMessages } from "../../api";
import NotificationMessage from "../../components/NotificationMessage/NotificationMessage.component";
import * as Notifications from 'expo-notifications';

const Notification = ():JSX.Element =>{
    const dispatch = useDispatch();
    const [token,setToken] = useState<string>();
    const [notifications,setNotifications] = useState<any>();
    const Notfications = useSelector(selectNotifications);
    console.log(Notfications)
    const selectedMosque = useSelector(selectSelectedMosque);
    useEffect(()=>{
        (async()=>{
            let token = await Notifications.getExpoPushTokenAsync({
                projectId: '66fbdec8-f5a2-4f30-95cd-89c6032e986f',
              });
              setToken(token.data);
              console.log(token.data)
        })();
    },[dispatch])

    useEffect(()=>{
        setNotifications(Notfications);
    },[Notfications])
    
    const onPress = async()=>{
        addMessageToMosque("Al-Aqusa mosque prayer updated","EzG9eEDHbSw7vVy2Varp");
        const body = JSON.stringify({
            "to": selectedMosque?.Tokens,
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
            {selectedMosque ? (
                <View style={styles.NotificationContainer}>        
                    <View style={{marginTop:10}}>
                        <Text style={{fontWeight:'bold',fontSize:16,letterSpacing:1}}>Notifications</Text>
                    </View>
                    <FlatList
                        data={notifications?.Messages}
                        renderItem={(data)=><NotificationMessage key={data.index} message={data.item} mosqueName={selectedMosque.name} />}
                        scrollEnabled={true}
                        showsVerticalScrollIndicator={false}
                    />
                </View>
            ): <View>
                    <Text>Please Select A Mosque</Text>
                </View>}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
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