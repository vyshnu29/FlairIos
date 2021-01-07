import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
} from 'react-native';
import styles from '../../styles/ProjectTableStyles';
import validate from '../../../../shared/validation'

export default function ProjectTable(props) {
    return (
        <TouchableOpacity
        onPress={() => {
          props.navigation.navigate('Tasks', {projectId: props.item.id});
        }}
        style={styles.container}
        activeOpacity={0.95}>
        <View style={styles.labelContainer}>
          <View style={styles.labelTextContainer}>
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate('Tasks', {
                  projectId: props.item.id,
                });
              }}>
              <Text style={styles.labelText}>{props.item.cid}</Text>
            </TouchableOpacity>
          </View>
          {props.item.status === 0  || props.item.status === 'Open' ? (
            <View
              style={{borderRadius: 16, backgroundColor: '#21ba45'}}>
              <TouchableOpacity
                onPress={() => {
                  props.navigation.navigate('Tasks', {
                    projectId: props.item.id,
                  });
                }}>
                <Text style={styles.labelText1}>Open</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View
              style={{borderRadius: 16, backgroundColor: '#d9534f'}}>
              <TouchableOpacity
                onPress={() => {
                  props.navigation.navigate('Tasks', {
                    projectId: props.item.id,
                  });
                }}>
                <Text style={styles.labelText1}>Closed</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
        <View style={styles.mainTextContainer}>
          <Text style={styles.mainText}>{props.item.clientname ? props.item.clientname : props.item.title}</Text>
        </View>
        <View style={styles.authorWrapper}>
          <TouchableOpacity
            style={styles.authorContainer}
            onPress={() => {
              props.navigation.navigate('Tasks', {projectId: props.item.id});
            }}>
            <View style={styles.footerContainer}>
              <Text style={styles.authorName}>
                {validate.dateFormatter(props.item.startdate) + '   |   ' + validate.dateFormatter(props.item.enddate)}
              </Text>
            </View>
          </TouchableOpacity>
          <View style={styles.authorBlankContainer} />
        </View>
      </TouchableOpacity>
    )
}
