import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, Dimensions, StatusBar, TouchableWithoutFeedback, Keyboard, TouchableOpacity, SafeAreaView, ScrollView, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import * as Animatable from 'react-native-animatable';
// import { Header } from 'react-navigation-stack';
import { Header, Container, Left, Body, Title, Right, Card, CardItem, Picker, Icon, Button, Item, Input } from 'native-base';
import { Ionicons } from '@expo/vector-icons';

import HeaderImageScrollView, { TriggeringView } from 'react-native-image-header-scroll-view';

import { AppLoading } from 'expo';
import { NavigationEvents } from 'react-navigation';
import { Asset } from 'expo-asset';

import red from '../assets/red2.jpg';

import reducer from '../reducers/reducers';
import { authenticate } from '../reducers/actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { RNSlidingButton, SlideDirection } from 'rn-sliding-button';
//import { SlideButton, SlideDirection } from 'react-native-slide-button';

// const MIN_HEIGHT = Header.HEIGHT;
const MIN_HEIGHT = 110;
const MAX_HEIGHT = 250;

let tempData = [
    'Alex Tjuatja', 'Ben Ryan', 'Kylæ Ang', 'Zwe Nyan', 'Hung Nguyen', "Harry Kyaw"
];

//let tempData = this.state.currentUser.dependencies;
const mapStateToProps = (state) => {
    const { currentUser } = state;
    return { currentUser };
};

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        authenticate,
    }, dispatch)
);


class InitTransferScreen extends Component {
    constructor(props) {
        super(props);
        this.scroller = null;
        this.state = {
            selected: "Ryan",
            showNavTitle: false,
            imageStatus: false,
            isReady: false,
        };
    };



    static navigationOptions = {
        headerRight: () => (
            <Button
                onPress={() => alert('This is a button!')}
                title="Info"
                color="#fff"
            />
        ),
    };

    onValueChange(value) {
        const { navigate } = this.props.navigation;
        if (value === "key1") {
            console.log(value)
            navigate('Transfer2')
        }
        /*this.setState({
          selected: value
        })*/;
    }

    _handletransfer = () => {
        axios
            .post(
                "https://ixmhlhrubj.execute-api.ap-southeast-1.amazonaws.com/dev/transfer",
                {
                    sender_username: this.state.username,
                    soure_acc_num: this.state.accountNumber,
                    transfer_amount: this.amount,
                    dest_acc_num: this.beneficiaryAccNumber
                }
            )
            .then(res => {
                console.log(res.statusText)
                console.log(res.data)
                console.log(res.status)
                //alert("Ding")
                Toast.show({
                    text: "Transfer Successful!",
                    buttonText: "OK"
                })
                this.props.navigation.push('TransferConfirm')
            })

            .catch(err => {
                console.error(err)
                console.log(err)
                alert('Invalid Details!')
            });
    }

    render() {
        //const { navigate } = this.props.navigation; //navigation is always a props
        const TransferAlert = () => {
            Alert.alert("You Have Successfully Transferred");
        };
        const screenWidth = Math.round(Dimensions.get("window").width);
        const marginNum = 30;
        console.log(this.props.currentUser);
        let tempDataList = this.props.currentUser.dependencies.map((value, index) => {
            return (
                <Card key={index}
                    style={{
                        borderRadius: 10,
                        borderColor: "transparent",
                        borderStyle: null,
                        width: 170,
                        height: 170,
                        marginTop: marginNum,
                        marginBottom: marginNum,
                        marginLeft: 15,
                        shadowColor: "#000",
                        shadowOffset: {
                            width: 0,
                            height: 3,
                        },
                        shadowOpacity: 0.16,
                        shadowRadius: 20,
                        elevation: 5,

                        flex: 1,
                        flexDirection: 'column',
                        justifyContent: 'space-evenly'
                    }}
                >
                    <CardItem header style={{ borderRadius: 10 }}>

                        <View style={{ flex: 1, flexDirection: 'column' }}>
                            <Text style={{
                                color: '#c13b3e',
                                fontSize: 25
                            }}>{value.accname}</Text>
                            {/*
                            <Text style={{
                                fontWeight: '700',
                                color: '#c13b3e',
                                fontSize: 25
                            }}>Nothing</Text>*/}
                        </View>

                    </CardItem>

                    <CardItem style={{
                        borderRadius: 0,
                        borderBottomLeftRadius: 10, borderBottomRightRadius: 10,
                        backgroundColor: '#c13b3e', height: 70, flex: 1, flexDirection: 'column',
                        alignItems: 'center'
                    }}>
                        <Body>
                            <Text style={{ color: 'white', fontWeight: '700' }}>Account Number</Text>
                            <Text style={{ color: 'white' }}>{value.accnumber}</Text>
                        </Body>
                    </CardItem>
                </Card >
            );
        });

        if (this.state.isReady !== true) {
            return <View style={{ opacity: 0 }}>
                <Image
                    onLoad={() => { this.setState({ isReady: true }) }}
                    source={require('../assets/red2.jpg')}
                />
            </View>;
        }

        return (
            <View style={{ flex: 1 }}>
                <StatusBar barStyle="light-content" />
                <HeaderImageScrollView
                    maxHeight={MAX_HEIGHT}
                    minHeight={MIN_HEIGHT}
                    maxOverlayOpacity={0.8}
                    minOverlayOpacity={0.5}
                    overlayColor="#c13b3e"
                    fadeOutForeground
                    renderHeader={() => <Image
                        source={require('../assets/red2.jpg')}
                        style={styles.image} />}
                    //Render the small navbar:
                    renderFixedForeground={() => (
                        <Animatable.View
                            style={styles.navTitleView}
                            ref={navTitleView => {
                                this.navTitleView = navTitleView;
                            }}>
                            <View style={{
                                width: '100%',
                                flexDirection: 'row',
                                alignItems: 'center',
                                marginTop: 20
                            }}>
                                <TouchableOpacity
                                    onPress={() => { this.props.navigation.goBack() }}
                                >
                                    <Ionicons style={{ marginLeft: 15 }} name="ios-arrow-back" size={32} color="white" />
                                </TouchableOpacity>
                                <Title style={{ color: 'white', marginLeft: 15, fontSize: 25 }}>Transfer</Title>
                            </View>

                        </Animatable.View>
                    )}

                    //Render the big navbar:
                    renderForeground={() => (

                        <View style={styles.titleContainer}>
                            <TouchableOpacity onPress={() => { this.props.navigation.goBack() }}>
                                <Text style={styles.imageTitle}>Bank Transfer</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                >
                    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : null}
                        style={{ flex: 1 }}>
                        <SafeAreaView style={{ flex: 1 }}>
                            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                                <View style={{
                                    flex: 1,
                                    justifyContent: "flex-end",
                                }}>
                                    <TriggeringView
                                        style={{
                                            padding: 20,
                                            backgroundColor: '#c13b3e'
                                        }}
                                        onHide={() => this.navTitleView.fadeInUp(500)}
                                        onDisplay={() => this.navTitleView.fadeOutDown(500)}
                                    >
                                        <View>
                                            <Text style={{ fontWeight: '700', fontSize: 20, color: 'white' }}>JCBC Saving Account</Text>
                                        </View>
                                        <View>
                                            <Text style={{ color: 'white' }}>{this.props.navigation.state.params.element.accnumber}</Text>
                                        </View>
                                    </TriggeringView>


                                    {/* MAIN CONTENT IS HERE */}
                                    <View style={styles.section}>
                                        <Text style={{ fontSize: 18 }}>Balance Total: {this.props.navigation.state.params.element.currency} {this.props.navigation.state.params.element.balance}</Text>
                                    </View>
                                    {/* THE PICKER DROPDOWN FOR TRANSFER OPTIONS */}
                                    <Text style={{
                                        fontWeight: "bold",
                                        marginTop: 15,
                                        fontSize: 17,
                                        marginLeft: 13,
                                        marginBottom: 5
                                    }}>
                                        Transfer Options
                            </Text>
                                    <Card
                                        style={{
                                            margin: 20,
                                            borderRadius: 5,
                                            flexDirection: "row",
                                            alignItems: "center",
                                            justifyContent: "space-between",
                                            width: 390,
                                            marginLeft: 13
                                        }}>
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
                                        >
                                            <Picker.Item label="To saved beneficiaries" value="Ryan" />
                                            <Picker.Item label="I want to input manually" value="key1" />
                                        </Picker>
                                    </Card>
                                    <Text style={[styles.sectionTitle, { padding: 20 }]}>
                                        Send to saved beneficiaries:
                            </Text>
                                    <View style={[
                                        styles.section,
                                        {
                                            paddingLeft: 0,
                                            paddingRight: 0
                                        }
                                    ]}>
                                        {/* THIS IS THE Horizontal ScrollView for the SAVED BENEFICIARIES */}
                                        <ScrollView
                                            ref={(ref) => this.scroller = ref}
                                            style={{
                                                marginBottom: 20
                                            }}
                                            horizontal="true"
                                        >
                                            {tempDataList}
                                        </ScrollView>
                                    </View>
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
                                        style={{ borderRadius: 5.5, width: 390, marginLeft: 12 }}>
                                        <Input
                                            pattern={[
                                                '(?=.*\\d)', // number required
                                            ]}
                                            keyboardType={'numeric'}
                                            placeholder="Enter Amount" />

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
                                            onSlidingSuccess={TransferAlert}
                                            slideDirection={SlideDirection.RIGHT}>
                                            <Text style=
                                                {{
                                                    fontWeight: "bold",
                                                    justifyContent: "center",
                                                    alignItems: "center",
                                                    marginLeft: 16,
                                                    fontSize: 16,
                                                    color: "#fff"
                                                }}>
                                                Slide To Transfer >
                                            </Text>
                                        </RNSlidingButton>
                                    </View>
                                </View>
                            </TouchableWithoutFeedback>
                        </SafeAreaView>
                    </KeyboardAvoidingView>
                </HeaderImageScrollView>
            </View >
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

export default connect(mapStateToProps, mapDispatchToProps)(InitTransferScreen);
