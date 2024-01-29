import React from "react";
import { TouchableOpacity,Text,StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import { setCurrentMonthPrayers, setPrayers, setSelectedMosque } from "../../../redux/mosques/mosqueSlice";
import { getMosqueData } from "../../../api";

interface MosqueName {
    name:string,
    id:string,
    location:string
}

const MosqueName = ({name,id,location}:MosqueName)=>{
    const dispatch = useDispatch();

    const onPress = async ()=>{
        const date = new Date();
        dispatch(setSelectedMosque({name,id,location}));
        const prayer = await getMosqueData({id});
        dispatch(setPrayers(prayer));
        prayer.map((data:any)=>{
            if(Number(data.month) === date.getMonth()+1){
              dispatch(setCurrentMonthPrayers(data.prayers));
            }
          })
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