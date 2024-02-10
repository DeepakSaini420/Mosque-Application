import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {SafeAreaView, Text, View, StyleSheet, FlatList,Platform,StatusBar} from 'react-native';
import { selectPrayer } from '../../redux/mosques/mosqueSelector';
import PrayerCalendar from '../../components/PrayerCalendar/PrayerCalendar';

const Calendar = (): JSX.Element => {
  const [month,setMonth] = useState<number>(0);
  const [prayer,setPrayer] = useState<any>([]);
  const mosqueData = useSelector(selectPrayer);
  const date = new Date();
  const months:string[] = ['January','February','March','April','May','June','July','August','September','October','November','December']
  console.log(mosqueData);

  useEffect(()=>{
    setMonth(date.getMonth());

    mosqueData.map((data:any)=>{
      if(Number(data.month) === date.getMonth()+1){
        setPrayer(data.prayers)
      }
    })
  })
  console.log(prayer);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.monthContainer}>
        <View style={styles.month}>
          <View>
            <Text>{'<'}</Text>
          </View>
          <View>
            <Text>{months[month]}</Text>
          </View>
          <View>
            <Text>{'>'}</Text>
          </View>
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
          renderItem={(data) => <PrayerCalendar asr={data.item["Asr"].adan} duhur={data.item["Duhur"].adan} fajr={data.item["Fajr"].adan} isha={data.item["Isha"].adan} maghrib={data.item["Maghrib"].adan} />}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop:  Platform.OS === 'android' ? StatusBar.currentHeight:0 ,
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
    flexDirection: 'row',
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
    height: '84%',
    marginTop: 12,
    backgroundColor: '#fbf4ee',
    borderRadius: 12,
    overflow: 'hidden',
    padding: 12,
  },
  Div:{}
});

export default Calendar;
