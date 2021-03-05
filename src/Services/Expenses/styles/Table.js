import { StyleSheet,Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export default StyleSheet.create({
    container: {
      marginTop: 12,
      width:'98%',
     elevation:0,
      backgroundColor: 'white',
      borderRadius: 16,
      alignSelf:'center',
      paddingHorizontal: 20,
      paddingVertical: 16,
      },
      labelContainer: {
        flexDirection: 'row',
       justifyContent: 'space-between',
        alignItems: 'flex-start',
      },
      labelTextContainer: {
        backgroundColor: 'rgb(246,245,248)',
        borderRadius: 16,
      },
      labelText: {
        fontSize: 12,
        lineHeight: 16,
        color: 'rgb(71,71,71)',
        paddingHorizontal: 8,
        paddingVertical: 4,
      },
      labelText1: {
        fontSize: 12,
       // lineHeight: 16,
        color: 'black',
        paddingHorizontal: 4,
        paddingVertical: 2,
      },
      labelContainer1: {
        flexDirection: 'row',
        marginBottom: 10,
        justifyContent: 'space-between',
        alignItems: 'flex-start',
      },
      labelText2: {
        fontSize: 12,
        lineHeight: 16,
        color: 'white',
        paddingHorizontal: 8,
        paddingVertical: 4,
      },
      labelContainer2: {
        flexDirection: 'row',
        marginBottom: 10,
        justifyContent: 'space-between',
        alignItems: 'flex-start',
      },
      iconContainer: {
        flexDirection: 'row',
        padding: 8,
        borderRadius: 8,
        shadowColor: 'rgb(35,35,35)',
        shadowOffset: {
          width: 0,
          heght: 2,
        },
        shadowRadius: 32,
        shadowOpacity: 0.016,
        backgroundColor: 'rgb(246,245,248)',
        // width: 56,
        alignItems: 'center',
      },
      icon: {
        width: 16,
        height: 16,
      },
      number: {
        color: 'white',
        paddingLeft: 5,
        fontSize: 16,
        lineHeight: 20,
      },
      mainText: {
        fontSize: 16,
        lineHeight: 18,
        color: 'black',
        letterSpacing: -0.2,
        paddingBottom:5
      },
      mainTextContainer: {
        paddingTop:10
      },
      footerContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        
      },
      authorPhoto: {
        width: 24,
        height: 24,
        borderRadius: 50,
      },
      authorName: {
        fontSize: 14,
        lineHeight: 16,
        color: 'grey',
      },
      authorWrapper: {
        flexDirection: 'row',
      },
      authorContainer: {
        paddingRight: 10,
      },
      authorBlankContainer: {
        width: '38%',
      },
      iconCardElement: {
        paddingLeft: 8,
      },
})