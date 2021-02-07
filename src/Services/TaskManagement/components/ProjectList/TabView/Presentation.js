import React from 'react';
import {Text, View, Dimensions, Animated, StatusBar} from 'react-native';
import {FAB} from 'react-native-paper';
import {Container, Input, Icon, Left, Button, Body, Right,Header} from 'native-base';
import ProjectList from '../ProjectTable';
import styles from '../../../styles/ProjectTabStyles';
import StickyParallaxHeader from 'react-native-sticky-parallax-header';


const windowWidth = Dimensions.get('window').width;
const {event, ValueXY} = Animated;
const scrollY = new ValueXY();

function ProjectTabScreen(props) {
  const {modules, state} = props;
  const projectsList = Object.values(state['allProjects'].data);
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
        foregroundImage={null}
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
                  <View style={styles.headerWrapper}>
                    <Animated.View style={{opacity}}>
                      <Text style={styles.headerText}>Projects</Text>
                    </Animated.View>
                  </View>
                  </Body>
                  <Right>
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
                  </Right>
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
        title={'Projects'}
        titleStyle={styles.titleStyle}
        tabs={[
          {
            title: 'ALL PROJECTS',
            content: (
              <ProjectList condition={0} searchTerm={searchTerm} {...props} />
            ),
          },
          {
            title: 'INPROGRESS',
            content: (
              <ProjectList condition={1} searchTerm={searchTerm} {...props} />
            ),
          },
          {
            title: 'OVERDUE',
            content: (
              <ProjectList condition={2} searchTerm={searchTerm} {...props} />
            ),
          },
          {
            title: 'CLOSED',
            content: (
              <ProjectList condition={3} searchTerm={searchTerm} {...props} />
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
      {modules.includes('task-management-manager') ||
      modules.includes('console-customization') ? (
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
            props.navigation.navigate('NewProject', {
              projectsList: projectsList,
            });
          }}
        />
      ) : null}
    </Container>
  );
}
export default ProjectTabScreen;
