import React from 'react';
import { View, TouchableOpacity, StyleSheet, ImageBackground, Image, Text, StatusBar } from 'react-native';
import { AppLoading } from 'expo';
import { Container, Content, Card, CardItem } from 'native-base';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { authenticate, getTransactions } from '../reducers/actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Ionicons } from '@expo/vector-icons';

import CreditCardSpace from 'credit-card-space';

import defaultTrans from '../trans';

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

class CardsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
      current_usr: this.props.currentUser,
      currentacc: null,
      dataGrid: []
    };
  }

  componentWillMount = () => {
    this.setState({ currentacc: this.props.navigation.getParam('element') });
    this.setState({ dataGrid: this.props.navigation.getParam('element').cards });
  }

  async componentDidMount() {
    this.setState({ isReady: true });
  }

  accNumberString = (aString) => {
    let arr = fastChunkString(aString, { size: 4, unicodeAware: false });
    return (arr[0] + " " + arr[1] + " " + arr[2] + " ");
  }


  render() {
    let { dataGrid } = this.state;
    const { navigate } = this.props.navigation; //navigation is always a props
    let { currentacc } = this.state;
    let { current_usr } = this.state;
    let yelloBackgrd = '#eee8de';

    if (!this.state.isReady) {
      return <AppLoading />;
    }

    return (
      <Container style={{
        // paddingTop: getStatusBarHeight() * 2,
        padding: 10
      }}>
        <StatusBar barStyle="dark-content" />

        <Content showsVerticalScrollIndicator={false}>

          <View style={{
            marginBottom: 20,
            flex: 1,
            flexDirection: "row"
          }}>
            <View style={{
              flex: 0.7,
              flexDirection: "column"
            }}>

              <Text>{this.props.currentUser.accname.toUpperCase()}</Text>
              <Text style={{
                fontFamily: 'MuseoBold',
                fontSize: 30,
                fontWeight: '400'
              }}>Cards</Text>
            </View>
          </View>

          {dataGrid ? (dataGrid.map((sub_element, sub_key) => {
            let texte = '../assets/' + sub_element.type.toLowerCase() + '.png';
            let cardType = require('../assets/mastercard.png');
            return (
              <ImageBackground source={require('../assets/bank2.jpg')}
                resizeMode='cover'
                style={{ marginVertical: 8, backgroundColor: yelloBackgrd, borderRadius: 20 }}
                imageStyle={{ borderRadius: 20, opacity: 0.3 }}>
                <View style={{
                  padding: 20,
                  width: '100%',
                  aspectRatio: 1.58,
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between'
                }}>
                  <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ fontFamily: 'MuseoBold', fontWeight: '400', fontSize: 30, color: 'rgba(0,0,0,0.3)' }}>JCBC</Text>
                    <Image style={{ height: 80, width: 100, resizeMode: 'center' }} source={cardType} />
                  </View>

                  <Text style={{
                    fontFamily: 'MuseoBold', fontWeight: '400', fontSize: 20
                  }}>{sub_element.cardnum}</Text>

                  <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ fontSize: 17 }}>{sub_element.nameoncard}</Text>

                    <View>
                      <Text>Valid Thru</Text>
                      <Text>{sub_element.validthru}</Text>
                    </View>
                  </View>
                </View>
              </ImageBackground>
            )
          })) : (
              <Text>You have no cards linked to this accounts</Text>
            )
          }
        </Content>
      </Container >
    );
  }
}

CardsScreen.navigationOptions = {
  // headerTransparent: true,
  headerStyle: {
    shadowColor: 'transparent',
    borderBottomWidth: 0,
    elevation: 0,
  }
};

const style = StyleSheet.create({
  btn: {
    height: 110,
    width: 250,
    backgroundColor: '#B22222',
    paddingHorizontal: 10,
    borderRadius: 5,
    marginTop: 10,
    opacity: 80
  },

  btn_alt: {
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

  txt: {
    fontWeight: '700',
    color: 'white',
    fontSize: 24,
  },

  icon_default: {
    color: 'white',
  },
  settingsLogo: {
    width: 70,
    height: 70,
    resizeMode: 'contain',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    //resizeMode: 'cover'
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(CardsScreen);
