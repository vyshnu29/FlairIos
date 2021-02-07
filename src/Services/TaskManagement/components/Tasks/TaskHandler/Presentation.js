import React, {useContext} from 'react';
import {ScrollView, View, StyleSheet} from 'react-native';
import TaskViewer from '../taskHandleComponents/TaskViewer';
import SubtasksTable from '../taskHandleComponents/SubTaskTable';
import {Appbar, Menu, FAB, Card} from 'react-native-paper';
import {
  Title,
  Container,
  Header,
  Text,
  Icon,
  Left,
  Button,
  Body,
  Right,
} from 'native-base';
import Fileo from 'react-native-vector-icons/FontAwesome';
import Fileo1 from 'react-native-vector-icons/AntDesign';
import validate from '../../../../../shared/validation';
import HTMLView from 'react-native-htmlview';
import Comments from '../taskHandleComponents/Comments';
import UnAuthorized from '../../../../../shared/unAuthorized';


export default function Presentation(props) {
  const [visible, setVisible] = React.useState(false);

  const LinkTaskFunction = () => {
    props.navigation.navigate('LinkTask', {
      taskId: props.taskId,
      projectId: props.projectId,
    });
    closeMenu();
  };

  const UnLinkTaskFunction = () => {
    props.navigation.navigate('UnLinkTask', {
      taskId: props.taskId,
      projectId: props.projectId,
    });
    closeMenu();
  };

  const EditTaskFunction = () => {
    props.navigation.navigate('EditTask', {
      taskId: props.taskId,
      projectId: props.projectId,
    });
    closeMenu();
  };

  const SubTaskFunction = () => {
    props.navigation.navigate('NewTask', {
      taskId: props.taskId,
      projectId: props.projectId,
      category: 'subtask',
      text: 'New subtask',
    });
    closeMenu();
  };

  const TimelineFunction = () => {
    props.navigation.navigate('TaskTimeLine', {
      TaskTimeLine: props.tasktimeline,
    });
    closeMenu();
  };

  let comments = props.comments;
  let employee = {};

  if (props.employee.role === 'user') {
    const employees = Object.values(props.project[0].Users);
    employee = employees.filter((user) => user.uid === props.employee.uid)[0];
  }
  console.log(employee);
  let access = employee ? true : false;

  //  checking supervisor count
  let supervisorCount = 0;
  try {
    const employees = Object.values(props.project[0].Users);
    employees.forEach((member) => {
      if (validate.checkSupervisor(member.uid)) supervisorCount++;
    });
  } catch (error) {}

  if (supervisorCount > 1)
    return (
      <UnAuthorized
        text={
          'This project contain multiple Supervisors, Please contact Admin/Manager"'
        }
        colorProp={'#f0ad4e'}
        {...props}
      />
    );
  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  if (
    props.employee.role === 'admin' ||
    props.employee.role === 'manager' ||
    props.modules.includes('task-management-manager') ||
    (access && employee.create) ||
    (access && employee.update) ||
    (access && employee.read)
  ) {
    return (
      <View style={{flex: 1}}>
        <Header androidStatusBarColor="#000" style={{backgroundColor: '#fff'}}>
          <Left>
            <Button transparent>
              <Icon
                name="chevron-back"
                style={{color: '#3F51B5'}}
                onPress={() => {
                  props.navigation.goBack();
                }}
              />
            </Button>
          </Left>
          <Body>
            <Title style={{color: '#3F51B5'}}>
              {props.project.map((item) => {
                return item.title;
              })}
            </Title>
          </Body>
          <Right>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Menu
                
                visible={visible}
                onDismiss={closeMenu}
                anchor={
                  <Appbar.Action
                    icon="dots-vertical"
                    color="#3F51B5"
                    style={{color: '#3F51B5'}}
                    onPress={openMenu}
                  />
                }>
                <Menu.Item onPress={LinkTaskFunction} title="Link Task" />
                <Menu.Item onPress={UnLinkTaskFunction} title="Unlink Task" />
                <Menu.Item title="Edit Task" onPress={EditTaskFunction} />
                <Menu.Item onPress={TimelineFunction} title="Timeline" />
              </Menu>
            </View>
          </Right>
        </Header>
        <ScrollView>
          <View>
            <TaskViewer
              {...props}
              taskId={props.taskId}
              projectId={props.projectId}
              comments={comments}
            />
          </View>
          <Card
            style={{
              width: '95%',
              alignSelf: 'center',
              padding: 15,
              marginTop: 10,
            }}>
            <View style={{flexDirection: 'row'}}>
              <Fileo
                name="files-o"
                size={20}
                style={{
                  color: '#3F51B5',
                  left: 5,
                  backgroundColor: '#ebebeb',
                  padding: 5,
                  borderRadius: 15,
                }}
              />
              <Text style={{fontWeight: '700', left: 20, top: 3, fontSize: 16}}>
                Linked Tasks
              </Text>
            </View>
            <SubtasksTable taskId={props.taskId} projectId={props.projectId} />
          </Card>

          <Card
            style={{
              width: '95%',
              alignSelf: 'center',
              padding: 15,
              marginTop: 10,
            }}>
            <View style={{flexDirection: 'row', marginBottom: 10}}>
              <Fileo1
                name="message1"
                size={20}
                style={{
                  color: '#3F51B5',
                  left: 5,
                  backgroundColor: '#ebebeb',
                  padding: 5,
                  borderRadius: 15,
                }}
              />
              <Text style={{fontWeight: '700', left: 20, top: 3, fontSize: 16}}>
                Leave Comment
              </Text>
            </View>
            <Comments taskId={props.taskId} projectId={props.projectId} />
          </Card>
        </ScrollView>
        <FAB
          style={{
            position: 'absolute',
            margin: 16,
            backgroundColor: '#3F51B5',
            right: 0,
            bottom: 0,
          }}
          icon="plus"
          color="white"
          onPress={() => {
            props.navigation.navigate('NewTask', {
              taskId: props.taskId,
              projectId: props.projectId,
              category: 'subtask',
              text: 'New SubTask',
            });
          }}
        />
      </View>
    );
  } else {
    return (
      <UnAuthorized
        text={'You are unauthorized to view this content'}
        colorProp={'#d9534f'}
        {...props}
      />
    );
  }
}
