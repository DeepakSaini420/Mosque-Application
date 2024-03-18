import React, { useEffect, useState } from 'react';
import {View, StyleSheet, Text} from 'react-native';
import { useSelector } from 'react-redux';
import { selectCurrentMonthPrayer } from '../../redux/mosques/mosqueSelector';
import Prayer  from '../Prayer/Prayer.Component';

const PrayerBoard = ({name,location}:{name:string,location:string}): JSX.Element => {
  const [prayers,setPrayers] = useState<any>();
  
  const currentMonthlyPrayers = useSelector(selectCurrentMonthPrayer); 
  const currentDay = new Date().getDate();

  useEffect(()=>{
    if(currentMonthlyPrayers.length === 0) {
      setPrayers(null);
      return;
    }
    currentMonthlyPrayers.forEach((data:any)=>data.day === currentDay.toString() ? setPrayers(data):'');
  },[currentMonthlyPrayers,currentDay]);


  return (
    <View style={styles.container}>
      <View style={styles.LocationContainer}>
        <Text style={styles.MosqueName}>{name}</Text>
        <Text style={styles.loaction}>{location}</Text>
      </View>
      <View style={styles.prayerContainer}>
        {
          prayers ? (
            <>
              <Prayer prayerName={'Fajr'} prayerTime={`${prayers.Fajr.adan} AM`} isLast={false} />
              <Prayer prayerName={'Duhur'} prayerTime={`${prayers.Duhur.adan} PM`} isLast={false} />
              <Prayer prayerName={'Asr'} prayerTime={prayers.Asr.adan.split(":")[0] > 12 ? `${prayers.Asr.adan.split(":")[0]-12}:${prayers.Asr.adan.split(":")[1]} PM`: `${prayers.Asr.adan} AM`} isLast={false} />
              <Prayer prayerName={'Maghrib'} prayerTime={prayers.Maghrib.adan.split(":")[0] > 12 ? `${prayers.Maghrib.adan.split(":")[0]-12}:${prayers.Maghrib.adan.split(":")[1]} PM`: `${prayers.Maghrib.adan} AM`} isLast={false} />
              <Prayer prayerName={'Isha'} prayerTime={prayers.Isha.adan.split(":")[0] > 12 ? `${prayers.Isha.adan.split(":")[0]-12}:${prayers.Isha.adan.split(":")[1]} PM`: `${prayers.Isha.adan} AM`} isLast={true} />
            </>
          ):(
            <Text>No Prayers..</Text>
          )
        }
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#fbf4ee',
    height: 390,
    borderRadius: 25,
    marginTop: 20,
    padding: 18,
  },
  LocationContainer: {},
  MosqueName: {
    color: '#000',
    fontSize: 23,
    fontWeight: 'bold',
  },
  prayerContainer: {
    marginTop: 8,
  },
  loaction: {
    color: '#8c8a8f',
    fontWeight: '600',
    fontSize: 16,
    letterSpacing: 0.5,
  },
});

export default PrayerBoard;
