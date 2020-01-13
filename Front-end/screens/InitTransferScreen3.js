import React, { useState, useEffect, Component } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import * as Permissions from 'expo-permissions';
import { authenticate } from "../reducers/actions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import axios from "axios";
import {
  Header,
  Footer,
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
  Input,
  Button,
  Title
} from "native-base";
import { func } from "prop-types";
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

class InitTransfer3 extends Component{
    state={
 //       [hasPermission, setHasPermission] = useState(null);
//      [scanned, setScanned] = useState(false);
        hasPermission: null,
        scanned: false
    };
    
    async componentDidMount() {
        this.getPermissionsAsync();
    }

    getPermissionsAsync = async () => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasPermission: status === 'granted' });
    };
 /*
    useEffect(() => {
        (async () => {
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        setHasPermission(status === "granted");
        })();
    }, []);
*/
    onValueChange(value) {
        const { navigate } = this.props.navigation;
        if (value === "Ryan") {
        console.log(value)
        navigate("Transfer")
        }
        else if(value === "key1"){
            console.log(value)
            navigate("Transfer2")
        }
    }


render(){
    const screenWidth = Math.round(Dimensions.get("window").width);
    /*const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    };*/
    const { hasPermission, scanned } = this.state;

    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
    <Container style={{ backgroundColor: "#f7f7f7" }}>
      <Header
        span
        style={{ backgroundColor: "#c13b3e", padding: 20, height: 120 }}
      >
        <Left>
          <Button transparent>
            <Icon style={{ color: "white", marginLeft: 8 }} name="arrow-back" />
          </Button>
        </Left>
        <Title style={styles.headerText}>Scan QR Code</Title>
      </Header>
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          justifyContent: "flex-end",
          marginVertical: 100,
          marginHorizontal: 20,
          marginBottom: 130
        }}
      >
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />

        {scanned && (
          <Button
            style={{ backgroundColor: "#c13b3e" }}
            onPress={() => setScanned(false)}
          >
            <Text
              style={{
                alignItems: "center",
                justifyContent: "center",
                color: "white"
              }}
            >
              Tap to scan another QR code
            </Text>
          </Button>
        )}
      </View>
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
              //onValueChange2={val => this.onValueChange2(val)}
            >
              <Picker.Item label="To beneficiaries' QR Code" value="Ryan2" />
              <Picker.Item label="I want to input manually" value="key1" />
              <Picker.Item label="To saved beneficiaries" value="Ryan" />
              
            </Picker>
            </Card>
      <Footer style={{ backgroundColor: "#c13b3e", padding: 20, height: 120 }}>
        <Text style={styles.footerText}>
          Scan the selected beneficiary QR code {"\n"} to proceed to OTP
        </Text>
      </Footer>
    </Container>
  );
 }
    handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    };
}


const styles = StyleSheet.create({
  headerText: {
    color: "white",
    fontSize: 20,
    width: "100%",
    fontWeight: "bold",
    marginLeft: 240,
    marginVertical: 20
  },
  footerText: {
    color: "white",
    fontSize: 18,
    width: "100%",
    fontWeight: "normal"
  }
});

//export default InitTransferq;
export default connect(mapStateToProps, mapDispatchToProps)(InitTransfer3);
