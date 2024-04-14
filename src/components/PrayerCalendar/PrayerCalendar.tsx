import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

interface PrayerCalendar {
  asr:string,
  duhur:string,
  fajr:string,
  maghrib:string,
  isha:string,
  day:number,
  month:number
}

const PrayerCalendar = ({asr,duhur,fajr,maghrib,isha,day,month}:PrayerCalendar): JSX.Element => {
  const date = new Date();
  return (
    <View style={styles.PrayerContainer}>
      <View>
        <Text style={[styles.day, Number(day)===date.getDate() && date.getMonth()===month ? {fontWeight:'bold'} :{}]}>{day}</Text>
      </View>
      <View style={styles.Fajar}>
        <Text style={[styles.time,Number(day)===date.getDate() && date.getMonth()===month ? {fontWeight:'bold'} :{}]}>{fajr}</Text>
      </View>
      <View style={styles.Duhur}>
        <Text style={[styles.time,Number(day)===date.getDate() && date.getMonth()===month ? {fontWeight:'bold'} :{}]}>{duhur}</Text>
      </View>
      <View style={styles.Asr}>
        <Text style={[styles.time,Number(day)===date.getDate() && date.getMonth()===month ? {fontWeight:'bold'} :{}]}>{asr}</Text>
      </View>
      <View style={styles.Maghrib}>
        <Text style={[styles.time,Number(day)===date.getDate() && date.getMonth()===month ? {fontWeight:'bold'} :{}]}>{maghrib}</Text>
      </View>
      <View style={styles.Isha}>
        <Text style={[styles.time,Number(day)===date.getDate() && date.getMonth()===month ? {fontWeight:'bold'} :{}]}>{isha}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  PrayerContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: '#f8e5e1',
    borderBottomWidth: 2,
    paddingTop: 2,
    marginTop: 10,
    paddingBottom: 12,
  },
  Fajar: {
    position: 'relative',
    left:13
  },
  Duhur:{
    position:'relative',
    left:10
  },
  Asr:{
    position:'relative',
    left:5
  },
  Maghrib:{
    position:'relative',
    left:0
  },
  Isha:{
    position:'relative',
    left:0
  },
  time: {
    color: '#000',
  },
  day: {
    color: '#000',
  },
});

export default PrayerCalendar;
