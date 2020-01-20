import { createAppContainer } from "react-navigation"; // AppContainer is the cover the entire applications navigations
import { createStackNavigator } from "react-navigation-stack"; // Stack is continuous of screens
import React from "react";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import AccountScreen from "./screens/account_page";
import AccountDetails from "./screens/AccountDetails";
import InitTransferScreen from "./screens/InitTransferScreen";
import InitTransferScreen2 from "./screens/InitTransferScreen2";
import InitTransferConfirmation from "./screens/InitTransferConfirmation";
import InitTransferComplete from "./screens/InitTransferComplete";
import Settings from "./screens/settings";
import googleOtp from "./screens/googleOtp";
import Otp from "./components/Otp";
import QRAmount from "./screens/QRAmount";
import { setCustomText } from "react-native-global-props";
import { Root } from "native-base";
import { AppLoading } from "expo";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import { Provider } from "react-redux";
import { createStore } from "redux";
import reducer from "./reducers/reducers";
import InitTransferScreen3 from "./screens/InitTransferScreen3";
import CardsScreen from "./screens/Cards";
import History from "./screens/TransactionHistory";
const store = createStore(reducer);

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
      Transfer2: { screen: InitTransferScreen2 },
      Transfer3: { screen: InitTransferScreen3 },
      TransferConfirm: { screen: InitTransferConfirmation },
      TransferComplete: { screen: InitTransferComplete },
      Account: { screen: AccountScreen },
      Settings: { screen: Settings },
      GoogleOtp: { screen: googleOtp },

      OTP: { screen: Otp },
      Cards: { screen: CardsScreen },
      AccountDetails: { screen: AccountDetails },
      History: { screen: History },
      AmountQR: { screen: QRAmount }
    },
    {
      // config
      // headerMode: "none",
      initialRouteName: "Login" // initialRouteName will display the first component
      // initialRouteName: "Home" // initialRouteName will display the first component
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

  defaultFonts() {
    const customTextProps = {
      style: {
        fontFamily: "Museo"
      }
    };
    setCustomText(customTextProps);
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
      Roboto_700: require("./fonts/roboto-700.ttf"),
      Roboto_regular: require("./fonts/roboto-regular.ttf"),
      ...Ionicons.font
    });
    this.defaultFonts();
    this.setState({ isReady: true });
  }

  render() {
    console.disableYellowBox = true;
    if (!this.state.isReady) {
      return <AppLoading />;
    }

    return (
      <Provider store={store}>
        <Root>
          <AppContainer />
        </Root>
      </Provider>
    );
  }
}
