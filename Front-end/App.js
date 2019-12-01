import { createAppContainer } from "react-navigation"; // AppContainer is the cover the entire applications navigations
import { createStackNavigator } from "react-navigation-stack"; // Stack is continuous of screens

import React, { useState } from "react";
import InitTransferScreen2 from "./screens/InitTransferScreen2"; 
import InitTransferScreen from "./screens/InitTransferScreen";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";

import { Root } from "native-base";

import { AppLoading } from "expo";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";

// First Step
const AppContainer = createAppContainer(
  createStackNavigator(
    // Have two elements
    {
      // component
      // Using createStackNavigator create the applications
      Login: { screen: LoginScreen }, // Login is the navigation key which define the Login by the users, screen is used for placing the Component,
      Home: { screen: HomeScreen },
      Transfer: { screen: InitTransferScreen },
      Transfer2: { screen: InitTransferScreen2 }
    },
    {
      // config
      headerMode: "none",
      initialRouteName: "Login" // initialRouteName will display the first component
    }
  )
);

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false // For loading the font
    };
  }

  async componentDidMount() {
    // Asynchronous componentDidMount
    await Font.loadAsync({
      // Wait for the font to be successfully imported from fonts directory and it will execute all the components
      // Wait to be loaded
      Museo: require("./fonts/museosanscyrl-300.ttf"), // ttf is true type form
      MuseoBold: require("./fonts/museosanscyrl-700.ttf"),
      MuseoSemiBold: require("./fonts/museosanscyrl-500.ttf"),
      //Below are the default font of Android, don't delete them:
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      ...Ionicons.font
    });
    this.setState({ isReady: true });
  }

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
