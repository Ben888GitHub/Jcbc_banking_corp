import React, {useState} from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';

export default function App() {
  const [outputText, setOutputText] = useState('Mobile Banking Transfer')
    return (
      <View style = { styles.container } >
        <Text >{outputText}< /Text>
        <View style = {styles.inputContainer}
        <TextInput  />
        </View>
        <View style={padding: 40px}
        <Button tittle="Click here to transfer" onPress{()=>setOutputText('Transfer Succeed!')}
        </View>
      </View>
    );
}

const styles = StyleSh eet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      placeholder: 'Amount',
      borderBottomColor:'black',
      borderBottomWidth: 1
    }
});
