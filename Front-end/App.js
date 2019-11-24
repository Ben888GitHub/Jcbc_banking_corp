import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import React, { useState } from "react";

import InitTransferScreen from './screens/InitTransferScreen';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';

import { Root } from "native-base";

import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';

const AppContainer = createAppContainer(
  createStackNavigator({
    Login: { screen: LoginScreen },
    Home: { screen: HomeScreen },
    Transfer: { screen: InitTransferScreen },
  },
    {
      headerMode: 'none',
      initialRouteName: 'Login'
    })
);

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
    };
  };

  async componentDidMount() {
    await Font.loadAsync({
      Museo: require('./fonts/museosanscyrl-300.ttf'),
      MuseoBold: require('./fonts/museosanscyrl-700.ttf'),
      MuseoSemiBold: require('./fonts/museosanscyrl-500.ttf'),
      //Below are the default font of Android, don't delete them:
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      ...Ionicons.font,
    });
    this.setState({ isReady: true });
  };

  render() {
    console.disableYellowBox = true;
    if (!this.state.isReady) {
      return <AppLoading />;
    }

    return (
      <Root>
        <AppContainer />
      </Root>
    );
  }

}

// export default function App() {
//   return (
//     <Root>
//       <AppContainer />
//     </Root>
//   );
// }