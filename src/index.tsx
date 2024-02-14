import React,{ useEffect } from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { useDispatch,useSelector } from 'react-redux';
import { Mosques, setMosques,setSelectedMosque,setPrayers,setCurrentMonthPrayers } from './redux/mosques/mosqueSlice';
import { getAllMosquesNames,getMosqueData } from './api';
import { selectMosques,selectSelectedMosque } from './redux/mosques/mosqueSelector';
import Home from './screens/Home/Home.screen';
import Calendar from './screens/Calendar/Calendar.screen';
import CompassScreen from './screens/Compass/Compass.screen';
import Settings from './screens/Settings/Settings.screen';
import Notification from './screens/Notification/Notification.screen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon1 from 'react-native-vector-icons/Feather';

const Index = (): JSX.Element => {
  const Tab = createBottomTabNavigator();

  const dispatch = useDispatch();

  const selectedMosque = useSelector(selectSelectedMosque);

  useEffect(()=>{
    // getAllMosquesNames(async (data:Mosques[])=>{
    //   console.log("CallBackWorking");
    //   dispatch(setMosques(data));
    //   console.log("My data",data);
    //   if(!selectedMosque){ 
    //     console.log("heelo")
    //     return
    //   };
    //   console.log("Before",selectedMosque);
    //   const { id,Messages } = selectedMosque;

    //   const newMosqueData = data.find((data)=>data.id === id);
    //   console.log("After",newMosqueData);
    //   console.log(selectedMosque)
    //   const newMessages = newMosqueData?.Messages || [];

    //   if(!newMosqueData || newMessages.toString() === Messages.toString()) {
    //     console.log("hello");
    //     return
    //   }
    //   if(newMosqueData.id !== selectedMosque.id) return;

    //   dispatch(setSelectedMosque(newMosqueData));

    //   const prayer = await getMosqueData({id});
        
    //   dispatch(setPrayers(prayer));
        
    //   prayer.map((data:any)=>{
    //     if(Number(data.month) === 1){
    //       dispatch(setCurrentMonthPrayers(data.prayers));
    //     }
    //   })

    // });
    let unsubscribe:any;

    (async ()=>{
      unsubscribe = await getAllMosquesNames(async (data:Mosques[])=>{
        console.log(data);
        dispatch(setMosques(data));
        console.log("My data",data);
        if(!selectedMosque){ 
          console.log("heelo")
          return
        };
        console.log("Before",selectedMosque);
        const { id,Messages } = selectedMosque;

        const newMosqueData = data.find((data)=>data.id === id);
        console.log("After",newMosqueData);
        console.log(selectedMosque)
        const newMessages = newMosqueData?.Messages || [];

        if(!newMosqueData || newMessages.toString() === Messages.toString()) {
          console.log("hello");
          return
        }
        if(newMosqueData.id !== selectedMosque.id) return;

        dispatch(setSelectedMosque(newMosqueData));

        const prayer = await getMosqueData({id});

        console.log(prayer);
          
        dispatch(setPrayers(prayer));
          
        prayer.map((data:any)=>{
          if(Number(data.month) === 1){
            dispatch(setCurrentMonthPrayers(data.prayers));
          }
        })
      })

    })();

    return ()=>{
      unsubscribe();
    }
  },[selectedMosque]);


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
          tabBarInactiveTintColor: 'white',
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
