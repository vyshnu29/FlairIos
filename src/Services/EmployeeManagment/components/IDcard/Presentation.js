import React, {useContext} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MetaInfo from '../../../../shared/getMetaInfo';
import {Icon,Button} from 'native-base'
import PlaceIcon from 'react-native-vector-icons/MaterialIcons';

export default function Presentation(props) {
  // let profile = {}
  const metaInfo = new MetaInfo();
  const {handleChange, progress, individual, id, profile} = props;
  console.log('aa', profile);
  return (
    <View >
      <LinearGradient
       useAngle={true}
       angle={75}
       angleCenter={{x: 0.3, y: 0.5}}
        colors={['#280071', '#c42053']}>
      <View style={{alignSelf:'flex-start',padding:8}}>
          <Button
              transparent
              style={{top:20}}
              onPress={() => {
                props.navigation.goBack();
              }}>
              <Icon name="arrow-back" style={{color:'white'}}/>
            </Button>
          </View>
        <View style={{paddingTop: 20,paddingBottom:20}}>
          <View style={{alignSelf: 'center'}}>
            <Image
              source={{uri: `${profile.imageURL}`}}
              style={[styles.headerPic]}
            />
          </View>
          <View>
            <View style={{paddingTop: 15, alignSelf: 'center'}}>
              <Text style={{color: 'white', fontSize: 22, fontWeight: '600'}}>
                {metaInfo.toNameCase(profile.personal.firstname) +
                  ' ' +
                  metaInfo.toNameCase(profile.personal.middlename) +
                  ' ' +
                  metaInfo.toNameCase(profile.personal.lastname)}
              </Text>
            </View>
            <View style={{paddingTop: 4, alignSelf: 'center'}}>
            <Text style={{color: '#e6e5e3', fontSize: 13}}>
                {profile.personal.department + ' | ' + metaInfo.toNameCase(profile.role)}
              </Text>
            </View>
            <View style={{paddingTop: 7, flexDirection: 'row',alignSelf: 'center',left:10}}>
                <PlaceIcon name="place" color="white" size={16} />
                <Text style={{color: '#e6e5e3',fontSize: 13,maxWidth:200}}>
                  {'   ' +
                    profile.mailingaddress.line1 +
                    ', ' +
                    (profile.mailingaddress.line2
                      ? profile.mailingaddress.line2 + ', '
                      : '') +
                    profile.mailingaddress.city +
                    ', ' +
                    profile.mailingaddress.state +
                    ', ' +
                    profile.mailingaddress.country +
                    ' - ' +
                    profile.mailingaddress.zip}
                </Text>
              </View>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  headerPic: {
    width: 82,
    borderWidth: 2.5,
    borderColor: '#fff',
    height: 80,
    borderRadius: 41,
  },
});
