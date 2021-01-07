import React, {useContext, useState, useEffect} from 'react';
import FaPen from 'react-native-vector-icons/AntDesign';
import DIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import EdPen from 'react-native-vector-icons/MaterialCommunityIcons';
import {BottomSheet} from 'react-native-btr';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  FlatList,
} from 'react-native';
import {
  Container,
  Header,
  Icon,
  Right,
  Left,
  Title,
  Body,
} from 'native-base';
import Spinner from 'react-native-loading-spinner-overlay';
import {DataTable, Button, TextInput,  FAB} from 'react-native-paper';

function Presentation(props) {
  const [collapsed, setcollapsed] = useState(false);
  const [Collapsed, setCollapsed] = useState(false);
  let labels = props.project[0].labels;
  let data = [];
  labels &&
    Object.values(labels).forEach((e) => {
      if (e.isExist) {
        data.push({
          label: e.name,
          color: e.colorCode.includes('#')
            ? e.colorCode.length > 7
              ? e.colorCode.substr(0, 7)
              : e.colorCode
            : e.colorCode,
          id: e.id,
        });
      }
    });
  const {
    updateLabel,
    createNewLabel,
    deleteLabel,
    handleChange,
    label,
    color,
    handleEdit,
    clearValues,
  } = props;

  const SubmitForm = () => {
    setcollapsed(!collapsed);
    createNewLabel();
  };

  const SubmitFom = () => {
    setCollapsed(!Collapsed);
    updateLabel();
  };

  const toggleExpanded = () => {
    setcollapsed(!collapsed);

    if (collapsed) {
      setcollapsed(!Collapsed);
      clearValues();
    } else {
      clearValues();
    }
  };
  const toggleExpanded1 = () => {
    setCollapsed(!Collapsed);
    if (Collapsed) {
      setCollapsed(!collapsed);
      clearValues();
    } else {
      clearValues();
    }
  };

  
    return (
      <View style={{height: '100%', backgroundColor: 'white'}}>
        <Header androidStatusBarColor='#000' style={{backgroundColor: '#3F51B5'}}>
        <Left>
                    <Button transparent>
                      <Icon
                        style={{color: 'white'}}
                        color="white"
                        name= "chevron-back"
                        onPress={() => {
                          props.navigation.goBack();
                        }}
                      />
                    </Button>
                  </Left>
        <Body>
          <Title style={{alignSelf: 'center', alignContent: 'center',color:'white'}}>
            Labels
          </Title>
        </Body>
        <Right>
            <TouchableOpacity onPress={toggleExpanded}>
              <Icon name="add" color="white" style={{color: 'white'}} />
            </TouchableOpacity>
          </Right>
      </Header>
       
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
              height: 300,
            }}>
            <Header style={{backgroundColor:'#3f51b5'}}>
              <Body>
                <Title style={{color: 'white', alignSelf: 'center'}}>
                  Add labels
                </Title>
              </Body>
            </Header>
            <View>
              <TextInput
                style={{width: '95%', alignSelf: 'center'}}
                label="Label"
                mode="flat"
                size="small"
                onChangeText={(value) => handleChange('label', value)}
              />
              <TextInput
                style={{width: '95%', alignSelf: 'center'}}
                label="Color"
                mode="flat"
                size="small"
                onChangeText={(value) => handleChange('color', value)}
              />
            </View>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-around'}}>
              <Button
                mode="contained"
                style={{width: 130, alignSelf: 'center', marginVertical: 15}}
                onPress={SubmitForm}>
                <Text>Save</Text>
              </Button>
              <Button
                mode="contained"
                style={{
                  width: 130,
                  marginVertical: 15,
                  alignSelf: 'center',
                  backgroundColor: 'grey',
                }}
                onPress={() => {
                  setcollapsed(!collapsed);
                }}>
                <Text>Cancel</Text>
              </Button>
            </View>
          </View>
        </BottomSheet>
        
        <BottomSheet
          visible={Collapsed}
          onBackButtonPress={toggleExpanded1}
          onBackdropPress={() => {
            setCollapsed(!Collapsed);
          }}>
          <View
            style={{
              backgroundColor: '#fff',
              width: '100%',
              height: 300,
            }}>
            <Header>
              <Body>
                <Title style={{color: 'white', alignSelf: 'center'}}>
                  Edit labels
                </Title>
              </Body>
            </Header>
            <View>
              <TextInput
                style={{width: '95%', alignSelf: 'center'}}
                label="Label"
                mode="flat"
                value={label}
                size="small"
                onChangeText={(value) => handleChange('label', value)}
              />
            </View>
            <View>
              <TextInput
                style={{width: '95%', alignSelf: 'center'}}
                label="Color"
                mode="flat"
                value={color}
                size="small"
                onChangeText={(value) => handleChange('color', value)}
              />
            </View>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-around'}}>
              <Button
                mode="contained"
                style={{width: 130, alignSelf: 'center', marginVertical: 15}}
                onPress={SubmitFom}>
                Save
              </Button>
              <Button
                mode="contained"
                style={{
                  width: 130,
                  marginVertical: 15,
                  alignSelf: 'center',
                  backgroundColor: 'grey',
                }}
                onPress={() => {
                  setCollapsed(!Collapsed);
                }}>
                Cancel
              </Button>
            </View>
          </View>
        </BottomSheet>
        <DataTable>
                    <DataTable.Header>
                      <DataTable.Title>Label</DataTable.Title>
                      <DataTable.Title>Color</DataTable.Title>
                      <DataTable.Title>Actions</DataTable.Title>
                    </DataTable.Header>
        <FlatList
          data={data}
          renderItem={({item}) => {
            return (

                    <DataTable.Row>
                      <DataTable.Cell>{item.label ? item.label : " ---"}</DataTable.Cell>
                      <DataTable.Cell ><Text style={{color:`${item.color}`}}>{item.color ? item.color : " ---"}</Text></DataTable.Cell>
                      <DataTable.Cell >
                        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                          <View style={{right:10}}>
                          <TouchableOpacity
                     onPress={() => {
                       toggleExpanded1();
                       handleEdit(item)
                     }}>
                     <EdPen
                       name="pencil"
                       color="grey" 
                       size={20}
                     />
                   </TouchableOpacity>
                          </View>
                      
                   <View >
                   <TouchableOpacity
                  
                       onPress={() =>
                        deleteLabel(item)
                       }
                       >
                       <DIcon
                         name="delete"
                         color="grey" 
                         size={20}
                       />
                     </TouchableOpacity>
                   </View>
                     
                     </View>
                      </DataTable.Cell>
                    </DataTable.Row>
            );
          }}
        />
           </DataTable>
      </View>
    );
  
}

export default Presentation;


                  {/* <Left>
                    </Left>
                    <Body>
                      <View style={{flexDirection: 'row'}}>
                        <View style={{flexDirection: 'column'}}>
                          <Text >Label</Text>
                          <Text>Color</Text>
                          <Text></Text>
                          <Text></Text>
                        </View>
                        <View style={{flexDirection: 'column'}}>
                          <Text> : </Text>
                          <Text> : </Text>
                          <Text></Text>
                          <Text></Text>
                        </View>
                        <View style={{flexDirection: 'column'}}>
                          <Text style={{color: 'grey'}}>{item.label ? item.label : " ---"}</Text>
                          <Text style={{color: 'grey'}}>{item.color ? item.color : " ---"}</Text>
                          <Text></Text>
                          <Text></Text>
                        </View>
                      </View>
                    </Body>
                    <Right>
                   
                        <View>
                        <TouchableOpacity
                     onPress={() => {
                       toggleExpanded1();
                       handleEdit(item)
                     }}>
                     <EdPen
                       name="pencil-circle"
                       color="#4075ad" 
                       size={30}
                     />
                   </TouchableOpacity>
                     <TouchableOpacity
                       onPress={() =>
                        deleteLabel(item)
                       }
                       >
                       <DIcon
                         name="delete-circle"
                         color="#c21d1d" 
                         size={30}
                        
                       />
                     </TouchableOpacity>
                   </View>

                    </Right> */}