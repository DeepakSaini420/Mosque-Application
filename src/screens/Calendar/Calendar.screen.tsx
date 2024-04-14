import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {SafeAreaView, Text, View, StyleSheet, FlatList,Platform,StatusBar, TouchableOpacity} from 'react-native';
import { selectPrayer } from '../../redux/mosques/mosqueSelector';
import PrayerCalendar from '../../components/PrayerCalendar/PrayerCalendar';
import GestureRecognizer from 'react-native-swipe-gestures';

const Calendar = (): JSX.Element => {
  const date = new Date();
  const [month,setMonth] = useState<number>(date.getMonth());
  const [prayer,setPrayer] = useState<any>([]);
  const mosqueData = useSelector(selectPrayer);
  const months:string[] = ['January','February','March','April','May','June','July','August','September','October','November','December']
  
  useEffect(()=>{
    if(mosqueData.length === 0) {
      setPrayer([]);
      return
    }
    mosqueData.map((data:any)=>{
      let mon = month+1;
      if(Number(data.month) === mon){
        setPrayer(data.prayer)
      }
    })
  },[month,mosqueData])
  
  return (
    <GestureRecognizer style={styles.container} onSwipeLeft={()=> setMonth(()=> month<11 ? month+1 : month)} onSwipeRight={()=> setMonth(()=> month>0 ? month-1 : month)} >
      <SafeAreaView >
        <View style={styles.monthContainer}>
          <View style={styles.month}>
            <TouchableOpacity onPress={()=> setMonth(()=> month>0 ? month-1 : month)} >
              <Text >{'<'}</Text>
            </TouchableOpacity>
            <View>
              <Text>{months[month]}</Text>
            </View>
            <TouchableOpacity>
              <Text onPress={()=> setMonth(()=> month<11 ? month+1 : month)}>{'>'}</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.calendarContainer}>
          <View style={styles.calTop}>
            <View style={styles.Div}>
              <Text style={styles.TopText}>Day</Text>
            </View>
            <View style={styles.Div}>
              <Text style={styles.TopText}>Fajar</Text>
            </View>
            <View style={styles.Div}>
              <Text style={styles.TopText}>Duhur</Text>
            </View>
            <View style={styles.Div}>
              <Text style={styles.TopText}>Asr</Text>
            </View>
            <View style={styles.Div}>
              <Text style={styles.TopText}>Maghrib</Text>
            </View>
            <View style={styles.Div}>
              <Text style={styles.TopText}>Isha</Text>
            </View>
          </View>
          <FlatList
            data={prayer}
            showsVerticalScrollIndicator={false}
            renderItem={(data) => <PrayerCalendar day={data.item.day} month={month} asr={data.item["Asr"].adan} duhur={data.item["Duhur"].adan} fajr={data.item["Fajr"].adan} isha={data.item["Isha"].adan} maghrib={data.item["Maghrib"].adan} />}
          />
        </View>
      </SafeAreaView>
    </GestureRecognizer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor:'#fff',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    color: '#fff',
    paddingLeft: 10,
    paddingRight: 10,
  },
  monthContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  month: {
    width:"90%",
    flexDirection: 'row',
    justifyContent:'space-between'
  },
  calTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  TopText: {
    fontWeight: 'bold',
    color: '#000',
  },
  calendarContainer: {
    width: '100%',
    height: '90%',
    marginTop: 12,
    backgroundColor: '#fbf4ee',
    borderRadius: 12,
    overflow: 'hidden',
    padding: 12,
  },
  Div:{}
});

export default Calendar;
