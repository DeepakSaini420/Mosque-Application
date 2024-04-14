import React, {useEffect, useState, useRef} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import * as Notifications from 'expo-notifications'
import AsyncStorage from '@react-native-async-storage/async-storage';

interface prayerProps {
  prayerName: string;
  prayerTime: string;
  prayerEndTime:string;
  isLast: boolean;
  id:string;
}

async function setAlarm(prayerTime:string,prayerName:string,id:string){
  const time = prayerTime.split(" ");
  const state = time[1];
  const HS = time[0].split(":");
  const hours = state==="AM" || Number(HS[0])===12? Number(HS[0]) : Number(HS[0])+12;
  const minutes = Number(HS[1]);
  
  const date = new Date();
  const currentHours = date.getHours();
  const currentMinutes = date.getMinutes();
  const currentSeconds = date.getSeconds();
  
  const currentTimeMillis = (currentHours * 3600 + currentMinutes * 60 + currentSeconds);
  const desiredTimeMillis = (hours * 3600 + minutes * 60) ;

  // Calculate the time difference in milliseconds
  const timeDifferenceMillis = desiredTimeMillis - currentTimeMillis;
  
  if (timeDifferenceMillis < 0) {
    return false;
  }
  console.log(timeDifferenceMillis);


  try {
    const resp = await Notifications.scheduleNotificationAsync({
      content: {
        title: "Prayer Time!!!",
        body: `Time for your ${prayerName} Prayer!!`,
        data: { prayerName,prayerTime,id,not:"local" },
      },
      trigger: { seconds: timeDifferenceMillis,channelId:"default" },
    });

    switch(prayerName){
      case "Fajr":
        await AsyncStorage.setItem(`${id}-Fajr`,`${resp}`);
        break;
      case "Duhur":
        await AsyncStorage.setItem(`${id}-Duhur`,`${resp}`);
        break;
      case "Asr":
        await AsyncStorage.setItem(`${id}-Asr`,`${resp}`);
        break;
      case "Maghrib":
        await AsyncStorage.setItem(`${id}-Maghrib`,`${resp}`);
        break;
      case "Isha":
        await AsyncStorage.setItem(`${id}-Isha`,`${resp}`);
        break;
      default:
        break;
    }

    return true

  } catch (error) {
    console.log(error);
  }

  return false;
}

const Prayer = ({prayerName, prayerTime,prayerEndTime, isLast, id}: prayerProps): JSX.Element => {
  const [iconName, setIconName] = useState('bell');
  const notificationListener = useRef<any>();
  const responseListener = useRef<any>();
  let icon;

  useEffect(()=>{
    (async()=>{

      const fajar = await AsyncStorage.getItem(`${id}-Fajr`)||'';
      const duhur = await AsyncStorage.getItem(`${id}-Duhur`)||'';
      const asr = await AsyncStorage.getItem(`${id}-Asr`)||'';
      const maghrib = await AsyncStorage.getItem(`${id}-Maghrib`)||'';
      const isha = await AsyncStorage.getItem(`${id}-Isha`)||'';

      const data = await Notifications.getAllScheduledNotificationsAsync();

      setIconName('bell');

      data.forEach((notification)=>{
        if(duhur===notification.identifier && prayerName==="Duhur"){
          setIconName("bell-off")
        }

        if(fajar===notification.identifier && prayerName==="Fajr"){
          setIconName("bell-off")
        }
        if(asr===notification.identifier && prayerName==="Asr"){
          setIconName("bell-off")
        }
        if(maghrib===notification.identifier && prayerName==="Maghrib"){
          setIconName("bell-off")
        }
        if(isha===notification.identifier && prayerName==="Isha"){
          setIconName("bell-off")
        }
      })


    })();
    
  },[]);

  useEffect(()=>{
    notificationListener.current = Notifications.addNotificationReceivedListener(async (notification) => {
      console.log("Inner",notification.request.content.body);
      if(notification.request.content.data.local=="local"){
        const data = await AsyncStorage.getItem(`${notification.request.content.data.id}-${notification.request.content.data.prayerName}`); 
        console.log(data);
        await AsyncStorage.setItem(`${notification.request.content.data.id}-${notification.request.content.data.prayerName}`,"");
        if(prayerName===notification.request.content.data.prayerName){
          setIconName('bell');
        }
      }
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(async (response) => {
      console.log("Inner",response.notification.request.content.data.local);
      if(response.notification.request.content.data.local=="local"){
        const data = await AsyncStorage.getItem(`${response.notification.request.content.data.id}-${response.notification.request.content.data.prayerName}`); 
        console.log(data);
        await AsyncStorage.setItem(`${response.notification.request.content.data.id}-${response.notification.request.content.data.prayerName}`,"");
      }
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  },[]);

  switch (prayerName) {
    case 'Fajr':
      icon = <Icon name={'sunrise'} color={'#bebabb'} size={23} />;
      break;
    case 'Duhur':
      icon = <Icon name={'sun'} color={'#bebabb'} size={23} />;
      break;
    case 'Asr':
      icon = <Icon name={'sun'} color={'#bebabb'} size={23} />;
      break;
    case 'Maghrib':
      icon = <Icon name={'sunset'} color={'#bebabb'} size={23} />;
      break;
    case 'Isha':
      icon = <Icon name={'moon'} color={'#bebabb'} size={23} />;
      break;
    default:
      icon = <Icon name={'moon'} color={'#bebabb'} size={23} />;
  }

  const onPress = async () => {
    if(iconName === "bell-off"){
      const data = await AsyncStorage.getItem(`${id}-${prayerName}`);
      const ids = data;
      await AsyncStorage.setItem(`${id}-${prayerName}`,"");
      if(ids) await Notifications.cancelScheduledNotificationAsync(ids);
      setIconName('bell');
      return;
    }
    if(await setAlarm(prayerTime,prayerName,id)) setIconName(iconName === 'bell' ? 'bell-off' : 'bell');
  };

  return (
    <View
      style={[
        styles.container,
        {borderBottomColor: isLast ? '#fbf4ee' : '#f8e5e1'},
      ]}>
      <View style={styles.prayerContainer}>
        {icon}
        <Text style={styles.Name}>{prayerName}</Text>
      </View>
      <View style={styles.left}>
        <Text style={styles.startTime}>{prayerTime}</Text>
        <Text style={styles.Time}>{prayerEndTime}</Text>
        <TouchableOpacity onPress={onPress}>
          <Icon name={iconName} color={'#e7723d'} size={25} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: '#f8e5e1',
    borderBottomWidth: 2,
    paddingTop: 2,
    paddingBottom: 12,
    marginTop: 20,
  },
  prayerContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  Name: {
    fontWeight: '600',
    fontSize: 17,
    color: '#363640',
    marginLeft: 10,
  },
  startTime:{
    fontWeight: '500',
    fontSize: 17,
    color: '#363640',
    position: 'absolute',
    right: 125,
  },
  Time: {
    fontWeight: '500',
    fontSize: 17,
    color: '#363640',
    position: 'absolute',
    right: 42,
  },
  left: {
    flexDirection: 'row',
  },
});

export default Prayer;
