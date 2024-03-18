import React, { useEffect, useState,useRef } from 'react';
import { Provider } from 'react-redux';
import Index from './src';
import store  from './src/redux/store';
import { auth } from './src/api';
import { onAuthStateChanged } from 'firebase/auth';
import { Platform } from 'react-native';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    try {
      token = (await Notifications.getExpoPushTokenAsync({ projectId: '66fbdec8-f5a2-4f30-95cd-89c6032e986f' })).data;
      
    } catch (error) {
      console.log(error);
    }
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  return token;
}


const App = (): JSX.Element => {
  const notificationListener = useRef<any>();
  const responseListener = useRef<any>();
  const [isLoggedIn,setIsLoggedIn] = useState<boolean>(false);

  useEffect(()=>{
    onAuthStateChanged(auth,(user)=>{
      if(user){
        console.log(user);
        setIsLoggedIn(true);
      }else{
        setIsLoggedIn(false);
      }
    })
  },[]);

  useEffect(()=>{
    try {
      registerForPushNotificationsAsync().then((token)=>{
        console.log(token);
      });
    } catch (error) {
      console.log(error);
    }

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      console.log(notification.request.content.body);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  },[]);

  return (
    <Provider store={store}>
      <Index/>
    </Provider>
  );
};

export default App;
