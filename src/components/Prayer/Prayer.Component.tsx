import React, {useEffect, useState, useRef} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import * as Notifications from 'expo-notifications'
import AsyncStorage from '@react-native-async-storage/async-storage';

interface prayerProps {
  prayerName: string;
  prayerTime: string;
  isLast: boolean;
}

async function setAlarm(prayerTime:string,prayerName:string){
  const time = prayerTime.split(" ");
  const state = time[1];
  const HS = time[0].split(":");
  const hours = state==="AM"? Number(HS[0]) : Number(HS[0])+12;
  const minutes = Number(HS[1]);
  
  const date = new Date();
  const currentHours = date.getHours();
  const currentMinutes = date.getMinutes();
  const currentSeconds = date.getSeconds();
  console.log(currentHours,currentMinutes,currentSeconds);
  
  const currentTimeMillis = (currentHours * 3600 + currentMinutes * 60 + currentSeconds);
  const desiredTimeMillis = (hours * 3600 + minutes * 60) ;

  // Calculate the time difference in milliseconds
  const timeDifferenceMillis = desiredTimeMillis - currentTimeMillis;

  if (timeDifferenceMillis < 0) {
    return 
  }
  console.log(timeDifferenceMillis);

  try {
    
    const resp = await Notifications.scheduleNotificationAsync({
      content: {
        title: "Prayer Time!!!",
        body: `Time for your ${prayerName} Prayer!!`,
        data: { prayerName,prayerTime,not:"local" },
      },
      trigger: { seconds: timeDifferenceMillis},
    });

    console.log(resp);
    switch(prayerName){
      case "Fajr":
        await AsyncStorage.setItem("Fajr",resp);
        break;
      case "Duhur":
        await AsyncStorage.setItem("Duhur",resp);
        break;
      case "Asr":
        await AsyncStorage.setItem("Asr",resp);
        break;
      case "Maghrib":
        await AsyncStorage.setItem("Maghrib",resp);
        break;
      case "Isha":
        await AsyncStorage.setItem("Isha",resp);
        break;
      default:
        break;
    }

  } catch (error) {
    console.log(error);
  }
}

const Prayer = ({prayerName, prayerTime, isLast}: prayerProps): JSX.Element => {
  const notificationListener = useRef<any>();
  const responseListener = useRef<any>();

  const [iconName, setIconName] = useState('bell');
  let icon;

  useEffect(()=>{
    (async()=>{

      const fajar = await AsyncStorage.getItem("Fajr");
      const duhur = await AsyncStorage.getItem("Duhur");
      const asr = await AsyncStorage.getItem("Asr");
      const maghrib = await AsyncStorage.getItem("Maghrib");
      const isha = await AsyncStorage.getItem("Isha");
      if(fajar?.length) prayerName === "Fajr" ? setIconName("bell-off") : setIconName("bell");
      if(duhur?.length) prayerName === "Duhur" ? setIconName("bell-off") : setIconName("bell");
      if(asr?.length) prayerName === "Asr" ? setIconName("bell-off") : setIconName("bell");
      if(maghrib?.length) prayerName === "Maghrib" ? setIconName("bell-off") : setIconName("bell");
      if(isha?.length) prayerName === "Isha" ? setIconName("bell-off") : setIconName("bell");
      
    })();
    
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
      const data = await AsyncStorage.getItem(prayerName);
      AsyncStorage.setItem(prayerName,"");
      if(data) Notifications.cancelScheduledNotificationAsync(data);
      setIconName('bell');
      return;
    }
    setIconName(iconName === 'bell' ? 'bell-off' : 'bell');
    setAlarm(prayerTime,prayerName);
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
        <Text style={styles.Time}>{prayerTime}</Text>
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
