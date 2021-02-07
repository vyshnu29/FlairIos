import React from 'react';
import {
  Text,
  View,
  Dimensions,
  Animated,
  StatusBar,
  StyleSheet,
} from 'react-native';
import {FAB} from 'react-native-paper';
import {Input, Icon, Left, Button, Body, Right,Header,Container} from 'native-base';
import TaskList from '../TaskList/index';
import Seting from 'react-native-vector-icons/Feather';
import styles from '../../../styles/ProjectTabStyles';
import StickyParallaxHeader from 'react-native-sticky-parallax-header';

const windowWidth = Dimensions.get('window').width;
const {event, ValueXY} = Animated;
const scrollY = new ValueXY();

const CutomHeaderScreen = (props) => {
  const [searchTerm, SetsearchTerm] = React.useState('');
  const [visible, SetVisible] = React.useState(false);
  const searchUpdated = (term) => {
    SetsearchTerm(term);
  };
  return (
    <Container>
      <StickyParallaxHeader
        statusBar={false}
        headerType="TabbedHeader"
        backgroundColor={'#3F51B5'}
        header={() => {
          const opacity = scrollY.y.interpolate({
            inputRange: [0, 60, 90],
            outputRange: [0, 0, 1],
            extrapolate: 'clamp',
          });

          return (
            <View style={styles.headerContainer}>
              {!visible ? (
                <>
                  <Left>
                    <Button transparent>
                      <Icon
                        style={{color: 'white'}}
                        color="white"
                        name="chevron-back"
                        onPress={() => {
                          props.navigation.goBack();
                        }}
                      />
                    </Button>
                  </Left>
                  <Body>
                    <View style={[styles.headerWrapper, {right: 23}]}>
                      <Animated.View style={{opacity}}>
                        <Text style={styles.headerText}>
                          {props.project.title}
                        </Text>
                      </Animated.View>
                    </View>
                  </Body>
                  <Button
                    transparent
                    onPress={() => {
                      SetVisible(!visible);
                    }}>
                    <Icon
                      style={{color: 'white'}}
                      color="white"
                      name="search"
                    />
                  </Button>
                  {props.modules.includes('task-management-manager') ||
                  props.modules.includes('console-customization') ? (
                    <Button
                      transparent
                      onPress={() => {
                        props.navigation.navigate('Settings', {
                          project: props.project,
                          projectId: props.id,
                          handleComponentUpdate: props.handleComponentUpdate,
                        });
                      }}>
                      <Seting name="more-vertical" color="white" size={22} />
                    </Button>
                  ) : null}
                </>
              ) : (
                <>
                  <Left>
                    <Button
                 
                      transparent
                      onPress={() => {
                        SetVisible(!visible);
                      }}>
                      <Icon
                        style={{color: 'white'}}
                        color="white"
                        name="chevron-back"
                      />
                    </Button>
                  </Left>
                  <Body>
                    <View >
                      <Input
                        placeholder="Search..."
                        autoFocus
                        onChangeText={(term) => {
                          searchUpdated(term);
                        }}
                        placeholderTextColor="grey"
                        style={{width: windowWidth - 150}}
                      />
                    </View>
                  </Body>
                  <Right />
               </>
              )}
            </View>
          );
        }}
        foregroundImage={null}
        //  foreground={renderForeground}
        title={props.project.title}
        titleStyle={styles.titleStyle}
        tabs={[
          {
            title: 'ALL TASKS',
            content: (
              <TaskList
                condition={0}
                id={props.id}
                searchTerm={searchTerm}
                {...props}
              />
            ),
          },
          {
            title: 'OPEN',
            content: (
              <TaskList
                condition={1}
                id={props.id}
                searchTerm={searchTerm}
                {...props}
              />
            ),
          },
          {
            title: 'INPROGRESS',
            content: (
              <TaskList
                condition={2}
                id={props.id}
                searchTerm={searchTerm}
                {...props}
              />
            ),
          },
          {
            title: 'OVERDUE',
            content: (
              <TaskList
                condition={3}
                id={props.id}
                searchTerm={searchTerm}
                {...props}
              />
            ),
          },
          {
            title: 'REVIEW',
            content: (
              <TaskList
                condition={4}
                id={props.id}
                searchTerm={searchTerm}
                {...props}
              />
            ),
          },
          {
            title: 'CLOSED',
            content: (
              <TaskList
                condition={5}
                id={props.id}
                searchTerm={searchTerm}
                {...props}
              />
            ),
          },
          {
            title: 'SUBTASKS',
            content: (
              <TaskList
                condition={6}
                id={props.id}
                searchTerm={searchTerm}
                {...props}
              />
            ),
          },
        ]}
        tabTextContainerStyle={styles.tabTextContainerStyle}
        tabTextContainerActiveStyle={styles.tabTextContainerActiveStyle}
        tabTextStyle={styles.tabTextStyle}
        tabTextActiveStyle={styles.tabTextActiveStyle}
        tabWrapperStyle={styles.tabWrapperStyle}
        tabsContainerStyle={styles.tabsContainerStyle}
        scrollEvent={event([{nativeEvent: {contentOffset: {y: scrollY.y}}}], {
          useNativeDriver: false,
        })}
      />
      <StatusBar translucent={false} backgroundColor="black" />
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
            projectId: props.project.id,
            text: 'New task',
            category: 'task',
          });
        }}
      />
    </Container>
  );
};
export default CutomHeaderScreen;

