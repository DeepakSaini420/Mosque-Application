import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Signup from "./Signup/Signup";
import Login from "./Login/Login";

const Auth = ():JSX.Element =>{

    const Stack = createNativeStackNavigator();

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={({route})=>({
                headerShown:false
            })}>
                <Stack.Screen name="signup" component={Signup}/>
                <Stack.Screen name="login" component={Login}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Auth;