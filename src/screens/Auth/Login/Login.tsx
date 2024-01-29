import React,{ useState } from "react";
import { SafeAreaView,View,Text,StyleSheet,Platform,TextInput,TouchableOpacity } from "react-native";
import { loginUser, signInWithGoogle } from "../../../api";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface userCredentialsInterface {
    email:string,
    password:string
} 

const Login = ({navigation}:{navigation:any}):JSX.Element =>{

    const [userCredentials,setUserCredentials] = useState<userCredentialsInterface>({
        email:'',
        password:''
    });

    const LoginAccount = async ()=>{
        try {
            const data = await loginUser(userCredentials.email,userCredentials.password);

            await AsyncStorage.setItem('user',JSON.stringify(data));    
            setUserCredentials({email:'',password:''});
        } catch (error) {
            console.log(error);
        }
    }

    const LoginWithGoogle = async ()=>{
        try {
            await signInWithGoogle();
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <SafeAreaView style={styles.backContainer}>
            <View style={styles.titleContainer}>
                <View>
                    <Text style={styles.headText}>Welcome Back</Text>
                    <Text style={styles.headText}>To Our App</Text>
                </View>
                <View style={styles.descTextContainer}>
                    <Text style={styles.descText}>Hello user, you have</Text>
                    <Text style={styles.descText}>a greatful journy</Text>
                </View>
            </View>
            <View style={styles.inputContainer}>
                <TextInput style={styles.inputText} value={userCredentials.email} placeholder="Email" onChangeText={(text:string)=>setUserCredentials({...userCredentials,email:text})}/>
                <TextInput style={styles.inputText} value={userCredentials.password} placeholder="Password" onChangeText={(text:string)=>setUserCredentials({...userCredentials,password:text})}/>
            </View>
            <View style={styles.btnContainer}>
                <TouchableOpacity style={styles.button} onPress={LoginAccount}>
                    <Text>Login</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.loginText}>
                <Text>Already have an Account?</Text>
                <TouchableOpacity style={styles.loginTapContainer} onPress={()=>navigation.navigate('signup')}>
                    <Text style={styles.loginTapText}>Signup</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.GoogleLogin}>
                <TouchableOpacity style={styles.GoogleLoginButton} onPress={LoginWithGoogle}>
                    <Text>Continue With Google</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    backContainer:{
        paddingTop : Platform.OS === "android" ? 30:0,
        paddingLeft: 14,
    },
    titleContainer:{
        marginTop:100
    },
    headText:{
        fontWeight:'bold',
        fontSize:33,
        letterSpacing:2
    },
    descTextContainer:{
        marginTop:30
    },
    descText:{
        fontSize:17,
        letterSpacing:1.5,
        fontWeight:'600'
    },
    inputText:{
        borderWidth:1,
        borderColor:'grey',
        width:'95%',
        marginTop:35,
        borderRadius:4,
        padding:4
    },
    btnContainer:{
        marginTop:40
    },
    button:{
        width:'95%',
        alignItems:'center',
        backgroundColor:'lightblue',
        padding:10,
        borderRadius:4,
    },
    inputContainer:{
        marginTop:20,
    },
    loginText:{
        justifyContent:'center',
        marginTop:35,
        flexDirection:'row'
    },
    loginTapContainer:{
        marginLeft:4,
    },
    loginTapText:{
        color:'blue'
    },
    GoogleLogin:{
        marginTop:30,
        alignItems:'center'
    },
    GoogleLoginButton:{

    }
});

export default Login;