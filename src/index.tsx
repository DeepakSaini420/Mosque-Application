import React,{ useEffect, useRef, useState } from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { useDispatch,useSelector } from 'react-redux';
import { Mosques, setMosques,setSelectedMosque,setPrayers,setCurrentMonthPrayers,setNotifications } from './redux/mosques/mosqueSlice';
import { getAllMosquesNames,getMosquePrayers,getRealTimeUpdates,getMessages } from './api';
import { selectMosques,selectPrayer,selectSelectedMosque } from './redux/mosques/mosqueSelector';
import AsyncStorage from '@react-native-async-storage/async-storage';
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

    isConnected.current = state.isConnected;

    if(!state.isConnected){
      try {
        await AsyncStorage.setItem('SelectedMosque',JSON.stringify(selectMosques));
  
  
        await AsyncStorage.setItem("Prayers",JSON.stringify(prayers));
        
      } catch (error) {
        console.log(error);
      }
    }else{
      const data = await getAllMosquesNames();
      dispatch(setMosques(data));
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
    let unsubscribe:any;
    (async ()=>{
        try {
            unsubscribe = await getMessages(selectedMosque?.id || '',(Messages:any)=>{
                if(!Messages) {
                  dispatch(setNotifications([]));
                  return;
                }
                dispatch(setNotifications(Messages));
                const data = JSON.stringify(Messages.Messages);
                AsyncStorage.setItem('Notification',data);
            });
            
        } catch (error) {
            const data = await AsyncStorage.getItem("Notification");
            if(data) dispatch(setNotifications(JSON.parse(data)));
        }
    })()

    return ()=>{
        unsubscribe ? unsubscribe() : ''
    }
},[selectedMosque]);

  useEffect(()=>{

    (async ()=>{
      try {
        const data:Mosques[] = await getAllMosquesNames();
        
        dispatch(setMosques(data));


        if(!selectedMosque) return;


        const newMosqueData = data.find((mosque)=> mosque.id === selectedMosque.id );
        if(!newMosqueData) return;
        
        if(JSON.stringify(newMosqueData) !== JSON.stringify(selectMosques)) {
          dispatch(setSelectedMosque(newMosqueData));
          AsyncStorage.setItem("SelectedMosque",JSON.stringify(newMosqueData));
        }
        

      } catch (error) {
        console.log(error)
      }
    })();

  },[hash,isConnected.current]);
  
  useEffect(()=>{
    (async()=>{
      const mosque = await AsyncStorage.getItem("SelectedMosque");
      if(mosque){
        dispatch(setSelectedMosque(JSON.parse(mosque)));

        const prayers = await AsyncStorage.getItem("Prayers");
        if(prayers) dispatch(setPrayers(JSON.parse(prayers)));
      }
    })();
  },[]);

  useEffect(()=>{
    
    if(isConnected.current && selectedMosque){
      (async ()=>{
        try {
          const prayer = await getMosquePrayers(selectedMosque.id);
          dispatch(setPrayers(prayer));
          AsyncStorage.setItem('Prayers',JSON.stringify(prayer));
          
        } catch (error) {
          console.log(error);
        }

      })();
    }
    
  },[selectedMosque,hash]);

  useEffect(()=>{
    if(prayers.length === 0) {
      dispatch(setCurrentMonthPrayers([]));
    }
    prayers.map((data:any)=>{
        if(Number(data.month) === new Date().getMonth()+1){
            dispatch(setCurrentMonthPrayers(data.prayer));;
        }
    })
  },[prayers]);

  console.log(selectedMosque);


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
