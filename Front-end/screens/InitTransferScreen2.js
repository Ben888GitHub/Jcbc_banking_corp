import React, { Component } from "react";
import {
  StyleSheet,
  View,
  StatusBar,
  TextInput,
  AppRegistry,
  Dimensions,
  SafeAreaView,
  ScrollView,
  Alert
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AppLoading } from "expo";
import {
  Header,
  Container,
  Content,
  Accordion,
  Left,
  Body,
  Title,
  Right,
  Card,
  CardItem,
  Form,
  Item,
  Picker,
  Icon,
  Button,
  Text,
  Input
} from "native-base";
import reducer from '../reducers/reducers';
import { authenticate } from '../reducers/actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// import { Dropdown } from "react-native-material-dropdown";

// import Icon from "react-native-vector-icons/FontAwesome";

// import {
//   Select,
//   Option,
//   OptionList,
//   updatePosition
// } from "react-native-dropdown";

// const DropDown = require("react-native-dropdown");
// const { Select, Option, OptionList, updatePosition } = DropDown;
const mapStateToProps = (state) => {
  const { currentUser } = state;
  return { currentUser };
};

const mapDispatchToProps = dispatch => (
  bindActionCreators({
      authenticate,
  }, dispatch)
);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: "key1",
      titleText: "Bank Transfer",
      bodyText: "JCBC Saving Account",
      underBodyText: "899-678898-009",
      singaporeDollars: 700000,
      // canada: " "
      AccountNumberInputValue: " "
    };
  }

  // _canada(province) function is to return the value of canada in the state
  // _canada(province) {
  //   this.setState({
  //     // Make an update to the state
  //     ...this.state,
  //     canada: province // Add new key value to the state
  //   });
  // }

  onValueChange(value) {
    const { navigate } = this.props.navigation;
    if (value === "Ryan") {
      console.log(value)
      navigate('Transfer')
    }
    /*this.setState({
      selected: value
    })*/;
  }
  render() {
    const screenWidth = Math.round(Dimensions.get("window").width);
    const TransferAlert = () => {
      Alert.alert("You Have Successfully Transferred");
    };
    // Blank Comment
    // This is the functionality for the Account Number Input on the Banking App
    const AccountNumberValue = () => {
      if (this.state.AccountNumberInputValue != 1) {
        return Alert.alert("Wrong");
      }
    };
    return (
      <Container style={{ backgroundColor: "#F7F7F7" }}>
        <Header
          span
          style={{
            backgroundColor: "#c13b3e",
            padding: 20,
            height: 110
            // display: "block"
          }}
        >
          <Left />
          <Body>
            <Text
              style={{
                color: "white",
                fontSize: 16.5,
                width: "100%",
                fontWeight: "bold",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              {this.state.titleText}
            </Text>
          </Body>
          <Right />
        </Header>

        <Content style={{ marginTop: 10, backgroundColor: "#F7F7F7" }}>
          <Card style={{ margin: 30 }}>
            <CardItem
              style={{ backgroundColor: "#c13b3e" }}
              header
              button
              onPress={() => alert("This is Card Header")} // Putting alert inside the arrow function of onPress in order to really alert once it is clicked
            >
              <Text
                style={{
                  fontSize: 17,
                  fontWeight: "bold",
                  color: "#fff"
                }}
              >
                {this.state.bodyText}
              </Text>
            </CardItem>
            <CardItem
              style={{ backgroundColor: "#c13b3e" }}
              button
              onPress={() => alert("This is Card Body")}
            >
              <Text style={{ fontSize: 15, color: "#fff" }}>
                {this.state.underBodyText}
              </Text>
            </CardItem>
          </Card>
          {/* This is a text of the total balance */}
          <View style={{ margin: 13 }}>
            <Text style={{ fontSize: 16 }}>Balance Total:</Text>
            <Text style={styles1.container}>
              S${this.state.singaporeDollars}
            </Text>
          </View>
          {/* Blank Comment */}

          {/* This is the card which have the Picker Dropdown inside */}
          <Text
            style={{
              fontWeight: "bold",
              marginTop: 15,
              fontSize: 17,
              marginLeft: 13,
              marginBottom: 5
            }}
          >
            Transfer Options
          </Text>
          <Card
            style={{
              margin: 20,
              borderRadius: 5,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              width: 390,
              marginLeft: 13
            }}
          >
            <Picker
              mode="dropdown"
              iosHeader="Select Transfer Solution"
              iosIcon={
                <Icon
                  name="arrow-down"
                // style={{ position: "absolute", right: 0 }}
                />
              }
              style={{
                width: screenWidth * 0.92,
                fontWeight: "bold"
              }}
              selectedValue={this.state.selected}
              onValueChange={val => this.onValueChange(val)}
            >
              <Picker.Item label="I want to input manually" value="key1" />
              <Picker.Item label="To saved beneficiaries" value="Ryan" />

            </Picker>
          </Card>
          {/* Blank Comment */}
          {/* ACCOUNT NUMBER INPUT */}
          <Text
            style={{
              fontWeight: "bold",
              marginTop: 20,
              fontSize: 17,
              marginLeft: 13,
              marginBottom: 5
            }}
          >
            Account Number:
          </Text>
          <Item
            regular
            style={{ borderRadius: 5.5, width: 390, marginLeft: 12 }}
          >
            <Input placeholder="Your Account Number" />
          </Item>
          {/* */}
          {/* ACCOUNT NAME INPUT */}
          <Text
            style={{
              fontWeight: "bold",
              marginTop: 20,
              fontSize: 17,
              marginLeft: 13,
              marginBottom: 5
            }}
          >
            Account Name:
          </Text>
          <Item
            regular
            style={{ borderRadius: 5.5, width: 390, marginLeft: 12 }}
          >
            <Input placeholder="Your Account Name" />
          </Item>
          {/* */}
          {/* BANK COMPANY PICKER DROPDOWN */}
          <Text
            style={{
              fontWeight: "bold",
              marginTop: 20,
              fontSize: 17,
              marginLeft: 13
            }}
          >
            Bank:
          </Text>
          <Card
            style={{
              margin: 20,
              borderRadius: 5,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              width: 390,
              marginLeft: 13
            }}
          >
            <Picker
              mode="dropdown"
              iosHeader="Select Bank Companies"
              iosIcon={
                <Icon
                  name="arrow-down"
                // style={{ position: "absolute", right: 0 }}
                />
              }
              style={{
                width: screenWidth * 0.92,
                fontWeight: "bold"
              }}
              selectedValue={this.state.selected}
              onValueChange={val => this.onValueChange(val)}
            >
              <Picker.Item label="DBS" value="Ryan" />
              <Picker.Item label="HSBC" value="key1" />
              <Picker.Item label="UOB" value="key2" />
              <Picker.Item label="Deutsche Bank" value="key3" />
              <Picker.Item label="Barclays" value="key4" />
              <Picker.Item label="Bank of America" value="key5" />
            </Picker>
          </Card>
          {/* */}
          {/* NOTE INPUT */}
          <Text
            style={{
              fontWeight: "bold",
              marginTop: 20,
              fontSize: 17,
              marginLeft: 13,
              marginBottom: 5
            }}
          >
            Note:
          </Text>
          <Item
            regular
            style={{ borderRadius: 5.5, width: 390, marginLeft: 12 }}
          >
            <Input placeholder="Write something (Optional)" />
          </Item>
          {/* */}
          {/* AMOUNT INPUT */}
          <Text
            style={{
              fontWeight: "bold",
              marginTop: 20,
              fontSize: 17,
              marginLeft: 13,
              marginBottom: 5
            }}
          >
            Amount:
          </Text>
          <Item
            regular
            style={{ borderRadius: 5.5, width: 390, marginLeft: 12 }}
          >
            <Input placeholder="Enter Amount" />
          </Item>
          {/* */}
          {/* BUTTON OF TRAMSFER  */}
          <View style={{ alignItems: "center", padding: 15 }}>
            <Button
              danger
              style={{ margin: 25, borderRadius: 10, width: 120, height: 60 }}
            >
              <Text
                onPress={TransferAlert}
                style={{
                  fontWeight: "bold",
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                {" "}
                Transfer{" "}
              </Text>
            </Button>
          </View>
        </Content>
      </Container>
      //   </ScrollView>
      // </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});

const styles1 = StyleSheet.create({
  // Style for the Balance Total
  container: {
    color: "#c13b3e",
    fontSize: 16,
    fontWeight: "bold"
  },
  scrollView: {
    marginHorizontal: 20
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(App);

AppRegistry.registerComponent("App", () => App);

{
  /* Blank Comment */
}

{
  /* <Input
            placeholder="  Bank"
            leftIcon={
              <Ionicons
                style={{ marginRight: 15 }}
                name="ios-arrow-down"
                size={32}
              />
            }
          /> */
}
