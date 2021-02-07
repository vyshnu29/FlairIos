import React from "react";
import {Title, Divider, Avatar, Appbar, Menu} from 'react-native-paper';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from 'react-native';
import Labels from "../Labels";
import TaskTable from '../../../ReusableUi/TaskTable'
import validate from '../../../../../../shared/validation';
import { configuration } from "../../../../../../config/companyConfig";
import HTMLView from 'react-native-htmlview';


function Presentation(props) {
  const { project, task } = props;
  let req_task = task[0];
  let useLabels = project[0].useLabels;
  let labels = project[0].labels;
  console.log("Ss",project,task)

  return (
    <>
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.95}>
      <View style={styles.labelContainer1}>

          <View>
              <View
                style={{
                  borderRadius: 16,
                  backgroundColor: 'rgb(246,245,248)',
                }}>
                <TouchableOpacity>
                  <Text style={styles.labelText}>{req_task.priority}</Text>
                </TouchableOpacity>
              </View>
         
          </View>

        {req_task.type === 'Task' ? (
          <View style={{borderRadius: 16, backgroundColor: '#17a2b8'}}>
            <TouchableOpacity>
              <Text style={styles.labelText1}>Task</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={{borderRadius: 16, backgroundColor: '#db2828'}}>
            <TouchableOpacity>
              <Text style={styles.labelText1}>Bug</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      <View style={styles.labelContainer}>
        <View style={styles.labelTextContainer}>
          <TouchableOpacity>
            <Text style={styles.labelText}>
              {project[0].cid + ' - ' + req_task.cid}
            </Text>
          </TouchableOpacity>
        </View>
        {req_task.status === 'Open' ? (
          <View style={{borderRadius: 16, backgroundColor: '#21ba45'}}>
            <TouchableOpacity>
              <Text style={styles.labelText1}>Open</Text>
            </TouchableOpacity>
          </View>
        ) : req_task.status === 'InProgress' ? (
          <View style={{borderRadius: 16, backgroundColor: '#f78a14'}}>
            <TouchableOpacity>
              <Text style={styles.labelText1}>In Progress</Text>
            </TouchableOpacity>
          </View>
        ) : req_task.status === 'Closed' ? (
          <View style={{borderRadius: 16, backgroundColor: '#d9534f'}}>
            <TouchableOpacity>
              <Text style={styles.labelText1}>Closed</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={{borderRadius: 16, backgroundColor: 'grey'}}>
            <TouchableOpacity>
              <Text style={styles.labelText1}>{req_task.status}</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      <View style={styles.mainTextContainer}>
        <Text style={styles.mainText}>{req_task.title}</Text>
      </View>
        <TouchableOpacity>
          <View style={styles.footerContainer}>
            <Text style={styles.authorName}>
              {validate.dateFormatter(req_task.startdate) +
                '   |   ' +
                validate.dateFormatter(req_task.enddate)}
            </Text>
          </View>
          <View style={{paddingTop:5,flexDirection:'row'}}>
            <Text style={{color:'grey'}}>Description : {' '}</Text>
          <HTMLView value={req_task.description} style={{maxWidth:180}} />
            </View>
        </TouchableOpacity>
        <View style={styles.authorBlankContainer} />
    </TouchableOpacity>
  {useLabels ? (
    <Labels labels={labels} task={task} project={project[0]} />
  ) : null}
  </>  

  );
}
const styles = StyleSheet.create({
  container: {
    marginTop: 12,
    width:'95%',
    shadowColor: 'rgb(35,35,35)',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowRadius: 40,
    shadowOpacity: 0.08,
   // width: '100%',
    backgroundColor: 'white',
    borderRadius: 24,
    alignSelf:'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderWidth: Platform.select({ ios: 0, android: 2 }),
    borderColor: 'rgb(246,245,248)',
  },
  labelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  labelTextContainer: {
    backgroundColor: 'rgb(246,245,248)',
    borderRadius: 16,
  },
  labelText: {
    fontSize: 12,
    lineHeight: 16,
    color: 'rgb(71,71,71)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    
  },
  labelText1: {
    fontSize: 12,
    lineHeight: 16,
    color: 'white',
    paddingHorizontal: 8,
    paddingVertical: 4, 
  },
  labelContainer1: {
    flexDirection: 'row',
    marginBottom:10,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  iconContainer: {
    flexDirection: 'row',
    padding: 8,
    borderRadius: 8,
    shadowColor: 'rgb(35,35,35)',
    shadowOffset: {
      width: 0,
      heght: 2,
    },
    shadowRadius: 32,
    shadowOpacity: 0.016,
    backgroundColor: 'rgb(246,245,248)',
   // width: 56,
    alignItems: 'center',
  },
  icon: {
    width: 16,
    height: 16,
  },
  number: {
    color: 'white',
    paddingLeft: 5,
    fontSize: 16,
    lineHeight: 20,
    
  },
  mainText: {
    fontSize: 24,
    lineHeight: 28,
    color: 'black',
    letterSpacing: -0.2,
    paddingTop: 8,
    
  },
  mainTextContainer: {},
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 22,
  },
  authorPhoto: {
    width: 24,
    height: 24,
    borderRadius:  50
  },
  authorName: {
    fontSize: 12,
    lineHeight: 16,
    color: 'grey',
    
  },
  authorWrapper: {
    flexDirection: 'row',
  },
  authorContainer: {
    paddingRight: 40,
  },
  authorBlankContainer: {
    width: '38%',
  },
  iconCardElement: {
    paddingLeft: 8,
  },
});

export default Presentation







