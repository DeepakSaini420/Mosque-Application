import React,{ useEffect, useRef, useState } from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { useDispatch,useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Mosques, setMosques,setSelectedMosque,setPrayers,setCurrentMonthPrayers, Prayer } from './redux/mosques/mosqueSlice';
import { getAllMosquesNames,getMosqueData,getMosquePrayers,getRealTimeUpdates } from './api';
import { selectMosques,selectPrayer,selectSelectedMosque } from './redux/mosques/mosqueSelector';
import NetInfo from '@react-native-community/netinfo';
import Home from './screens/Home/Home.screen';
import Calendar from './screens/Calendar/Calendar.screen';
import CompassScreen from './screens/Compass/Compass.screen';
import Settings from './screens/Settings/Settings.screen';
import Notification from './screens/Notification/Notification.screen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon1 from 'react-native-vector-icons/Feather';



const Index = (): JSX.Element => {
  const Tab = createBottomTabNavigator();

  const  isConnected= useRef<boolean|null>(false);

  const [hash,setHash] = useState<string>();

  const dispatch = useDispatch();

  const selectedMosque = useSelector(selectSelectedMosque);
  const prayers = useSelector(selectPrayer);

  NetInfo.addEventListener(async (state) => {

    // setIsConnected(state.isConnected);
    isConnected.current = state.isConnected;

    
    if(!state.isConnected){
      const data = await AsyncStorage.getItem("Mosque");
      const data1 = await AsyncStorage.getItem("Prayers");
    }
  });
  
  useEffect(()=>{
    let unsub:any;
    (async ()=>{
      unsub = await getRealTimeUpdates((data:string)=>{
        setHash(data);
        console.log(data);
      });
    })();

    return ()=>{
      unsub ? unsub() : null;
    }
  },[]);

  useEffect(()=>{

    (async ()=>{
      try {
        const data = await getAllMosquesNames();
        console.log(data);
        dispatch(setMosques(data));
        
      } catch (error) {
        const data = await AsyncStorage.getItem("Mosque");
        if(data){
          dispatch(setMosques(JSON.parse(data)));
        }
      }
    })();

  },[hash]);
  
  useEffect(()=>{
    (async()=>{
      const mosque = await AsyncStorage.getItem("Mosque");
      if(mosque){
        setSelectedMosque(JSON.parse(mosque));
      }
    })();
  },[]);

  useEffect(()=>{
    if(!isConnected.current && selectedMosque) {
      (async()=>{
        const prayers = await AsyncStorage.getItem("Prayers");
        if(prayers){
          setPrayers(JSON.parse(prayers));
        }
      })();
    }
    if(isConnected.current && selectedMosque){
      (async ()=>{
        const prayer = await getMosquePrayers(selectedMosque.id);
        dispatch(setPrayers(prayer));
        AsyncStorage.setItem('Prayers',JSON.stringify(prayer));

      })();
    }
    
  },[selectedMosque,hash]);

  useEffect(()=>{
    if(prayers.length === 0) {
      dispatch(setCurrentMonthPrayers([]));
    }
    prayers.map((data:any)=>{
        if(Number(data.month) === 3){
            dispatch(setCurrentMonthPrayers(data.prayer));;
        }
    })
  },[prayers]);


  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({route}) => ({
          headerShown: false,
          tabBarStyle: {
            position: 'absolute',
            height: 60,
            left: 12,
            bottom: 20,
            width: '95%',
            backgroundColor: '#fbf4ee',
            borderRadius: 6,
            elevation: 0,
          },
          tabBarIcon: ({focused, color, size}) => {
            switch (route.name) {
              case 'Mosque':
                return <Icon name="mosque" size={25} color={color} />;
              case 'Calendar':
                return <Icon name="calendar-month" size={25} color={color} />;
              case 'Compass':
                return <Icon name="compass" size={25} color={color} />;
              case 'Notification':
                return <Icon name="chat" size={25} color={color} />;
              case 'Settings':
                return <Icon1 name="settings" size={25} color={color} />;
              default:
                return <Icon name="chat" size={25} color={color} />;
            }
          },
          tabBarLabel: () => {
            return null;
          },
          tabBarActiveTintColor:'tomato',
          tabBarInactiveTintColor: 'gray',
        })}>
        <Tab.Screen name="Mosque" component={Home} />
        <Tab.Screen name="Calendar" component={Calendar} />
        <Tab.Screen name="Compass" component={CompassScreen} />
        <Tab.Screen name="Notification" component={Notification} />
        <Tab.Screen name="Settings" component={Settings} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Index;
