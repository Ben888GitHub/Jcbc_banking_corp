import React, { Component } from "react";
import {
    StyleSheet,
    View,
    Dimensions,
    Alert
} from "react-native";
import {
    Card,
    CardItem,
    Text,
} from "native-base";
import { authenticate } from '../reducers/actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const mapStateToProps = (state) => {
    const { currentUser } = state;
    return { currentUser };
};

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        authenticate,
    }, dispatch)
);

const screenWidth = Math.round(Dimensions.get("window").width);

class App extends Component {
    constructor(props){
        super(props)
    }

    logOutHandler = () => {
        const { navigate } = this.props.navigation;
        Alert.alert(
            'Log out',
            'Are you sure you want to log out?',
            [                
                {text : "Cancel"},
                {text : "Log out", 
                onPress : () => navigate("Login")},
            ]
        )
        
        
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>
                        Settings
                    </Text>
                </View>
                <View style={styles.body}>
                    <Card>
                        <CardItem
                            style={styles.cardStyle}
                            header
                            button
                            onPress={ this.logOutHandler.bind(this) }>
                            <Text style = {styles.settingsFont}>
                                Log Out
                            </Text>
                        </CardItem>
                        <CardItem
                            style={styles.cardStyle}
                            header
                            button
                            onPress={ () => alert("add this later.")}>
                            <Text
                                style = {styles.settingsFont}>
                                TODO
                            </Text>
                        </CardItem>
                    </Card>
                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    cardStyle: { 
        backgroundColor: "#c13b3e",
        borderRadius: 5,
        margin: 20,
     },
    settingsFont : {
        fontSize: 17,
        fontWeight: "bold",
        color: "#fff"
    },
    title: {
        color: "white",
        fontSize: 16.5,
        width: "100%",
        textAlign: "center",
        fontWeight: "bold",
        marginTop: 40,
    },
    header: {
        flex: 0.15,
        backgroundColor: "#c13b3e",
        alignItems: "center",
        justifyContent: "center",
    },
    body: {
        flex: 0.85,
    }

});

export default connect(mapStateToProps, mapDispatchToProps)(App);

