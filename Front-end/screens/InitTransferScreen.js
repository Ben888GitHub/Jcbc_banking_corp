import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, Dimensions, StatusBar, TouchableOpacity, Button, ScrollView } from 'react-native';
import * as Animatable from 'react-native-animatable';
// import { Header } from 'react-navigation-stack';
import { Header, Container, Left, Body, Title, Right, Card, CardItem } from 'native-base';
import { Ionicons } from '@expo/vector-icons';

import HeaderImageScrollView, { TriggeringView } from 'react-native-image-header-scroll-view';
import tvShowContent from '../assets/tvShowContent';
import { AppLoading } from 'expo';
import { NavigationEvents } from 'react-navigation';
import { Asset } from 'expo-asset';

import red from '../assets/red2.jpg';

// const MIN_HEIGHT = Header.HEIGHT;
const MIN_HEIGHT = 110;
const MAX_HEIGHT = 250;

let tempData = [
    'Alex Tjuatja', 'Ben Ryan', 'Kylæ Ang', 'Zwe Nyan', 'Hung Nguyen'
];

class InitTransferScreen extends Component {
    constructor() {
        super();
        this.scroller = null;
        this.state = {
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

    render() {
        const marginNum = 30;
        let tempDataList = tempData.map((value, index) => {
            let widthSize = this.screenWidth * 0.4;
            return (
                <Card
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
                            }}>{value.split(' ')[0]}</Text>
                            <Text style={{
                                fontWeight: '700',
                                color: '#c13b3e',
                                fontSize: 25
                            }}>{value.split(' ')[1]}</Text>
                        </View>

                    </CardItem>

                    <CardItem style={{
                        borderRadius: 0,
                        borderBottomLeftRadius: 10, borderBottomRightRadius: 10,
                        backgroundColor: '#c13b3e', height: 70, flex: 1, flexDirection: 'column',
                        alignItems: 'center'
                    }}>
                        <Body>
                            <Text style={{ color: 'white', fontWeight: '700' }}>HSBC</Text>
                            <Text style={{ color: 'white' }}>Ending: 1245</Text>
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
                            }}
                        >

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
                            <Text style={{ color: 'white' }}>9999-9999-0000</Text>
                        </View>
                    </TriggeringView>


                    {/* MAIN CONTENT IS HERE */}
                    <View style={styles.section}>
                        <Text style={{ fontSize: 18 }}>Balace Total: €50,000</Text>
                    </View>

                    <View style={[
                        styles.section,
                        //  styles.sectionLarge
                    ]}>
                        <Text style={styles.sectionTitle}>Send to saved beneficiaries:</Text>

                    </View>

                    <View>
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
                    <View style={{ height: 700 }}></View>

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

export default InitTransferScreen;