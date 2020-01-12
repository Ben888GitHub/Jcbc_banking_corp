import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
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
  Button
} from "native-base";

function InitTransfer3() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

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
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
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
      <Footer style={{ backgroundColor: "#c13b3e", padding: 20, height: 120 }}>
        <Text style={styles.footerText}>
          Scan the selected beneficiary QR code {"\n"} to proceed to OTP
        </Text>
      </Footer>
    </Container>
  );
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

export default InitTransfer3;
