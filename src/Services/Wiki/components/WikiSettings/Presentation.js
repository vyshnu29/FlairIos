import React, { useContext,useState,useEffect } from 'react';
import FaPen from 'react-native-vector-icons/AntDesign';
import DIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import EdPen from 'react-native-vector-icons/MaterialCommunityIcons';
import { BottomSheet } from 'react-native-btr';
import {View, Text, TouchableOpacity, StyleSheet,ScrollView,FlatList} from 'react-native';
import {
  Container,
  Header,
  Icon,
  Card,
  List,
   ListItem,
   Input,
  CardItem,
  Right,
  Left,
  Body,
 
} from 'native-base';
import Spinner from 'react-native-loading-spinner-overlay'
import {
  DataTable,
  Button,
  TextInput,
  Title,
  FAB 
} from 'react-native-paper';
import MetaInfo from "../../../../shared/getMetaInfo"
import validate from "../../../../shared/validation"
import { isLoaded } from "react-redux-firebase"
import {connect} from 'react-redux';


function Presentation(props) {
  const [collapsed, setcollapsed] = useState(false);
  const [Collapsed, setCollapsed] = useState(false);
  const { categories, addTableContent, deleteTableContent, updateTableContent,handleChange,name,description,clearValues,handleEdit } = props
  const data = []

  const predefinedCategoryNames = ["General", "Knowledge"]
  categories &&
    categories.forEach((item) => {
      if (predefinedCategoryNames.includes(item.name)) {
        data[predefinedCategoryNames.indexOf(item.name)] = {
          id: item.id,
          name: item.name,
          description: item.description,
          createdAt: validate.dateFormatter(item.createdAt),
          createdBy: new MetaInfo().emailToName(item.createdBy),
        }
      } else {
        data.push({
          id: item.id,
          name: item.name,
          description: item.description,
          createdAt: validate.dateFormatter(item.createdAt),
          createdBy: new MetaInfo().emailToName(item.createdBy),
        })
      }
    })

    const SubmitForm = () => {
        setcollapsed(!collapsed);
        addTableContent();
    };

    const SubmitFom = () => {
      setCollapsed(!Collapsed);
        updateTableContent();
      
      };
  
    const toggleExpanded = () => {
      setcollapsed(!collapsed);

      if(collapsed){
        setcollapsed(!Collapsed)
        clearValues()
      }
      else{
      clearValues()
      }
     
    };
    const toggleExpanded1 = () => {
      setCollapsed(!Collapsed);
      if(Collapsed){
        setCollapsed(!collapsed)
        clearValues()
      }
      else{
      clearValues()
      }
     
    };

    if(data.length)
    return (
      <View style={{height:'100%',backgroundColor:'white'}}>
       <Header>
       <Left>
            <TouchableOpacity  onPress={() => {
                  props.navigation.goBack();
                }}>
              <Icon
                name="arrow-back"
                color='white'
                style={{color:'white'}}
              />
            </TouchableOpacity>
          </Left>
          <Body>
            <Title style={{color: 'white'}}>Settings</Title>
          </Body>
          <Right>
            <TouchableOpacity  onPress={toggleExpanded}>
            <Icon
                name="add"
                color='white'
                style={{color:'white'}}
              />
            </TouchableOpacity>
          </Right>
        </Header>
        <BottomSheet
          visible={collapsed}
          onBackButtonPress={toggleExpanded}
          onBackdropPress={() => {setcollapsed(!collapsed)}}
        >
           <View
            style={{
              backgroundColor: '#fff',
              width: '100%',
              height: 300,
              
            }}>
             <Header>
             <Body>
            <Title style={{color: 'white',alignSelf: 'center'}}>Add</Title>
          </Body>
             </Header>
                <View>
              <TextInput
              style={{width: '95%',alignSelf:'center'}}
              label="Category"
              mode='flat'
              size="small"
              onChangeText={value => handleChange('name', value)}
            />
             <TextInput
              style={{width: '95%',alignSelf:'center'}}
              label="Description"
              mode='flat'
              size="small"
              onChangeText={value => handleChange('description', value)}
            />
              </View>
              <View style={{flexDirection:'row',justifyContent:'space-around'}}>
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
            onPress={() => {setcollapsed(!collapsed)}}>
             <Text>Cancel</Text>
          </Button>
          </View>
          </View>
        </BottomSheet>
        <BottomSheet
          visible={Collapsed}
          onBackButtonPress={toggleExpanded1}
          onBackdropPress={() => { setCollapsed(!Collapsed)}}
        >
           <View
            style={{
              backgroundColor: '#fff',
              width: '100%',
              height: 300,
              
            }}>
              <Header>
             <Body>
            <Title style={{color: 'white',alignSelf: 'center'}}>Edit</Title>
          </Body>
             </Header>
                 <View>
              <TextInput
              style={{width: '95%',alignSelf:'center'}}
              label="Category"
              mode='flat'
              value={name}
              size="small"
              onChangeText={value => handleChange('name', value)}
            />
              </View>
              <View>
              <TextInput
              style={{width: '95%',alignSelf:'center'}}
              label="Description"
              mode='flat'
              value={description}
              size="small"
              onChangeText={value => handleChange('description', value)}
            />
              </View>
              <View style={{flexDirection:'row',justifyContent:'space-around'}}>
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
            onPress={() => {setCollapsed(!Collapsed);}}>
            Cancel
          </Button>
          </View>
          </View>
        </BottomSheet>
        <FlatList
          data={data}
          renderItem={({item}) => {
            return (
                <List>
                  <ListItem avatar>
                    <Left>
                    </Left>
                    <Body>
                      <View style={{flexDirection: 'row'}}>
                        <View style={{flexDirection: 'column'}}>
                          <Text >Category</Text>
                          <Text>Description</Text>
                          <Text>CreatedOn</Text>
                          <Text>CreatedBy</Text>
                        </View>
                        <View style={{flexDirection: 'column'}}>
                          <Text> : </Text>
                          <Text> : </Text>
                          <Text> : </Text>
                          <Text> : </Text>
                        </View>
                        <View style={{flexDirection: 'column'}}>
                          <Text style={{color: 'grey'}}>{item.name ? item.name : " ---"}</Text>
                          <Text style={{color: 'grey'}}>{item.description ? item.description : " ---"}</Text>
                          <Text style={{color: 'grey'}}>{item.createdAt ? item.createdAt : " ---"}</Text>
                          <Text style={{color: 'grey'}}>{item.createdBy ? item.createdBy : " ---"}</Text>
                        </View>
                      </View>
                    </Body>
                    <Right>
                    {
                        item.name !== 'General' && item.name !== 'Knowledge' ?
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
                         deleteTableContent(item)
                       }
                       >
                       <DIcon
                         name="delete-circle"
                         color="#c21d1d" 
                         size={30}
                         style={{top:10}}
                       />
                     </TouchableOpacity>
                   </View> : null }

                    </Right>
                  </ListItem>
                </List>
             
            );
          }}
         
        
        />
        
          </View>
  );
   return (<Spinner visible={true} />)
}


export default Presentation

