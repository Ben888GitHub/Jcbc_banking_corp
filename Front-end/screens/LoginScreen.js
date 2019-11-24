import React, { Component } from 'react';
import {
    StyleSheet, Text, View, Image,
    TextInput, Dimensions,
    StatusBar, TouchableOpacity, ScrollView, Keyboard, KeyboardAvoidingView,
} from 'react-native';
import SmoothPinCodeInput from 'react-native-smooth-pincode-input';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as Animatable from 'react-native-animatable';
// import { Header } from 'react-navigation-stack';
import { Header, Container, Left, Body, Title, Right, Card, CardItem, Button, Toast } from 'native-base';
import { Ionicons } from '@expo/vector-icons';

import HeaderImageScrollView, { TriggeringView } from 'react-native-image-header-scroll-view';
import { AppLoading } from 'expo';
import { NavigationEvents } from 'react-navigation';
import { Asset } from 'expo-asset';

import red from '../assets/red2.jpg';

// const MIN_HEIGHT = Header.HEIGHT;
let screenHeight = Math.round(Dimensions.get('window').height);
const MIN_HEIGHT = 160;
const MAX_HEIGHT = screenHeight * 0.4;

let tempData = [
    'Alex Tjuatja', 'Ben Ryan', 'Kylæ Ang', 'Zwe Nyan', 'Hung Nguyen'
];

class LoginScreen extends Component {
    constructor() {
        super();
        this.scroller = null;
        this.textinput = React.createRef();
        this.state = {
            showNavTitle: false,
            imageStatus: false,
            isReady: false,
            loginField: 'Username',
            nextPressed: false,
            code: ''
        };
    };

    whenFocused = () => {
        this.textinput.focus();
        this.myScrollView.scrollTo({ x: 0, y: screenHeight, animated: true });
    }

    render() {
        const marginNum = 10;
        const { navigate } = this.props.navigation;
        return (
            <KeyboardAvoidingView
                behavior="padding"
                enabled
                style={{ flex: 1 }}
            >
                <StatusBar barStyle="light-content" />
                <HeaderImageScrollView
                    ScrollViewComponent={ScrollView}
                    ref={component => { this.myScrollView = component; }}
                    maxHeight={MAX_HEIGHT}
                    minHeight={MIN_HEIGHT}
                    maxOverlayOpacity={0.8}
                    minOverlayOpacity={0.5}
                    overlayColor="black"
                    fadeOutForeground
                    renderHeader={() => <Image
                        source={require('../assets/bank.jpg')}
                        style={styles.image} />}

                    //Render the small navbar:
                    renderFixedForeground={() => (
                        <Animatable.View
                            style={styles.navTitleView}
                            ref={navTitleView => {
                                this.navTitleView = navTitleView;
                            }}
                        >

                            <View style={{
                                width: '100%',
                                flexDirection: 'row',
                                alignItems: 'center',
                                marginTop: 20
                            }}>
                                <Title style={{ color: 'white', marginLeft: 15, fontSize: 25 }}>Sign In</Title>
                            </View>

                        </Animatable.View>
                    )}

                    //Render the big navbar:
                    renderForeground={() => (

                        <View style={styles.titleContainer}>
                            <Text style={[styles.imageTitle, {
                                fontFamily: 'MuseoBold'
                            }]}>Sign In</Text>
                        </View>
                    )}
                >
                    <TriggeringView
                        style={{
                            backgroundColor: 'black'
                        }}
                        onHide={() => this.navTitleView.fadeInUp(500)}
                        onDisplay={() => this.navTitleView.fadeOutDown(500)}
                    >
                        <View style={{

                            flex: 1, flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between'
                        }}>
                            <TextInput
                                // placeholder={this.state.loginField}
                                value={this.state.loginField}
                                autoCapitalize={false}
                                onFocus={() => {
                                    this.setState({ loginField: '' });
                                }}
                                onChangeText={(text) => {
                                    this.setState({ loginField: text });
                                }}
                                onSubmitEditing={() => { this.whenFocused(); }}
                                style={[{
                                    flex: 0.6, padding: 15,
                                    fontFamily: 'MuseoBold',
                                    fontSize: 20,
                                    fontWeight: 'normal',
                                    color: 'white'
                                },
                                this.state.loginField === 'Username' ? { opacity: 0.5 } : { opacity: 1 }
                                ]} />

                            {this.state.loginField !== '' && this.state.loginField !== 'Username' && (
                                <TouchableOpacity
                                    style={{
                                        flex: 0.4,
                                        // backgroundColor: 'red',
                                        paddingRight: 15,
                                        height: '100%',
                                        alignItems: 'flex-end',
                                        justifyContent: 'center'
                                    }}
                                    onPress={() => {
                                        this.setState({ nextPressed: true });
                                        this.whenFocused();
                                    }}>
                                    <Ionicons
                                        name="md-arrow-round-forward"
                                        size={35}
                                        color="white" />
                                </TouchableOpacity>)}

                        </View>
                    </TriggeringView>


                    {/* MAIN CONTENT IS HERE */}

                    <View style={{
                        paddingLeft: 35,
                        paddingRight: 35,
                        height: screenHeight * 0.5,
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>

                        {this.state.loginField !== '' && this.state.loginField !== 'Username' ? (
                            <View>
                                <Text style={{ fontFamily: 'MuseoBold', fontSize: 15, marginBottom: marginNum }}>
                                    Please provide your pin code:
                                    </Text>

                                <SmoothPinCodeInput
                                    ref={x => this.textinput = x}
                                    // autoFocus={true}
                                    codeLength={6}
                                    value={this.state.code}
                                    onTextChange={code => {

                                        this.setState({ code });
                                        this.myScrollView.scrollTo({ x: 0, y: screenHeight, animated: true });
                                    }}
                                    onFulfill={this._checkCode}
                                    onBackspace={this._focusePrevInput}
                                />

                                <Button onPress={() => {
                                    navigate('Home');
                                    Toast.show({
                                        text: 'Welcome to JCBC Banking.',
                                        buttonText: 'Okay'
                                    });
                                }}
                                    style={{
                                        backgroundColor: 'black',
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        padding: 20,
                                        shadowColor: "#000",
                                        shadowOffset: {
                                            width: 0,
                                            height: 2,
                                        },
                                        marginTop: marginNum,
                                        marginBottom: marginNum,
                                        shadowOpacity: 0.25,
                                        shadowRadius: 3.84,
                                        elevation: 5,
                                    }}>
                                    <Text style={{
                                        fontSize: 15, fontFamily: 'MuseoBold',
                                        color: 'white'
                                    }}>Next</Text>
                                </Button>
                            </View>
                        ) : (
                                <View>
                                    <Text style={{ fontFamily: 'MuseoBold', fontSize: 15, marginBottom: marginNum }}>New to our bank?</Text>
                                    <Ionicons name="md-paper-plane" size={56} color="black" style={{ opacity: 0.2, marginBottom: marginNum }} />

                                    <Text style={{ fontFamily: 'Museo', fontSize: 18, marginBottom: marginNum + 10 }}>
                                        Let's just sign up today!
                                </Text>

                                    <Button onPress={() => {
                                        this.setState({ booked: true });
                                        Toast.show({
                                            text: 'We will get back to you soon.',
                                            buttonText: 'Okay'
                                        });
                                    }}
                                        style={{
                                            backgroundColor: 'black',
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            padding: 20,
                                            shadowColor: "#000",
                                            shadowOffset: {
                                                width: 0,
                                                height: 2,
                                            },
                                            marginBottom: marginNum,
                                            shadowOpacity: 0.25,
                                            shadowRadius: 3.84,
                                            elevation: 5,
                                        }}>
                                        <Text style={{
                                            fontSize: 15, fontFamily: 'MuseoBold',
                                            color: 'white'
                                        }}>Go to our nearest branch</Text>
                                    </Button>

                                </View>)}


                    </View>

                </HeaderImageScrollView>
            </KeyboardAvoidingView >
        );
    }

}


const styles = StyleSheet.create({
    image: {
        height: MAX_HEIGHT,
        width: Dimensions.get('window').width,
        alignSelf: 'stretch',
        resizeMode: 'cover',
    },
    title: {
        fontSize: 20,
    },
    name: {
        fontWeight: 'bold',
    },
    section: {
        padding: 20,
        // borderBottomWidth: 1,
        // borderBottomColor: '#cccccc',
        backgroundColor: 'white',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    sectionContent: {
        fontSize: 16,
        textAlign: 'justify',
    },
    keywords: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
    },
    keywordContainer: {
        backgroundColor: '#999999',
        borderRadius: 10,
        margin: 10,
        padding: 10,
    },
    keyword: {
        fontSize: 16,
        color: 'white',
    },
    titleContainer: {
        flex: 1,
        alignSelf: 'stretch',
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageTitle: {
        color: 'white',
        backgroundColor: 'transparent',
        fontSize: 24,
    },
    navTitleView: {
        height: MIN_HEIGHT,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 16,
        opacity: 0,
    },
    navTitle: {
        color: 'white',
        fontSize: 18,
        backgroundColor: 'transparent',
    },
    sectionLarge: {
        height: 600,
    },
});

export default LoginScreen;