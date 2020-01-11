import React, { Component } from "react";
import { StyleSheet, View, KeyboardAvoidingView, Keyboard } from "react-native";
import OTPInputView from "@twotalltotems/react-native-otp-input";
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
  Textarea
} from "native-base";
import axios from "axios";

class Otp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pin_count: 6,
      email: "benedictryan80@gmail.com",
      data: ""
    };
  }

  componentDidMount() {
    axios
      .post(
        "https://ixmhlhrubj.execute-api.ap-southeast-1.amazonaws.com/dev/sendmail",
        {
          email: this.state.email
        }
      )
      .then(res => {
        this.setState({
          data: res.data.otp
        });
      })
      .catch();
  }

  // onValueChange(value) {
  //   const { navigate } = this.props.navigation;
  //   if (value === this.state.data) {
  //     console.log(value);
  //     navigate("TransferConfirm");
  //   }
  // }

  render() {
    const { pin_count } = this.state;
    // const { navigate } = this.props.navigation;
    return (
      <OTPInputView
        style={{
          width: "80%",
          height: 200,
          alignItems: "center",
          justifyContent: "center"
        }}
        pinCount={pin_count}
        // code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
        // onCodeChanged = {code => { this.setState({code})}}
        autoFocusOnLoad
        codeInputFieldStyle={styles.underlineStyleBase}
        codeInputHighlightStyle={styles.underlineStyleHighLighted}
        onCodeFilled={code => {
          console.log(`Code is ${code}, you are good to go!`);
          if (code !== this.state.data) {
            alert("Invalid Input");
          } else {
            alert("You are good to go");
          }
          // alert("You are running out of time");
          // this.props.navigation.push("TransferConfirm");
        }}
      />
    );
  }
}

const styles = StyleSheet.create({
  borderStyleBase: {
    width: 30,
    height: 45
  },

  borderStyleHighLighted: {
    borderColor: "#03DAC6"
  },

  underlineStyleBase: {
    width: 40,
    height: 30,
    borderWidth: 0,
    borderBottomWidth: 4,
    borderColor: "lightgrey",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 24,
    marginTop: -95,
    fontSize: 25
  },

  underlineStyleHighLighted: {
    borderColor: "#03DAC6"
  },
  theButtonSize: {
    width: 200,
    marginTop: 40,
    alignItems: "center",
    justifyContent: "center"
  }
});

export default Otp;
