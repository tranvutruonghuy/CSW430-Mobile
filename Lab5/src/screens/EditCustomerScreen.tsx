// src/screens/EditCustomerScreen.tsx
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
import { updateCustomerApi } from '../services/api';

type Props = NativeStackScreenProps<RootStackParamList, 'EditCustomer'>;

const EditCustomerScreen: React.FC<Props> = ({ route, navigation }) => {
  const { customer } = route.params;
  const [name, setName] = useState<string>(customer.name);
  const [phone, setPhone] = useState<string>(customer.phone);

  const handleUpdate = async () => {
    try {
      await updateCustomerApi(customer._id, name, phone);
      navigation.goBack();
    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'Failed to update customer');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Customer name *</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} />

      <Text style={styles.label}>Phone *</Text>
      <TextInput
        style={styles.input}
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
      />

      <TouchableOpacity style={styles.button} onPress={handleUpdate}>
        <Text style={styles.buttonText}>Update</Text>
      </TouchableOpacity>
    </View>
  );
};

const pink = '#ff5a7a';

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white', padding: 16 },
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

export default EditCustomerScreen;
