import React, {useState} from 'react';
import {Divider, Avatar, Appbar, Menu, Title} from 'react-native-paper';
import validate from '../../../../shared/validation';
import MetaInfo from '../../../../shared/getMetaInfo';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import {
  Container,
  Header,
  List,
  ListItem,
  Thumbnail,
  Tab,
  Tabs,
  TabHeading,
  Icon,
  Text,
  ScrollableTab,
  Left,
  Button,
  Body,
  Right,
} from 'native-base';
import {View, TouchableOpacity,StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import IconLike from 'react-native-vector-icons/AntDesign';
import Spinner from 'react-native-loading-spinner-overlay';

function CustomCard(props) {
  const data = props.route.params.category;
  const metaInfo = new MetaInfo();
  const [visible, setVisible] = React.useState(false);
  const {SignOut} = props;
  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  const OpenArticle = () => {
    props.navigation.navigate('Articles');
    closeMenu();
  };

  const OpenSettings = () => {
    props.navigation.navigate('WikiSettings');
    closeMenu();
  };

  return (
    <Container>
        <Header style={styles.Header}>
          <Left>
            <Button transparent>
              <Icon
                name="arrow-back"
                style={styles.HeaderIcons}
                onPress={() => {
                  props.navigation.goBack();
                }}
              />
            </Button>
          </Left>
          <Body>
            <Title style={styles.HeaderTitle}>Wiki</Title>
          </Body>
          <Right>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Button transparent>
                <Icon
                  name="search"
                  style={styles.HeaderIcons}
                  onPress={() => {
                    props.navigation.navigate('WikiSearch', {
                      allArticles: props.route.params.allArticles,
                    });
                  }}
                />
              </Button>
              {/* <Menu
                visible={visible}
                onDismiss={closeMenu}
                anchor={
                  <Appbar.Action
                    icon="dots-vertical"
                    color="white"
                    onPress={openMenu}
                  />
                }>
                <Menu.Item onPress={OpenArticle} title="More Articles" />
                {access_modules.includes('wiki-manager') ||
                access_modules.includes('console-customization') ? (
                  <Menu.Item onPress={OpenSettings} title="Settings" />
                ) : null}
              </Menu> */}
              <Button transparent>
                <Icon
                  name="menu"
                  style={styles.HeaderIcons}
                  onPress={() => {
                    props.navigation.openDrawer();
                  }}
                />
              </Button>
            </View>
          </Right>
        </Header>
      {props.route.params.category.length ? (
        props.route.params.category.map((ele) => (
          <List>
            {console.log('llo', ele.createdAt)}
            <ListItem avatar>
              <Left>
                {metaInfo.getImage(ele.createdBy) ? (
                  <Thumbnail
                    small
                    source={{uri: metaInfo.getImage(ele.createdBy)}}
                  />
                ) : (
                  <Avatar.Text
                    size={40}
                    label={ele.title[0]}
                    style={{backgroundColor: '#2970ff'}}
                  />
                )}
              </Left>
              <Body>
                <TouchableOpacity
                  onPress={() => {
                    props.navigation.navigate('ViewArticle', {
                      articleId: ele.id,
                      isHistory: false,
                      historyId: null,
                    });
                  }}>
                  {ele.title.trim().length > 35 ? (
                    <Text style={{color: '#2970ff'}}>
                      {ele.title.trim().substring(0, 35) + '...'}
                    </Text>
                  ) : (
                    <Text style={{color: '#2970ff'}}>{ele.title.trim()}</Text>
                  )}
                </TouchableOpacity>
                <Text note>
                  Created On : {validate.dateFormatter(ele.createdAt)}
                </Text>
              </Body>
              <Right>
                <View style={{flexDirection: 'row'}}>
                  <IconLike name="like2" size={18} color="#2970ff" />
                  <Text style={{left: 10, color: 'grey'}}>
                    {ele.upVotes.length}
                  </Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <IconLike name="dislike2" size={18} color="#2970ff" />
                  <Text style={{left: 10, color: 'grey'}}>
                    {ele.downVotes.length}
                  </Text>
                </View>
              </Right>
            </ListItem>
          </List>
        ))
      ) : (
        <Text style={{alignSelf: 'center', top: '50%'}}>
          No Articles to display
        </Text>
      )}
    </Container>
  );
}
function Presentation(props) {
  const {
    general,
    archived,
    recentlyAdded,
    knowledge,
    allArticles,
    searchKeyWord,
    handleChange,
    access_modules,
  } = props;

  const Drawer = createDrawerNavigator();
 
  return (
    <>
      
        <Drawer.Navigator initialRouteName="Recently Added" drawerPosition='right' drawerContentOptions={{
      activeTintColor: '#3F51B5',
      inactiveTintColor:'#3F51B5',
      backgroundColor:'#fff',
      itemStyle: {marginVertical: 5},
    }}>
          <Drawer.Screen
            name="Recently Added"
            
            initialParams={{category: recentlyAdded, allArticles: allArticles}}

            component={CustomCard}
          />
          <Drawer.Screen
            name="General"
            initialParams={{category: general, allArticles: allArticles}}
            component={CustomCard}
          />
          <Drawer.Screen
            name="Knowledge"
            initialParams={{category: knowledge, allArticles: allArticles}}
            component={CustomCard}
          />
          <Drawer.Screen
            name="Archieved"
            initialParams={{category: archived, allArticles: allArticles}}
            component={CustomCard}
          />
          
        </Drawer.Navigator>
  
    </>
  );
}

export default Presentation;

{
  /* <Tabs renderTabBar={() => <ScrollableTab />}>
          <Tab
            heading={
              <TabHeading>
                <Text style={{color:'white', fontSize:14,fontWeight: 'bold',lineHeight: 20}}>RECENTLY ADDED</Text>
              </TabHeading>
            }>
            <CustomCard category={recentlyAdded} {...props}/>
            
          </Tab>
          <Tab
            heading={
              <TabHeading>
                <Text style={{color:'white', fontSize:14,fontWeight: 'bold',lineHeight: 20}}>GENERAL</Text>
              </TabHeading>
            }>
             <CustomCard category={general} {...props}/>
          </Tab>
          <Tab
            heading={
              <TabHeading>
                <Text style={{color:'white', fontSize:14,fontWeight: 'bold',lineHeight: 20}}>KNOWLEDGE</Text>
              </TabHeading>
            }>
            <CustomCard category={knowledge} {...props}/>
          </Tab>
          <Tab
            heading={
              <TabHeading>
                <Text style={{color:'white', fontSize:14,fontWeight: 'bold',lineHeight: 20}}>ARCHIIVED</Text>
              </TabHeading>
            }>
             <CustomCard category={archived} {...props}/>
          </Tab>
        </Tabs> */
}

const styles = StyleSheet.create({
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

})