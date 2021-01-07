import React, {useContext, useState} from 'react';
import {View, Text, ScrollView, TextInput} from 'react-native';
import EditIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import DelIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  List,
  Avatar,
  Card,
  Title,
  Chip,
  Caption,
  Divider,
  ActivityIndicator,
  Button,
} from 'react-native-paper';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Container, Header, Content, Textarea, Form, Badge} from 'native-base';
import HTMLView from 'react-native-htmlview';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import MetaInfo from '../../../../shared/getMetaInfo';

export default function Presentation(props) {
  const {
    comments,
    handleChange,
    isEditing,
    handleSubmit,
    commentText,
    commenting,
    handleUpdate,
    handleDelete,
    names,
    auth,
  } = props;

  dayjs.extend(relativeTime);

  const metaInfo = new MetaInfo();

  const onEdit = (id) => {
    console.log(id);
    const comment = comments.filter((item) => item.id === id)[0];
    handleChange('isEditing', true);
    handleChange('commentText', comment.content);
    handleChange('updateId', comment.id);
  };

  const cancelUpdate = () => {
    handleChange('isEditing', false);
    handleChange('commentText', '');
  };

  return (
    <View style={{flex: 1}}>
     
        <Textarea
          rowSpan={5}
          bordered
          placeholder="Type your comment here"
          value={commentText}
          onChangeText={(data) => handleChange('commentText', data)}
        />
      

      {commentText.length > 0 ? (
        commenting ? (
          <ActivityIndicator
            style={{width: '33%', margin: 10, alignSelf: 'flex-end'}}
          />
        ) : !isEditing ? (
        
            <Button
              mode="contained"
              style={{width: '45%', margin: 10, alignSelf: 'flex-end'}}
              onPress={!isEditing ? handleSubmit : handleUpdate}>
              Comment
            </Button>
        
        ) : (
          <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
            <Button
              mode="contained"
              style={{width: '45%', marginLeft: 10,marginTop: 10}}
              onPress={!isEditing ? handleSubmit : handleUpdate}>
              Update
            </Button>
            <Button
              mode="contained"
              style={{width: '45%', marginLeft: 10 ,marginTop: 10}}
              onPress={cancelUpdate}>
              Cancel
            </Button>
          </View>
        )
      ) : (
        <Button
          mode="contained"
          type="button"
          style={{
            width: '45%',
            margin: 10,
            alignSelf: 'flex-end',
            backgroundColor: 'grey',
          }}>
          Comment
        </Button>
      )}
      <Title>Comments:</Title>
      <Divider style={{color: 'black', width: '100%'}}></Divider>
      {comments.map((comment) => {
        let userData = names[comment.createdBy];
        return (
          <>
            <View style={{flexDirection: 'row', margin: 5}}>
              <Avatar.Image
                size={30}
                source={{uri: `${metaInfo.getImage(comment.createdBy)}`}}
              />

              <View>
                <Text
                  style={{marginLeft: 10, fontWeight: '100', color: '#2970ff'}}>
                  {metaInfo.emailToName(comment.createdBy)}
                </Text>
                {metaInfo.checkSupervisor(comment.createdBy) ? (
                  <Badge warning style={{left: 10}}>
                    <Text style={{fontSize: 8}}>SUPERVISIOR</Text>
                  </Badge>
                ) : userData.jobtitle ? (
                  <Badge info style={{left: 10}}>
                    <Text style={{fontSize: 8, color: 'white'}}>
                      {userData.jobtitle}
                    </Text>
                  </Badge>
                ) : null}
              </View>

              <Caption style={{left: 5}}>
                {dayjs(comment.createdAt).fromNow()}
              </Caption>
              {auth.uid === comment.createdBy ? (
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    left: 15,
                  }}>
                  <TouchableOpacity onPress={() => onEdit(comment.id)}>
                    <EditIcon name="pencil-circle" size={20} color="grey" />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => handleDelete(comment.id)}>
                    <DelIcon
                      name="delete-circle"
                      size={20}
                      color="grey"
                      style={{marginLeft: 5}}
                    />
                  </TouchableOpacity>
                </View>
              ) : null}
            </View>
            <View style={{marginLeft: 50, bottom: 5}}>
              <HTMLView value={comment.content} />
            </View>
            <Divider />
          </>
        );
      })}
    
    </View>
  );
}
