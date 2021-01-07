import React from "react"
import {
  Title,
  Avatar
} from 'react-native-paper';
import Spinner from 'react-native-loading-spinner-overlay'
import {
  View,
  Text,
  FlatList,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import {
  ListItem,
  Body,
  Left,
  Container,
  Thumbnail,
} from 'native-base';
import MetaInfo from "../../../../../shared/getMetaInfo"
import { isLoaded } from "react-redux-firebase"


export default function Presentation(props) {
  const { articles, category_articles } = props
  const metaInfo = new MetaInfo()

  let data = []
  articles &&
    articles.forEach((article) => {
      data.push({
        title: article.title,
        createdAt: article.createdAt,
        createdBy: metaInfo.emailToName(article.createdBy),
        updatedAt: article.updatedAt,
        updatedBy: metaInfo.emailToName(article.updatedBy),
        photoUrl: metaInfo.getImage(article.createdBy),
        id: article.id,
      })
    })

    if(isLoaded(category_articles))
  return (
    <>
    {
      data.length ?
      <Container>
          <FlatList
            data={data}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => {
              return (
                <ListItem thumbnail>
                 <Left>
                {
                  metaInfo.getImage(item.photoUrl) ? (
                  <Thumbnail
                    small
                    source={{uri: metaInfo.getImage(item.photoUrl)}}
                  />) : <Avatar.Text
                  size={40}
                  label={item.title[0]}
                  style={{backgroundColor: "#2970ff"}}
                />
                }
                
              </Left>
                  <Body>
                    <TouchableOpacity onPress={() => {props.navigation.navigate('ViewArticle',{articleId:item.id, isHistory : false , historyId : null})}}>
                      <Text
                        style={{color: "#2970ff", fontSize: 16}}
                        mode="text">
                        {item.title}
                      </Text>
                    </TouchableOpacity>

                    <View style={{flexDirection: 'row'}}>
                      <View style={{flexDirection: 'column'}}>
                        <Text>Updated on</Text>
                        <Text>Updated by</Text>
                        <Text>Created on</Text>
                        <Text>Created by</Text>
                      </View>
                      <View style={{flexDirection: 'column'}}>
                        <Text> : </Text>
                        <Text> : </Text>
                        <Text> : </Text>
                        <Text> : </Text>
                      </View>
                      <View style={{flexDirection: 'column'}}>
                        <Text>{item.updatedAt}</Text>
                        <Text>{item.updatedBy}</Text>
                        <Text>{item.createdAt}</Text>
                        <Text>{item.createdBy}</Text>
                      </View>
                    </View>
                  </Body>
                </ListItem>
              );
            }}
          />
        </Container> : <Text style={{alignSelf: 'center',top:'50%'}}>No Articles to display</Text>
}
    </>
  )
  return (<Spinner visible={true} />)
}
