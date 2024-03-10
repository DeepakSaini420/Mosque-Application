import React, {useEffect, useState, useRef} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import * as Notifications from 'expo-notifications'

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

    let differnce = ((hours * 3600) + (minutes*60)) - ((currentHours*3600) + (currentMinutes*60) +(currentSeconds));  
    if (differnce <= 0) {
      return 
    }
    console.log(differnce);
    const resp = await Notifications.scheduleNotificationAsync({
      content: {
        title: "Prayer Time!!!",
        body: `Time for your ${prayerName} Prayer!!`,
        data: { prayerName,prayerTime,not:"local" },
      },
      trigger: { seconds: differnce, },
    });
}

const Prayer = ({prayerName, prayerTime, isLast}: prayerProps): JSX.Element => {
  const notificationListener = useRef<any>();
  const responseListener = useRef<any>();

  const [iconName, setIconName] = useState('bell');
  let icon;

  useEffect(()=>{
    notificationListener.current = Notifications.addNotificationReceivedListener(async(notification) => {
      const data = notification.request.content.data ;
      if(data.not !== "local") return;
      if(data.prayerName === prayerName){
        // setAlarm(prayerTime,prayerName);
        setIconName( iconName==="bell" ? 'bell-off':"bell")
      }

    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log("resp",response);
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
    setAlarm(prayerTime,prayerName);
    setIconName(iconName === 'bell' ? 'bell-off' : 'bell');
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
