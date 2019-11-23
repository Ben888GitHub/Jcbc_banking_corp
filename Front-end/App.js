import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import React, { useState } from "react";

import InitTransferScreen from './screens/InitTransferScreen';
import HomeScreen from './screens/HomeScreen';

import { Root } from "native-base";

const AppContainer = createAppContainer(
  createStackNavigator({
    Home: { screen: HomeScreen },
    Transfer: { screen: InitTransferScreen },
  },
    {
      headerMode: 'none',
      initialRouteName: 'Home'
    })
);

export default function App() {
  return (
    <Root>
      <AppContainer />
    </Root>
  );
}