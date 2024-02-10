import React,{ useEffect } from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { useDispatch,useSelector } from 'react-redux';
import { Mosques, setMosques } from './redux/mosques/mosqueSlice';
import { getAllMosquesNames } from './api';
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
    (async ()=>{
      const data:Mosques[] = await getAllMosquesNames();
      console.log(data)
      dispatch(setMosques(data));
    })();
  },[]);

  useEffect(()=>{
    console.log(selectedMosque);
  },[selectMosques]);

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
                return <Icon name="mosque" size={25} />;
              case 'Calendar':
                return <Icon name="calendar-month" size={25} />;
              case 'Compass':
                return <Icon name="compass" size={25} />;
              case 'Notification':
                return <Icon name="chat" size={25} />;
              case 'Settings':
                return <Icon1 name="settings" size={25} />;
              default:
                return <Icon name="chat" size={25} />;
            }
          },
          tabBarLabel: () => {
            return null;
          },
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
