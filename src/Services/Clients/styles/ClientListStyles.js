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
      labelTextContainer: {
       // backgroundColor: 'rgb(246,245,248)',
        borderRadius: 16,
      },
      labelText: {
        fontSize: 10,
       // lineHeight: 16,
        color: 'white',
        paddingHorizontal: 2,
        paddingVertical: 4,
      },
      labelText1: {
        fontSize: 12,
       // lineHeight: 16,
        color: 'white',
        paddingHorizontal: 4,
        paddingVertical: 2,
      },
      labelContainer1: {
        flexDirection: 'row',
        marginBottom:10,
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
        fontSize: 24,
        lineHeight: 28,
        color: 'black',
        letterSpacing: -0.2,
        paddingTop: 8,
        
      },
      mainTextContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
      },
      footerContainer: {
        flexDirection: 'row',
        bottom:15,
       // justifyContent: 'flex-start',
       // alignItems: 'center',
       // paddingTop: 22,
      },
      authorPhoto: {
        width: 24,
        height: 24,
        borderRadius:  50
      },
      authorName: {
        fontSize: 12,
        lineHeight: 16,
        color: "grey",
        marginLeft:55
      },
      authorWrapper: {
        flexDirection: 'row',
      },
      authorContainer: {
        paddingRight: 40,
      },
      authorBlankContainer: {
        width: '38%',
      },
      iconCardElement: {
        paddingLeft: 8,
      },
})