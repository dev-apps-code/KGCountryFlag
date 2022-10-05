import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export const styles = StyleSheet.create({
  mainView: {
    justifyContent: 'center',
    alignItems: 'center',
    height: hp('100%'),
    width: wp('100%'),
  },
  goToLoginButton: {
    width: wp('30%'),
    height: hp('6%'),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'gray',
  },
});
