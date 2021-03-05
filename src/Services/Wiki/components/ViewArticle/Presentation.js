import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {Title, Divider, Avatar, Appbar, Menu} from 'react-native-paper';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from 'react-native';
import LinkIcon from 'react-native-vector-icons/Entypo';
import IconLike from 'react-native-vector-icons/AntDesign';
import HTMLView from 'react-native-htmlview';
import Comments from '../Comments';
import {
  Container,
  Header,
  Content,
  Icon,
  ListItem,
  Thumbnail,
  Left,
  Body,
  Right,
  Button,
} from 'native-base';
import MetaInfo from '../../../../shared/getMetaInfo';
import Collapsible from 'react-native-collapsible';
import validate from '../../../../shared/validation';
const Presentation = (props) => {
  const {
    data,
    isHistory,
    categoryMetaInfo,
    onDeleteArticle,
    articleId,
    onRestoreArticle,
    onFollowOrUnfollow,
    auth,
    OnVote,
    access_modules,
    onRevertArticle,
  } = props;
  const [visible, setVisible] = React.useState(false);
  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);
  const [collapsed, setcollapsed] = useState(true);
  const toggleExpanded = () => {
    setcollapsed(!collapsed);
  };
  const metaInfo = new MetaInfo();

  return (
      <>
        <Header style={styles1.Header}>
          <Left>
            <Button transparent>
              <Icon
                name="arrow-back"
                style={styles1.HeaderIcons}
                onPress={() => {
                  props.navigation.goBack();
                }}
              />
            </Button>
          </Left>
          <Body>
            <Title style={styles1.HeaderTitle}>Articles</Title>
          </Body>
          <Right>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              {/* <Button transparent>
                <Icon name="search" onPress={openMenu} />
              </Button> */}
              <Menu
                visible={visible}
                onDismiss={closeMenu}
                anchor={
                  <Appbar.Action
                    icon="dots-vertical"
                    style={styles1.HeaderIcons}
                    color="white"
                    onPress={openMenu}
                  />
                }>
                {data.isExist ? (
                  isHistory ? (
                    <Menu.Item
                      onPress={() => {
                        onRevertArticle(
                          {
                            title: data.title,
                            content: data.content,
                            attachments: data.attachments,
                          },
                          articleId,
                          data.categoryId,
                        );
                      }}
                      title="Revert Article"
                    />
                  ) : access_modules.includes('wiki-manager') ||
                    access_modules.includes('console-customization') ||
                    auth.uid === data.createdBy ? (
                    <>
                      <Menu.Item
                        onPress={() => {
                          onDeleteArticle(articleId);
                          closeMenu()
                        }}
                        title="Delete Article"
                      />
                      <Menu.Item
                        onPress={() => {
                          props.navigation.navigate(
                            'ArticleHistory',
                            {articleId: data.id},
                            closeMenu(),
                          );
                          
                        }}
                        title="Article History"
                      />
                      <Menu.Item
                        onPress={() => {
                          props.navigation.navigate('EditArticle',{isEdit : true});
                          closeMenu()
                        }}
                        title="EditArticle"
                      />
                    </>
                  ) : null
                ) : (
                  <Menu.Item
                    onPress={() => {
                      onRestoreArticle(articleId, data.categoryId);
                    }}
                    title="Restore Article"
                  />
                )}
              </Menu>
            </View>
          </Right>
        </Header>
        <ScrollView>
        <ListItem thumbnail>
          <Body>
            <TouchableOpacity>
              <Title style={{color: '#0000FF', fontSize: 16}} mode="text">
                {data.title.toUpperCase()}
              </Title>
            </TouchableOpacity>
            <View style={{flexDirection: 'row'}}>
              <View style={{flexDirection: 'column'}}>
                <Text style={{color: 'grey'}}>Updated on</Text>
                <Text style={{color: 'grey'}}>Updated by</Text>
                <TouchableOpacity onPress={toggleExpanded}>
                  {collapsed ? (
                    <Text style={{color: '#2970ff'}}>More...</Text>
                  ) : (
                    <View />
                  )}
                </TouchableOpacity>
              </View>
              <View style={{flexDirection: 'column'}}>
                <Text> : </Text>
                <Text> : </Text>
              </View>
              <View style={{flexDirection: 'column'}}>
                <Text style={{color: 'grey'}}>
                  {validate.dateAndTimeFormatter(data.updatedAt)}
                </Text>
                <Text style={{color: 'grey'}}>
                  {metaInfo.emailToName(data.updatedBy)}
                </Text>
              </View>
            </View>
            <Collapsible collapsed={collapsed}>
              <View style={{flexDirection: 'row'}}>
                <View style={{flexDirection: 'column'}}>
                  <Text style={{color: 'grey'}}>Created on</Text>
                  <Text style={{color: 'grey'}}>Created by</Text>
                  <TouchableOpacity onPress={toggleExpanded}>
                    <Text style={{color: '#2970ff'}}>less...</Text>
                  </TouchableOpacity>
                </View>
                <View style={{flexDirection: 'column'}}>
                  <Text> : </Text>
                  <Text> : </Text>
                </View>
                <View style={{flexDirection: 'column'}}>
                  <Text style={{color: 'grey'}}>
                    {validate.dateFormatter(data.createdAt)}
                  </Text>
                  <Text style={{color: 'grey'}}>
                    {metaInfo.emailToName(data.createdBy)}
                  </Text>
                </View>
              </View>
            </Collapsible>
            <View style={{marginTop: 15}}>
              <HTMLView value={data.content} />
            </View>
          </Body>
        </ListItem>
        {!isHistory ? (
          <View
            style={{
              flexDirection: 'row',
              left: 20,
              top: 10,
              justifyContent: 'space-evenly',
            }}>
            <View>
              <TouchableOpacity onPress={(e) => OnVote(articleId, 'upVotes')}>
                {data.upVotes.includes(auth.uid) ? (
                  <IconLike name="like2" size={22} color="#2970ff" />
                ) : (
                  <IconLike name="like2" size={22} color="black" />
                )}
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity onPress={(e) => OnVote(articleId, 'downVotes')}>
                {data.downVotes.includes(auth.uid) ? (
                  <IconLike name="dislike2" size={22} color="#2970ff" />
                ) : (
                  <IconLike name="dislike2" size={22} color="black" />
                )}
              </TouchableOpacity>
            </View>
            <View>
              {!data.following.includes(auth.uid) ? (
                <TouchableOpacity
                  onPress={(e) => onFollowOrUnfollow(articleId, 'follow')}>
                  <Text style={{color: '#2970ff', fontSize: 17}}>Follow</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={(e) => onFollowOrUnfollow(articleId, 'unfollow')}>
                  <Text style={{color: '#2970ff', fontSize: 17}}>Unfollow</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        ) : null}
        <View style={{marginTop:30}}>
          <View style={{margin: 10}}>
            <Title>Attachments:</Title>
          </View>
          <View>
            {data.hasOwnProperty('attachments')
              ? data.attachments.map((doc, index) => (
                  <View>
                    <TouchableOpacity onPress={() => Linking.openURL(doc.url)}>
                      <View style={{flexDirection: 'row', left: 10}}>
                        <LinkIcon name="link" size={16} color="#2970ff" />
                        <Text style={{color: '#2970ff', left: 4}}>
                          {doc.name}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                ))
              : null}
          </View>
        </View>
        <View style={{marginTop:30}}>
        {!isHistory && data.isExist ? (
          <View style={{margin: 10}}>
            <Title>Leave your comment:</Title>
            <Comments articleId={articleId} />
          </View> )
          : null }
        </View>
        </ScrollView>
      </>
  );
};

export default Presentation;

const styles = StyleSheet.create({
  cont: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  Gradient: {
    width: '100%',
    height: 50,
    elevation: 5,
  },
});

const styles1 = StyleSheet.create({
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