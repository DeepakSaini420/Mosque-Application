import React, { useState, useEffect } from 'react';
import { Text, View, Image } from 'react-native';
import * as Location  from 'expo-location';

const CompassApp = () => {
  const [heading, setHeading] = useState(null);

  useEffect(() => {
    const getCompassHeading = async () => {
      try {
        await Location.requestForegroundPermissionsAsync();
        const subscription = await Location.watchHeadingAsync((data:any) => {
          setHeading(data.trueHeading);
        });

        return () => {
          subscription.remove();
        };
      } catch (error) {
        console.error('Error getting compass heading:', error);
      }
    };

    getCompassHeading();
  }, []);

  const getCardinalDirection = () => {
    if (heading === null) {
      return 'Calculating...';
    }

    const cardinalDirections = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    const index = Math.round(heading / 45) % 8;
    return cardinalDirections[index];
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Image 
        source={require('../../../assets/compass.png')}
        style={{transform:[{
          rotate: heading ? `-${heading}deg` : '0deg'
        }],width:380,height:380}}
      />
    </View>
  );
};

export default CompassApp;
