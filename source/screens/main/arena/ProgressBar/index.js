import React, {useEffect, useRef} from 'react';
import {useState} from 'react';
import {Animated, StyleSheet, View} from 'react-native';
import {styles} from './styles';

export const ProgressBar = () => {
  const countInterval = useRef(null);
  const [count, setCount] = useState(0);
  const [pbWidth, setPbWidth] = useState(0);
  const animVal = new Animated.Value(0);
  const loaderValue = useRef(animVal).current;
  const load = count => {
    Animated.timing(loaderValue, {
      toValue: count, //final value
      duration: 500, //update value in 500 milliseconds
      useNativeDriver: true,
    }).start();
  };

  const width = loaderValue.interpolate({
    inputRange: [0, 100],
    outputRange: [-pbWidth, 0],
    extrapolate: 'clamp',
  });

  useEffect(() => {
    // setCount((old) => old + 5);

    countInterval.current = setInterval(() => setCount(old => old + 5), 1000);
    return () => {
      clearInterval(countInterval); //when user exits, clear this interval.
    };
  }, []);

  useEffect(() => {
    load(count);

    if (count >= 100) {
      setCount(100);
      clearInterval(countInterval);
    } else {
      // setCount((old) => old + 5);
      // setTimeout(() => {
      //   setCount((old) => old + 5);
      // }, 1000);
    }
  }, [count]);

  return (
    <View
      style={styles.progressBar}
      onLayout={e => {
        const nw = e.nativeEvent.layout.width;
        setPbWidth(nw);
      }}>
      <Animated.View
        style={[
          [StyleSheet.absoluteFill],
          {
            backgroundColor: '#8BED4F',
            width: '100%',
            position: 'absolute',
          },
          {
            transform: [
              {
                translateX: width,
              },
            ],
          },
        ]}
      />
    </View>
  );
};
function setPbWidth(nw: any) {
  throw new Error('Function not implemented.');
}
