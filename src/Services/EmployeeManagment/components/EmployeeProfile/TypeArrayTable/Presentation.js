import React from 'react';
import {View, Dimensions, Text, StyleSheet, FlatList} from 'react-native';
import CustomRender from '../../../../../shared/valueRender';
import LinearGradient from 'react-native-linear-gradient';
import {Divider} from 'react-native-paper'
import {
  Container,
  Header,
  Content,
  List,
  Card,
  ListItem,
  Left,
  Right,
  Icon,
  Button,
  Body,
} from 'native-base';
import {ScrollView} from 'react-native-gesture-handler';

function Presentation(props) {
  const {state, section, onDelete} = props.data;
  const employeeProfile = {
    [section.access_key]: [],
    ...state.employeeProfile.data,
  };
  console.log(section.access_key);
  const pushableData = section.fields.reduce((init, item) => {
    return {
      ...init,
      [item.name]: '',
    };
  }, {});

  return (
    <>
      <Header style={styles.Header}>
       
          <Button
            transparent
            onPress={() => {
              props.navigation.goBack();
            }}>
            <Icon name="arrow-back" style={styles.HeaderIcons}/>
          </Button>
    
     <Body style={{alignSelf:'center',paddingRight:75}}>
          <Text style={styles.HeaderTitle}>
            {section.sectionName}
          </Text>
          </Body>
      </Header>
   
      <ScrollView>
        {employeeProfile[section.access_key].map((obj, index) => {
          return (
              <Card style={{width:'95%',alignSelf:'center',elevation:0}}>
                {/* <View style={{width:'100%',height:40,backgroundColor:'#62B1F6'}}>
                  <Text style={{alignSelf:'center',top:5,fontWeight:'700',fontSize:18,color:'white'}}>{section.sectionName} {'  '}{index}</Text>
                </View> */}
                {section.fields
                  .sort((a, b) => a.fieldPriority - b.fieldPriority)
                  .map((item) => {
                    console.log(item.type)
                    return (
                        <View>
                          <View style={{alignSelf:'flex-start',left:5,paddingTop:8}}>
                          <Text
                            style={{
                              fontWeight: '100',
                              color: 'grey',
                              fontSize: 15,
                            }}>
                            {item.label}
                          </Text>
                          </View>
                          
                          <View style={{alignSelf:'center',bottom:20,left:45}}>
                          <CustomRender
                            type={item.type}
                            value={obj[item.name]}/>
                         
                          </View>
                        </View>
                        

                   
                    );
                  })}
              </Card>
         
          );
        })}
      </ScrollView>
    </>
  );
}

export default Presentation;
const windowWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
  listStyle: {
    justifyContent: 'space-between',
  },
  HeadingStyle: {
    fontSize: 14,
    fontWeight: '600',
  },
  TextStyle: {
    marginRight: windowWidth / 4.5,
    fontSize: 13,
    color: 'grey',
  },
  HeaderTitle: {
    fontSize: 20,
    color: '#fff'
  },
  HeaderIcons: {
    color: '#fff'
  },
  Header: {
    backgroundColor: '#3f51b5'
  },
  CardStyles: {
    elevation: 0, borderRadius: 16, width: '96%', alignSelf: 'center'
  },
  CardTitle: {
    color: '#62B1F6', fontSize: 16, fontWeight: '400', paddingBottom: 5, paddingTop: 5, right: 66
  }
});