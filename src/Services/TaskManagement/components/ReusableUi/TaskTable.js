import React from 'react'
import {
  View,
  TouchableOpacity,
  Text,
} from 'react-native';
import styles from '../../styles/ProjectTableStyles';
import validate from '../../../../shared/validation'
import HTMLView from 'react-native-htmlview';

export default function TaskTable(props) {
    return (
      <TouchableOpacity
      onPress={() => {
        props.navigation.navigate('TasksHandler', {
          projectId: props.item.projectId,
          taskId: props.item.id,
        });
      }}
      style={styles.container}
      activeOpacity={0.95}>
      <View style={styles.labelContainer1}>
      <View
                style={{
                  borderRadius: 16,
                  backgroundColor: 'rgb(246,245,248)',
                }}>
                <TouchableOpacity>
                  <Text style={styles.labelText}>{props.item.priority}</Text>
                </TouchableOpacity>
              </View>
      

        {props.item.type === 'Task' ? (
          <View style={{borderRadius: 16, backgroundColor: '#17a2b8'}}>
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate('TasksHandler', {
                  projectId: props.item.projectId,
                  taskId: props.item.id,
                });
              }}>
              <Text style={styles.labelText1}>Task</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={{borderRadius: 16, backgroundColor: '#db2828'}}>
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate('TasksHandler', {
                  projectId: props.item.projectId,
                  taskId: props.item.id,
                });
              }}>
              <Text style={styles.labelText1}>Bug</Text>
            </TouchableOpacity>
          </View>
        )}
         
      </View>
      <View style={styles.labelContainer}>
        <View style={styles.labelTextContainer}>
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate('TasksHandler', {
                projectId: props.item.projectId,
                taskId: props.item.id,
              });
            }}>
            <Text style={styles.labelText}>
              { props.item.projectTaskId}
            </Text>
          </TouchableOpacity>
        </View>
        {props.item.status === 'Open' ? (
          <View style={{borderRadius: 16, backgroundColor: '#21ba45'}}>
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate('TasksHandler', {
                  projectId: props.item.projectId,
                  taskId: props.item.id,
                });
              }}>
              <Text style={styles.labelText1}>Open</Text>
            </TouchableOpacity>
          </View>
        ) : props.item.status === 'InProgress' ? (
          <View style={{borderRadius: 16, backgroundColor: '#f78a14'}}>
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate('TasksHandler', {
                  projectId: props.item.projectId,
                  taskId: props.item.id,
                });
              }}>
              <Text style={styles.labelText1}>In Progress</Text>
            </TouchableOpacity>
          </View>
        ) : props.item.status === 'Closed' ? (
          <View style={{borderRadius: 16, backgroundColor: '#d9534f'}}>
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate('TasksHandler', {
                  projectId: props.item.projectId,
                  taskId: props.item.id,
                });
              }}>
              <Text style={styles.labelText1}>Closed</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={{borderRadius: 16, backgroundColor: 'grey'}}>
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate('TasksHandler', {
                  projectId: props.item.projectId,
                  taskId: props.item.id,
                });
              }}>
              <Text style={styles.labelText1}>{props.item.status}</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      <View style={styles.mainTextContainer}>
        <View>
        <Text style={styles.mainText}>{props.item.title}</Text>
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate('TasksHandler', {
              projectId: props.item.projectId,
              taskId: props.item.id,
            });
          }}>
          <View style={styles.footerContainer}>
            <Text style={styles.authorName}>
              {validate.dateFormatter(props.item.startdate) +
                '   |   ' +
                validate.dateFormatter(props.item.enddate)}
            </Text>
          </View>
          <View style={{paddingTop:5,flexDirection:'row'}}>
          <Text style={{color:'grey'}}>Description : {' '}</Text>
            {
              props.item.description ?  <HTMLView value={props.item.description} style={{maxWidth:180}} />
              : <Text style={{color:'grey'}}>-----</Text>
            }
            </View>
        </TouchableOpacity>
        </View>
      
      
      </View>
       
        <View style={styles.authorBlankContainer} />
    </TouchableOpacity>
    )
}
