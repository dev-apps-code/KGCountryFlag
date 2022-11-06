/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import {useNavigation, useRoute} from '@react-navigation/native';
import React from 'react';
import {ImageBackground, Text, TouchableOpacity, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {setRound} from '../../../redux/arena/slice';
import {decrement, increment} from '../../../redux/authentication/slice';

import {styles} from './styles';

export const Initial = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const count = useSelector(state => state.authentication.value);
  const dispatch = useDispatch();

  const onPressStart = () => {
    dispatch(setRound());
    navigation.navigate('Arena');
  };

  const onPressIncrement = () => {
    dispatch(increment());
  };

  const onPressDecrement = () => {
    dispatch(decrement());
  };

  return (
    <ImageBackground
      source={require('../../../assets/images/mainMenuBackground.png')}
      resizeMode="cover"
      style={styles.mainView}>
      <Text>{route.name}</Text>
      <TouchableOpacity onPress={onPressStart} style={styles.goToLoginButton}>
        <Text>Start</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onPressIncrement}>
        <Text>up</Text>
      </TouchableOpacity>
      <Text>{count}</Text>
      <TouchableOpacity onPress={onPressDecrement}>
        <Text>down</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
};
