import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { loginApi, setToken, setName, setPhone } from '../services/api';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const [userPhone, setUserPhone] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const data = await loginApi(userPhone, password);
      await setToken(data.token); // save to AsyncStorage
      await setName(data.name);
      await setPhone(data.phone);
      navigation.replace('MainTabs'); // go to bottom tabs
    } catch (error) {
      console.log(error);
      Alert.alert('Login failed', 'Phone or password is incorrect');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tran Vu Truong Huy</Text>
      <Text style={styles.title}>Login</Text>

      <TextInput
        style={styles.input}
        placeholder="Phone"
        keyboardType="phone-pad"
        value={userPhone}
        onChangeText={setUserPhone}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const pink = '#ff5a7a';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  title: { fontSize: 36, fontWeight: 'bold', color: pink, marginBottom: 40 },
  input: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    elevation: 1,
  },
  button: {
    width: '100%',
    backgroundColor: pink,
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: { color: 'white', fontSize: 18, fontWeight: 'bold' },
});

export default LoginScreen;
