import React, {useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {View, Text, TouchableOpacity} from 'react-native';
import {Appbar} from 'react-native-paper';
import {Container, Header, Content, Input, Item, Button} from 'native-base';
import Icon from 'react-native-vector-icons/AntDesign';
function Presentation(props) {
  const {
    handleSubmit,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
  } = props;
  return (
    <>
      <LinearGradient
        useAngle={true}
        angle={45}
        angleCenter={{x: 0.5, y: 1.5}}
        colors={['#280071', '#c42053']}>
        <Appbar.Header style={{backgroundColor: 'transparent'}}>
          <Appbar.BackAction
            color="white"
            onPress={() => {
              props.navigation.goBack();
            }}
          />
          <Appbar.Content
            title="Reset Password"
            titleStyle={{fontSize: 24}}
            color="white"
          />
        </Appbar.Header>
      </LinearGradient>
      <View style={{alignItems: 'center', marginTop: 100}}>
        <Icon name="questioncircleo" color="#c42053" size={60} />
        <Text style={{color: '#c42053', fontSize: 20, marginTop: 20}}>
          Reset your password
        </Text>
      </View>
      <View style={{alignItems: 'center', marginTop: 40}}>
        <Item success={password !== "" ? true : false} style={{width: '80%'}}>
          <Input
            placeholder="New Password"
            value={password}
            onChangeText={(value) => setPassword(value)}
          />
        </Item>
      </View>
      <View style={{alignItems: 'center', marginTop: 40}}>
        <Item success={confirmPassword !== "" ? true : false} style={{width: '80%'}}>
          <Input
            placeholder="Confirm Password"
            value={confirmPassword}
            onChangeText={(value) => setConfirmPassword(value)}
          />
        </Item>
      </View>
      <View style={{marginTop: 40}}>
        {confirmPassword !== password || password.trim() === '' ? (
          <View
            style={{
              width: '100%',
              height: 40,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 10,
            }}>
            <View
              style={{
                backgroundColor: 'grey',
                width: '80%',
                height: 40,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 10,
              }}>
              <Text
                style={[
                  {fontSize: 18, fontWeight: 'bold'},
                  {
                    color: 'black',
                  },
                ]}>
                Reset Password
              </Text>
            </View>
          </View>
        ) : (
          <TouchableOpacity
            style={{
              width: '100%',
              height: 40,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 10,
            }}
            onPress={handleSubmit}>
            <LinearGradient
              useAngle={true}
              angle={55}
              angleCenter={{x: 0.5, y: 1.5}}
              colors={['#280071', '#c42053']}
              style={{
                width: '80%',
                height: 40,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 10,
              }}>
              <Text
                style={[
                  {fontSize: 18, fontWeight: 'bold'},
                  {
                    color: '#fff',
                  },
                ]}>
                Reset Password
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        )}
      </View>
    </>
  );
}

export default Presentation;
