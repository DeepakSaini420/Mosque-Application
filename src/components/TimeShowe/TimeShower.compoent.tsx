import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { useSelector } from 'react-redux';
import { selectCurrentMonthPrayer } from '../../redux/mosques/mosqueSelector';

const TimeShower = (): JSX.Element => {
  const [currentPrayer,setCurrentPrayer] = useState<string>();
  const [endTime,setEndTime] = useState<string>('');
  const [currentTime, setCurrentTime] = useState({
    hours: 0,
    minutes: 0,
    time: '',
  });

  const currentMonthlyPrayers = useSelector(selectCurrentMonthPrayer); 


  useEffect(() => {
    const timeInterval = setInterval(() => {
      const date = new Date();
      const hours = date.getHours();
      setCurrentTime({
        hours: hours > 12 ? hours - 12 : hours,
        minutes: date.getMinutes(),
        time: hours >= 12 ? 'Pm' : 'Am',
      });
      

      if(hours>=0 && hours<12){
        setCurrentPrayer('Fajr');
        setEndTime(`${currentMonthlyPrayers.length >= date.getDate()-1 ? currentMonthlyPrayers[date.getDate()-1].Fajr.iqama : '' }AM`);
      }
      if(hours>=12 && hours<15){
        setCurrentPrayer('Duhur');
        setEndTime(`${currentMonthlyPrayers.length >= date.getDate()-1 ? currentMonthlyPrayers[date.getDate()-1].Duhur.iqama : '' }PM`);
      }
      if(hours>=15 && hours<20){
        setCurrentPrayer('Maghrib');
        setEndTime(`${currentMonthlyPrayers.length >= date.getDate()-1 ? currentMonthlyPrayers[date.getDate()-1].Maghrib.iqama : '' }PM`);
      }
      if(hours>=20 && hours<=23){
        setCurrentPrayer('Isha');
        setEndTime(`${currentMonthlyPrayers.length >= date.getDate()-1 ? currentMonthlyPrayers[date.getDate()-1].Isha.iqama : '' }PM`);
      }
    }, 1000);

    return () => {
      clearInterval(timeInterval);
    };
  }, [currentMonthlyPrayers]);

  return (
    <View style={styles.TimeContainer}>
      <View style={styles.TextContainer}>
        <Text style={styles.TopText}>{currentPrayer}</Text>
        <View style={styles.StartTime}>
          <Text style={styles.Time}>
            {currentTime.hours}:{currentTime.minutes < 10 ? `0${currentTime.minutes}`: currentTime.minutes}
          </Text>
          <Text style={styles.state}>{currentTime.time}</Text>
        </View>
        <View style={styles.EndTime}>
          <Text style={styles.eTimeText}>End Time</Text>
          <Text style={styles.sepration}>-</Text>
          <Text style={styles.eTime}>{endTime}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  TimeContainer: {
    width: '100%',
    height: 210,
    borderRadius: 30,
    backgroundColor: '#f8d3b9',
  },
  TextContainer: {
    marginTop: 28,
    marginLeft: 45,
  },
  TopText: {
    color: '#e67a2f',
    fontSize: 30,
    fontWeight: 'bold',
  },
  StartTime: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  Time: {
    fontWeight: '800',
    color: '#000',
    fontSize: 45,
  },
  state: {
    color: '#352935',
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 7,
  },
  EndTime: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  eTimeText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#8f857c',
  },
  eTime: {
    fontSize: 20,
    fontWeight: '600',
    marginLeft: 10,
    color: '#000',
  },
  sepration: {
    marginLeft: 10,
    fontSize: 30,
  },
});

export default TimeShower;
