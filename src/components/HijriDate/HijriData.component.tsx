import { useEffect, useState } from "react";
import { View, StyleSheet,Text } from "react-native"
import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize
} from "react-native-responsive-dimensions";
import moment from 'moment-hijri';

const HijriDate = (): JSX.Element=>{
    const date = new Date();

    const [HijriDate,setHijriDate] = useState('');

    const hijriMonths = [
        "Muharram",
        "Safar",
        "Rabi' al-Awwal",
        "Rabi' al-Thani",
        "Jumada al-Awwal",
        "Jumada al-Thani",
        "Rajab",
        "Sha'ban",
        "Ramadan",
        "Shawwal",
        "Dhu al-Qi'dah",
        "Dhu al-Hijjah"
    ];

    const gregorianMonths = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ];

    const convertToIslamicDate = (date:any) => {
        return moment(date).format('iD/iM/iYYYY');
    };

    useEffect(()=>{
        const date = new Date(); 
        const hijriDate = convertToIslamicDate(date.toISOString());
        const hijriSplited = hijriDate.split("/");
        const monthName = hijriMonths[parseInt(hijriSplited[1])-1];
        setHijriDate(`${hijriSplited[0]}/${monthName}/${hijriSplited[2]}`);
    });

    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.Text}>{date.getDate()}/{gregorianMonths[date.getMonth()]}/{date.getFullYear()}</Text>
            </View>
            <View>
                <Text style={styles.Text}>{HijriDate}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      width: '100%',
      height: responsiveHeight(4.3),
      backgroundColor: '#fbf4ee',
      marginTop: 8,
      marginBottom:6,
      justifyContent:'space-between',
      paddingLeft:10,
      paddingRight:10,
      flexDirection: 'row',
      padding: 8,
    },

    Text: {
      fontSize: 15,
      fontWeight: '500',
    },
    
  });
  

export default HijriDate