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
import { Ionicons } from "@expo/vector-icons";
import reducer from '../reducers/reducers';
import { authenticate } from '../reducers/actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

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
      titleText: "Transfer Confirmation",
      bankName: "JCBC Saving Account",
      accountNumber: "(899-678898-009)",
      beneficiary: "BENEDICT RYAN",
      beneficiaryAccNumber: "000-000-9118-0000",
      beneficiaryBank: "HSBC",
      date: " ",
      amount: "10,000"
    };
  }
  componentDidMount() {
    var that = this;
    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes
    var sec = new Date().getSeconds(); //Current Seconds

    that.setState({
      //Setting the value of the date time
      date:
        date + "/" + month + "/" + year + " " + hours + ":" + min + ":" + sec
    });
  }
  render() {
    const TransferAlert = () =>
      Alert.alert("You have successfully transferred");
    return (
      // <Container style={{ backgroundColor: "#F7F7F7" }}>
      <Container>
        <Header
          span
          style={{
            backgroundColor: "#c13b3e",
            padding: 20,
            height: 110
            // display: "block"
          }}
        >
          <View>
            <Text
              style={{
                color: "#fff",
                fontWeight: "bold",
                fontSize: 20,
                width: "100%",
                marginTop: 20,
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              {this.state.titleText}
            </Text>
          </View>
        </Header>

        <Content style={{ marginTop: 10 }}>
          <Card
            style={{
              width: 390,
              marginLeft: 11.5,
              color: "#c13b3e",
              margin: 10
            }}
          >
            <CardItem style={{ backgroundColor: "#c13b3e" }}>
              <Body>
                <Text style={{ color: "#fff" }}>From:</Text>
                <Text style={{ color: "#fff", fontWeight: "bold" }}>
                  {this.state.bankName}
                </Text>
                <Text style={{ color: "#fff", fontWeight: "bold" }}>
                  {this.state.accountNumber}
                </Text>
              </Body>
            </CardItem>
            <CardItem style={{ backgroundColor: "#c13b3e" }}>
              <Body>
                <Text style={{ color: "#fff" }}>To:</Text>
                <Text style={{ color: "#fff", fontWeight: "bold" }}>
                  {this.state.beneficiary}
                </Text>
              </Body>
            </CardItem>
            <CardItem style={{ backgroundColor: "#c13b3e" }}>
              <Body>
                <Text style={{ color: "#fff" }}>Account Number:</Text>
                <Text style={{ color: "#fff", fontWeight: "bold" }}>
                  {this.state.beneficiaryAccNumber}
                </Text>
              </Body>
            </CardItem>
            <CardItem style={{ backgroundColor: "#c13b3e" }}>
              <Body>
                <Text style={{ color: "#fff" }}>Bank:</Text>
                <Text style={{ color: "#fff", fontWeight: "bold" }}>
                  {this.state.beneficiaryBank}
                </Text>
              </Body>
            </CardItem>
            <CardItem style={{ backgroundColor: "#c13b3e" }}>
              <Body>
                <Text style={{ color: "#fff" }}>Date:</Text>
                <Text style={{ color: "#fff", fontWeight: "bold" }}>
                  {this.state.date}
                </Text>
              </Body>
            </CardItem>
            <CardItem style={{ backgroundColor: "#c13b3e" }}>
              <Body>
                <Text style={{ color: "#fff" }}>Amount:</Text>
                <Text style={{ color: "#fff", fontWeight: "bold" }}>
                  S$ {this.state.amount}
                </Text>
              </Body>
            </CardItem>
          </Card>
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
                Confirm Transfer
              </Text>
              <Icon active name="navigate" />
            </Button>
          </View>
        </Content>
      </Container>
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

export default connect(mapStateToProps, mapDispatchToProps)(App);

