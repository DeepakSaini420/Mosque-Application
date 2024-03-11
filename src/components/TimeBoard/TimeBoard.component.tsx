import React,{ useState,useEffect, useRef } from 'react';
import {View, StyleSheet, Text} from 'react-native';
import * as Location from 'expo-location';
import NetInfo from '@react-native-community/netinfo'
import AsyncStorage from '@react-native-async-storage/async-storage';

const TimeBoard = (): JSX.Element => {

  const [sunsetSunrise,setSunsetSunrise] = useState<{
    sunset:string,
    sunrise:string
  }>({
    sunset:'',
    sunrise:''
  });

  const isConnected = useRef<boolean|null>(true);
  NetInfo.addEventListener((state)=> isConnected.current=state.isConnected )

  function setDay(date:Date, dayOfWeek:number) {
    date = new Date(date.getTime ());
    date.setDate(date.getDate() + (dayOfWeek + 7 - date.getDay()) % 7);
    return date;
  }

  useEffect(()=>{
    if(!isConnected.current){
      (async()=>{
        const data = await AsyncStorage.getItem("SunsetSunrise");
        if(data)
        setSunsetSunrise(JSON.parse(data));
      })();
      return;
    }
    const inter = setInterval(()=>{
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

      if(sunsetSunrise.sunrise.length > 0 && sunsetSunrise.sunset.length>0){
        AsyncStorage.setItem("SunsetSunrise",JSON.stringify(sunsetSunrise));
        clearInterval(inter);

      }
    },1000);

    return ()=>{
      clearInterval(inter);
    }
  },[isConnected.current])

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
