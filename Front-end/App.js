import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';

export default function App() {
    const [outputText, setOutputText] = useState('Mobile Banking Transfer')
    return (
        <View style = { styles.container } >
            <Text> { outputText } </Text>
            <View style = { styles.inputContainer }>
            <TextInput style = {  styles.inputContainer  } />
                <View style = {{ padding: 40 }}> 
                    <Button title = "Click here to transfer"
                    onPress={ () => alert('Transfer Succeed!') }>
                    </Button>
                </View>
            </View>
        </View>
        );
    }

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#fff',
            alignItems: 'center',
            justifyContent: 'center',
        },
        inputContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            borderBottomColor: 'black',
            borderBottomWidth: 1
        }
    });
