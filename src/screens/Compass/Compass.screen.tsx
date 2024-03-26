import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import { Image, View, Text, StyleSheet, ActivityIndicator,Platform,StatusBar } from "react-native";
import { Magnetometer } from "expo-sensors";
import * as Location from "expo-location";

export const useQiblaCompass = () => {
  const [subscription, setSubscription] = useState<any|null>(null);
  const [magnetometer, setMagnetometer] = useState(0);
  const [qiblad, setQiblad] = useState(0);
  const [error, setError] = useState<string|null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const initCompass = async () => {
    const isAvailable = await Magnetometer.isAvailableAsync();
    if (!isAvailable) {
      setError("Compass is not available on this device");
      console.log("Not Available");
      setIsLoading(false);
      return;
    }
    let { status } = await Location.requestForegroundPermissionsAsync();
    console.log(status);
    if (status !== "granted") {
      setError("Location permission not granted");
      setIsLoading(false);
      return;
    }

    try {
      let location = await Location.getLastKnownPositionAsync({});
      if(!location?.coords) return;
      const { latitude, longitude } = location.coords;
      calculate(latitude, longitude);
      console.log(latitude,longitude);
      setIsLoading(false);
      subscribe();
    } finally {
      
    }
  }

  useEffect(() => {
    initCompass();

    return () => {
      unsubscribe();
    };
  }, []);

  const subscribe = () => {
    Magnetometer.setUpdateInterval(100);
    setSubscription(
      Magnetometer.addListener((data) => {
        setMagnetometer(angle(data));
      })
    );
  };

  const unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(null);
  };

  const angle = (magnetometer:any) => {
    let angle = 0;
    if (magnetometer) {
      let { x, y, z } = magnetometer;
      if (Math.atan2(y, x) >= 0) {
        angle = Math.atan2(y, x) * (180 / Math.PI);
      } else {
        angle = (Math.atan2(y, x) + 2 * Math.PI) * (180 / Math.PI);
      }
    }
    return Math.round(angle);
  };

  const direction = (degree:number) => {
    if (degree >= 22.5 && degree < 67.5) {
      return "NE";
    } else if (degree >= 67.5 && degree < 112.5) {
      return "E";
    } else if (degree >= 112.5 && degree < 157.5) {
      return "SE";
    } else if (degree >= 157.5 && degree < 202.5) {
      return "S";
    } else if (degree >= 202.5 && degree < 247.5) {
      return "SW";
    } else if (degree >= 247.5 && degree < 292.5) {
      return "W";
    } else if (degree >= 292.5 && degree < 337.5) {
      return "NW";
    } else {
      return "N";
    }
  };

  const degree = (magnetometer:any) => {
    return magnetometer - 90 >= 0 ? magnetometer - 90 : magnetometer + 271;
  };

  const calculate = (latitude:number, longitude:number) => {
    const PI = Math.PI;
    let latk = (21.4225 * PI) / 180.0;
    let longk = (39.8264 * PI) / 180.0;
    let phi = (latitude * PI) / 180.0;
    let lambda = (longitude * PI) / 180.0;
    let qiblad =
      (180.0 / PI) *
      Math.atan2(
        Math.sin(longk - lambda),
        Math.cos(phi) * Math.tan(latk) -
          Math.sin(phi) * Math.cos(longk - lambda)
      );
    setQiblad(qiblad);
  };

  const compassDirection = direction(degree(magnetometer));
  const compassDegree = degree(magnetometer);
  const compassRotate = 360 - degree(magnetometer);
  const kabaRotate = 360 - degree(magnetometer) + qiblad;

  return {
    qiblad,
    compassDirection,
    compassDegree,
    compassRotate,
    kabaRotate,
    error,
    isLoading,
    reinitCompass: initCompass,
  };
};

const QiblaCompass = forwardRef(
  (
    { },
    ref
  ) => {
    const {
      qiblad,
      compassDirection,
      compassDegree,
      compassRotate,
      kabaRotate,
      error,
      isLoading,
      reinitCompass,
    } = useQiblaCompass();

    useImperativeHandle(
      ref,
      () => {
        return {
          reinitCompass,
        };
      },
      []
    );
    if (isLoading) {
      return (
        <View style={[styles.container, { backgroundColor:"transparent" }]}>
          <ActivityIndicator size={50} color={"#000"} />
        </View>
      );
    }

    return (
      <View style={[styles.container, { backgroundColor:"transparent" }]}>
        {error && (
          <Text
            style={{
              color: "#f00",
              fontWeight: "bold",
              textAlign: "center",
              paddingHorizontal: 20,
              fontSize: 16,
              ...{},
            }}
          >
            Error: {error}
          </Text>
        )}
        <View style={styles.direction}>
          <Text style={[styles.directionText, { color:"#000", ...{} }]}>
            {compassDirection}
          </Text>
          <Text style={[styles.directionText, { color:"#000", ...{} }]}>
            {compassDegree}°
          </Text>
        </View>
        <View
          style={{
            width: "100%",
            height: 300,
            position: "relative",
          }}
        >
          <Image
            source={require("../../../assets/compass.png")}
            style={[
              styles.image,
              {
                transform: [
                  {
                    rotate: compassRotate + "deg",
                  },
                ],
              },
            ]}
          />
          <View
            style={{
              width: 400,
              height: 400,
              position: "absolute",
              alignSelf: "center",
              transform: [
                {
                  rotate: `${kabaRotate}deg`,
                },
              ],
              flexDirection: "row",
              justifyContent: "center",
              zIndex: 999,
            }}
          >
            <Image
              source={require("../../../assets/kaba.png")}
              style={{
                resizeMode: "center",
                height: 100,
                paddingBottom: 150,
                marginTop: 20,
                width: 60,
                zIndex: 999,
              }}
            />
          </View>
        </View>
      </View>
    );
  }
);


const styles = StyleSheet.create({
  image: {
    resizeMode: "contain",
    paddingTop:  Platform.OS === 'android' ? StatusBar.currentHeight:0 ,
    alignSelf: "center",
    position: "absolute",
    top: 0,
    width: 400,
    height: 400,
  },
  container: {
    backgroundColor: "#fff",
    width:'100%',
    height:'100%',
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  direction: {
    textAlign: "center",
    zIndex: 300,
  },
  directionText: {
    textAlign: "center",
    fontSize: 30,
    color: "#468773",
  },
  qiblaDirection: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default QiblaCompass;