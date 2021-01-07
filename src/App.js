import React from "react";
import { Provider, useSelector } from "react-redux";
import { LogBox,StatusBar } from 'react-native';
import RNFirebase from '@react-native-firebase/app';
import {Root} from 'native-base'
import { ReactReduxFirebaseProvider, isLoaded } from "react-redux-firebase";
import { createFirestoreInstance } from "redux-firestore";
import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper';
import Spinner from 'react-native-loading-spinner-overlay';
import store from './store/index/index';
import Splash from './screens/SplashScreen';
import { configuration } from "./config/companyConfig"
import axios from "axios";
import auth from '@react-native-firebase/auth';
import { NavigationContainer } from '@react-navigation/native';
// Base Url

const base_url = configuration.REST_api;

// Ignore log notification by message

LogBox.ignoreLogs(['Warning: ...']);

//Ignore all log notifications

LogBox.ignoreAllLogs();


const profileSpecificProps = {
  userProfile: "EMPLOYEES",
  useFirestoreForProfile: true,
  enableRedirectHandling: false,
  resetBeforeLogin: false,
};

const rffProps = {
  firebase: RNFirebase,
  config: { ...profileSpecificProps },
  dispatch: store.dispatch,
  createFirestoreInstance,
};

function AuthIsLoaded({ children }) {
 // const auth = useSelector((state) => state.firebase.auth)
  RNFirebase.auth().onAuthStateChanged((user) => {
    if (user) {
      user
      .getIdToken()
        .then((idToken) => {
          console.log(idToken);
          axios.defaults.headers.common["Authorization"] = `Bearer ${idToken}`
          axios.defaults.baseURL = base_url
          return
        })
        .catch((err) => {
          console.error(err);
        });
    }
  });
  if (!isLoaded(auth)) return <Spinner visible={true} />;
  return children;
}

export default function App() {
    const theme = {
      ...DefaultTheme,
      roundness: 8,
      colors: {
        ...DefaultTheme.colors,
        primary: '#280071',
        accent: '#f1c40f',
      },
      dark: true
    };
  
      return(
        <PaperProvider theme={theme}>
          <Root>
          <Provider store={store}>
          <ReactReduxFirebaseProvider {...rffProps}>
      <AuthIsLoaded>
      <NavigationContainer>
      <StatusBar backgroundColor='black'/>
            <Splash/>
            </NavigationContainer>
            </AuthIsLoaded>
    </ReactReduxFirebaseProvider>
          </Provider>
          </Root>
        </PaperProvider>
      )
  }





