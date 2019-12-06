import React, { Component } from 'react';
import { View, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { AppLoading } from 'expo';
//import { Icon } from "react-native-vector-icons";
import {
  Container, Text, Header, Content, Button,
  Success, Footer, FooterTab, Title, Icon
} from 'native-base';
import * as Font from 'expo-font';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import reducer from '../reducers/reducers';
import { authenticate } from '../reducers/actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


// Redux
const mapStateToProps = (state) => {
  const { currentUser } = state;
  return { currentUser };
};

const mapDispatchToProps = dispatch => (
  bindActionCreators({
      authenticate,
  }, dispatch)
);


class HomeScreen extends React.Component {
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
        <ImageBackground source={require('../assets/transfer.jpg')} resizeMode='cover' style={style.backgroundImage}>
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
                  <MaterialIcons style={style.icon_default} name="person" size={65} />
                </View>
              </TouchableOpacity>
                        
              <TouchableOpacity onPress={() => alert("In Development")}
                style={style.btn_alt}>
                <View style={style.btn_content}>
                  <Text style={style.txt}>
                    Pay
                  </Text>
                  <MaterialIcons style={style.icon_default} name="payment" size={65} />
                </View>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              onPress={() => alert("In development")}
              style={style.btn}>
              <View style={style.btn_content}>
              <Text style={style.txt}>
                Withdrawal
                                
              </Text>
              <Ionicons style={style.icon_default} size={50} name="ios-cash"/>
              </View>
            </TouchableOpacity>
            {/*
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
            </Button>*/}
            </View>

          </Content>
        </ImageBackground>

        <Footer>
          <FooterTab style={{ backgroundColor: "#B22222" }}>
            <Button>
              <Icon style={{ color: "white" }} name="home" />
            </Button>
            <Button>
              <Icon style={{ color: "white" }} name="person" />
            </Button>
            <Button>
              <Icon style={{ color: "white" }} name="settings" />
            </Button>
            <Button onPress={() => navigate('Login')}>
              <Icon style={{ color: "white" }} name="ios-exit" />
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}

const style = StyleSheet.create({
  btn:{
      height: 110,
      width: 250,
      backgroundColor: '#B22222',
      paddingHorizontal: 10,
      borderRadius: 5,
      marginTop: 10,
      opacity: 80
  },

  btn_alt:{
      height: 175,
      width: 150,
      backgroundColor: '#B22222',
      paddingHorizontal: 10,
      borderRadius: 5,
      margin: 10,
      opacity: 80
  },

  btn_content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    margin: 10
  },

  btn_container: {
    flex: 1,
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  txt:{
      fontWeight: '700',
      color: 'white',
      fontSize: 24,
      //fontFamily 
  },

  icon_default: {
    color: 'white',

  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    //resizeMode: 'cover'
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
