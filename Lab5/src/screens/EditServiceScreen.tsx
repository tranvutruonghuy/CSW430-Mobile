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
import { updateServiceApi } from '../services/api';
type Props = NativeStackScreenProps<RootStackParamList, 'EditService'>;

const EditServiceScreen: React.FC<Props> = ({ route, navigation }) => {
  const { service } = route.params;
  const [name, setName] = useState<string>(service.name);
  const [price, setPrice] = useState<string>(String(service.price));

  const handleUpdate = async () => {
    try {
      await updateServiceApi(service._id, name, Number(price));
      navigation.goBack();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Service name * - Tran Vu Truong Huy</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} />

      <Text style={styles.label}>Price *</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={price}
        onChangeText={setPrice}
      />

      <TouchableOpacity style={styles.button} onPress={handleUpdate}>
        <Text style={styles.buttonText}>Update</Text>
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

export default EditServiceScreen;
