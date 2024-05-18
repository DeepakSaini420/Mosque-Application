import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { useSelector } from 'react-redux';
import { selectCurrentMonthPrayer,selectNextMonthPrayer } from '../../redux/mosques/mosqueSelector';
import { responsiveHeight } from 'react-native-responsive-dimensions';

const TimeShower = (): JSX.Element => {

  const [currentPrayer,setCurrentPrayer] = useState<string>();
  const [nextTime,setNextTime] = useState<string>('');
  const [upcommingPrayer,setUpcommingPrayer] = useState<string>('');
  const [endTime,setEndTime] = useState<string>('');
  
  const [currentTime, setCurrentTime] = useState({
    hours: 0,
    minutes: 0,
    time: '',
  });

  const currentMonthlyPrayers = useSelector(selectCurrentMonthPrayer);
  const nextMonthPrayer = useSelector(selectNextMonthPrayer);

  useEffect(() => {
    const timeInterval = setInterval(() => {
      const date = new Date();
      const hours = date.getHours();
      setCurrentTime({
        hours: hours,
        minutes: date.getMinutes(),
        time: hours >= 12 ? 'Pm' : 'Am',
      });
      
      if(!currentMonthlyPrayers[date.getDate()-1]) return;
      if(hours>=0 && hours<12){
        const date = new Date();
        const currentPrayerTime = currentMonthlyPrayers[date.getDate()-1].Fajr.adan.split(":");
        const prayerTime = currentMonthlyPrayers[date.getDate()].Duhur.adan.split(":");

        const currentHours = date.getHours();
        const currentMinutes = date.getMinutes();
        const currentSeconds = date.getSeconds();
        
        const currentTimeMillis = (currentHours * 3600 + currentMinutes * 60 + currentSeconds);
        const desiredTimeMillisNext = ((Number(prayerTime[0])+24) * 3600 + Number(prayerTime[1]) * 60);
        const desiredTimeMillis = ((Number(currentPrayerTime[0])) * 3600 + Number(currentPrayerTime[1]) * 60);

        const timeDiff = desiredTimeMillis - currentTimeMillis;
        const timeDiffNext = desiredTimeMillisNext-currentTimeMillis;

        const showTimeNext = new Date(timeDiffNext * 1000).toISOString().substring(11, 19); 
        const showTime = new Date(timeDiff * 1000).toISOString().substring(11, 19);
        if(timeDiff>0){
          setCurrentPrayer('Fajr');
          setUpcommingPrayer("Fajr");
          setNextTime(showTime);
          setEndTime(`${currentMonthlyPrayers.length >= date.getDate()-1 ? currentMonthlyPrayers[date.getDate()-1].Fajr.iqama : '' }`)
        }else {
          setCurrentPrayer('Duhur');
          setUpcommingPrayer("Duhur");
          setNextTime(showTimeNext);
          setEndTime(`${currentMonthlyPrayers.length >= date.getDate()-1 ? currentMonthlyPrayers[date.getDate()-1].Duhur.iqama : '' }`)

        }
      }
      if(hours>=12 && hours<15){
        const date = new Date();
        const currentPrayerTime = currentMonthlyPrayers[date.getDate()-1].Duhur.adan.split(":");
        const prayerTime = currentMonthlyPrayers[date.getDate()].Asr.adan.split(":");

        const currentHours = date.getHours();
        const currentMinutes = date.getMinutes();
        const currentSeconds = date.getSeconds();
        
        const currentTimeMillis = (currentHours * 3600 + currentMinutes * 60 + currentSeconds);
        const desiredTimeMillisNext = ((Number(prayerTime[0])+24) * 3600 + Number(prayerTime[1]) * 60);
        const desiredTimeMillis = ((Number(currentPrayerTime[0])) * 3600 + Number(currentPrayerTime[1]) * 60);

        const timeDiff = desiredTimeMillis - currentTimeMillis;
        const timeDiffNext = desiredTimeMillisNext-currentTimeMillis;

        const showTimeNext = new Date(timeDiffNext * 1000).toISOString().substring(11, 19); 
        const showTime = new Date(timeDiff * 1000).toISOString().substring(11, 19);
        if(timeDiff>0){
          setCurrentPrayer("Duhur");
          setUpcommingPrayer("Duhur");
          setNextTime(showTime);
          setEndTime(`${currentMonthlyPrayers.length >= date.getDate()-1 ? currentMonthlyPrayers[date.getDate()-1].Duhur.iqama : '' }`)
        }else {
          setCurrentPrayer("Asr");
          setUpcommingPrayer("Asr");
          setNextTime(showTimeNext);
          setEndTime(`${currentMonthlyPrayers.length >= date.getDate()-1 ? currentMonthlyPrayers[date.getDate()-1].Asr.iqama : '' }`)
        }
      }
      if(hours>=15 && hours<19){
        const date = new Date();
        const currentPrayerTime = currentMonthlyPrayers[date.getDate()-1].Asr.adan.split(":");
        const prayerTime = currentMonthlyPrayers[date.getDate()].Maghrib.adan.split(":");

        const currentHours = date.getHours();
        const currentMinutes = date.getMinutes();
        const currentSeconds = date.getSeconds();
        
        const currentTimeMillis = (currentHours * 3600 + currentMinutes * 60 + currentSeconds);
        const desiredTimeMillisNext = ((Number(prayerTime[0])+24) * 3600 + Number(prayerTime[1]) * 60);
        const desiredTimeMillis = ((Number(currentPrayerTime[0])) * 3600 + Number(currentPrayerTime[1]) * 60);

        const timeDiff = desiredTimeMillis - currentTimeMillis;
        const timeDiffNext = desiredTimeMillisNext-currentTimeMillis;

        const showTimeNext = new Date(timeDiffNext * 1000).toISOString().substring(11, 19); 
        const showTime = new Date(timeDiff * 1000).toISOString().substring(11, 19);
        if(timeDiff>0){
          setCurrentPrayer("Asr");
          setUpcommingPrayer("Asr");
          setNextTime(showTime);
          setEndTime(`${currentMonthlyPrayers.length >= date.getDate()-1 ? currentMonthlyPrayers[date.getDate()-1].Asr.iqama : '' }`)
        }else {
          setCurrentPrayer("Maghrib");
          setUpcommingPrayer("Maghrib");
          setNextTime(showTimeNext);
          setEndTime(`${currentMonthlyPrayers.length >= date.getDate()-1 ? currentMonthlyPrayers[date.getDate()-1].Maghrib.iqama : '' }`)
        }
      }
      if(hours>=19 && hours<20){
        const date = new Date();
        const currentPrayerTime = currentMonthlyPrayers[date.getDate()-1].Maghrib.adan.split(":");
        const prayerTime = currentMonthlyPrayers[date.getDate()].Isha.adan.split(":");

        const currentHours = date.getHours();
        const currentMinutes = date.getMinutes();
        const currentSeconds = date.getSeconds();
        
        const currentTimeMillis = (currentHours * 3600 + currentMinutes * 60 + currentSeconds);
        const desiredTimeMillisNext = ((Number(prayerTime[0])+24) * 3600 + Number(prayerTime[1]) * 60);
        const desiredTimeMillis = ((Number(currentPrayerTime[0])) * 3600 + Number(currentPrayerTime[1]) * 60);

        const timeDiff = desiredTimeMillis - currentTimeMillis;
        const timeDiffNext = desiredTimeMillisNext-currentTimeMillis;

        const showTimeNext = new Date(timeDiffNext * 1000).toISOString().substring(11, 19); 
        const showTime = new Date(timeDiff * 1000).toISOString().substring(11, 19);
        if(timeDiff>0){
          setCurrentPrayer("Maghrib");
          setUpcommingPrayer("Maghrib");
          setNextTime(showTime);
          setEndTime(`${currentMonthlyPrayers.length >= date.getDate()-1 ? currentMonthlyPrayers[date.getDate()-1].Maghrib.iqama : '' }`)
        }else {
          setCurrentPrayer("Isha");
          setUpcommingPrayer("Isha");
          setNextTime(showTimeNext);
          setEndTime(`${currentMonthlyPrayers.length >= date.getDate()-1 ? currentMonthlyPrayers[date.getDate()-1].Isha.iqama : '' }`)
        }
      }
      if(hours>=20 && hours<=23){
        setCurrentPrayer('Isha');
        const date = new Date();
        const currentPrayerTime = currentMonthlyPrayers[date.getDate()-1].Isha.adan.split(":");
        let prayerTime;
        if(date.getDate() > currentMonthlyPrayers.length){
          prayerTime = nextMonthPrayer?.Fajr.adan.split(":");
        }else{
          prayerTime = currentMonthlyPrayers[date.getDate()].Fajr.adan.split(":");
        }

        const currentHours = date.getHours();
        const currentMinutes = date.getMinutes();
        const currentSeconds = date.getSeconds();
        
        const currentTimeMillis = (currentHours * 3600 + currentMinutes * 60 + currentSeconds);
        const desiredTimeMillisNext = ((Number(prayerTime[0])+24) * 3600 + Number(prayerTime[1]) * 60);
        const desiredTimeMillis = ((Number(currentPrayerTime[0])) * 3600 + Number(currentPrayerTime[1]) * 60);

        const timeDiff = desiredTimeMillis - currentTimeMillis ;
        const timeDiffNext = desiredTimeMillisNext-currentTimeMillis;

        const showTimeNext = new Date(timeDiffNext * 1000).toISOString().substring(11, 19); 
        const showTime = new Date(timeDiff * 1000).toISOString().substring(11, 19);
        if(timeDiff>0){
          setCurrentPrayer("Isha");
          setUpcommingPrayer("Isha");
          setNextTime(showTime);
          setEndTime(`${currentMonthlyPrayers.length >= date.getDate()-1 ? currentMonthlyPrayers[date.getDate()-1].Isha.iqama : '' }`)
        }else {
          setCurrentPrayer("Fajr")
          setUpcommingPrayer("Fajr");
          setNextTime(showTimeNext);
          setEndTime(`${currentMonthlyPrayers.length >= date.getDate()-1 ? currentMonthlyPrayers[date.getDate()-1].Fajr.iqama : '' }`)
        }
      }
    }, 1000);

    return ()=>{
      clearInterval(timeInterval);
    }
  }, [currentMonthlyPrayers]);

  const date = new Date();
  
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
        <View style={styles.upcoming}>
          <Text style={styles.eTimeText}>Time Till {upcommingPrayer}</Text>
          <Text style={styles.sepration}>-</Text>
          <Text style={styles.timeLeft}>{nextTime}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  TimeContainer: {
    width: '100%',
    height: responsiveHeight(25.5),
    borderRadius: 30,
    marginTop:'1.5%',
    backgroundColor: '#f8d3b9',
  },
  TextContainer: {
    marginTop: 18,
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
  upcoming:{
    flexDirection:'row',
    alignItems: 'center',
  },
  upcomingPrayer:{
    fontSize: 20,
    fontWeight: '600',
    color:"#000"
  },
  timeLeft:{
    fontSize: 20,
    fontWeight: '600',
    marginLeft: 10,
    color: '#000',
  }
});

export default TimeShower;
