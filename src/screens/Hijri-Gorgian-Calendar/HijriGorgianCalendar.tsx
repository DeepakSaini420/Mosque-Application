import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Button,SafeAreaView,Platform,StatusBar, TouchableOpacity } from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import moment from 'moment-hijri';

export default function HijriCalendar({navigation}:{navigation:any}) {
  const [selectedDate, setSelectedDate] = useState(moment());

  useEffect(() => {
    console.log("Selected Date:", selectedDate.format('iYYYY/iM/iD'));
  }, [selectedDate]);

  // Function to handle date selection
  const handleDateChange = (date:any) => {
    setSelectedDate(moment(date));
  };

  // Function to convert Gregorian date to Hijri
  const convertToIslamicDate = (date:any) => {
    return moment(date).format('iD/iM/iYYYY');
  };

  // Function to determine if a date is beyond the end of the current Hijri month
  // const isDisabledDate = (date:Date) => {
  //   const currentMonth = selectedDate.iMonth();
  //   const nextMonth = currentMonth === 11 ? 0 : currentMonth + 1;
  //   const lastDayOfMonth = moment().iYear(selectedDate.iYear()).iMonth(nextMonth).iDate(1)?.subtract(1, 'iDay').iDate();
  //   return moment(date).iDate() > lastDayOfMonth;
  // };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={{width:'10%',marginLeft:8,marginTop:8}}>
        <TouchableOpacity style={{borderColor:'#000',borderWidth:1,paddingTop:4,paddingBottom:4,borderRadius:3,justifyContent:'center',alignItems:'center'}} onPress={()=>navigation.navigate("Settings")}>
          <Text>Back</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <CalendarPicker
          onDateChange={handleDateChange}
          textStyle={{
            color: '#000000',
          }}
          scaleFactor={375}
        />
        {selectedDate ? (
          <Text style={{marginTop:'20%'}}>Hijri Date:- {convertToIslamicDate(selectedDate)}</Text>
        ) : (
          <Text>Please select a date</Text>
        )}
      </View>
    </SafeAreaView>
  );
}

async function createCalendar() {
  // Your function to create a new calendar goes here
}

const styles = StyleSheet.create({
  safeContainer:{
    flex:1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  container: {
    width:'100%',
    height:'90%',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent:'center'
  },
});
