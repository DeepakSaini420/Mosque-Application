import React, {useEffect, useState, useRef} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import * as Notifications from 'expo-notifications'

interface prayerProps {
  prayerName: string;
  prayerTime: string;
  isLast: boolean;
}

const Prayer = ({prayerName, prayerTime, isLast}: prayerProps): JSX.Element => {
  const notificationListener = useRef<any>();
  const responseListener = useRef<any>();

  const [iconName, setIconName] = useState('bell');
  let icon;

  useEffect(()=>{
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      // setIconName( iconName==="bell" ? 'bell-off':"bell")
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
    setIconName(iconName === 'bell' ? 'bell-off' : 'bell');
    console.log("hello")
    const resp = await Notifications.scheduleNotificationAsync({
      content: {
        title: "Prayer Time!!!",
        body: `Time for your ${prayerName} Prayer!!`,
        data: { data: 'goes here' },
      },
      trigger: { seconds: 2 },
    });
    console.log(resp);
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
