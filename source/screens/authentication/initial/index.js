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

import {styles} from './styles';

export const Initial = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const count = useSelector(state => state.authentication.value);
  const dispatch = useDispatch();

  const onPressLogin = () => {
    navigation.push('Login');
  };

  const onPressIncrement = () => {
    dispatch(increment());
  };

  const onPressDecrement = () => {
    dispatch(decrement());
  };

  return (
    <View style={styles.mainView}>
      <Text>{route.name}</Text>
      <TouchableOpacity onPress={onPressLogin} style={styles.goToLoginButton}>
        <Text>Go to login</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onPressIncrement}>
        <Text>up</Text>
      </TouchableOpacity>
      <Text>{count}</Text>
      <TouchableOpacity onPress={onPressDecrement}>
        <Text>down</Text>
      </TouchableOpacity>
    </View>
  );
};
