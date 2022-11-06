import React, {useEffect, useRef} from 'react';
import {useState} from 'react';
import {Animated, StyleSheet, View} from 'react-native';
import {styles} from './styles';

//redux
import {setLifebar} from '../../../../redux/arena/slice';

import {useDispatch, useSelector} from 'react-redux';

export const ProgressBar = () => {
  const countInterval = useRef(null);
  const [count, setCount] = useState(0);
  const [pbWidth, setPbWidth] = useState(0);
  const animVal = new Animated.Value(100);
  const loaderValue = useRef(animVal).current;

  const lifebarInt = useSelector(state => state.arena.lifebarInt);
  const levelInt = useSelector(state => state.arena.levelInt);

  const [progressBarColor, setProgressBarColor] = useState(
    'rgba(179, 210, 59, 1)',
  );

  const dispatch = useDispatch();

  const lerp = (a, b, t) => {
    return a + (b - a) * t;
  };

  // red
  // #e92f48

  // green
  // #b3d23b

  // blue
  // #10aad7

  // orange
  // #f9a139

  // navy blue
  // #11123d

  const setProgressColor = count => {
    let c = count / 100;

    let str = 'rgba(';
    str += Math.floor(lerp(233, 179, c)) + ', ';
    str += Math.floor(lerp(47, 210, c)) + ', ';
    str += Math.floor(lerp(72, 59, c));
    str += ', 1)';

    setProgressBarColor(str);
  };

  const load = count => {
    Animated.timing(loaderValue, {
      toValue: count, //final value
      duration: 500,
      useNativeDriver: true,
    }).start();

    setProgressColor(count);
  };

  const width = loaderValue.interpolate({
    inputRange: [0, 100],
    outputRange: [-pbWidth, 0],
    extrapolate: 'clamp',
  });

  useEffect(() => {
    setCount(0);

    countInterval.current = setInterval(
      () =>
        setCount(old => {
          let adj = Math.min(7, Math.ceil(levelInt / 30));
          adj = adj ? adj : 1;

          return old + adj;
        }),
      1000,
    );

    return () => {
      clearInterval(countInterval); //when user exits, clear this interval.
    };
  }, []);

  useEffect(() => {
    let diff = lifebarInt - count;

    if (diff > 100) {
      adj = diff - 100;
      dispatch(setLifebar(lifebarInt - adj));
    }
    load(diff);

    if (diff <= 0) {
      clearInterval(countInterval.current);
      countInterval.current = null;
      clearInterval(countInterval);
      dispatch(setLifebar(0));
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
        useNativeDriver={true}
        style={[
          [StyleSheet.absoluteFill],
          {
            backgroundColor: progressBarColor,
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
