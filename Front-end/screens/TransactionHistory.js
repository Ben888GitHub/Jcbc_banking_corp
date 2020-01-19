import React from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Image,
  Text,
  StatusBar
} from "react-native";
import { AppLoading } from "expo";
import {
  Container,
  Content,
  Card,
  CardItem,
  Footer,
  FooterTab,
  Button,
  Icon
} from "native-base";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { authenticate, getTransactions } from "../reducers/actions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Ionicons } from "@expo/vector-icons";

import defaultTrans from "../trans";

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

class History extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
      current_usr: this.props.currentUser,
      currentacc: null,
      dataGrid: []
    };
  }

  componentWillMount = () => {
    this.setState({ currentacc: this.props.navigation.getParam("element") });
    this.setState({
      dataGrid: this.filterMyTransactions(this.state.current_usr)
    });
  };

  filterMyTransactions = acc => {
    let toReturn = [];
    console.log(acc.accname);
    defaultTrans.forEach(element => {
      if (
        element.destinationaccname == acc.accname ||
        element.sourceaccname == acc.accname
      ) {
        toReturn.push(element);
      }
    });
    console.log(toReturn);
    return toReturn;
  };

  async componentDidMount() {
    this.setState({ isReady: true });
  }

  accNumberString = aString => {
    let arr = fastChunkString(aString, { size: 4, unicodeAware: false });
    return arr[0] + " " + arr[1] + " " + arr[2] + " ";
  };

  render() {
    let { dataGrid } = this.state;
    const { navigate } = this.props.navigation; //navigation is always a props
    let { currentacc } = this.state;
    let { current_usr } = this.state;
    let yelloBackgrd = "#eee8de";

    if (!this.state.isReady) {
      return <AppLoading />;
    }

    return (
      <Container
        style={{
          // paddingTop: getStatusBarHeight() * 2,
          padding: 10
        }}
      >
        <StatusBar barStyle="dark-content" />

        <Content showsVerticalScrollIndicator={false}>
          <View
            style={{
              marginBottom: 20,
              flex: 1,
              flexDirection: "row"
            }}
          >
            <View
              style={{
                flex: 0.7,
                flexDirection: "column"
              }}
            >
              <Text>{this.props.currentUser.accname.toUpperCase()}</Text>
              <Text
                style={{
                  fontFamily: "MuseoBold",
                  fontSize: 30,
                  fontWeight: "400"
                }}
              >
                Transactions
              </Text>
            </View>
          </View>

          <View
            style={{
              marginBottom: 5,
              padding: 20,
              borderRadius: 12,
              borderWidth: 1,
              borderColor: "#cac0b6"
            }}
          >
            <View style={{ width: "100%", alignItems: "flex-end" }}>
              <Text
                style={{
                  fontFamily: "MuseoBold",
                  fontWeight: "400",
                  color: "#cac0b6"
                }}
              >
                Balance
              </Text>
              <Text
                style={{
                  fontFamily: "MuseoBold",
                  fontWeight: "400",
                  fontSize: 25
                }}
              >
                {currentacc.balance}
              </Text>
            </View>
          </View>

          <View
            style={{
              marginBottom: 5,
              padding: 20,
              borderRadius: 12,
              borderWidth: 1,
              borderColor: "#cac0b6"
            }}
          >
            <View style={{ marginBottom: 12 }}>
              <Text
                style={{
                  fontFamily: "MuseoBold",
                  fontWeight: "400",
                  color: "#cac0b6"
                }}
              >
                Account Name
              </Text>
              <Text
                style={{
                  fontFamily: "MuseoBold",
                  fontWeight: "400",
                  fontSize: 20
                }}
              >
                Saving Account
              </Text>
            </View>

            <View>
              <Text
                style={{
                  fontFamily: "MuseoBold",
                  fontWeight: "400",
                  color: "#cac0b6"
                }}
              >
                Account Number
              </Text>
              <Text
                style={{
                  fontFamily: "MuseoBold",
                  fontWeight: "400",
                  fontSize: 20
                }}
              >
                {currentacc.accnumber}
              </Text>
            </View>
          </View>

          <Text
            style={{
              fontFamily: "MuseoBold",
              fontSize: 23,
              fontWeight: "400",
              marginVertical: 20
            }}
          >
            History
          </Text>

          {dataGrid.map((sub_element, sub_key) => {
            return (
              <Card
                transparent
                key={sub_key}
                style={[
                  {
                    borderWidth: 0,
                    borderColor: "transparent",
                    backgroundColor: "transparent"
                  }
                ]}
              >
                <CardItem
                  style={{
                    borderRadius: 12,
                    flexDirection: "column",
                    alignItems: "flex-start",
                    justifyContent: "flex-end",
                    backgroundColor: yelloBackgrd
                  }}
                >
                  <Text>Bank Transfer</Text>
                  <Text
                    style={{
                      fontFamily: "MuseoBold",
                      fontWeight: "400",
                      fontSize: 20
                    }}
                  >
                    <Text>
                      {sub_element.sourceaccname == current_usr.accname
                        ? "-"
                        : "+"}
                    </Text>{" "}
                    {sub_element.amount}
                  </Text>
                </CardItem>
              </Card>
            );
          })}
        </Content>
        <Footer
          span
          style={{
            height: 40,
            width: "115%",
            marginHorizontal: -30,
            marginVertical: -10
          }}
        >
          <FooterTab style={{ backgroundColor: "#c13b3e" }}>
            <Button vertical onPress={() => navigate("Home")}>
              <Icon name="contact" style={{ color: "white" }} />
              <Text style={{ color: "white" }}>Account</Text>
            </Button>
            <Button vertical>
              <Icon name="list-box" style={{ color: "white" }} />
              <Text style={{ color: "white" }}>History</Text>
            </Button>
            {/* <Button vertical active> */}
            <Button vertical onPress={() => navigate("Settings")}>
              {/* <Icon active name="navigate" /> */}
              <Icon name="cog" style={{ color: "white" }} />
              <Text style={{ color: "white" }}>Settings</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}

History.navigationOptions = {
  headerTransparent: true
  // headerStyle: {
  //   shadowColor: "transparent",
  //   borderBottomWidth: 0,
  //   elevation: 0
  // }
};

const style = StyleSheet.create({
  btn: {
    height: 110,
    width: 250,
    backgroundColor: "#B22222",
    paddingHorizontal: 10,
    borderRadius: 5,
    marginTop: 10,
    opacity: 80
  },

  btn_alt: {
    height: 175,
    width: 150,
    backgroundColor: "#B22222",
    paddingHorizontal: 10,
    borderRadius: 5,
    margin: 10,
    opacity: 80
  },

  btn_content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
    margin: 10
  },

  btn_container: {
    flex: 1,
    padding: 15,
    flexDirection: "row",
    justifyContent: "space-between"
  },

  txt: {
    fontWeight: "700",
    color: "white",
    fontSize: 24
  },

  icon_default: {
    color: "white"
  },
  settingsLogo: {
    width: 70,
    height: 70,
    resizeMode: "contain"
  },
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%"
    //resizeMode: 'cover'
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(History);
