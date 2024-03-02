import React, { useEffect } from "react";
import { TouchableOpacity,Text,StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import { Mosques, setCurrentMonthPrayers, setPrayers, setSelectedMosque } from "../../../redux/mosques/mosqueSlice";
import { addTokenToMosque, getMosqueData } from "../../../api";
import * as Notifications from 'expo-notifications';


const MosqueName = ({name,id,location,Tokens,Messages}:Mosques)=>{
    const dispatch = useDispatch();

    const onPress = async ()=>{
        const date = new Date();

        const prayer = await getMosqueData({id});
        console.log("prayers:- ",prayer)
        dispatch(setPrayers(prayer));
        if(prayer.length === 0) {
            dispatch(setCurrentMonthPrayers([]));
        }
        prayer.map((data:any)=>{
            if(Number(data.month) === 1){
                dispatch(setCurrentMonthPrayers(data.prayers));
            }
        })
        
        dispatch(setSelectedMosque({name,id,location,Tokens,Messages}));
        
        let token = await Notifications.getExpoPushTokenAsync({
            projectId: '66fbdec8-f5a2-4f30-95cd-89c6032e986f',
        });

        await addTokenToMosque(token.data,id);
    }

    return (
        <TouchableOpacity style={styles.nameContainer} onPress={onPress}>
            <Text>{name}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    nameContainer:{
        width:'100%',
        height:35,
        backgroundColor:'rgba(255,255,255,0.8)',
        justifyContent:'center',
        alignItems:'center',
        marginTop:8
    }
});

export default MosqueName;