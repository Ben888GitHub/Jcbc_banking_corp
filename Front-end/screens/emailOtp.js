import React from "react";
import { StyleSheet, View, TouchableOpacity, Switch } from "react-native";
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
// import Otp from "../components/Otp";
import Countdown from "react-countdown";
import OTPInputView from "@twotalltotems/react-native-otp-input";

class emailOtp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageTitle: "Enter OTP  ",
      resendCode: "Resend Code",
      countdownTimer: " ",
      countdown: 0, //TODO
      email: "benedictryan80@gmail.com",
      pin_count: 6,
      data: "",
      showOtpPlaceholder: true,
      show: true,
      sessionTimeout: null,
      showCountdown: true
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

  _getOTP = () => {};

  resendTheOtp = () => {
    axios
      .post(
        "https://ixmhlhrubj.execute-api.ap-southeast-1.amazonaws.com/dev/sendmail",
        {
          email: this.state.email
        }
      )
      .then(res => {
        alert("Your OTP has been resent");
        this.setState({
          data: res.data.otp,
          show: true
        });
        this.state.showCountdown;
      })
      .catch();
  };

  // componentHideAndShow = () => {
  //   this.setState(previousState => ({ content: !previousState.content }));
  // };

  ShowHideComponent = () => {
    if (this.state.show == true) {
      this.setState({ show: false });
    } else {
      this.setState({ show: true });
    }
  };

  RunAndStopCountdown = () => {
    if (this.state.showCountdown == true) {
      this.setState({ showCountdown: false });
    } else {
      this.setState({ showCountdown: true });
    }
  };

  render() {
    const countdown = ""; //TODO
    const Completionist = () => alert("Session Expired"); // <Text>Session Expired</Text>;
    // const { navigate } = this.props.navigation;
    const { pin_count } = this.state;
    const { showOtpPlaceholder } = this.state;
    const renderer = ({ seconds, completed }) => {
      if (completed) {
        // Render a completed state
        // set a state to hide the input
        // return this.props.navigation.navigate("Transfer");
        this.setState({
          show: false
          // sessionTimeout:
        });
        // return this.state.sessionTimeout;
        alert("Session Expired");
        return <Text>Session Expired</Text>;
        // return <Text style={{ color: "red" }}>Session Expired</Text>;
        // return this.setState({
        //   showOtpPlaceholder: false
        // });
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
          {/* <Otp /> */}
          {this.state.show ? (
            <OTPInputView
              style={{
                width: "80%",
                height: 200,
                alignItems: "center",
                justifyContent: "center"
              }}
              // editable={}
              pinCount={pin_count}
              // code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
              // onCodeChanged = {code => { this.setState({code})}}
              autoFocusOnLoad
              codeInputFieldStyle={styles.underlineStyleBase}
              codeInputHighlightStyle={styles.underlineStyleHighLighted}
              hideInput={this.ShowHideComponent}
              onCodeFilled={code => {
                console.log(`Your OTP Pin is ${code}, you are good to go!`);
                if (code !== this.state.data) {
                  alert("Invalid Input");
                  this.setState({
                    show: false
                  });
                  // this.props.navigation.navigate("Transfer");
                } else {
                  alert("You are good to go");
                  // this.props.navigation.navigate("TransferComplete");
                  // this.props.navigation.push("TransferConfirm");
                }
              }}
            />
          ) : null}
          <View></View>
          {/* <Text>Hello</Text> */}
          {this.state.show ? (
            <Text style={styles.timingStyle}>
              Time Remaining: {/* </Text>
            <Text> */}
              <Countdown date={Date.now() + 15000} renderer={renderer} />{" "}
            </Text>
          ) : null}
          {/* <Text>Hello</Text> */}

          <Text style={styles.resendCodeStyle}>Didn't receive the OTP?</Text>
          {/* <Button transparent> </Button> */}
          <TouchableOpacity
            style={{ marginHorizontal: 55, marginVertical: 15 }}
            onPress={this.resendTheOtp}
          >
            <View>
              <Text
                style={{
                  fontSize: 17,
                  fontWeight: "bold"
                }}
              >
                {" "}
                <Text></Text>
                <Text>Resend Code</Text>{" "}
                {/* Remember to put onPress here 👆 on TouchableOpacity for redirecting back */}
              </Text>
            </View>
          </TouchableOpacity>
          {/* </Text> */}
          {/* <Button onPress={this.ShowHideComponent}>
            <Text>Hide/Show Component</Text>
          </Button> */}
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
  headerText: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
    fontWeight: "bold"
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
  // timingStyle: {
  //   marginVertical: -120,
  //   marginHorizontal: 55,
  //   marginBottom: 50
  // },
  // resendCodeStyle: {
  //   marginVertical: 10,
  //   marginHorizontal: 55,
  //   fontSize: 17
  // },
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

export default emailOtp;
