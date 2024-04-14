import React, { useEffect, useState,useRef } from 'react';
import { Provider } from 'react-redux';
import Index from './src';
import store  from './src/redux/store';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import * as TaskManager from 'expo-task-manager';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

TaskManager.defineTask("BACKGROUND_NOTIFICATION_TASK", (_data) => {
  console.log("IT WORKS!!!!!");
});

Notifications.registerTaskAsync("BACKGROUND_NOTIFICATION_TASK");

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
      token = (await Notifications.getExpoPushTokenAsync({ projectId: 'bed18b89-a6b2-414b-a2c1-4a3423223f78' })).data;
      
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

  useEffect(()=>{
    try {
      registerForPushNotificationsAsync().then((token)=>{
        console.log(token);
      });
    } catch (error) {
      console.log(error);
    }

    notificationListener.current = Notifications.addNotificationReceivedListener(async(notification) => {
      if(notification.request.content.data.local=="local"){
        await AsyncStorage.setItem(`${notification.request.content.data.id}-${notification.request.content.data.prayerName}`,"");
      }
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(async (response) => {
      if(response.notification.request.content.data.local=="local"){
        await AsyncStorage.setItem(`${response.notification.request.content.data.id}-${response.notification.request.content.data.prayerName}`,"");

      }
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
