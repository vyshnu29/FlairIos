import React from 'react'
import {Text,View,Dimensions,StyleSheet} from 'react-native'
import validate from '../../../../shared/validation'
import MetaInfo from '../../../../shared/getMetaInfo'
import { Container, Header, Content, List, ListItem,  Separator } from 'native-base';
export default function Presentation(props) {
    console.log("Dd",props.profile)
    const metaInfo = new MetaInfo();
    const windowHeight = Dimensions.get('window').height;
    return (
        <Container>
          <ListItem style={styles.listStyle}>
              <Text style={styles.HeadingStyle}>Department</Text>
              <Text style={styles.TextStyle}>{props.profile.personal.department ? props.profile.personal.department : '-----'}</Text>
          </ListItem>
          <ListItem style={styles.listStyle}>
              <Text style={styles.HeadingStyle}>Email</Text>
              <Text style={styles.TextStyle}>{props.profile.email ? props.profile.email : '-----'}</Text>
          </ListItem>
          <ListItem style={styles.listStyle}>
              <Text style={styles.HeadingStyle}>Phone</Text>
              <Text style={styles.TextStyle}>{props.profile.personal.phonenumber ? props.profile.personal.phonenumber : '-----'}</Text>
          </ListItem>
          <ListItem style={styles.listStyle}>
              <Text style={styles.HeadingStyle}>DOB</Text>
              <Text style={styles.TextStyle}>{ props.profile.personal.dob ? validate.dateFormatter(props.profile.personal.dob) : '-----'}</Text>
          </ListItem>
          <ListItem style={styles.listStyle}>
              <Text style={styles.HeadingStyle}>Category</Text>
              <Text style={styles.TextStyle}>{props.profile.personal.category ? props.profile.personal.category : '-----'}</Text>
          </ListItem>
          <ListItem style={styles.listStyle}>
              <Text style={styles.HeadingStyle}>Marital Status</Text>
              <Text style={styles.TextStyle}>{props.profile.personal.maritalstatus ? props.profile.personal.maritalstatus : '-----'}</Text>
          </ListItem>
          <ListItem style={styles.listStyle}>
              <Text style={styles.HeadingStyle}>Gender</Text>
              <Text style={styles.TextStyle}>{props.profile.personal.gender ? props.profile.personal.gender : '-----'}</Text>
          </ListItem>
          
          <ListItem style={styles.listStyle}>
              <Text style={styles.HeadingStyle}>Date of joining</Text>
              <Text style={styles.TextStyle}>{ props.profile.personal.dateofjoining ? validate.dateFormatter(props.profile.personal.dateofjoining) : '-----'}</Text>
          </ListItem>
          <ListItem style={styles.listStyle}>
              <Text style={styles.HeadingStyle}>Job Title</Text>
              <Text style={styles.TextStyle}>{props.profile.personal.jobtitle ? props.profile.personal.jobtitle : '-----'}</Text>
          </ListItem>
      </Container>
    )
}

const windowWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
    listStyle : {
        justifyContent:'space-between'
    },
    HeadingStyle:{
        fontSize:14,
        fontWeight:'600'
    },
    TextStyle:{
        marginRight:windowWidth/4.5,
        fontSize:13,
        color:'grey'
    }
})