import React, { useEffect, useState } from 'react';
import {View, StyleSheet, Text} from 'react-native';
import { useSelector } from 'react-redux';
import { selectCurrentMonthPrayer } from '../../redux/mosques/mosqueSelector';
import Prayer  from '../Prayer/Prayer.Component';

const PrayerBoard = ({name,location,id}:{name:string,location:string,id:string}): JSX.Element => {
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
              <Prayer id={id} prayerName={'Fajr'} prayerTime={`${prayers.Fajr.adan} AM`} prayerEndTime={`${prayers.Fajr.iqama} AM`} isLast={false} />

              <Prayer id={id} prayerName={'Duhur'} prayerTime={prayers.Duhur.adan.split(":")[0] > 12 ? `${prayers.Duhur.adan.split(":")[0]-12}:${prayers.Duhur.adan.split(":")[1]} PM`: `${prayers.Duhur.adan} AM`} prayerEndTime={prayers.Duhur.iqama.split(":")[0] > 12 ? `${prayers.Duhur.iqama.split(":")[0]-12}:${prayers.Duhur.iqama.split(":")[1]} PM`: `${prayers.Duhur.iqama} AM`} isLast={false} />

              <Prayer id={id} prayerName={'Asr'} prayerTime={prayers.Asr.adan.split(":")[0] > 12 ? `${prayers.Asr.adan.split(":")[0]-12}:${prayers.Asr.adan.split(":")[1]} PM`: `${prayers.Asr.adan} AM`} prayerEndTime={prayers.Asr.iqama.split(":")[0] > 12 ? `${prayers.Asr.iqama.split(":")[0]-12}:${prayers.Asr.iqama.split(":")[1]} PM`: `${prayers.Asr.iqama} AM`} isLast={false} />

              <Prayer id={id} prayerName={'Maghrib'} prayerTime={prayers.Maghrib.adan.split(":")[0] > 12 ? `${prayers.Maghrib.adan.split(":")[0]-12}:${prayers.Maghrib.adan.split(":")[1]} PM`: `${prayers.Maghrib.adan} AM`} prayerEndTime={prayers.Maghrib.iqama.split(":")[0] > 12 ? `${prayers.Maghrib.iqama.split(":")[0]-12}:${prayers.Maghrib.iqama.split(":")[1]} PM`: `${prayers.Maghrib.iqama} AM`} isLast={false} />

              <Prayer id={id} prayerName={'Isha'} prayerTime={prayers.Isha.adan.split(":")[0] > 12 ? `${prayers.Isha.adan.split(":")[0]-12}:${prayers.Isha.adan.split(":")[1]} PM`: `${prayers.Isha.adan} AM`} prayerEndTime={prayers.Isha.iqama.split(":")[0] > 12 ? `${prayers.Isha.iqama.split(":")[0]-12}:${prayers.Isha.iqama.split(":")[1]} PM`: `${prayers.Isha.iqama} AM`} isLast={true} />
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
