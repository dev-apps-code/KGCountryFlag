/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import {useNavigation, useRoute} from '@react-navigation/native';
import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {decrement, increment} from '../../../redux/authentication/slice';
import {setRound} from '../../../redux/arena/slice';

import {styles} from './styles';

export const Login = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const count = useSelector(state => state.authentication.value);
  const dispatch = useDispatch();

  const onPressGoBack = () => {
    navigation.goBack();
  };

  const onPressLogin = () => {
    //temporary start
    dispatch(setRound());
    navigation.navigate('Arena');
  };

  return (
    <View style={styles.mainView}>
      <Text>{route.name}</Text>

      <TouchableOpacity onPress={onPressGoBack} style={styles.goToLoginButton}>
        <Text>Go back</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={onPressLogin} style={styles.goToLoginButton}>
        <Text>Start game</Text>
      </TouchableOpacity>
    </View>
  );
};
