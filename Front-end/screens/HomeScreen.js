import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { AppLoading } from 'expo';
import {
    Container, Text, Header, Content, Button,
    Success, Footer, FooterTab, Title, Icon
} from 'native-base';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { getStatusBarHeight } from 'react-native-status-bar-height';

export default class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isReady: false,
        };
    }

    async componentDidMount() {
        await Font.loadAsync({
            Museo: require('../fonts/museosanscyrl-300.ttf'),
            MuseoBold: require('../fonts/museosanscyrl-700.ttf'),
            MuseoSemiBold: require('../fonts/museosanscyrl-500.ttf'),
            ...Ionicons.font,
        });
        this.setState({ isReady: true });
    }

    render() {

        const { navigate } = this.props.navigation;

        if (!this.state.isReady) {
            return <AppLoading />;
        }

        return (
            <Container>
                <Header style={{ paddingTop: 30 }}>
                    <Title>Mobile Banking Apps</Title>
                </Header>

                <Content>
                    <View style={{
                        padding: 10,
                        flex: 1,
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>


                        <Button
                            onPress={() => alert('Transfer Successful')}
                            style={{
                                height: 60,
                                backgroundColor: 'black',
                                margin: 20
                            }}>
                            <Text
                                style={{ margin: 10, fontWeight: '700', color: 'white' }}
                            >
                                Transfer
                                </Text>
                        </Button>

                        <Button
                            onPress={() => navigate('Transfer')}
                            style={{
                                height: 60,
                                backgroundColor: 'black',
                                margin: 20
                            }}>
                            <Text
                                style={{ margin: 10, fontWeight: '700', color: 'white' }}
                            >
                                Go to Transfer screen
                                </Text>
                        </Button>


                    </View>

                    {/* <Button success onPress={() => alert("Transfer Sucess")}>
                        <Text>Transfer</Text>
                    </Button>

                    <Button success onPress={() => navigate('Transfer')}>
                        <Text>Go to Transfer page</Text>
                    </Button> */}

                </Content>


                <Footer>
                    <FooterTab>
                        <Button>
                            <Icon name="home" />
                        </Button>
                        <Button>
                            <Icon name="person" />
                        </Button>
                        <Button active>
                            <Icon active name="logo-angular" />
                        </Button>
                        <Button>
                            <Icon name="settings" />
                        </Button>
                    </FooterTab>
                </Footer>
            </Container>
        );

    }
}