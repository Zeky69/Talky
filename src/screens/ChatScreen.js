import React, { useState } from 'react';
import useWebSocket from 'react-use-websocket';
import { Button, Text, TextInput, View, ScrollView, Image, useColorScheme } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import * as ImagePicker from 'expo-image-picker';



const WS_URL = 'ws://172.20.10.2:8000';

function ChatScreen() {
    const colorScheme = useColorScheme();
    const [inputText, setInputText] = useState(''); // Pour stocker le texte du champ de texte
    const [messages, setMessages] = useState([]); // Pour stocker les messages
    const { sendMessage, lastMessage, readyState } = useWebSocket(WS_URL, {
        onOpen: () => {
            console.log('WebSocket connection established.');
        },
        onMessage: (e) => {
            console.log('Message reçu :', e.data);
            try {
                const msg = JSON.parse(e.data);
                setMessages((prev) => [...prev, msg]);
            } catch (err) {
                setMessages((prev) => [...prev, { type: 'text', content: e.data }]);
            }
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




    const sendTextMessage = () => {
        if (inputText) {
            sendMessage(JSON.stringify({ type: 'text', content: inputText }));
            setInputText('');
        }
    };

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            base64: true,
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
        });
        if (!result.canceled && result.assets && result.assets.length > 0) {
            const asset = result.assets[0];
            const uri = `data:${asset.mimeType};base64,${asset.base64}`;
            sendMessage(JSON.stringify({ type: 'image', content: uri }));
        }
    };






    return (
        <View style={{ marginTop: getStatusBarHeight(), flex: 1, padding: 16, backgroundColor: colorScheme === 'dark' ? '#000' : '#fff' }}>
            <Text style={{ color: colorScheme === 'dark' ? '#fff' : '#000', fontSize: 20 }}>Talky</Text>
            <Text style={{ color: colorScheme === 'dark' ? '#fff' : '#000' }}>WebSocket status : {readyState}</Text>
            <ScrollView style={{ flex: 1, marginVertical: 8 }}>
                {messages.map((message, index) => {
                    if (message.type === 'image') {
                        return <Image key={index} source={{ uri: message.content }} style={{ width: 200, height: 200, marginBottom: 8 }} />;
                    }
                    return <Text key={index} style={{ color: colorScheme === 'dark' ? '#fff' : '#000' }}>{message.content}</Text>;
                })}
            </ScrollView>
            <TextInput
                style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 8, padding: 4, color: colorScheme === 'dark' ? '#fff' : '#000' }}
                onChangeText={setInputText}
                value={inputText}
                placeholder="Message"
                placeholderTextColor={colorScheme === 'dark' ? '#888' : '#888'}
            />
            <Button title="Choisir une image" onPress={pickImage} />
            <Button title="Envoyer" onPress={sendTextMessage} />
            <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
        </View>


    );
}
export default ChatScreen;
