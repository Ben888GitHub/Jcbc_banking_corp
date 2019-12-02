import React, { Component } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { AppLoading } from 'expo';
//import { Icon } from "react-native-vector-icons";
import {
    Container, Text, Header, Content, Button,
    Success, Footer, FooterTab, Title, Icon
} from 'native-base';
import * as Font from 'expo-font';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { getStatusBarHeight } from 'react-native-status-bar-height';

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      Museo: require("../fonts/museosanscyrl-300.ttf"),
      MuseoBold: require("../fonts/museosanscyrl-700.ttf"),
      MuseoSemiBold: require("../fonts/museosanscyrl-500.ttf"),
      ...Ionicons.font
    });
    this.setState({ isReady: true });
  }

  render() {
    const { navigate } = this.props.navigation; //navigation is always a props

    if (!this.state.isReady) {
      return <AppLoading />;
    }

    return (
      <Container>
        <Header style={{ paddingTop: 30, backgroundColor: "#B22222" }}>
          <Title style={{ color: "white" }}>Mobile Banking Apps</Title>
        </Header>

        <Content>
          <View
            style={{
              padding: 10,
              flex: 1,
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center"
            }}
          >

            <TouchableOpacity
              onPress={() => navigate('Transfer')}
              style={style.btn}>
              <View style={style.btn_content}>
              <Text style={style.txt}>
                Transfer
                                
              </Text>
              <Ionicons style={style.icon_default} size={50} name="ios-swap"/>
              </View>
            </TouchableOpacity>
            {/* */}
            <View style={style.btn_container}>
              <TouchableOpacity onPress={() => alert("In Development")}
               style={style.btn_alt}>
                <View style={style.btn_content}>
                 <Text style={style.txt}>
                    Account
                  </Text>
                  <MaterialIcons style={style.icon_default} name="person" size={45} />
                </View>
              </TouchableOpacity>
                        
              <TouchableOpacity onPress={() => alert("In Development")}
                style={style.btn_alt}>
                <View style={style.btn_content}>
                  <Text style={style.txt}>
                    Pay
                  </Text>
                  <MaterialIcons style={style.icon_default} name="payment" size={45} />
                </View>
              </TouchableOpacity>
            </View>

            <Button
              onPress={() => navigate("Transfer2")}
              style={{
                height: 60,
                backgroundColor: "#B22222",
                margin: 20
              }}
            >
              <Text style={{ margin: 10, fontWeight: "700", color: "white" }}>
                Go to Transfer2 screen
              </Text>
              </Button>
              <Button
              onPress={() => navigate("TransferConfirm")}
              style={{
                height: 60,
                backgroundColor: "#B22222",
                margin: 20
              }}
            >
              <Text style={{ margin: 10, fontWeight: "700", color: "white" }}>
                Go to TransferConfirm screen
              </Text>
            </Button>
          </View>
        </Content>
        

        <Footer>
          <FooterTab style={{ backgroundColor: "#B22222" }}>
            <Button>
              <Icon style={{ color: "white" }} name="home" />
            </Button>
            <Button>
              <Icon style={{ color: "white" }} name="person" />
            </Button>
            <Button>
              <Icon style={{ color: "white" }} name="logo-angular" />
            </Button>
            <Button>
              <Icon style={{ color: "white" }} name="settings" />
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}

const style = StyleSheet.create({
  btn:{
      height: 75,
      width: 250,
      backgroundColor: '#B22222',
      paddingHorizontal: 10,
      borderRadius: 5,
      marginTop: 10
  },

  btn_alt:{
      height: 100,
      width: 150,
      backgroundColor: '#B22222',
      paddingHorizontal: 10,
      borderRadius: 5,
      margin: 10
  },

  btn_content:{
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 5,
      margin: 10
  },

  btn_container:{
      flex: 1,
      padding: 15,
      flexDirection: 'row',
      justifyContent: 'space-between'
  },

  txt:{
      fontWeight: '700',
      color: 'white' 
  },
  
  icon_default:{
      color: 'white',
      
  }
});