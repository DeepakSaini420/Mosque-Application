import React,{ useState,useEffect } from 'react';
import {View, StyleSheet, Text} from 'react-native';
import * as Location from 'expo-location';

const TimeBoard = (): JSX.Element => {

  const [sunsetSunrise,setSunsetSunrise] = useState<{
    sunset:string,
    sunrise:string
  }>({
    sunset:'',
    sunrise:''
  });

  useEffect(()=>{
    (async ()=>{
      try {
        
        let { status } = await Location.requestForegroundPermissionsAsync();
        
        if(status!=='granted'){
          return;
        }

        const location = await Location.getCurrentPositionAsync();
        
        const data = await fetch(`https://api.sunrisesunset.io/json?lat=${location.coords.latitude}&lng=${location.coords.longitude}`);
        
        const { results } = await data.json();

        setSunsetSunrise({
          sunset:results.sunset,
          sunrise:results.sunrise
        })

      } catch (error) {
        console.error('Error getting compass heading:', error);
      }
    })();
  },[])

  return (
    <View style={styles.container}>
      <View style={styles.SunriseContainer}>
        <Text style={styles.Text}>Sunrise</Text>
        <Text style={styles.Time}>{sunsetSunrise.sunrise}</Text>
      </View>
      <View style={styles.SunsetContainer}>
        <Text style={styles.Text}>Sunset</Text>
        <Text style={styles.Time}>{sunsetSunrise.sunset}</Text>
      </View>
      <View style={styles.SpecialDay}>
        <Text style={styles.Text}>Friday Prayer</Text>
        <Text style={styles.Time}>12:58 PM</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 65,
    backgroundColor: '#fbf4ee',
    marginTop: 25,
    flexDirection: 'row',
    padding: 8,
  },
  SunriseContainer: {
    width: '33.3%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRightWidth: 3,
    borderRightColor: '#f9c19e',
  },
  SunsetContainer: {
    width: '33.3%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRightWidth: 3,
    borderRightColor: '#f9c19e',
  },
  SpecialDay: {
    width: '33.3%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  Text: {
    fontSize: 15,
    fontWeight: '500',
  },
  Time: {
    color: '#000',
    fontSize: 16,
    marginTop: 3,
    fontWeight: 'bold',
  },
});

export default TimeBoard;
