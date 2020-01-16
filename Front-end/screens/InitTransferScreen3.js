import React, { useState, useEffect, Component } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
//import { BarCodeScanner } from 'expo';
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

    const { width } = Dimensions.get('window')
    const qrSize = width * 0.7

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
    _handleBarCodeRead = ({type, data}) => {
      const { navigate } = this.props.navigation;
      console.log(data);
      this.setState({scanned: true});
      navigate('AmountQR', {data: data});
      //alert(`type ${type} and data ${data}`);
      //Do action when Code is scanned
      }



render() {
    const { navigate } = this.props.navigation;
    const screenWidth = Math.round(Dimensions.get("window").width);
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
        style={{ backgroundColor: "#c13b3e", padding: 20, height: 50 }}
      >
        <Left>
          <Button transparent>
            <Icon style={{ color: "white", marginLeft: 8 }} name="arrow-back" />
          </Button>
        </Left>
        <Title style={styles.headerText}>Scan QR Code</Title>
      </Header>

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
              marginLeft: 13,
              marginBottom: 10
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
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          justifyContent: "flex-end",
          //marginVertical: 100,
          //marginHorizontal: 10,
          //marginBottom: 130
        }}
      >
      <BarCodeScanner
        onBarCodeScanned={this._handleBarCodeRead}
        style={[StyleSheet.absoluteFill, styles.barcodeScanner]}/>
        {/*<Text style={styles.description}>Scan your QR code</Text>
        <Image
          style={styles.qr}
          source={require('../assets/img/QR.png')}
        />*/}

        {scanned && (
          <Button
            style={{ backgroundColor: "#c13b3e" }}
            onPress={() => this.setState({ scanned: false })}
          >
            <Text
              style={{
                alignItems: "center",
                justifyContent: "center",
                color: "black"
              }}
            >
              Tap to scan another QR code
            </Text>
          </Button>
        )}
      </View>

      <Text
        onPress={() => this.props.navigation.pop()}
        style={styles.cancel}>
        Cancel
      </Text>
      <Footer style={{ backgroundColor: "#c13b3e", padding: 10, height: 80}}>
        <Text style={styles.footerText}>
          Scan the selected beneficiary QR code {"\n"} to proceed to OTP
        </Text>
      </Footer>
    </Container>
  );
 }
}

const styles = StyleSheet.create({
  headerText: {
    color: "white",
    fontSize: 20,
    width: "100%",
    fontWeight: "bold",
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingTop: 5
  },
  footerText: {
    color: "white",
    fontSize: 18,
    width: "100%",
    fontWeight: "normal",
    textAlign: 'center',
    margin: 5,
    padding: 5

  },
  barcodeStyle: {
    marginTop: '20%',
    marginBottom: '20%',
    width: qrSize,
    height: qrSize,
  },
  qr: {
    marginTop: '20%',
    marginBottom: '20%',
    width: qrSize,
    height: qrSize,
  },
  description: {
    fontSize: width * 0.04,
    marginTop: '10%',
    textAlign: 'center',
    width: '20%',
    color: 'white',
  },
  cancel: {
    fontSize: width * 0.05,
    textAlign: 'center',
    width: '70%',
    color: '#000',
    marginLeft: 'auto',
    marginRight:'auto',
    marginBottom: '5%'
  },
});

//export default InitTransferq;
export default connect(mapStateToProps, mapDispatchToProps)(InitTransfer3);
