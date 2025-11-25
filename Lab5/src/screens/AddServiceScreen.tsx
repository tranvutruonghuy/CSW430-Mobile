import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { addServiceApi } from '../services/api';

type Props = NativeStackScreenProps<RootStackParamList, 'AddService'>;

const AddServiceScreen: React.FC<Props> = ({ navigation }) => {
  const [name, setName] = useState<string>('');
  const [price, setPrice] = useState<string>('0');

  const handleAdd = async () => {
    try {
      await addServiceApi(name, Number(price)); // token added inside helper
      navigation.navigate('Home');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Tran Vu Truong Huy</Text>
      <Text style={styles.label}>Service name *</Text>
      <TextInput
        style={styles.input}
        placeholder="Input a service name"
        value={name}
        onChangeText={setName}
      />

      <Text style={styles.label}>Price *</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={price}
        onChangeText={setPrice}
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

export default AddServiceScreen;
