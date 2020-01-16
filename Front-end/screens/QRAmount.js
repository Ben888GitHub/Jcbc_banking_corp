import React from 'react';
import { View, TouchableOpacity, StyleSheet, ImageBackground, Image, Text, StatusBar, Dimensions, Alert } from 'react-native';
import { AppLoading } from 'expo';
import { Container, Content, Card, CardItem, Item, Input } from 'native-base';
import { authenticate } from '../reducers/actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { RNSlidingButton, SlideDirection } from "rn-sliding-button";
import axios from "axios";
const mapStateToProps = (state) => {
    const { currentUser } = state;
    return { currentUser };
};

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        authenticate,
    }, dispatch)
);

const fastChunkString = require('fast-chunk-string');

_handletransfer = () => {
    console.log(this.props.currentUser.accname);
    console.log(this.state.accnum);
    console.log(this.state.amount);
    console.log(this.state.dest_acc);
  };

class QRAmount extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isReady: false,
            dest_acc: null
        };
    }

    async componentDidMount() {
        this.setState({ isReady: true });
    }

    componentWillMount = () => {
        let data = this.props.navigation.getParam('data');
        this.setState({ dest_acc: data });
    }

    setvalue(accnum) {
        this.state.accnum = accnum;
        console.log(accnum);
        console.log(this.props.currentUser.accname);
    }

    accNumberString = (aString) => {
        let arr = fastChunkString(aString, { size: 4, unicodeAware: false });
        return (arr[0] + " " + arr[1] + " " + arr[2] + " ");
    }

    render() {
    console.log(this.props.currentUser);
    const { navigate } = this.props.navigation;
    const screenWidth = Math.round(Dimensions.get("window").width);
    //let acclist = this.props.currentUser.accounts.map((value, key) => {
            return (
                <Content>
                <Text style={{
                fontFamily: 'MuseoBold',
                fontSize: 30,
                fontWeight: '400',
                margin: 20,
              }}>Choose Your Account</Text>
                {this.props.currentUser.accounts.map((value, key) => (
                    <Card key={key} style={{
                        borderColor: 'transparent',
                        backgroundColor: 'transparent',
                        marginBottom: 8,
                        borderRadius: 20,
                    }}>
                        <TouchableOpacity
                            onPress={() => {
                            this.setvalue(value.accnumber);
                            //this.setState({ indexToHaveBorder: index });
                            }}
                        >
                            <ImageBackground source={require('../assets/bank.jpg')} resizeMode='cover'
                            style={{}}
                            imageStyle={{ borderRadius: 21 }}>
                            <CardItem style={{
                                height: 150,
                                backgroundColor: key !== 0 ? 'rgba(0,0,0,0.7)' : 'rgba(178,34,34,0.7)',
                                borderRadius: 20,
                            }}>
                                <View style={{
                                padding: 10,
                                height: '100%',
                                flexGrow: 1,
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                alignItems: 'flex-start'
                                }}>
                                <View>
                                    <Text style={{
                                    marginBottom: 6,
                                    opacity: 0.5,
                                    color: 'white'
                                    }}>{key === 0 ? 'Default Account' : 'Foreign Currency Account'}</Text>
                                    <Text style={{
                                    color: 'white',
                                    fontFamily: 'MuseoSemiBold',
                                    fontWeight: '400'
                                    }}>{this.accNumberString(value.accnumber)}</Text>
                                </View>

                                <View>
                                    <Text style={{ fontSize: 23, fontFamily: 'MuseoBold', fontWeight: '400', color: 'white' }}>
                                    {value.currency}
                                    </Text>
                                </View>
                                </View>

                                <View style={{ height: '100%', padding: 10, justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                                <Text style={{ color: 'white', opacity: 0.5, marginBottom: 6 }}>{'Total balance'.toUpperCase()}</Text>
                                <Text style={{
                                    color: 'white', fontFamily: 'MuseoBold',
                                    fontWeight: '400', fontSize: 22
                                }}>
                                    {value.balance}
                                </Text>
                                </View>
                            </CardItem>
                            </ImageBackground>
                        
                        </TouchableOpacity>
                    </Card>
            ))}
            <Text
            style={{
              fontWeight: "bold",
              marginTop: 20,
              fontSize: 17,
              marginLeft: 13,
              marginBottom: 5
            }}
            >
            Amount:
            </Text>
            <Item
            regular
            style={{
              borderRadius: 5.5,
              width: screenWidth - 24,
              marginLeft: 12
            }}
            >
                <Input
                value={this.state.amount}
                keyboardType={"numeric"}
                onFocus={() => {
                    this.setState({ amount: "" });
                }}
                onChangeText={text => {
                    this.setState({ amount: text });
                }}
                />
            </Item>
            <View style={{ alignItems: "center", padding: 15 }}>
            <RNSlidingButton
              style={{
                width: 240,
                borderRadius: 10,
                height: 60,
                margin: 25,
                backgroundColor: "#c13b3e"
              }}
              height={70}
              onSlidingSuccess={() => {
                this._handletransfer();
              }}
              successfulSlidePercent={90}
              slideDirection={SlideDirection.RIGHT}
            >
              <View>
                <Text
                  style={{
                    fontWeight: "bold",
                    justifyContent: "center",
                    alignItems: "center",
                    marginLeft: 16,
                    fontSize: 16,
                    color: "#fff"
                  }}
                >
                  Slide To Transfer
                </Text>
              </View>
            </RNSlidingButton>
          </View>
        </Content>
        );
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(QRAmount);