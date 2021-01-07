import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  CheckBox,
  StyleSheet,
  Linking,
  FlatList,
} from 'react-native';
import DelIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  Container,
  Header,
  Icon,
  Item,
  Content,
  Form,
  Button,
  List,
  ListItem,
  Input,
  Textarea,
  Right,
  Left,
  Body,
} from 'native-base';
import {BottomSheet} from 'react-native-btr';
import {DataTable, TextInput, Title, FAB} from 'react-native-paper';
import CrossIcon from 'react-native-vector-icons/Entypo';
function Presentation(props) {
  const [collapsed, setcollapsed] = React.useState(false);
  const {
    title,
    content,
    categoryId,
    state,
    categoryMetaInfo,
    attachments,
    categoryName,
    isEdit,
    isUploading,
    handleChange,
    handleNameChange,
    handleFile,
    handleDeleteAttachment,
    handleSubmit,
  } = props;

  const toggleExpanded = () => {
    setcollapsed(!collapsed);
  };
  const [val, Setval] = useState(title);
  const handleArticleName = (value) => {
    Setval(value);
    handleChange('title', value);
  };

  console.log('maaa', !title.trim());

  let Suggest = [];
  categoryMetaInfo.map((option) => {
    Object.keys(option.types).forEach((key) => {
      Suggest.push({[key]: option.types[key]});
    });

    // option.types.push(
    //   {
    //     id :Object.keys(option.types),
    //     name:Object.values(option.types)
    //   }
    //  )
    console.log('aSa', Suggest);
  });

  return (
    <Container>
      <Header>
        <Left>
          <Button
            transparent
            onPress={() => {
              props.navigation.goBack();
            }}>
            <CrossIcon name="cross" size={26} color="white" />
          </Button>
        </Left>
        <Body>
          <Title style={{color: 'white'}}>
            {isEdit ? 'Edit Article' : 'New Article'}
          </Title>
        </Body>
      </Header>
      <Form>
        <Item success={title !== '' ? true : false} style={{width: '93%'}}>
          <Input
            placeholder="Enter article name"
            value={val}
            onChangeText={(value) => handleArticleName(value)}
          />
        </Item>
        <View
          style={{
            height: 40,
            width: '93%',
            borderWidth: 0.9,
            borderColor: 'grey',
            alignSelf: 'center',
            marginTop: 30,
          }}>
          <TouchableOpacity onPress={toggleExpanded}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              {categoryName ? (
                <Text style={{fontSize: 16, margin: 10, color: 'grey'}}>
                  {categoryName}
                </Text>
              ) : (
                <Text style={{fontSize: 16, margin: 10, color: 'grey'}}>
                  Select Category
                </Text>
              )}
              <Icon name="add" style={{margin: 5}} />
            </View>
          </TouchableOpacity>
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
              <Header>
                <Body>
                  <Title style={{color: 'white', alignSelf: 'center'}}>
                    Select Category
                  </Title>
                </Body>
              </Header>
              <FlatList
                data={Suggest}
                keyExtractor={(item) => Object.keys(item)}
                renderItem={({item}) => {
                  console.log('a', categoryId.includes(Object.keys(item)));
                  return (
                    <List>
                      <ListItem avatar>
                        <Body>
                          <Text>{Object.values(item)}</Text>
                        </Body>
                        <Right style={{bottom: 6}}>
                          {Object.keys(item).map((key) => {
                            return (
                              <>
                                {Object.values(item).map((keyname) => {
                                  return (
                                    <CheckBox
                                      value={categoryId.includes(key)}
                                      onValueChange={(value) =>
                                        handleChange(
                                          'categoryId',
                                          key,
                                          'categoryName',
                                          keyname,
                                        )
                                      }
                                    />
                                  );
                                })}
                              </>
                            );
                          })}
                        </Right>
                      </ListItem>
                    </List>
                  );
                }}
              />
            </View>
          </BottomSheet>
        </View>
        <View style={{marginTop: 30, width: '93%', alignSelf: 'center'}}>
          <Textarea
            rowSpan={5}
            bordered
            placeholder="Description"
            value={content}
            onChangeText={(value) => handleChange('content', value)}
          />
        </View>
        <View style={{marginTop: 30, marginLeft: 15}}>
          <Button iconLeft bordered style={{width: 130}} onPress={handleFile}>
            <Icon name="link" />
            <Text style={{right: 10, color: '#3F51B5'}}>Attachment</Text>
          </Button>
        </View>
        {attachments.map((doc, index) => (
          <View style={{flexDirection: 'row',justifyContent:"space-between"}}>
            <>
              {doc !== '' ? (
                <View style={{marginTop: 15, marginLeft: 30}}>
                  <TouchableOpacity
                    onPress={() => Linking.openURL(doc.url)}>
                    <Text style={{right: 10, color: '#62B1F6',textDecorationLine: 'underline',fontSize:16}}>
                      {doc.name}  
                    </Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <View style={{marginTop: 15, marginLeft: 30}}>
                  <Text style={{right: 10, color: 'black'}}>
                    No file choosen
                  </Text>
                </View>
              )}
            </>
            <TouchableOpacity style={{marginTop: 16, marginLeft: 30}} onPress={() => handleDeleteAttachment(index)}>
                    <DelIcon
                      name="delete-circle"
                      size={20}
                      color="grey"
                      style={{right: 10}}
                    />
                  </TouchableOpacity>
          </View>
        ))}
        {isUploading ? (
          <View style={{marginTop: 15, marginLeft: 30}}>
            <Text style={{right: 10, color: 'black'}}>
              Uploading Please Wait...
            </Text>
          </View>
        ) : (
          null
        )}
         
              <View style={{marginTop: 50}} >
                <Button full primary onPress={handleSubmit} disabled={!title.trim()  || !categoryId}>
                  <Text style={{color:'white'}}>{isEdit ? "Update" : "Create"}</Text>
                </Button>
              </View>
           
      </Form>
    </Container>
  );
}

export default Presentation;
