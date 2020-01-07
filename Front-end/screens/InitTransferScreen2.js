import React, { Component } from "react";
import { StyleSheet, View, AppRegistry, Dimensions, Alert } from "react-native";
import {
  Header,
  Container,
  Content,
  Left,
  Body,
  Right,
  Card,
  CardItem,
  Item,
  Picker,
  Icon,
  Text,
  Input
} from "native-base";
import { authenticate } from "../reducers/actions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import axios from "axios";
import { RNSlidingButton, SlideDirection } from "rn-sliding-button";

const mapStateToProps = state => {
  const { currentUser } = state;
  return { currentUser };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      authenticate
    },
    dispatch
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
      AccountNumberInputValue: " "
    };
  }

  onValueChange(value) {
    const { navigate } = this.props.navigation;
    if (value === "Ryan") {
      console.log(value);
      navigate("Transfer");
    }
  }

  _handletransfer = () => {
    let amountToTransfer;
    try {
      amountToTransfer = parseInt(this.state.amount);
      console.log(typeof (amountToTransfer));
    } catch {
      amountToTransfer = this.state.amount;
      console.log(typeof (amountToTransfer));
    };
    axios
      .post(
        "https://ixmhlhrubj.execute-api.ap-southeast-1.amazonaws.com/dev/transfer",
        {
          sender_username: this.state.username,
          source_acc_num: this.state.accountNumber,
<<<<<<< HEAD
          transfer_amount: this.state.amount,
          receiver_username: this.state.receiver_username, // TODO
=======
          transfer_amount: amountToTransfer,
>>>>>>> 6fb35b97248e67d419b62344fb8190f37457ad7a
          dest_acc_num: this.state.beneficiaryAccNumber
        }
      )
      .then(res => {
        console.log(res.statusText);
        console.log(res.data);
        console.log(res.status);

        if (res.status === 404) {
          // alert sth about the acc info is wrong.
          alert("Invalid Details");
        }

        if (res.status === 200) {
          alert("Successful");
          this.props.navigation.push("TransferConfirm");
        }
      })
      .catch(err => {
        console.error(err);
        console.log(err);
        alert("Invalid Details!");
      });
  };

  emailOtpApi = () => {};
  render() {
    const screenWidth = Math.round(Dimensions.get("window").width);
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
              width: screenWidth - 26,
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
            style={{
              borderRadius: 5.5,
              width: screenWidth - 24,
              marginLeft: 12
            }}
          >
            <Input
              value={this.state.accountNumber}
              autoCapitalize="none"
              placeholder="Your Account Number"
              pattern={[
                "(?=.*\\d)" // number required
              ]}
              keyboardType={"numeric"}
              onFocus={() => {
                this.setState({ accountNumber: "" });
              }}
              onChangeText={text => {
                this.setState({ accountNumber: text });
              }}
            />
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
            style={{
              borderRadius: 5.5,
              width: screenWidth - 24,
              marginLeft: 12
            }}
          >
            <Input
              value={this.state.username}
              onFocus={() => {
                this.setState({ username: "" });
              }}
              onChangeText={text => {
                this.setState({ username: text });
              }}
              placeholder="Your Account Name"
            />
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
              width: screenWidth - 26,
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
            style={{
              borderRadius: 5.5,
              width: screenWidth - 24,
              marginLeft: 12
            }}
          >
            <Input placeholder="Write something (Optional)" />
          </Item>
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
            style={{
              borderRadius: 5.5,
              width: screenWidth - 24,
              marginLeft: 12
            }}
          >
            <Input
              value={this.state.amount}
              pattern={[
                "(?=.*\\d)" // number required
              ]}
              keyboardType={"numeric"}
              onFocus={() => {
                this.setState({ amount: "" });
              }}
              onChangeText={text => {
                this.setState({ amount: text });
              }}
              placeholder="Enter Amount"
            />
          </Item>
          {/* BENEFICIARY ACCOUNT NUMBER */}
          <Text
            style={{
              fontWeight: "bold",
              marginTop: 20,
              fontSize: 17,
              marginLeft: 13,
              marginBottom: 5
            }}
          >
            Beneficiary Account Number:
          </Text>
          <Item
            regular
            style={{
              borderRadius: 5.5,
              width: screenWidth - 24,
              marginLeft: 12
            }}
          >
            <Input
              pattern={[
                "(?=.*\\d)" // number required
              ]}
              keyboardType={"numeric"}
              value={this.state.beneficiaryAccNumber}
              onFocus={() => {
                this.setState({ beneficiaryAccNumber: "" });
              }}
              onChangeText={text => {
                this.setState({ beneficiaryAccNumber: text });
              }}
              placeholder="Enter Beneficiary Account Number"
            />
          </Item>
          <View style={{ alignItems: "center", padding: 15 }}>
            <RNSlidingButton
              style={{
                width: 240,
                borderRadius: 10,
                height: 60,
                margin: 25,
                backgroundColor: "#c13b3e"
              }}
              height={70}
              onSlidingSuccess={() => {
                this._handletransfer();
              }}
              successfulSlidePercent={90}
              slideDirection={SlideDirection.RIGHT}
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
                  Slide To Transfer
                </Text>
              </View>
            </RNSlidingButton>
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
