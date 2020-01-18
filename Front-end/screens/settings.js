import React, { Component } from "react";
import { StyleSheet, View, Dimensions, Alert, Picker } from "react-native";
import {
  Card,
  CardItem,
  Text,
  Content,
  Footer,
  FooterTab,
  Button,
  Icon,
  Container
} from "native-base";
import { authenticate } from "../reducers/actions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Dialog, {
  ScaleAnimation,
  DialogTitle,
  DialogFooter,
  DialogButton,
  DialogContent
} from "react-native-popup-dialog";

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

const screenWidth = Math.round(Dimensions.get("window").width);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
      currentacc: null
    };
  }

  logOutHandler = () => {
    const { navigate } = this.props.navigation;
    Alert.alert("Log out", "Are you sure you want to log out?", [
      { text: "Cancel" },
      { text: "Log out", onPress: () => navigate("Login") }
    ]);
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Settings</Text>
        </View>
        <View style={styles.body}>
          <Card>
            <CardItem
              style={styles.cardStyle}
              header
              button
              onPress={() => {
                this.setState({ visible: true });
              }}
            >
              <Text style={styles.settingsFont}>My QR Code</Text>
            </CardItem>
            <CardItem
              style={styles.cardStyle}
              header
              button
              onPress={this.logOutHandler.bind(this)}
            >
              <Text style={styles.settingsFont}>Log Out</Text>
            </CardItem>
            <CardItem
              style={styles.cardStyle}
              header
              button
              onPress={() => alert("add this later.")}
            >
              <Text style={styles.settingsFont}>TODO</Text>
            </CardItem>
          </Card>

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
                title="QR Code Setting"
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
            <DialogContent style={{ width: screenWidth - 30 }}>
              <View style={{ flexDirection: "row" }}>
                <View style={{ flex: 1, marginTop: 10 }}>
                  <Text>Color :</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Picker
                    selectedValue={this.state.color}
                    style={{ height: 50, width: 130 }}
                    onValueChange={(itemValue, itemIndex) =>
                      this.setState({ color: itemValue })
                    }
                  >
                    <Picker.Item label="Black" value="black" />
                    <Picker.Item label="Red" value="red" />
                  </Picker>
                </View>
              </View>
            </DialogContent>
          </Dialog>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column"
  },
  cardStyle: {
    backgroundColor: "#c13b3e",
    borderRadius: 5,
    margin: 20
  },
  settingsFont: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#fff"
  },
  qrtitle: {
    color: "red",
    fontSize: 16.5,
    width: "100%",
    textAlign: "center",
    fontWeight: "bold",
    marginTop: 20
  },
  title: {
    color: "white",
    fontSize: 16.5,
    width: "100%",
    textAlign: "center",
    fontWeight: "bold",
    marginTop: 40
  },
  header: {
    flex: 0.15,
    backgroundColor: "#c13b3e",
    alignItems: "center",
    justifyContent: "center"
  },
  body: {
    flex: 0.85
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
