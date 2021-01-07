import { StyleSheet, Platform } from 'react-native';
import { ifIphoneX } from './utils';
import constants from './constants';

const screenStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 24,
  },
  flatlistContainer: {
    width: constants.deviceWidth,
    height: constants.deviceHeight - 80,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 24,
  },
  contentText: {
    fontSize: 24,
    lineHeight: 28,
    color: 'black',
    alignSelf: 'flex-start',
    letterSpacing: -0.2,
    paddingTop: 40,
    paddingBottom: 20,
  },
  foreground: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'flex-end',
  },
  background: {
    width: '100%',
    justifyContent: 'flex-end',
    backgroundColor: '#fff',
    height: '100%',
  },
  headerWrapper: {
    width: '100%',
    paddingHorizontal: 24,
    paddingTop: Platform.select({ ios: ifIphoneX(50, 40), android: 55 }),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    height: 24,
    width: 142,
  },
  message: {
    color: 'white',
    fontSize: constants.responsiveWidth(7),
    lineHeight: 48,
    letterSpacing: -1,
  },
  messageContainer: {
    paddingTop: 24,
    paddingBottom: 24,
  },
  profilePic: {
    width: constants.responsiveWidth(18),
    height: constants.responsiveWidth(18),
    borderRadius: constants.responsiveWidth(9),
    borderWidth: 1.5,
    borderColor: '#fff', 
  },
  foregroundText: {
    color: 'white',
  },
});

export default screenStyles;
