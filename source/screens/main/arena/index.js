/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useRef, useState, useEffect, useMemo} from 'react';
import {
  Alert,
  FlatList,
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Animated,
  Easing,
} from 'react-native';

//lib
import {useNavigation, useRoute} from '@react-navigation/native';
import CountryFlag from 'react-native-country-flag';

//files
import {styles} from './styles';

//redux
import {
  setLevel,
  setLifebar,
  setPoints,
  setRound,
} from '../../../redux/arena/slice';
import {useDispatch, useSelector} from 'react-redux';
import {ProgressBar} from './ProgressBar';

import Sound from 'react-native-sound';

export const Arena = () => {
  const labelProbability = 85;
  const route = useRoute();
  const navigation = useNavigation();
  const optionsArray = useSelector(state => state.arena.optionsArray);
  const answerObject = useSelector(state => state.arena.answerObject);
  const levelInt = useSelector(state => state.arena.levelInt);
  const pointsInt = useSelector(state => state.arena.pointsInt);
  const lifebarInt = useSelector(state => state.arena.lifebarInt);
  const dispatch = useDispatch();

  const [labelFlag, setLabelFlag] = useState(0);

  const [last, setLast] = useState(Date.now());
  const [delta, setDelta] = useState(0);

  const scaleAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const [comboLevel, setComboLevel] = useState(0);
  const [comboShow, setComboShow] = useState(['none', 'none', 'none']);

  // Enable playback in silence mode
  Sound.setCategory('Playback');

  const notes = useMemo(() => [
    new Sound('notes/01.mp3', Sound.MAIN_BUNDLE),
    new Sound('notes/02.mp3', Sound.MAIN_BUNDLE),
    new Sound('notes/03.mp3', Sound.MAIN_BUNDLE),
    new Sound('notes/04.mp3', Sound.MAIN_BUNDLE),
    new Sound('notes/05.mp3', Sound.MAIN_BUNDLE),
    new Sound('notes/06.mp3', Sound.MAIN_BUNDLE),
    new Sound('notes/07.mp3', Sound.MAIN_BUNDLE),
    new Sound('notes/08.mp3', Sound.MAIN_BUNDLE),
  ]);

  const COMBO_TIME_LIMIT = 10000;

  useEffect(() => {
    dispatch(setLifebar(100));
    dispatch(setPoints(0));
    dispatch(setLevel(0));
  }, []);

  const comboAnim = () => {
    Animated.spring(
      scaleAnim,
      {
        toValue: 1,
        friction: 1,
        tension: 140,
      }
    ).start();

    Animated.timing(
      fadeAnim,
      {
        toValue: 0,
        duration: 1000,
      }
    ).start();
  };
  
  //functions
  const getDeltaTime = () => {
    let now = Date.now();
    let diff = now - last;
    
    setLast(now);
    setDelta(diff);
  };
  
  const comboUp = (points) => {
    const arr = ['none', 'none', 'none'];

    if (points > 4) {
      const n = Math.floor((points - 5) / 2);
      console.log(points, n);
      arr[n] = '';

      if (comboLevel < 8) {
        setComboLevel(comboLevel + 1);
      }

      notes[comboLevel].play((success) => {
        if (success) {
          console.log('successfully finished playing');
        } else {
          console.log('playback failed due to audio decoding errors');
        }
      });
    }

    setComboShow([...arr]);
  }

  const onPressOption = data => {
    getDeltaTime();

    if (data.value === answerObject.value) {
      // dispatch(setRound());
      dispatch(setLevel(levelInt + 1));
      
      const points = getCompoPoints(delta);
      dispatch(setPoints(pointsInt + points));

      const hp = lifebarInt + points;
      dispatch(setLifebar(hp));
      console.log('correct');

      scaleAnim.setValue(0);
      fadeAnim.setValue(1);

      comboUp(points);
      comboAnim();
    } else {
      // dispatch(setRound());
      if (lifebarInt > 0)
        dispatch(setLifebar(lifebarInt - 10));
      // Alert.alert('wrong')
      console.log('wrong');

      if (comboLevel > 0) {
        setComboLevel(comboLevel - 1);
      }
    }

    dispatch(setRound());

    const flag = Math.floor(Math.random() * 100) > labelProbability ? 1 : 0;
    setLabelFlag(flag);
  };
  //components
  const RenderOptionsList = () => {
    return (
      <FlatList
        contentContainerStyle={styles.optionsListView}
        data={optionsArray}
        numColumns={2}
        keyExtractor={(item, index) => item.value}
        renderItem={RenderOption}
      />
    );
  };

  const RenderOption = data => {
    const isoCode = data.item.value;
    return (
      <TouchableOpacity
        onPress={() => onPressOption(data.item)}
        style={styles.optionView}>
        <Image
          style={styles.optionImageContainer}
          source={require('../../../assets/images/optionContainer.png')}
          resizeMode={'stretch'}
        />
        <CountryFlag isoCode={isoCode} style={styles.option} />
      </TouchableOpacity>
    );
  };

  const getCompoPoints = (d) => {
    if (d <= COMBO_TIME_LIMIT) {
      let points = Math.floor((COMBO_TIME_LIMIT - d) / 1000);
      return points;
    }

    return 0;
  }

  return (
    <SafeAreaView style={styles.mainView}>
      <View style={styles.headerView}>
        <View style={styles.leftHeaderView}>
          <Image
            style={styles.settingsIcon}
            source={require('../../../assets/icons/settingsIcon.png')}
          />
          <Image
            style={styles.hamburgerIcon}
            source={require('../../../assets/icons/hamburgerIcon.png')}
          />
        </View>
        <View style={styles.centerHeaderView}>
          <Image
            style={styles.levelContainerImage}
            source={require('../../../assets/images/levelContainerImage.png')}
            resizeMode={'stretch'}
          />

          <Text style={styles.levelText}>{levelInt}</Text>
        </View>
        <View style={styles.rightHeaderView}>
          <View style={styles.coinTextContainer}>
            <Text style={styles.coinText}>{pointsInt}</Text>
          </View>

          <Image
            style={styles.coinIcon}
            source={require('../../../assets/icons/coinIcon.png')}
            resizeMode={'contain'}
          />
        </View>
      </View>

      <View style={styles.questionView}>
        <Image
          style={styles.questionImageContainer}
          source={require('../../../assets/images/questionContainer.png')}
          resizeMode={'stretch'}
        />
        <Text adjustsFontSizeToFit style={styles.questionText}>
          {labelFlag ? answerObject.value : answerObject.label}
        </Text>
      </View>

      <Animated.View style={{
        ...styles.comboView, 
        opacity: fadeAnim,
        transform: [
          {
              scaleX: scaleAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 2]
              })
          },
          {
              scaleY: scaleAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 2]
              })
          }
        ]
      }}>
        <Image
          style={{
            ...styles.comboContainer,
            display: comboShow[0]
          }}
          source={require('../../../assets/images/asset_combo_cool.png')}
          resizeMode={'contain'}
        />

        <Image
          style={{
            ...styles.comboContainer,
            display: comboShow[1]
          }}
          source={require('../../../assets/images/asset_combo_good.png')}
          resizeMode={'contain'}
        />

        <Image
          style={{
            ...styles.comboContainer,
            display: comboShow[2]
          }}
          source={require('../../../assets/images/asset_combo_great.png')}
          resizeMode={'contain'}
        />
       
      </Animated.View>

      <RenderOptionsList />
      <View style={styles.gaugeView}>
        {/* <Image
          style={styles.comboImageContainer}
          source={require('../../../assets/images/comboMeterContainerImage.png')}
          resizeMode={'contain'}
        />
        */}

        <View style={styles.container}>
          <ProgressBar />
        </View>
      </View>
    </SafeAreaView>
  );
};
