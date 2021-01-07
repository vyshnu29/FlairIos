import { StyleSheet,Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export default StyleSheet.create({
    headerContainer: {
        width: '100%',
        paddingHorizontal: 24,
        marginTop:20,
        paddingTop: 24,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#3F51B5',
      },
      headerWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      headerImage: {
        width: 20,
        height: 20,
      },
      headerText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
      },
      titleStyle: {
        color: 'white',
        fontWeight: 'bold',
        padding: 10,
        fontSize: 40,
      },
      tabTextContainerStyle: {
        backgroundColor: 'transparent',
        borderRadius: 18,
      },
      tabTextContainerActiveStyle: {
        backgroundColor: '#6075e6',
      },
      tabTextStyle: {
        fontSize: 16,
        fontWeight: 'bold',
        lineHeight: 20,
        paddingHorizontal: 12,
        paddingVertical: 8,
        color: 'white',
      },
      tabTextActiveStyle: {
        fontSize: 16,
        fontWeight: 'bold',
        lineHeight: 20,
        paddingHorizontal: 12,
        paddingVertical: 8,
        color: 'white',
      },
      tabWrapperStyle: {
        paddingVertical: 10,
      },
      tabsContainerStyle: {
        paddingHorizontal: 10,
      },
      contentContiner: {
        height: windowHeight,
        padding: 10,
      },
      contentText: {
        fontSize: 16,
      },
})