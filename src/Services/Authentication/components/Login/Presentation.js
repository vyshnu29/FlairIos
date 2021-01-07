import React from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    TextInput,
    Platform,
    StyleSheet ,
    StatusBar,
    Alert
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import ForgotPassword from '../ForgetPassword/index'
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import validate from "../../../../shared/validation"

import { useTheme,Caption } from 'react-native-paper';

const Presentation = (props) => {

   const [data, setData] = React.useState({
    secureTextEntry: true,
  });

  const { colors } = useTheme();

  const { handleChange, CheckLogin, email, password } = props


  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry
    });
  }
    return (
      <LinearGradient
                useAngle={true}
                         angle={90}
                        angleCenter={
                          {x : 0.5, y:1.5}
                        }
                     colors={['#280071','#c42053']}
                     style={styles.container}
                >
          {/* <StatusBar backgroundColor='#c42053' barStyle="light-content"/> */}
        <View style={styles.header} >
            <Text style={styles.text_header}>Welcome!</Text>
           </View>
       
        <Animatable.View 
            animation="fadeInUpBig"
            style={[styles.footer, {
                backgroundColor: colors.background
            }]}
        >
            <Text style={[styles.text_footer, {
                color: colors.text
            }]}>Email</Text>
            <View style={styles.action}>
                <FontAwesome 
                    name="user-o"
                    color={colors.text}
                    size={20}
                />
                 <TextInput
            placeholder="Your Email"
            placeholderTextColor="#666666"
            style={[styles.textInput, {
              color: colors.text
            }]}
            value={email}
            autoCapitalize="none"
            onChangeText={(val) => handleChange('email', val.trim())}
          
          />
          {validate.checkEmail(email) ?
            <Animatable.View
            animation="bounceIn"
        >
            <Feather 
                name="check-circle"
                color="grey"
                size={20}
            />
        </Animatable.View>
            : null}
               
            </View>
            <Text style={[styles.text_footer, {
                color: colors.text,
                marginTop: 35
            }]}>Password</Text>
            <View style={styles.action}>
                <Feather 
                    name="lock"
                    color={colors.text}
                    size={20}
                />
                <TextInput
            placeholder="Your Password"
            placeholderTextColor="#666666"
            secureTextEntry={data.secureTextEntry ? true : false}
            style={[styles.textInput, {
              color: colors.text
            }]}
            autoCapitalize="none"
            onChangeText={(val) => handleChange('password', val.trim())}
          />
                <TouchableOpacity
                    onPress={updateSecureTextEntry}
                >
                    {data.secureTextEntry ? 
                    <Feather 
                        name="eye-off"
                        color="grey"
                        size={20}
                    />
                    :
                    <Feather 
                        name="eye"
                        color="grey"
                        size={20}
                    />
                    }
                </TouchableOpacity>
            </View>
            
            
            <TouchableOpacity style={{ alignItems: 'flex-start' }}>
            <ForgotPassword />
            </TouchableOpacity>
            <View style={styles.button}>
                <TouchableOpacity
                    style={styles.signIn}
                    onPress={CheckLogin}
                >
                <LinearGradient
                useAngle={true}
                         angle={30}
                        angleCenter={
                          {x : 0.5, y:1.5}
                        }
                     colors={['#280071','#c42053']}
                    style={styles.signIn}
                >
                    <Text style={[styles.textSign, {
                        color:'#fff'
                    }]}>Sign In</Text>
                </LinearGradient>
                </TouchableOpacity>
            </View>
            <Caption style={{ alignSelf: 'center', marginVertical: 50 }}>
            {'Copyright © '}
          flairtechno.com
           {' '}
            {new Date().getFullYear()}
            {'.'}
          </Caption>
        </Animatable.View>
      </LinearGradient>
    );
};

export default Presentation;

const styles = StyleSheet.create({
    container: {
      flex: 1, 
      backgroundColor: 'transparent'
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footer: {
        flex: 3,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
    },
    button: {
        alignItems: 'center',
        marginTop: 50
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    }
  });


// import React from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   TextInput,
//   Platform,
//   StyleSheet,
//   StatusBar,
//   Alert,
//   Image
// } from 'react-native';
// import styles from '../../styles/loginStyles'
// import { configuration } from '../../../../config/companyConfig'
// import validate from "../../../../shared/validation"
// import {
//   Caption
// } from 'react-native-paper'
// import ForgotPassword from '../ForgetPassword/index'
// import Animated from 'react-native-reanimated'
// import LinearGradient from 'react-native-linear-gradient';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import Feather from 'react-native-vector-icons/Feather';
// import { useTheme } from 'react-native-paper';


// const Presentation = (props) => {

//   const [data, setData] = React.useState({
//     secureTextEntry: true,
//   });

//   const { colors } = useTheme();

//   const { handleChange, onLogin, email, password } = props



//   const updateSecureTextEntry = () => {
//     setData({
//       ...data,
//       secureTextEntry: !data.secureTextEntry
//     });
//   }

  

//   return (
//     <View style={styles.container}>
//         <LinearGradient 
//          useAngle={true}
//          angle={55}
//         angleCenter={
//           {x : 0.5, y:1.5}
//         }
//           colors={['#280071','#c42053']} style={styles.Gradient}>
//       <View style={styles.header}>
//         <View>
//           <Image source={{ uri: `${configuration.logo}` }} style={styles.logo} />
//         </View>
//       </View>
//       </LinearGradient>
//       <Animated.View
//         animation="fadeInUpBig"
//         style={[styles.footer, {
//           backgroundColor: colors.background
//         }]}
//       >
//         <Text style={[styles.text_footer, {
//           color: colors.text
//         }]}>Email</Text>
//         <View style={styles.action}>
//           <FontAwesome
//             name="user-o"
//             color={colors.text}
//             size={20}
//           />
//           <TextInput
//             placeholder="Your Email"
//             placeholderTextColor="#666666"
//             style={[styles.textInput, {
//               color: colors.text
//             }]}
//             value={email}
//             autoCapitalize="none"
//             onChangeText={(val) => handleChange('email', val)}
//           //onEndEditing={(e) => handleValidUser(e.nativeEvent.text)}
//           />
//           {validate.checkEmail(email) ?
//             <Feather
//               name="check-circle"
//               color="green"
//               size={20}
//             />
//             : null}
//         </View>
//         {/* {data.isValidUser ? null : 
//           <Animated.View animation="fadeInLeft" duration={500}>
//             <Text style={styles.errorMsg}>Username must be 4 characters long.</Text>
//           </Animated.View>
//         } */}


//         <Text style={[styles.text_footer, {
//           color: colors.text,
//           marginTop: 35
//         }]}>Password</Text>
//         <View style={styles.action}>
//           <Feather
//             name="lock"
//             color={colors.text}
//             size={20}
//           />
//           <TextInput
//             placeholder="Your Password"
//             placeholderTextColor="#666666"
//             secureTextEntry={data.secureTextEntry ? true : false}
//             style={[styles.textInput, {
//               color: colors.text
//             }]}
//             autoCapitalize="none"
//             onChangeText={(val) => handleChange('password', val)}
//           />
//           <TouchableOpacity
//             onPress={updateSecureTextEntry}
//           >
//             {data.secureTextEntry ?
//               <Feather
//                 name="eye-off"
//                 color="grey"
//                 size={20}
//               />
//               :
//               <Feather
//                 name="eye"
//                 color="grey"
//                 size={20}
//               />
//             }
//           </TouchableOpacity>
//         </View>
//         {/* {data.isValidPassword ? null :
//           <Animated.View animation="fadeInLeft" duration={500}>
//             <Text style={styles.errorMsg}>Password must be 8 characters long.</Text>
//           </Animated.View>
//         } */}


//         <TouchableOpacity style={{ alignItems: 'flex-start' }}>
         
//           <ForgotPassword />
//         </TouchableOpacity>
//         <View style={styles.button}>
//           <TouchableOpacity
//             style={styles.signIn}
//             onPress={onLogin}
//           >
//             <LinearGradient 
//          useAngle={true}
//          angle={55}
//         angleCenter={
//           {x : 0.5, y:1.5}
//         }
//           colors={['#280071','#c42053']} style={styles.signIn}>
//               <Text style={[styles.textSign, {
//                 color: '#fff'
//               }]}>Sign In</Text>
//             </LinearGradient>
//           </TouchableOpacity>

//           <Caption style={{ alignSelf: 'center', marginVertical: 50 }}>
//             {'Copyright © '}
//           flairtechno.com
//            {' '}
//             {new Date().getFullYear()}
//             {'.'}
//           </Caption>
//         </View>
//       </Animated.View>
//     </View>
//   );
// };

// export default Presentation;


