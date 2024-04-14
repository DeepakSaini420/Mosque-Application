import React,{useRef, useState } from "react";
import { SafeAreaView,Text,View,StyleSheet,Image,TouchableOpacity,StatusBar, Platform } from "react-native";
import { useSelector } from "react-redux";
import { selectSelectedMosque } from "../../redux/mosques/mosqueSelector";
import MosqueList from "../../components/MosqueList/MosqueList.component";
import NetInfo from '@react-native-community/netinfo';


const Settings = ({navigation}:{navigation:any}):JSX.Element=>{

    const mosqueName = useSelector(selectSelectedMosque);
    const isConnected = useRef<boolean|null>(true);
    const [selectMosque,setSelectMosque] = useState<boolean>(false);

    NetInfo.addEventListener((state)=>{
        isConnected.current = state.isConnected;
    });

    return (
        <SafeAreaView style={styles.settingsContainer} >
            <TouchableOpacity style={{ alignItems:'center',zIndex:2 }} onPress={()=>setSelectMosque(false)} >
                { selectMosque && <MosqueList /> }
            </TouchableOpacity>
            <View style={styles.profileContainer}>
                <View style={styles.profile}>
                    <View>
                        <Image source={require('../../../assets/User.png')} style={styles.img}/>
                    </View>
                    <View style={styles.userName}>
                        <Text style={styles.userNameText}>User</Text>
                    </View>
                </View>
            </View>
            <View style={styles.settingsSection}>
                <TouchableOpacity style={styles.setting} onPress={()=> {
                        if(!isConnected.current) return; 
                        setSelectMosque(true)
                    }
                }>
                    <Text>{ mosqueName ? `Selected Mosque: ${mosqueName.name}`:"Please Select A Mosque" } </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.setting} onPress={()=> navigation.navigate("HijriCalendar")}>
                    <Text>Calendar</Text>
                </TouchableOpacity>
            </View>
            
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    settingsContainer:{
        flex:1,
        backgroundColor:'#fff',
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        paddingLeft:10,
        paddingRight:10,
    },
    profileContainer:{
        width:"100%",
        height:180,
        justifyContent:'center',
        alignItems:'center',
        marginTop:5,
    },
    profile:{
        justifyContent:'center',
        alignItems:'center'
    },
    img:{
        width:110,
        height:110
    },
    userName:{
        marginTop:10
    },
    userNameText:{
        fontWeight:"600",
        fontSize:20,
        letterSpacing:2
    },
    settingsSection:{
    },
    setting:{
        width:"100%",
        height:40,
        borderRadius:10,
        borderWidth:1,
        marginTop:20,
        backgroundColor:"rgba(255,255,255,0.5)",
        alignItems:'center',
        justifyContent:'center'
    }
});

export default Settings;