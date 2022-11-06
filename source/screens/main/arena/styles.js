import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import Constants from 'expo-constants';

export const styles = StyleSheet.create({
  safeAreView: {
    backgroundColor: '#f1f1cb',
  },
  mainView: {
    // flex: 1,
    alignItems: 'center',
    height: hp(100),
    width: wp(100),
  },
  headerView: {
    height: hp('8%'),
    width: wp('100%'),
    flexDirection: 'row',
    marginBottom: hp('3%'),
  },
  centerHeaderView: {
    height: hp('8%'),
    width: wp('50%'),
    alignItems: 'center',
  },
  rightHeaderView: {
    height: hp('6%'),
    width: wp('25%'),
    alignItems: 'center',
    flexDirection: 'row',
  },
  leftHeaderView: {
    height: hp('6%'),
    width: wp('25%'),
    paddingLeft: wp('5%'),
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: hp('1.5%'),
  },
  questionView: {
    backgroundColor: '#20274b',
    height: hp('15%'),
    width: wp('70%'),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: hp('1%'),
    marginBottom: hp('4%'),
    // marginTop: hp('4%'),
    paddingVertical: hp('2%'),
    paddingHorizontal: wp('2%'),
  },
  questionText: {
    fontSize: hp('2.5%'),
    color: '#FFFFFF',
    textAlign: 'center',
    fontFamily: 'MADETOMMY-Bold',
  },
  optionsListView: {
    height: hp('40%'),
    width: wp('70%'),
    marginTop: hp('3.5%'),
  },
  optionView: {
    height: hp('10%'),
    width: wp('35%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  option: {
    height: hp('9%'),
    width: wp('32%'),
    borderRadius: hp('1%'),
  },
  gaugeView: {
    height: hp('23%'),
    width: wp('100%'),
    justifyContent: 'flex-start',
    flexDirection: 'row',
    padding: 8,
  },
  settingsIcon: {
    height: wp('6.5%'),
    width: wp('6.5%'),
    marginRight: wp('2%'),
  },
  hamburgerIcon: {
    height: wp('6.5%'),
    width: wp('6.5%'),
  },
  coinIcon: {
    width: wp('7%'),
    height: hp('3.5%'),
    position: 'absolute',
  },
  levelContainerImage: {
    height: hp('7%'),
    width: wp('40%'),
  },
  coinText: {
    fontSize: hp('1.5%'),
    color: '#FFFFFF',
    textAlign: 'center',
    fontFamily: 'MADETOMMY-Bold',
  },
  coinTextContainer: {
    backgroundColor: '#000000',
    height: hp('2.3%'),
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: wp('8%'),
    paddingRight: wp('3%'),
  },
  levelText: {
    position: 'absolute',
    color: '#FFFFFF',
    fontSize: hp('2.5%'),
    marginTop: hp('2.5%'),
    fontFamily: 'MADETOMMY-Bold',
  },
  optionImageContainer: {
    position: 'absolute',
    height: hp('9%'),
    width: wp('32%'),
    zIndex: 10,
  },
  questionImageContainer: {
    position: 'absolute',
    height: hp('15%'),
    width: wp('70%'),
    zIndex: 10,
  },
  comboImageContainer: {
    width: wp('13%'),
  },
  container: {
    flex: 1,
    flexDirection: 'column', //column direction
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: Constants.statusBarHeight,
    // backgroundColor: '#e2e2e2',
    padding: 8,
  },
  progressBar: {
    height: 20,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    width: '100%',
    backgroundColor: 'white',
    borderColor: '#000',
    borderWidth: 2,
    borderRadius: 10,
    overflow: 'hidden',
  },
  comboContainer: {
    width: wp('43%'),
  },
  comboView: {
    height: hp('5%'),
    // width: wp('70%'),
    justifyContent: 'center',
    alignItems: 'center',
    // borderRadius: hp('1%'),
    // marginBottom: hp('4%'),
    // marginTop: hp('4%'),
    paddingVertical: hp('2%'),
    paddingHorizontal: wp('2%'),
  },
});
