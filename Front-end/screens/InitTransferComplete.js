import React from "react";
import { StyleSheet, View } from "react-native";
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
  Input,
  Textarea,
  ListItem
  // CheckBox
} from "native-base";
import axios from "axios";
import CheckBox from "react-native-check-box";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      titleText: "Transfer Complete",
      bankName: "JCBC Saving Account",
      accountNumber: "(899-678898-009)",
      beneficiary: "BENEDICT RYAN",
      beneficiaryAccNumber: "0000-9118-0000",
      beneficiaryBank: "HSBC",
      date: " ",
      amount: "10,000",
      isChecked: false
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
      date:
        date + "/" + month + "/" + year + " " + hours + ":" + min + ":" + sec
    });
  }

  sendToRecipient = () => {
    axios.post().then();
  };

  doingNewTransfer = () => {};

  navigateToHome = () => {};

  render() {
    return (
      <Container style={{ flex: 1 }}>
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
              <Icon
                style={{ color: "white", fontSize: 40, marginLeft: 30 }}
                name="checkmark-circle-outline"
              />
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
          {/* */}

          {/* */}
          <CheckBox
            style={{ flex: 1, padding: 30 }}
            onClick={() => {
              this.setState({
                isChecked: !this.state.isChecked
              });
            }}
            isChecked={this.state.isChecked}
            leftText={"Tick on the checkbox to send the receipt via email"}
          />
          {/* */}
          <View style={{ alignItems: "center", padding: 15 }}>
            <Button
              style={{
                width: 225,
                borderRadius: 10,
                height: 60,
                margin: 25,
                backgroundColor: "#c13b3e",
                marginVertical: -10
              }}
            >
              <View>
                <Text
                  style={{
                    fontWeight: "bold",
                    justifyContent: "center",
                    alignItems: "center",
                    marginLeft: 16,
                    fontSize: 16,
                    color: "#fff"
                  }}
                >
                  New Transfer
                </Text>
              </View>
            </Button>
          </View>

          <Button
            style={{
              height: 80,
              marginTop: 30,
              backgroundColor: "#c13b3e",
              width: 80,
              marginLeft: 15
            }}
            iconLeft
            rounded
          >
            <Icon
              style={{ fontSize: 50, color: "white", marginLeft: 20 }}
              name="home"
            />
          </Button>
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

export default App;
