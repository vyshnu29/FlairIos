import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import {
    useTheme,
    Avatar,
    Title,
    Caption,
    Paragraph,
    Drawer,
    Text,
    TouchableRipple,
    Switch
} from 'react-native-paper';
import { firestoreConnect, isLoaded } from "react-redux-firebase"
import {connect} from 'react-redux';
import { compose } from "redux"
import {
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { onSignout } from "../Services/Authentication/middleware/index"

function DrawerContent(props) {
    const {
        names,
        clients_meta_info,
      } = props
if(props.profile.personal &&   isLoaded(names) && isLoaded(clients_meta_info))
    return(
        <View style={{flex:1}}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    <View style={styles.userInfoSection}>
                        <View style={{flexDirection:'row',marginTop: 15}}>
                            <Avatar.Image 
                                source={{uri: `${props.profile.imageURL}`}}
                                size={50}
                            />
                            <View style={{marginLeft:15, flexDirection:'column'}}>
                                <Title style={styles.title}>{props.profile.personal.firstname + ' ' + props.profile.personal.middlename + ' ' + props.profile.personal.lastname  }</Title>
                                <Caption style={styles.caption}>{props.profile.uid}</Caption>
                            </View>
                        </View>
                    </View>

                    <Drawer.Section style={styles.drawerSection}>
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="home-outline" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="Home"
                           onPress={() => {props.navigation.closeDrawer();}}
                        />
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="account-outline" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="Profile"
                            onPress={() => {alert("Profile coming soon")}}
                        />
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="bookmark-outline" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="Change Password"
                            onPress={() => {props.navigation.navigate('ResetPassword')}}
                        />
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="account-check-outline" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="Company Details"
                           // onPress={() => {props.navigation.navigate('SupportScreen')}}
                        />
                    </Drawer.Section>
                </View>
            </DrawerContentScrollView>
            <Drawer.Section style={styles.bottomDrawerSection}>
                <DrawerItem 
                    icon={({color, size}) => (
                        <Icon 
                        name="exit-to-app" 
                        color={color}
                        size={size}
                        />
                    )}
                    label="Sign Out"
                    onPress={() => {props.onSignout()}}
                />
            </Drawer.Section>
        </View>
    );
    return(<ActivityIndicator/>)
}

const mapStateToProps = (state, ownProps) => {
    return {
      profile: state.firebase.profile,
      names: state.firestore.ordered.names,
      clients_meta_info: state.firestore.ordered.clients_meta_info,
    }
  }

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
      onSignout: () => {
        dispatch(onSignout())
      },
    }
  }

  export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect((props) => {
      return [
        {
          collection: "META_INFO",
          doc: "employees",
          storeAs: "names",
        },
        {
          collection: "META_INFO",
          doc: "clients",
          storeAs: "clients_meta_info",
        },
      ]
    })
  )(DrawerContent)

const styles = StyleSheet.create({
    drawerContent: {
      flex: 1,
    },
    userInfoSection: {
      paddingLeft: 20,
    },
    title: {
      fontSize: 16,
      marginTop: 3,
      fontWeight: 'bold',
    },
    caption: {
      fontSize: 14,
      lineHeight: 14,
    },
    row: {
      marginTop: 20,
      flexDirection: 'row',
      alignItems: 'center',
    },
    section: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 15,
    },
    paragraph: {
      fontWeight: 'bold',
      marginRight: 3,
    },
    drawerSection: {
      marginTop: 15,
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1
    },
    preference: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 12,
      paddingHorizontal: 16,
    },
  });