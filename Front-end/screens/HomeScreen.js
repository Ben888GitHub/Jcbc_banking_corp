import React from "react";
import {
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Image,
  Text,
  View
} from "react-native";
import { Footer, FooterTab, Button, Icon } from "native-base";
import { AppLoading } from "expo";
import { Container, Content, Card, CardItem } from "native-base";
import { getStatusBarHeight } from "react-native-status-bar-height";
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

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false
    };
  }

  async componentDidMount() {
    this.setState({ isReady: true });
  }

  accNumberString = aString => {
    let arr = fastChunkString(aString, { size: 4, unicodeAware: false });
    return arr[0] + " " + arr[1] + " " + arr[2] + " ";
  };

  render() {
    const { navigate } = this.props.navigation; //navigation is always a props
    console.log(this.props.currentUser);

    if (!this.state.isReady) {
      return <AppLoading />;
    }

    return (
      <Container style={{ paddingTop: getStatusBarHeight() * 2, padding: 10 }}>
        {/* <ImageBackground source={require('../assets/transfer.jpg')} resizeMode='cover' style={style.backgroundImage}> */}

        <Content>
          <View
            style={{
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
              <Text style={{ marginHorizontal: 20 }}>
                Hello, {this.props.currentUser.accname}
              </Text>

              <Text
                style={{
                  fontFamily: "MuseoBold",
                  fontSize: 30,
                  fontWeight: "400",
                  margin: 20
                }}
              >
                Your Accounts
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => navigate("Settings")}
              style={{
                flex: 0.3,
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <Image
                style={style.settingsLogo}
                source={require("../assets/settings.png")}
              ></Image>
            </TouchableOpacity>
          </View>

          {this.props.currentUser.accounts.map((element, key) => (
            <Card
              key={key}
              style={{
                borderColor: "transparent",
                backgroundColor: "transparent",
                marginBottom: 8,
                borderRadius: 20
              }}
            >
              <TouchableOpacity
                onPress={
                  () =>
                    navigate("AccountDetails", {
                      element: element
                    })
                  // navigate('Transfer', {
                  //   element: element
                  // })
                }
              >
                <ImageBackground
                  source={require("../assets/bank.jpg")}
                  resizeMode="cover"
                  style={{}}
                  imageStyle={{ borderRadius: 21 }}
                >
                  <CardItem
                    style={{
                      height: 150,
                      backgroundColor:
                        key !== 0 ? "rgba(0,0,0,0.7)" : "rgba(178,34,34,0.7)",
                      borderRadius: 20
                    }}
                  >
                    <View
                      style={{
                        padding: 10,
                        height: "100%",
                        flexGrow: 1,
                        flexDirection: "column",
                        justifyContent: "space-between",
                        alignItems: "flex-start"
                      }}
                    >
                      <View>
                        <Text
                          style={{
                            marginBottom: 6,
                            opacity: 0.5,
                            color: "white"
                          }}
                        >
                          {key === 0
                            ? "Default Account"
                            : "Foreign Currency Account"}
                        </Text>
                        <Text
                          style={{
                            color: "white",
                            fontFamily: "MuseoSemiBold",
                            fontWeight: "400"
                          }}
                        >
                          {this.accNumberString(element.accnumber)}
                        </Text>
                      </View>

                      <View>
                        <Text
                          style={{
                            fontSize: 23,
                            fontFamily: "MuseoBold",
                            fontWeight: "400",
                            color: "white"
                          }}
                        >
                          {element.currency}
                        </Text>
                      </View>
                    </View>

                    <View
                      style={{
                        height: "100%",
                        padding: 10,
                        justifyContent: "flex-end",
                        alignItems: "flex-end"
                      }}
                    >
                      <Text
                        style={{
                          color: "white",
                          opacity: 0.5,
                          marginBottom: 6
                        }}
                      >
                        {"Total balance".toUpperCase()}
                      </Text>
                      <Text
                        style={{
                          color: "white",
                          fontFamily: "MuseoBold",
                          fontWeight: "400",
                          fontSize: 22
                        }}
                      >
                        {element.balance}
                      </Text>
                    </View>
                  </CardItem>
                </ImageBackground>
              </TouchableOpacity>
            </Card>
          ))}
        </Content>
        <Footer
          span
          style={{
            height: 60,
            width: "115%",
            marginHorizontal: -30,
            marginVertical: -10
          }}
        >
          <FooterTab style={{ backgroundColor: "#c13b3e" }}>
            <Button vertical>
              <Icon name="contact" style={{ color: "white" }} />
              <Text style={{ color: "white" }}>Account</Text>
            </Button>
            <Button vertical onPress={() => navigate("Home")}>
              <Icon name="home" style={{ color: "white" }} />
              <Text style={{ color: "white" }}>Home</Text>
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

HomeScreen.navigationOptions = {
  header: null,
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
