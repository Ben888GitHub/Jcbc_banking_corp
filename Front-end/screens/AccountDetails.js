import React from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Image,
  Text,
  Button
} from "react-native";
import { AppLoading } from "expo";
import { Container, Content, Card, CardItem } from "native-base";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { authenticate } from "../reducers/actions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Ionicons } from "@expo/vector-icons";
import Dialog, {
  ScaleAnimation,
  DialogTitle,
  DialogFooter,
  DialogButton,
  DialogContent
} from "react-native-popup-dialog";
import QRCode from "react-native-qrcode";

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

class AccountDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
      currentacc: null
    };
  }

  componentWillMount = () => {
    let element = this.props.navigation.getParam("element");
    this.setState({ currentacc: element });
  };

  async componentDidMount() {
    this.setState({ isReady: true });
  }

  accNumberString = aString => {
    let arr = fastChunkString(aString, { size: 4, unicodeAware: false });
    return arr[0] + " " + arr[1] + " " + arr[2] + " ";
  };

  render() {
    let dataGrid = [
      [
        {
          stackName: "Transfer",
          navigation: "Transfer",
          icon: "md-done-all"
        },
        {
          stackName: "History",
          navigation: "History",
          icon: "md-compass"
        }
      ],
      [
        {
          stackName: "Cards",
          navigation: "Cards",
          icon: "md-medical"
        },
        {
          stackName: "Settings",
          navigation: "Settings",
          icon: "md-checkmark-circle-outline"
        }
      ]
    ];
    const { navigate } = this.props.navigation; //navigation is always a props
    let { currentacc } = this.state;
    let yelloBackgrd = "#eee8de";
    console.log(this.props.currentUser);

    if (!this.state.isReady) {
      return <AppLoading />;
    }

    return (
      <Container
        style={{ paddingTop: 70, padding: 10 }}
      >
        <Content>
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
                  // margin: 20,
                }}
              >
                Account Details
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
              {/* <Image style={style.settingsLogo}
                                source={require('../assets/settings.png')} ></Image> */}
            </TouchableOpacity>
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

            <View style={{ marginBottom: 12 }}>
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

            <View>
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

            <Button
              title="My QR Code"
              color="#ed112a"
              style={{
                marginTop: 30
              }}
              onPress={() => {
                this.setState({ visible: true });
              }}
            />
            <Dialog
              visible={this.state.visible}
              onTouchOutside={() => {
                this.setState({ visible: false });
              }}
              dialogAnimation={
                new ScaleAnimation({
                  initialValue: 0,
                  useNativeDriver: true
                })
              }
              dialogTitle={
                <DialogTitle
                  title={currentacc.accname}
                //   style={styles.qrtitle}
                //   hasTitleBar={false}
                //   align="center"
                />
              }
              footer={
                <DialogFooter>
                  <DialogButton
                    text="Dismiss"
                    onPress={() => {
                      this.setState({ visible: false });
                    }}
                  />
                </DialogFooter>
              }
            >
              <DialogContent>
                <View style={styles.qrview}>
                  <Text>{currentacc.accnumber}</Text>
                  <QRCode value={currentacc.accnumber} size={200} />
                </View>
              </DialogContent>
            </Dialog>
          </View>

          {dataGrid.map((element, key) => {
            return (
              <View
                key={key}
                style={{
                  flex: 1,
                  flexDirection: "row",
                  justifyContent: "space-between"
                }}
              >
                {element.map((sub_element, sub_key) => {
                  return (
                    <Card
                      transparent
                      key={sub_key}
                      style={[
                        {
                          borderWidth: 0,
                          borderColor: "transparent",
                          backgroundColor: "transparent",
                          width: "48%"
                        }
                      ]}
                    >
                      <CardItem
                        style={{
                          borderRadius: 12,
                          aspectRatio: 1,
                          flexDirection: "column",
                          alignItems: "flex-start",
                          justifyContent: "flex-end",
                          backgroundColor: yelloBackgrd
                        }}
                      >
                        <TouchableOpacity
                          style={{ padding: 10 }}
                          onPress={() => {
                            this.props.navigation.navigate(
                              sub_element.navigation,
                              {
                                element: currentacc
                              }
                            );
                          }}
                        >
                          <Ionicons
                            name={sub_element.icon}
                            size={56}
                            color={"#cac0b6"}
                          // color={'#b61731'}
                          />
                          <Text
                            style={{
                              fontFamily: "MuseoBold",
                              fontWeight: "400",
                              fontSize: 20
                            }}
                          >
                            {sub_element.stackName}
                          </Text>
                        </TouchableOpacity>
                      </CardItem>
                    </Card>
                  );
                })}
                {/* <View style={{ height: 2000 }}></View> */}
              </View>
            );
          })}
        </Content>
      </Container>
    );
  }
}

AccountDetails.navigationOptions = {
  // headerStyle: {
  //     shadowColor: 'transparent',
  //     borderBottomWidth: 0,
  //     elevation: 0,
  // }
  headerTransparent: true
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

export default connect(mapStateToProps, mapDispatchToProps)(AccountDetails);
