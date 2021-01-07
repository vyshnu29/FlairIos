/* eslint-disable no-use-before-define */
import React from "react"
import {
  View,
  Text,
  ScrollView,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox'
import {BottomSheet} from 'react-native-btr';
import {
  Title,
  Header,
  List,
  ListItem,
  Body,
  Right,
  Icon,
  Input,
} from 'native-base';
import SettingIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import { it } from "date-fns/locale";
export default function Presentation(props) {
  const { handleChange, task, project ,taskLabelsData} = props
  let labels = Object.values(project.labels).filter((e) => e.isExist)
  let reqLabels
  if (task[0].labels) {
    reqLabels = task[0].labels
  } else {
    reqLabels = []
  }
  let taskLabels = reqLabels.length ? labels.filter((item) => reqLabels.includes(item.id)) : []
  const [collapsed, setcollapsed] = React.useState(false);
    const toggleExpanded = () => {
      setcollapsed(!collapsed);
    };


  return (
    <TouchableOpacity
    style={styles.container}
    activeOpacity={0.95}>
      <TouchableOpacity style={styles.labelContainer} onPress={toggleExpanded}>
      <Title style={{fontSize:16,color:'black',fontWeight:'700'}}>Labels</Title>
      <SettingIcon name='cog' size={20} style={{top:6}}/>
      </TouchableOpacity>
      <View style={{alignItems: 'flex-start'}}>
      {taskLabels.length
          ? taskLabels.map((label) => {
            return(
              <Text
              style={{
                marginTop:15,
                padding:3,
                fontSize:14,
                borderRadius: 16,
                backgroundColor: label.colorCode,
                color: "white",
              }}
            >
              {label.name}
            </Text>
            )
          })
          : <Text style={{marginTop:30}}>No labels</Text>}
      </View>
      <BottomSheet
      visible={collapsed}
      onBackButtonPress={toggleExpanded}
      onBackdropPress={() => {
        setcollapsed(!collapsed);
      }}>
      <View
        style={{
          backgroundColor: '#fff',
          width: '100%',
          height: 350,
        }}>
       <Header style={{backgroundColor:'#3F51B5'}}>
   <Body>  
  <Title style={{color: 'white',alignSelf: 'center',fontSize:14}}>Add labels to this task</Title>
</Body>
   </Header>
        <FlatList
          data={[...labels].sort((a, b) => {
            let ai = taskLabels.indexOf(a)
            ai = ai === -1 ? taskLabels.length + labels.indexOf(a) : ai
            let bi = taskLabels.indexOf(b)
            bi = bi === -1 ? taskLabels.length + labels.indexOf(b) : bi
            return ai - bi
          })}
          renderItem={({item}) => {
            return (
              <List>
                <ListItem avatar>
                  <Body>
                    <Text style={{color:item.colorCode}}>{item.name}</Text>
                  </Body>
                  <Right style={{bottom:6}}>
                    <CheckBox
                    tintColors={{ true: '#3F51B5', false: 'black' }}
                      value={reqLabels.includes(item.id)}
                      onValueChange={(value) =>
                        handleChange(value,'taskLabels',item.id)
                      }
                    />
                  </Right>
                </ListItem>
              </List>
            );
          }}
        />
      </View>
    </BottomSheet>
  </TouchableOpacity>
  

  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 12,
    width:'95%',
    shadowColor: 'rgb(35,35,35)',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowRadius: 40,
    shadowOpacity: 0.08,
   // width: '100%',
    backgroundColor: 'white',
    borderRadius: 24,
    alignSelf:'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderWidth: Platform.select({ ios: 0, android: 2 }),
    borderColor: 'rgb(246,245,248)',
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
    lineHeight: 16,
    color: 'white',
    paddingHorizontal: 8,
    paddingVertical: 4, 
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
  mainTextContainer: {},
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 22,
  },
  authorPhoto: {
    width: 24,
    height: 24,
    borderRadius:  50
  },
  authorName: {
    fontSize: 12,
    lineHeight: 16,
    color: 'grey',
    
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
});
