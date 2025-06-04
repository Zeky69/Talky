import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, useColorScheme } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { getStatusBarHeight } from 'react-native-status-bar-height';

export default function ProfileScreen() {
  const colorScheme = useColorScheme();
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState(null);

  const pickAvatar = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      base64: true,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });
    if (!result.canceled && result.assets && result.assets.length > 0) {
      const asset = result.assets[0];
      setAvatar(`data:${asset.mimeType};base64,${asset.base64}`);
    }
  };

  return (
    <View style={{ marginTop: getStatusBarHeight(), flex: 1, padding: 16, backgroundColor: colorScheme === 'dark' ? '#000' : '#fff' }}>
      <Text style={{ color: colorScheme === 'dark' ? '#fff' : '#000', fontSize: 20 }}>Profil</Text>
      {avatar && <Image source={{ uri: avatar }} style={{ width: 120, height: 120, borderRadius: 60, marginVertical: 8 }} />}
      <Button title="Choisir un avatar" onPress={pickAvatar} />
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginVertical: 8, padding: 4, color: colorScheme === 'dark' ? '#fff' : '#000' }}
        placeholder="Nom"
        onChangeText={setName}
        value={name}
        placeholderTextColor={colorScheme === 'dark' ? '#888' : '#888'}
      />
    </View>
  );
}
