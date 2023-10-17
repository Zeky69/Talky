import React, {useState} from 'react';
import useWebSocket from 'react-use-websocket';
import {Button, Text, TextInput, View} from "react-native";
import { StatusBar } from 'expo-status-bar';
import { getStatusBarHeight } from 'react-native-status-bar-height';



const WS_URL = 'ws://172.20.10.2:8000';

function App() {
    const [inputText, setInputText] = useState(''); // Pour stocker le texte du champ de texte
    const [messages, setMessages] = useState([]); // Pour stocker les messages
    const {sendMessage, lastMessage, readyState} = useWebSocket(WS_URL, {
        onOpen: () => {
            console.log('WebSocket connection established.');
        },
        onMessage: (e) => {
            console.log('Message reçu :', e.data);
            setMessages([...messages, e.data]);
        }
        ,
        shouldReconnect: (closeEvent) => {
            console.log('closeEvent :', closeEvent);
            return true;
        },
        reconnectAttempts: 10,
        reconnectInterval: 3000,
        onError: (e) => {
            console.log('Erreur :', e.message);
        },
        onClose: (e) => {
            console.log('Connexion terminée :', e.code, e.reason);
        }
    });




    const sendToMessage = () => {
        if (inputText) {
            sendMessage(inputText);
            setInputText('');
        }
    }






    return (
        <View style={{marginTop: getStatusBarHeight()}}>
            <Text>Salutation</Text>
            <Text>WebSocket status : {readyState}</Text>
            <Text>Message reçu : {lastMessage ? lastMessage.data : null}</Text>
            <Text>Messages :</Text>
            {messages.map((message, index) => (
                <Text key={index}>{message}</Text>
            ))}
            <TextInput
                style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                onChangeText={setInputText}
                value={inputText}
            />
            <Button title="Envoyer" onPress={sendToMessage} />
        <StatusBar style="dark" />
        </View>


    );
}
export default App;
