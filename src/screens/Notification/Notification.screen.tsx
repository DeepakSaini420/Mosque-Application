import React, { useEffect, useState } from "react";
import { SafeAreaView,StatusBar,StyleSheet,Platform,View, Button,Text, FlatList} from "react-native";
import { useSelector } from "react-redux";
import { selectSelectedMosque,selectNotifications } from "../../redux/mosques/mosqueSelector";
import NotificationMessage from "../../components/NotificationMessage/NotificationMessage.component";

const Notification = ():JSX.Element =>{
    const [notifications,setNotifications] = useState<any>();
    const Notfications = useSelector(selectNotifications);
    const selectedMosque = useSelector(selectSelectedMosque);


    useEffect(()=>{
        setNotifications(Notfications);
    },[Notfications])
    
    const onPress = async()=>{
        const body = JSON.stringify({
            "to": selectedMosque?.Tokens,
            "sound": "default",
            "body": "Al-Aqusa mosque prayer updated"
        })
        console.log(selectedMosque?.Tokens);
        try {
            
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
        } catch (error) {
            console.log(error);
        }
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
                    {/* <Button title="Send All" onPress={onPress}/> */}
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
        paddingTop:  Platform.OS === 'android' ? StatusBar.currentHeight:0 ,
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