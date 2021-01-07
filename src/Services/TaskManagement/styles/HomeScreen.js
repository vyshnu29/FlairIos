import { StyleSheet, Platform,Dimensions } from 'react-native';
import { ifIphoneX } from '../../../constants/utils';
import {  constants, screenStyles } from '../../../constants';

export default StyleSheet.create({
  ...screenStyles,
  userModalHeader: {
    paddingTop: Platform.select({ ios: ifIphoneX(50, 30), android: 18 }),
  },
  item: {
        backgroundColor: '#4D243D',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        margin: 1,
        height: Dimensions.get('window').width / 3, // approximate a square
      },
      itemInvisible: {
        backgroundColor: 'white',
      },
  headerPic: {
    width: 32,
    left:80,
    borderWidth: 1.5,
    borderColor: '#fff', 
    height: 32,
    borderRadius: 16,
  },
  headerMenu: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: -(constants.deviceWidth / 3),
  },
  headerTitle: {
    fontSize: 16,
    lineHeight: 20,
    color: 'white',
    marginLeft: 12,
  },
  infoContainer: {
    flexDirection: 'row',
    paddingBottom: 32,
  },
  iconContainer: {
    flexDirection: 'row',
    padding: 8,
    borderRadius: 8,
    backgroundColor: 'white',
    width: 56,
  },
  infoText: {
    color: 'white',
    fontSize: constants.normalizedFontSize(16),
    lineHeight: 24,
  },
  icon: {
    width: 16,
    height: 16,
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginHorizontal: 24,
  },
  authorPhoto: {
    width: 32,
    height: 32,
    borderRadius: 8,
  },
  userModalMessageContainer: {
    paddingBottom: 8,
  },
});
