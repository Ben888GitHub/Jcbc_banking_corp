import React from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Switch,
  KeyboardAvoidingView,
  Platform,
  Keyboard
} from "react-native";
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
import { authenticate } from "../reducers/actions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

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

const fastChunkString = require("fast-chunk-string");

class googleOtp extends React.Component {
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
      showCountdown: true,
      token: null
    };
  }

  // componentDidMount() {
  //   axios
  //     .post(
  //       "https://ixmhlhrubj.execute-api.ap-southeast-1.amazonaws.com/dev/check_otp",
  //       {
  //         secret: this.props.currentUser.secret,
  //         token: this.state.token
  //       }
  //     )
  //     .then(res => {
  //       this.setState({
  //         success: res.data
  //       });
  //     })
  //     .catch();
  // }
  componentWillMount() {
    let username = this.props.navigation.getParam("sender_username");
    let accountNum = this.props.navigation.getParam("source_acc_num");
    let transferAmt = this.props.navigation.getParam("transfer_amount");
    let destAccNum = this.props.navigation.getParam("dest_acc_num");
    this.setState({
      amount: transferAmt,
      sender_username: username,
      source_acc_num: accountNum,
      dest_acc_num: destAccNum
    });
    console.log(username);
    console.log(accountNum);
    console.log(transferAmt);
    console.log(destAccNum);
  }

  //todo
  _getTransfer = () => {
    let amountToTransfer;
    try {
      amountToTransfer = parseInt(this.state.amount);
      console.log("this is the amount: " + amountToTransfer);
      console.log(typeof amountToTransfer);
    } catch {
      amountToTransfer = this.state.amount;
      console.log("this is the amount: " + amountToTransfer);
      console.log(typeof amountToTransfer);
    }
    axios
      .post(
        "https://ixmhlhrubj.execute-api.ap-southeast-1.amazonaws.com/dev/transfer",
        {
          sender_username: this.props.currentUser.accname, // Change to username
          source_acc_num: this.props.navigation.state.params.element.accnumber, // Change to accountNum
          transfer_amount: amountToTransfer, // Change to transferAmt
          dest_acc_num: this.state.dest_acc_num // Change to destAccNum
        }
      )
      .then(res => {
        console.log(res.statusText);
        console.log(res.data);
        console.log(res.status);
        this.props.navigation.push("TransferComplete", {
          sender_username: this.props.currentUser.accname, // Change to username
          source_acc_num: this.props.navigation.state.params.element.accnumber, // Change to accountNum
          transfer_amount: amountToTransfer, // Change to transferAmt
          dest_acc_num: this.state.dest_acc_num // Change to destAccNum
        });
      });
  };

  CheckOTP = () => {
    axios
      .post(
        "https://ixmhlhrubj.execute-api.ap-southeast-1.amazonaws.com/dev/check_otp",
        {
          secret: this.props.currentUser.secret,
          token: this.state.token
        }
      )
      .then(res => {
        if (res.data == false) {
          console.log(res.data);
          // this.setState({
          //   show: false
          // });
          alert(
            "Invalid OTP, Please re-enter the OTP from your Google Authenticator"
          );
        } else {
          console.log(res.data);
          alert("Successful");
          this.props.navigation.navigate("TransferComplete", {
            sender_username: this.props.currentUser.accname, // Change to username
            source_acc_num: this.state.source_acc_num, // Change to accountNum
            transfer_amount: this.state.amount, // Change to transferAmt
            dest_acc_num: this.state.dest_acc_num // Change to destAccNum
          });
        }
        // alert("Please re-enter the OTP from your Google Authenticator");
        // this.setState({
        //   data: res.data,
        //   show: true
        // });
        // this.state.showCountdown;
      })
      .catch();
  };
  // todo
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
        // set a state to hide the input
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
      <Container style={styles.container2} onPress={() => Keyboard.dismiss()}>
        <Content>
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
            Enter 6 Digits OTP from your Google Authenticator
          </Text>
          {/* */}
          {/* This section is for OTP Input */}
          {/* <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : null}
            style={{ flex: 1 }}
          > */}
          {/* <Otp /> */}
          {/* {this.state.show ? ( */}
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
              this.setState({
                token: code
              });
            }}
          />
          {/* ) : null} */}
          <View></View>
          <Button
            style={{
              marginHorizontal: 130,
              marginVertical: -40,
              backgroundColor: "#c13b3e"
            }}
            onPress={this.CheckOTP}
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
                <Text style={{ color: "white" }}>Confirm OTP</Text>{" "}
                {/* Remember to put onPress here 👆 on Button for redirecting back */}
              </Text>
            </View>
          </Button>
          {/* </Text> */}
          {/* <Button onPress={this.ShowHideComponent}>
            <Text>Hide/Show Component</Text>
          </Button> */}
          {/* </KeyboardAvoidingView> */}

          {/* */}
        </Content>
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

// export default googleOtp;
export default connect(mapStateToProps, mapDispatchToProps)(googleOtp);
