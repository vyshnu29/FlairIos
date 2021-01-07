import React, {useState} from 'react';
import {
  Divider,
  Avatar,
  Appbar,
  Menu,
  Title,
} from 'react-native-paper';
import validate from "../../../../shared/validation"
import MetaInfo from "../../../../shared/getMetaInfo"
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
import {
  View,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import IconLike from 'react-native-vector-icons/AntDesign';
import Spinner from 'react-native-loading-spinner-overlay';


function CustomCard(props) {
 const data = props.category
  const metaInfo = new MetaInfo()
console.log("Ss",props)
  return (
<>
{props.category.length ? (
        props.category.map((ele) => (
          <List>
            {console.log("llo", ele.createdAt)}
            <ListItem avatar>
              <Left>
                {
                  metaInfo.getImage(ele.createdBy) ? (
                  <Thumbnail
                    small
                    source={{uri: metaInfo.getImage(ele.createdBy)}}
                  />) : <Avatar.Text
                  size={40}
                  label={ele.title[0]}
                  style={{backgroundColor: "#2970ff"}}
                />
                }
                
              </Left>
              <Body>
                <TouchableOpacity onPress={() => {props.navigation.navigate('ViewArticle',{articleId:ele.id, isHistory : false , historyId : null})}}>
        {ele.title.trim().length > 35 ? (
                      <Text style={{ color: "#2970ff"}}>
                        {ele.title.trim().substring(0, 35) + "..."}
                      </Text>
                    ) : (
                      <Text style={{ color: "#2970ff"}}>
                        {ele.title.trim()}
                     
                      </Text>
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
                  <IconLike
                    name="dislike2"
                    size={18}
                    color="#2970ff"
                  />
                  <Text style={{left: 10, color: 'grey'}}>
                    {ele.downVotes.length}
                  </Text>
                </View>
              </Right>
            </ListItem>
          </List>
       
      ))
  ) : (
    <Text style={{alignSelf: 'center',top:'50%'}}>No Articles to display</Text>
  )}

</>
  )
  
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
  } = props
  console.log("Azz",allArticles)
  const [visible, setVisible] = React.useState(false);
  const {SignOut} = props;
  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

    const OpenArticle = () => {
      props.navigation.navigate('Articles')
      closeMenu();
    }

  const OpenSettings =  () => {
    props.navigation.navigate('WikiSettings')
    closeMenu();
  }
 
  return (
    <>
      <Container>
        <Header>
          <Left>
            <Button transparent>
              <Icon
                name="arrow-back"
                onPress={() => {
                  props.navigation.goBack();
                }}
              />
            </Button>
          </Left>
          <Body>
            <Title style={{color: 'white'}}>Wiki</Title>
          </Body>
          <Right>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Button transparent>
                <Icon name="search" onPress={() => {props.navigation.navigate('WikiSearch',{allArticles:allArticles})}} />
              </Button>
              <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={<Appbar.Action icon="dots-vertical" color="white"  onPress={openMenu} />}>
          <Menu.Item onPress={OpenArticle} title="More Articles" />
          {access_modules.includes("wiki-manager") ||
        access_modules.includes("console-customization")  ? (
          <Menu.Item onPress={OpenSettings} title="Settings" />

				) : null}
        </Menu>
    
            </View>
          </Right>
        </Header>
        <Tabs renderTabBar={() => <ScrollableTab />}>
          <Tab
            heading={
              <TabHeading>
                <Text>Recently Added</Text>
              </TabHeading>
            }>
            <CustomCard category={recentlyAdded} {...props}/>
            
          </Tab>
          <Tab
            heading={
              <TabHeading>
                <Text>General</Text>
              </TabHeading>
            }>
             <CustomCard category={general} {...props}/>
          </Tab>
          <Tab
            heading={
              <TabHeading>
                <Text>Knowledge</Text>
              </TabHeading>
            }>
            <CustomCard category={knowledge} {...props}/>
          </Tab>
          <Tab
            heading={
              <TabHeading>
                <Text>Archived</Text>
              </TabHeading>
            }>
             <CustomCard category={archived} {...props}/>
          </Tab>
        </Tabs>
      </Container>
    </>
  );
}

export default Presentation



