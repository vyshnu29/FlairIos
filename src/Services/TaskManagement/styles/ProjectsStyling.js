import { StyleSheet,Dimensions } from 'react-native';
import { screenStyles } from '../../../constants/index';

const numColumns = 3
export default StyleSheet.create({
  ...screenStyles,
  logo: {
    height: 54,
    width: 142,
  },
  tabsWrapper: {
    paddingVertical: 12,
  },
  tabTextContainerStyle: {
    backgroundColor: 'transparent',
    borderRadius: 18,
  },
    item: {
    backgroundColor: '#4D243D',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    margin: 1,
    height: Dimensions.get('window').width / numColumns, // approximate a square
  },
  itemInvisible: {
    backgroundColor: 'white',
  },
  itemText: {
    color: '#fff',
  },
  tabTextContainerActiveStyle: {
    backgroundColor: '#6075e6',
  },
  tabText: {
    fontSize: 16,
        fontWeight: 'bold',
        lineHeight: 20,
        paddingHorizontal: 12,
        paddingVertical: 8,
        color: 'white',
  },
  modalStyle: {
    margin: 0,
  },
  modalContentContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  homeScreenHeader: {
    backgroundColor: '#3F51B5',
  },
});
