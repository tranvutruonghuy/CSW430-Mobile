// src/screens/AddCustomerScreen.tsx
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
import { addCustomerApi } from '../services/api';

type Props = NativeStackScreenProps<RootStackParamList, 'AddCustomer'>;

const AddCustomerScreen: React.FC<Props> = ({ navigation }) => {
  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');

  const handleAdd = async () => {
    try {
      await addCustomerApi(name, phone);
      navigation.goBack();
    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'Failed to add customer');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Tran Vu Truong Huy</Text>
      <Text style={styles.label}>Customer name *</Text>
      <TextInput
        style={styles.input}
        placeholder="Input your customer's name"
        value={name}
        onChangeText={setName}
      />

      <Text style={styles.label}>Phone *</Text>
      <TextInput
        style={styles.input}
        placeholder="Input phone number"
        keyboardType="phone-pad"
        value={phone}
        onChangeText={setPhone}
      />

      <TouchableOpacity style={styles.button} onPress={handleAdd}>
        <Text style={styles.buttonText}>Add</Text>
      </TouchableOpacity>
    </View>
  );
};

const pink = '#ff5a7a';

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: 'white' },
  label: { fontWeight: '600', marginTop: 12, marginBottom: 6 },
  input: { backgroundColor: '#f7f7f7', borderRadius: 8, padding: 10 },
  button: {
    marginTop: 24,
    padding: 14,
    borderRadius: 8,
    backgroundColor: pink,
    alignItems: 'center',
  },
  buttonText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
});

export default AddCustomerScreen;
