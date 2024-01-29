import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import { useSelector } from 'react-redux';
import { selectCurrentMonthPrayer } from '../../redux/mosques/mosqueSelector';
import Prayer from '../Prayer/Prayer.Component';

const PrayerBoard = ({name,location}:{name:string,location:string}): JSX.Element => {

  const currentMonthlyPrayers = useSelector(selectCurrentMonthPrayer); 

  return (
    <View style={styles.container}>
      <View style={styles.LocationContainer}>
        <Text style={styles.MosqueName}>{name}</Text>
        <Text style={styles.loaction}>{location}</Text>
      </View>
      <View style={styles.prayerContainer}>
        {
          currentMonthlyPrayers.length > 0 ? (
            <>
              <Prayer prayerName={'Fajr'} prayerTime={`${currentMonthlyPrayers[0].Fajr.adan} AM`} isLast={false} />
              <Prayer prayerName={'Duhur'} prayerTime={`${currentMonthlyPrayers[0].Duhur.adan} PM`} isLast={false} />
              <Prayer prayerName={'Asr'} prayerTime={currentMonthlyPrayers[0].Asr.adan.split(":")[0] > 12 ? `${currentMonthlyPrayers[0].Asr.adan.split(":")[0]-12}:${currentMonthlyPrayers[0].Asr.adan.split(":")[1]} PM`: `${currentMonthlyPrayers[0].Asr.adan} AM`} isLast={false} />
              <Prayer prayerName={'Maghrib'} prayerTime={currentMonthlyPrayers[0].Maghrib.adan.split(":")[0] > 12 ? `${currentMonthlyPrayers[0].Maghrib.adan.split(":")[0]-12}:${currentMonthlyPrayers[0].Maghrib.adan.split(":")[1]} PM`: `${currentMonthlyPrayers[0].Maghrib.adan} AM`} isLast={false} />
              <Prayer prayerName={'Isha'} prayerTime={currentMonthlyPrayers[0].Isha.adan.split(":")[0] > 12 ? `${currentMonthlyPrayers[0].Isha.adan.split(":")[0]-12}:${currentMonthlyPrayers[0].Isha.adan.split(":")[1]} PM`: `${currentMonthlyPrayers[0].Isha.adan} AM`} isLast={true} />
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
