import React from 'react';
import {
  Text,
  View,
  ActivityIndicator,
  Image,
  Dimensions,
  StatusBar,
  FlatList,
  TouchableOpacity,
  Animated,
  Platform,
} from 'react-native';
import StickyParallaxHeader from 'react-native-sticky-parallax-header';
import {
  Container,
  Header,
  Left,
  Body,
  Right,
  Button,
  Icon,
  Title,
  Thumbnail,
} from 'native-base';
import {constants, sizes} from '../../constants';
import {configuration} from '../../config/companyConfig';
import LinearGradient from 'react-native-linear-gradient';
import {connect} from 'react-redux';
import styles from '../../Services/TaskManagement/styles/HomeScreen';
import {Avatar, Caption} from 'react-native-paper';
import modules from '../../modules';
import MetaData from '../../shared/getMetaInfo';
import {getModules} from '../../Services/EmployeeManagment/middleware';

const {event, ValueXY} = Animated;
const numColumns = 3;
const metaInfo = new MetaData();
const window = Dimensions.get('window');
class HomeScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      headerLayout: {
        height: 0,
      },
      contentHeight: {},
      modalVisible: false,
    };
    this.scrollY = new ValueXY();
  }
  setHeaderSize = (headerLayout) => this.setState({headerLayout});
  componentDidMount() {
    this.props.getModules();
  }
  renderHeader = () => {
    const [beforeFadeImg, startFadeImg, finishFadeImg] = [
      this.scrollPosition(30),
      this.scrollPosition(40),
      this.scrollPosition(70),
    ];
    const [beforeFadeName, startFadeName, finishFadeName] = [
      this.scrollPosition(50),
      this.scrollPosition(60),
      this.scrollPosition(75),
    ];

    const imageOpacity = this.scrollY.y.interpolate({
      inputRange: [0, beforeFadeImg, startFadeImg, finishFadeImg],
      outputRange: [0, 0, 0.5, 1],
      extrapolate: 'clamp',
    });
    const nameOpacity = this.scrollY.y.interpolate({
      inputRange: [0, beforeFadeName, startFadeName, finishFadeName],
      outputRange: [0, 0, 0.5, 1],
      extrapolate: 'clamp',
    });

    return (
      <LinearGradient
        useAngle={true}
        angle={75}
        angleCenter={{x: 0.5, y: 0.5}}
        colors={['#280071', '#c42053']}
        style={{flex: 1}}>
        <View
          style={[
            styles.headerWrapper,
            styles.userModalHeader,
            {backgroundColor: 'transparent'},
          ]}>
          <TouchableOpacity
            hitSlop={sizes.hitSlop}
            onPress={() => {
              this.props.navigation.openDrawer();
            }}>
            <Icon
              name="menu"
              style={styles.icon}
              color="white"
              style={{color: 'white'}}
            />
          </TouchableOpacity>
          <View style={styles.headerMenu}>
            <View style={styles.headerTitleContainer}>
              <Animated.Image
                source={{uri: `${this.props.profile.imageURL}`}}
                style={[styles.headerPic, {opacity: imageOpacity}]}
              />
            </View>
          </View>
        </View>
      </LinearGradient>
    );
  };

  renderForeground = () => {
    const startSize = constants.responsiveWidth(18);
    const endSize = constants.responsiveWidth(12);

    const [startImgAnimation, finishImgAnimation] = [
      this.scrollPosition(27),
      this.scrollPosition(31),
    ];
    const [startAuthorFade, finishAuthorFade] = [
      this.scrollPosition(40),
      this.scrollPosition(50),
    ];

    const [startAboutFade, fininshAboutFade] = [
      this.scrollPosition(60),
      this.scrollPosition(70),
    ];

    const imageOpacity = this.scrollY.y.interpolate({
      inputRange: [0, startImgAnimation, finishImgAnimation],
      outputRange: [1, 0.8, 0],
      extrapolate: 'clamp',
    });
    const imageSize = this.scrollY.y.interpolate({
      inputRange: [0, startImgAnimation, finishImgAnimation],
      outputRange: [startSize, startSize, endSize],
      extrapolate: 'clamp',
    });
    const authorOpacity = this.scrollY.y.interpolate({
      inputRange: [0, startAuthorFade, finishAuthorFade],
      outputRange: [1, 1, 0],
      extrapolate: 'clamp',
    });
    const aboutOpacity = this.scrollY.y.interpolate({
      inputRange: [0, startAboutFade, fininshAboutFade],
      outputRange: [1, 1, 0],
      extrapolate: 'clamp',
    });

    return (
      <LinearGradient
        useAngle={true}
        angle={90}
        angleCenter={{x: 0.5, y: 0.5}}
        colors={['#280071', '#c42053']}
        style={[styles.foreground]}>
        <View>
          <Animated.View style={{opacity: imageOpacity}}>
            <Animated.Image
              source={{uri: `${this.props.profile.imageURL}`}}
              style={[styles.profilePic, {width: imageSize, height: imageSize}]}
            />
          </Animated.View>
          <Animated.View
            style={[
              styles.messageContainer,
              styles.userModalMessageContainer,
              {opacity: authorOpacity},
            ]}>
            <Text style={styles.message}>
              {metaInfo.toNameCase(this.props.profile.personal.firstname) +
                ' ' +
                this.props.profile.personal.middlename +
                ' ' +
                this.props.profile.personal.lastname}
            </Text>
          </Animated.View>
          <Animated.View
            style={[styles.infoContainer, {opacity: aboutOpacity}]}>
            <Text style={styles.infoText}>{this.props.profile.uid}</Text>
          </Animated.View>
        </View>
      </LinearGradient>
    );
  };

  renderBackground = () => {
    const {
      headerLayout: {height},
    } = this.state;
    const headerBorderRadius = this.scrollY.y.interpolate({
      inputRange: [0, height],
      outputRange: [80, 0],
      extrapolate: 'extend',
    });

    return (
      <Animated.View
        style={[
          styles.background,
          {
            borderBottomRightRadius: headerBorderRadius,
            backgroundColor: '#fff',
          },
        ]}
      />
    );
  };

  calcMargin = () => {
    const {contentHeight} = this.state;
    let marginBottom = 0;

    if (contentHeight) {
      const isBigContent = constants.deviceHeight - contentHeight < 0;

      if (isBigContent) {
        return marginBottom;
      }

      marginBottom =
        constants.deviceHeight - sizes.headerHeight - contentHeight;

      return marginBottom;
    }

    return marginBottom;
  };

  onLayoutContent = (e) => {
    this.setState({
      contentHeight: e.nativeEvent.layout.height,
    });
  };

  scrollPosition(value) {
    const {
      headerLayout: {height},
    } = this.state;

    return constants.scrollPosition(height, value);
  }

  render() {
    const data = modules.filter(
      (ele) =>
        this.props.accessModules.includes(ele.moduleName) ||
        this.props.accessModules.includes('console-customization') ||
        ele.moduleName === 'common-module',
    );
    const formatData = (data, numColumns) => {
      const numberOfFullRows = Math.floor(data.length / 3);
      let numberOfElementsLastRow = data.length - numberOfFullRows * 3;
      while (numberOfElementsLastRow !== 3 && numberOfElementsLastRow !== 0) {
        data.push({key: `blank-${numberOfElementsLastRow}`, empty: true});
        numberOfElementsLastRow++;
      }
      return data;
    };

    if (!this.props.isFetching && this.props.accessModules.length)
      return (
        <>
          {this.props.profile.isLoaded ? (
            <Container>
              <StickyParallaxHeader
                foreground={this.renderForeground()}
                header={this.renderHeader()}
                deviceWidth={constants.deviceWidth}
                parallaxHeight={sizes.userScreenParallaxHeader}
                scrollEvent={event(
                  [{nativeEvent: {contentOffset: {y: this.scrollY.y}}}],
                  {useNativeDriver: false},
                )}
                scrollEvent={event(
                  [{nativeEvent: {contentOffset: {y: this.scrollY.y}}}],
                  {useNativeDriver: false},
                )}
                headerSize={this.setHeaderSize}
                headerHeight={sizes.userModalHeaderHeight}>
                <View
                  style={{
                    backgroundColor: '#fff',
                    paddingHorizontal: 10,
                    paddingBottom: 50,
                  }}>
                  <FlatList
                    data={formatData(data, numColumns)}
                    keyExtractor={(item) => item.text}
                    renderItem={({item}) => {
                      if (item.empty === true) {
                        return (
                          <View style={[styles.item, styles.itemInvisible]} />
                        );
                      }
                      return (
                        <View
                          style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            flex: 1,
                            margin: 1,
                            height: Dimensions.get('window').width / numColumns,
                            backgroundColor: '#fff',
                          }}>
                          <TouchableOpacity
                            onPress={() => {
                              this.props.navigation.navigate(item.link);
                            }}>
                            {item.img}
                          </TouchableOpacity>
                          <Caption style={{fontSize: 12}}>{item.text}</Caption>
                        </View>
                      );
                    }}
                    numColumns={numColumns}
                  />
                  <Caption style={{alignSelf: 'center'}}>
                    {'© '}
                    {new Date().getFullYear()}
                    {'FLAIR - All rights reserved'}
                  </Caption>
                </View>
              </StickyParallaxHeader>
            </Container>
          ) : (
            <ActivityIndicator
              color="#3F51B5"
              style={{top: window.height / 2, color: 'red'}}
            />
          )}
        </>
      );
    return (
      <ActivityIndicator
        color="#3F51B5"
        style={{top: window.height / 2, color: 'red'}}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    profile: state.firebase.profile,
    accessModules: state.employee.employeeModules.accessModules,
    isFetching: state.employee.employeeModules.isFetching,
  };
};
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getModules: () => {
      dispatch(getModules());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
