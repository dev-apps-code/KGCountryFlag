/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useRef, useState, useEffect} from 'react';
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
} from 'react-native';

//lib
import {useNavigation, useRoute} from '@react-navigation/native';
import CountryFlag from 'react-native-country-flag';

//files
import {styles} from './styles';

//redux
import {
  increaseLevel,
  increasePoints,
  setRound,
} from '../../../redux/arena/slice';
import {useDispatch, useSelector} from 'react-redux';
import {ProgressBar} from './ProgressBar';

export const Arena = () => {
  const labelProbability = 70;
  const route = useRoute();
  const navigation = useNavigation();
  const optionsArray = useSelector(state => state.arena.optionsArray);
  const answerObject = useSelector(state => state.arena.answerObject);
  const levelInt = useSelector(state => state.arena.levelInt);
  const pointsInt = useSelector(state => state.arena.pointsInt);
  const dispatch = useDispatch();

  const [labelFlag, setLabelFlag] = useState(0);

  const [last, setLast] = useState(Date.now());
  const [delta, setDelta] = useState(0);

  //functions
  const getDeltaTime = () => {
    let now = Date.now();
    let diff = now - last;
    console.log(diff);
    setLast(now);
    setDelta(diff);
  };

  const onPressOption = data => {
    if (data.value === answerObject.value) {
      dispatch(setRound());
      dispatch(increaseLevel());
      dispatch(increasePoints());
    } else {
      dispatch(setRound());
      // Alert.alert('wrong');
    }

    const flag = Math.floor(Math.random() * 100) > labelProbability ? 1 : 0;
    setLabelFlag(flag);

    getDeltaTime();
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
