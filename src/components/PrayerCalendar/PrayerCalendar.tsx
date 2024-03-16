import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

interface PrayerCalendar {
  asr:string,
  duhur:string,
  fajr:string,
  maghrib:string,
  isha:string,
  day:number
}

const PrayerCalendar = ({asr,duhur,fajr,maghrib,isha,day}:PrayerCalendar): JSX.Element => {
  return (
    <View style={styles.PrayerContainer}>
      <View>
        <Text style={styles.day}>{day}</Text>
      </View>
      <View style={styles.Fajar}>
        <Text style={styles.time}>{fajr}</Text>
      </View>
      <View style={styles.Duhur}>
        <Text style={styles.time}>{duhur}</Text>
      </View>
      <View style={styles.Asr}>
        <Text style={styles.time}>{asr}</Text>
      </View>
      <View style={styles.Maghrib}>
        <Text style={styles.time}>{maghrib}</Text>
      </View>
      <View style={styles.Isha}>
        <Text style={styles.time}>{isha}</Text>
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
