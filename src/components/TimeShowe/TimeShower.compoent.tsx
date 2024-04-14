import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { useSelector } from 'react-redux';
import { selectCurrentMonthPrayer,selectNextMonthPrayer } from '../../redux/mosques/mosqueSelector';

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
        hours: hours > 12 ? hours - 12 : hours,
        minutes: date.getMinutes(),
        time: hours >= 12 ? 'Pm' : 'Am',
      });
      

      if(hours>=0 && hours<12){
        setCurrentPrayer('Fajr');
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
          setUpcommingPrayer("Fajr");
          setNextTime(showTime);
        }else {
          setUpcommingPrayer("Duhur");
          setNextTime(showTimeNext);
        }
        setEndTime(`${currentMonthlyPrayers.length >= date.getDate()-1 ? currentMonthlyPrayers[date.getDate()-1].Fajr.iqama.split(":")[0] > 12 ? `${currentMonthlyPrayers[date.getDate()-1].Fajr.iqama.split(":")[0]-12}:${currentMonthlyPrayers[date.getDate()-1].Fajr.iqama.split(":")[1]} AM`: `${currentMonthlyPrayers[date.getDate()-1].Fajr.iqama} AM` : '' }`)
      }
      if(hours>=12 && hours<15){
        setCurrentPrayer('Duhur');
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
          setUpcommingPrayer("Duhur");
          setNextTime(showTime);
        }else {
          setUpcommingPrayer("Asr");
          setNextTime(showTimeNext);
        }
        setEndTime(`${currentMonthlyPrayers.length >= date.getDate()-1 ? currentMonthlyPrayers[date.getDate()-1].Duhur.iqama.split(":")[0] > 12 ? `${currentMonthlyPrayers[date.getDate()-1].Duhur.iqama.split(":")[0]-12}:${currentMonthlyPrayers[date.getDate()-1].Duhur.iqama.split(":")[1]} PM`: `${currentMonthlyPrayers[date.getDate()-1].Duhur.iqama} PM` : '' }`)
      }
      if(hours>=15 && hours<19){
        setCurrentPrayer('Asr');
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
          setUpcommingPrayer("Asr");
          setNextTime(showTime);
        }else {
          setUpcommingPrayer("Maghrib");
          setNextTime(showTimeNext);
        }
        setEndTime(`${currentMonthlyPrayers.length >= date.getDate()-1 ? currentMonthlyPrayers[date.getDate()-1].Asr.iqama.split(":")[0] > 12 ? `${currentMonthlyPrayers[date.getDate()-1].Asr.iqama.split(":")[0]-12}:${currentMonthlyPrayers[date.getDate()-1].Asr.iqama.split(":")[1]} PM`: `${currentMonthlyPrayers[date.getDate()-1].Asr.iqama} PM` : '' }`);
      }
      if(hours>=19 && hours<20){
        setCurrentPrayer('Maghrib');
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
          setUpcommingPrayer("Maghrib");
          setNextTime(showTime);
        }else {
          setUpcommingPrayer("Isha");
          setNextTime(showTimeNext);
        }
        setEndTime(`${currentMonthlyPrayers.length >= date.getDate()-1 ? currentMonthlyPrayers[date.getDate()-1].Maghrib.iqama.split(":")[0] > 12 ? `${currentMonthlyPrayers[date.getDate()-1].Maghrib.iqama.split(":")[0]-12}:${currentMonthlyPrayers[date.getDate()-1].Maghrib.iqama.split(":")[1]} PM`: `${currentMonthlyPrayers[date.getDate()-1].Maghrib.iqama} PM` : '' }`);
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
          setUpcommingPrayer("Isha");
          setNextTime(showTime);
        }else {
          setUpcommingPrayer("Fajr");
          setNextTime(showTimeNext);
        }
        setEndTime(`${currentMonthlyPrayers.length >= date.getDate()-1 ? currentMonthlyPrayers[date.getDate()-1].Isha.iqama.split(":")[0] > 12 ? `${currentMonthlyPrayers[date.getDate()-1].Isha.iqama.split(":")[0]-12}:${currentMonthlyPrayers[date.getDate()-1].Isha.iqama.split(":")[1]} PM`: `${currentMonthlyPrayers[date.getDate()-1].Isha.iqama} PM` : '' }`)
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
    height: 210,
    borderRadius: 30,
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
