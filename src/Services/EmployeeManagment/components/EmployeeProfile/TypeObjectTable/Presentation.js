import React from 'react';
import {View, Dimensions, Text, StyleSheet, FlatList} from 'react-native';
import CustomRender from '../../../../../shared/valueRender';
import {
  Container,
  Header,
  Content,
  List,
  ListItem,
  Left,
  Card,
  Right,
  Icon,
  Body,
  Title,
  Button,
} from 'native-base';

function Presentation(props) {
  const {state, section} = props.data;
  const employeeProfile = {
    [section.access_key]: {},
    ...state.employeeProfile.data,
  };
  return (
    <Container>
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
      <Card style={{width:'95%',alignSelf:'center',elevation:0}}>
      <FlatList
        data={section.fields.sort((a, b) => a.fieldPriority - b.fieldPriority)}
        renderItem={({item}) => (
         
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
                value={employeeProfile[section.access_key][item.name]}
              />
                          </View>
                        </View>
               
        )}
        keyExtractor={(item) => item.id}
      />
       </Card>        
           
    </Container>
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
