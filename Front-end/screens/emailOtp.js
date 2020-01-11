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
  Textarea
} from "native-base";
import axios from "axios";
import Otp from "../components/Otp.js";
import Countdown from "react-countdown";

class emailOtp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageTitle: "Enter OTP  ",
      resendCode: "Resend Code",
      countdownTimer: " ",
      timerStop: " ",
      countdown: " ", //TODO
      email: "benedictryan80@gmail.com"
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
        console.log(res.statusText);
        console.log(res.data);
        console.log(res.status);
      })
      .catch();
  }

  _getOTP = () => {};

  render() {
    const countdown = ""; //TODO
    const Completionist = () => <Text>You are good to go!</Text>;
    const renderer = ({ seconds, completed }) => {
      if (completed) {
        // Render a completed state
        return <Completionist />;
      } else {
        // Render a countdown
        return <Text>{seconds}</Text>;
      }
    };
    return (
      // <View style={styles.container}>
      <Container style={styles.container2}>
        {/* <Text style={{fontSize: 60}}>{this.state.pageTitle}</Text> */}
        <Header span style={styles.headerStyle}>
          <Left>
            <Button transparent>
              <Icon
                style={{ color: "white", marginLeft: 8 }}
                name="arrow-back"
              />
            </Button>
          </Left>
          <Title style={styles.headerTitleStyle}>
            {this.state.pageTitle}

            <Icon style={{ color: "white" }} name="lock" />
          </Title>
          <Right />
        </Header>
        {/* */}
        <Icon style={styles.userIconStyle} name="key" />
        <Text
          style={{
            fontSize: 28,
            marginHorizontal: 50,
            marginVertical: -25,
            marginLeft: 76
          }}
        >
          Verification Code
        </Text>
        <Text></Text>
        <Text
          style={{
            fontSize: 19,
            marginHorizontal: 30,
            marginVertical: 50
          }}
        >
          6 Digits OTP has been send to your email
        </Text>
        {/* */}
        {/* This section is for OTP Input */}
        <Content>
          <Otp />
          <Text style={styles.timingStyle}>
            Time Remaining:{" "}
            <Countdown date={Date.now() + 30000} renderer={renderer} /> seconds
            left
          </Text>
          <Text style={styles.resendCodeStyle}>
            Didn't receive the OTP?
            <Text
              style={{
                fontSize: 17,
                fontWeight: "bold"
              }}
            >
              {" "}
              <Text></Text>
              Resend Code
            </Text>
          </Text>
        </Content>

        {/* */}
      </Container>
      // </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  container2: {
    backgroundColor: "#f7f7f7"
  },
  headerStyle: {
    height: 100,
    backgroundColor: "#c13b3e"
  },
  headerTitleStyle: {
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    fontSize: 25,
    flexWrap: "wrap",
    color: "#fff",
    marginVertical: 20,
    fontWeight: "normal"
  },
  userIconStyle: {
    color: "grey",
    fontSize: 120,
    marginHorizontal: 160,
    width: 120,
    marginVertical: 40
  },
  timingStyle: {
    marginVertical: -120,
    marginHorizontal: 55,
    marginBottom: 50
  },
  resendCodeStyle: {
    marginVertical: 10,
    marginHorizontal: 55,
    fontSize: 17
  }
});

export default emailOtp;
