import React from 'react'
import {
    Divider,
    Searchbar,
    Title,
  } from 'react-native-paper';
import {
    Content,
    Header,
    List,
    Item,
    Input,
    ListItem,
    Thumbnail,
    Tab,
    Tabs,
    TabHeading,
    Icon,
    ScrollableTab,
    Left,
    Button,
    Body,
    Right,
  } from 'native-base';
import {View,Text,FlatList,TouchableOpacity} from 'react-native'
export default function WikiSearch(props) {
    const [search, setSearch] = React.useState('');
    const [filteredDataSource, setFilteredDataSource] = React.useState(props.route.params.allArticles);
    const searchFilterFunction = (text) => {
        // Check if searched text is not blank
        if (text) {
          const newData = props.route.params.allArticles.filter(
            function (item) {
              const itemData = item.title
                ? item.title.toUpperCase()
                : ''.toUpperCase();
              const textData = text.toUpperCase();
              return itemData.indexOf(textData) > -1;
          });
          setFilteredDataSource(newData);
          setSearch(text);
        } else {
          setFilteredDataSource(props.route.params.allArticles);
          setSearch(text);
        }
      };
    return (
        <>
        <Header>
            <Left>
              <Button
                transparent
                onPress={() => {
                  props.navigation.goBack()
                }}>
                <Icon name="arrow-back" />
              </Button>
            </Left>
            <Body>
              <View>
              <Input placeholder='Enter your idea or Search Items..' 
                onChangeText={(text) => searchFilterFunction(text)}
                value={search}
                placeholderTextColor='grey' style={{width:'100%',bottom:2}}/>
              </View>
            </Body>
            <Right>
            <Button transparent>
              <Icon
                name="add"
                onPress={() => {
                  props.navigation.navigate('EditArticle',{isEdit : false , search : search});
                }}
              />
            </Button>
              </Right>
          </Header>
        
        <FlatList
          data={filteredDataSource}
          renderItem={({item}) => {
              return(
            <Content>
                
          <List>
            <ListItem selected>
              <Left>
              <TouchableOpacity onPress={() => {props.navigation.navigate('ViewArticle',{articleId : item.id, isHistory : false , historyId : null})}}>
                <Text style={{color: "#2970ff"}}>{item.title}</Text>
                </TouchableOpacity> 
              </Left>
              <Right>
              <TouchableOpacity onPress={() => {props.navigation.navigate('ViewArticle',{articleId : item.id, isHistory : false , historyId : null})}}>
                <Icon name="arrow-forward"  />
                </TouchableOpacity> 
              </Right>
            </ListItem>
            </List>
           
            </Content>
              )}}/>
        </>
    )
}
