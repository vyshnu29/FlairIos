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
import { useSelector } from "react-redux";
import {Container, Header, Content, Textarea, Form, Badge} from 'native-base';
import HTMLView from 'react-native-htmlview';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import MetaInfo from "../../../../../../shared/getMetaInfo";

export default function Presentation(props) {
  const {
    comments,
    handleChange,
    handleSubmit,
    state,
    handleUpdate,
    handleDelete,
    handleEdit,
    onEdits,
    updateId,
    handleCancel,
  } = props;

  dayjs.extend(relativeTime);

  const metaInfo = new MetaInfo();
  const names = useSelector((state) => state.firestore.ordered.names[0]);
  const onEdit = (id) => {
    console.log(id);
    const comment = comments.filter((item) => item.id === id)[0];
    handleEdit("onEdit", comment);
  };

  const cancelUpdate = () => {
    handleCancel();
  };

  return (
    <View>
      <Form>
        <Textarea
          rowSpan={5}
          bordered
          placeholder="Type your comment here"
          value={state.commentText}
          onChangeText={(data) => handleChange(data)}
        />
      </Form>

      {state.commentText && state.commentText.trim().length > 0 ? (
        state.commenting  ? (
          <ActivityIndicator
            style={{width: '33%', margin: 10, alignSelf: 'flex-end'}}
          />
        ) : !onEdits ? (
          <View>
            <Button
              mode="contained"
              style={{width: '45%', margin: 10, alignSelf: 'flex-end',backgroundColor:'#3F51B5'}}
              onPress={!onEdits ? handleSubmit : handleUpdate}>
              Comment
            </Button>
          </View>
        ) : (
          <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
            <Button
              mode="contained"
              style={{width: '35%', marginLeft: 10,marginTop: 10,backgroundColor:'#3F51B5'}}
              onPress={!onEdits ? handleSubmit : handleUpdate}>
              Update
            </Button>
            <Button
              mode="contained"
              style={{width: '35%', marginLeft: 10,marginTop: 10,backgroundColor:'#3F51B5'}}
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
            width: '35%',
            margin: 10,
            alignSelf: 'flex-end',
            backgroundColor: '#e3e3e3',
          }}>
          Comment
        </Button>
      )}
      <Title>Comments:</Title>
      <Divider style={{color: 'black', width: '100%'}}></Divider>
      {comments.map((comment) => {
        let userData =
        names &&
        Object.values(names).filter(
          (name) => name.uid === comment.createdBy
        )[0];
        return (
          <>
            <View style={{flexDirection: 'row', margin: 5}}>
              {
                metaInfo.getImage(comment.createdBy) ? 
                <Avatar.Image
                size={30}
                source={{uri: `${metaInfo.getImage(comment.createdBy)}`}}
              /> :
              <Avatar.Text
                size={30}
                style={{backgroundColor: '#3F51B5'}}
                label={metaInfo.emailToName(comment.createdBy)[0]}
              />
              }
              

              <View>
                <Text
                  style={{marginLeft: 10, fontWeight: '100', color: '#2970ff'}}>
                  {metaInfo.emailToName(comment.createdBy)}
                </Text>
                {/* {metaInfo.checkSupervisor(comment.createdBy) ? (
                  <Badge warning style={{left: 10}}>
                    <Text style={{fontSize: 8}}>SUPERVISIOR</Text>
                  </Badge>
                ) : userData.jobtitle ? (
                  <Badge info style={{left: 10}}>
                    <Text style={{fontSize: 8, color: 'white'}}>
                      {userData.jobtitle}
                    </Text>
                  </Badge>
                ) : null} */}
              </View>

              <Caption style={{left: 8,bottom:3}}>
                {dayjs(comment.createdAt).fromNow()}
              </Caption>
              {userData.uid === comment.createdBy ? (
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
              <HTMLView value={comment.text} />
            </View>
            <Divider />
          </>
        );
      })}
    </View>
  );
}
