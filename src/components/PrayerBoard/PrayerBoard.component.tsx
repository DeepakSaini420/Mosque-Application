import React, { useEffect, useState } from 'react';
import {View, StyleSheet, Text} from 'react-native';
import { useSelector } from 'react-redux';
import { selectCurrentMonthPrayer } from '../../redux/mosques/mosqueSelector';
import { RFValue } from 'react-native-responsive-fontsize';
import Prayer  from '../Prayer/Prayer.Component';
import { responsiveFontSize, responsiveHeight } from 'react-native-responsive-dimensions';

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
              <Prayer id={id} prayerName={'Fajr'} prayerTime={`${prayers.Fajr.adan}`} prayerEndTime={`${prayers.Fajr.iqama}`} isLast={false} />

              <Prayer id={id} prayerName={'Duhur'} prayerTime={prayers.Duhur.adan} prayerEndTime={prayers.Duhur.iqama} isLast={false} />

              <Prayer id={id} prayerName={'Asr'} prayerTime={prayers.Asr.adan} prayerEndTime={prayers.Asr.iqama} isLast={false} />

              <Prayer id={id} prayerName={'Maghrib'} prayerTime={prayers.Maghrib.adan} prayerEndTime={prayers.Maghrib.iqama} isLast={false} />

              <Prayer id={id} prayerName={'Isha'} prayerTime={prayers.Isha.adan} prayerEndTime={prayers.Isha.iqama} isLast={true} />
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
    height: responsiveHeight(48),
    borderRadius: 25,
    marginTop: responsiveHeight(0.5),
    padding: responsiveHeight(1.8),
  },
  LocationContainer: {},
  MosqueName: {
    color: '#000',
    fontSize: responsiveFontSize(3.7),
    fontWeight: 'bold',
  },
  prayerContainer: {
    marginTop: RFValue(8),
  },
  loaction: {
    color: '#8c8a8f',
    fontWeight: '600',
    fontSize: responsiveFontSize(2.5),
    letterSpacing: 0.5,
  },
});

export default PrayerBoard;
