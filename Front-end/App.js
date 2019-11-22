import React , { Component } from 'react';
import { AppLoading } from 'expo';
import { Container, Text, Header, Content, Button, Success, Footer, FooterTab, Title, Icon} from 'native-base';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
    });
    this.setState({ isReady: true });
  }

  render() {

    if (!this.state.isReady) {
      return <AppLoading />;
    }
/*
    return (
      <Success Button>
        <Text>Transfer</Text>
      </Success>
    );
*/
    return (
        <Container>
        <Header>

            <Title> Mobile Banking Apps </Title>
        </Header>

        <Content>
        <Button success onPress={() => alert("Transfer Sucess")}>
            <Text>Transfer</Text>
        </Button>

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
                    <Icon active name="appstore" />
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
/*
export default class FooterTab extends React.Component {
  render() {
    return (
      <Container>
      <Header>
        <Title> Mobile Banking Apps </Title>
        <Content />
        <Footer>
          <FooterTab>
            <Button>
              <Icon name="Home" />
            </Button>
            <Button>
              <Icon name="Account" />
            </Button>
            <Button active>
              <Icon active name="Lifestyle" />
            </Button>
            <Button>
              <Icon name="Services" />
            </Button>
          </FooterTab>
        </Footer>
        </Header>
      </Container>
    );
  }
}
*/