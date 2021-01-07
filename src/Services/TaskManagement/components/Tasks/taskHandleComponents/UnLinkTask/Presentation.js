import React, {useContext, useState} from 'react';
import {View, Text,StyleSheet,StatusBar,FlatList,TouchableOpacity} from 'react-native';
import {
  Container,
  Header,
  Icon,
  Left,
  Button,
  Title,
  Body,
  Right,
} from 'native-base';
import CheckBox from '@react-native-community/checkbox'
import dayjs from "dayjs";
import validate from '../../../../../../shared/validation';
import MetaInfo from "../../../../../../shared/getMetaInfo";
export default function Presentation(props) {
  const {
    handleChange,
    handleClick,
    clearValues,
    listOfTasksToBeUnLinked,
    task,
    taskList,
    project,
  } = props;
 
  const metaInfo = new MetaInfo();

  const diff = dayjs();
  const getDueBy = (enddate, status) => {
    if (status === "completed" || status === "closed") return false;
    return new Date() - new Date(enddate) >= 0 ? true : false;
  };

  const getDueByDays = (startDate, endDate, status) => {
    {
      if (getDueBy(endDate, status)) return diff.from(endDate, true);

      return "---";
    }
  };
  const projectLabels = project[0].labels;
  let childTasks = taskList.filter(
    (tasks) => tasks.category === "subtask" && task[3].id === tasks.taskId
  );
  let data = [];
  childTasks &&
    childTasks.map((task) => {
      data.push({
        title: task.title,
        id: task.id,
        status:task.status,
        startDate: task.startdate,
        endDate: task.enddate,
        labels: Object.values(projectLabels).filter(
          (item) =>
            item.isExist &&
            task.hasOwnProperty("labels") &&
            Object.values(task.labels).includes(item.id)
        ),
        dueBy: getDueByDays(task.startDate, task.endDate, task.status),
        cid: project[0].cid + " - " + task.cid,
        priority: task.priority,
        assignee:
          task.assignee && task.assignee.map((e) => metaInfo.emailToName(e)),
        createdByName: metaInfo.emailToName(task.createdBy),
        createdBy: task.createdBy,
      });
    });

    console.log("Ac",data)
  return (
    <Container>
      <Header style={{backgroundColor: '#3F51B5'}} androidStatusBarColor="#000">
      <Left>
                    <Button transparent>
                      <Icon
                        style={{color: 'white'}}
                        color="white"
                        name= "chevron-back"
                        onPress={() => {
                          props.navigation.goBack();
                        }}
                      />
                    </Button>
                  </Left>
        <Body>
          <Title style={{alignSelf: 'center', alignContent: 'center',color:'white',fontSize:18}}>
            Unlink Task
          </Title>
        </Body>
        <Right></Right>
      </Header>
    {
      data.length ?
      <FlatList
      data={data}
      renderItem={({item}) => {
        return (
          <TouchableOpacity
    style={[styles.container,{backgroundColor:listOfTasksToBeUnLinked.includes(item.id) ? '#f0f0f0' : 'white'}]}
    activeOpacity={0.95}>

     {
      //labels.length === 0 ? null :
       <View style={styles.labelContainer1}>
         {
            <View style={{borderRadius: 16,backgroundColor: 'grey'}}>
            <TouchableOpacity>
          <Text style={styles.labelText1}>{item.priority}</Text>
          </TouchableOpacity>
          </View>
         }
      {
           item.type === "Task" ?
            <View style={{borderRadius: 16,backgroundColor: "#17a2b8",}}>
            <TouchableOpacity>
          <Text style={styles.labelText1}>Task</Text>
          </TouchableOpacity>
          </View>
          :
          <View style={{borderRadius: 16,backgroundColor: "#db2828",}}>
            <TouchableOpacity>
          <Text style={styles.labelText1}>Bug</Text>
          </TouchableOpacity>
          </View>
           
         }
     </View>
    }
    <View style={styles.labelContainer}>
      <View style={styles.labelTextContainer}>
      <TouchableOpacity>
        <Text style={styles.labelText}>{item.cid}</Text>
        </TouchableOpacity>
      </View>
      {
           item.status === "Open" ?
            <View style={{borderRadius: 16,backgroundColor: "#21ba45",}}>
            <TouchableOpacity>
          <Text style={styles.labelText1}>Open</Text>
          </TouchableOpacity>
          </View>
          :
          item.status === "InProgress" ?
          <View style={{borderRadius: 16,backgroundColor: "#f78a14",}}>
            <TouchableOpacity>
          <Text style={styles.labelText1}>InProgress</Text>
          </TouchableOpacity>
          </View>
           :
           <View style={{borderRadius: 16,backgroundColor: 'grey',}}>
           <TouchableOpacity>
         <Text style={styles.labelText1}>{item.status}</Text>
         </TouchableOpacity>
         </View>
         }
    </View>
   
   
    <View style={styles.mainTextContainer}>
      <Text style={styles.mainText}>{item.title}</Text>
    </View>
    <View style={styles.authorWrapper}>
      <TouchableOpacity style={styles.authorContainer} 
      >
        <View style={styles.footerContainer}>
         
          <Text style={styles.authorName}>{validate.dateFormatter(item.startDate) + '   |   ' + validate.dateFormatter(item.endDate)}</Text>
        </View>
      </TouchableOpacity>
      <View style={{left:105, top:10}}>
 <CheckBox  value={listOfTasksToBeUnLinked.includes(item.id)} onValueChange={(value) => handleChange(value, item.id)} 
 tintColors={{ true: '#3F51B5', false: 'black' }} />
          </View>
      <View style={styles.authorBlankContainer} />
    </View>
  </TouchableOpacity>
         
        );
      }} 
    /> : 
    <View style={{alignSelf:'center',marginTop:'50%'}}>
      <Text>No data</Text>
    </View>
    }
   
   {
      data.length ?
      <Button full primary disabled={!data.length}  onPress={(e) => {handleClick(e) , props.navigation.goBack();}}>
      <Text style={{fontSize:18,color:'white'}}>UnLink</Text>
                </Button> : null
   }
     
</Container> 

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
  //  backgroundColor: 'white',
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
  bottomView:{ 
    width: '100%',  
    justifyContent: 'center', 
    alignItems: 'center',
    position: 'absolute',
    bottom: 0
  },
  labelContainer1: {
    marginBottom:10,
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
