import React,{ useEffect, useState } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import {StyleSheet, SafeAreaView, Platform,Text,View,TouchableOpacity,StatusBar } from 'react-native';
import { selectSelectedMosque } from '../../redux/mosques/mosqueSelector';
import TimeShower from '../../components/TimeShowe/TimeShower.compoent';
import TimeBoard from '../../components/TimeBoard/TimeBoard.component';
import PrayerBoard from '../../components/PrayerBoard/PrayerBoard.component';
import MosqueList from '../../components/MosqueList/MosqueList.component';

const Home = (): JSX.Element => {

  const [isMosqueSelected,setIsMosqueSelected] = useState<boolean>(false);
  const mosqueName = useSelector(selectSelectedMosque);

  useEffect(()=>{
    mosqueName ? setIsMosqueSelected(true) : setIsMosqueSelected(false);
  },[mosqueName]);
  
  return (
    <SafeAreaView style={styles.HomeContainer}>
      {
        mosqueName ? (
          <>
            <TimeShower />
            <TimeBoard />
            <PrayerBoard name={mosqueName.name} location={mosqueName.location} id={mosqueName.id} />    
          </>   
        ): (
          <View style={styles.cotainer}>
            <TouchableOpacity onPress={()=>setIsMosqueSelected(true)} >
              <Text>Click To Select A Mosque</Text>
            </TouchableOpacity>
            { isMosqueSelected &&  <MosqueList/> }
          </View>
        )
      }
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  HomeContainer: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: '#fff',
  },
  cotainer:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  }
});

export default Home;
