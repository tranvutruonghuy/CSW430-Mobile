import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { deleteServiceApi } from '../services/api';

type Props = NativeStackScreenProps<RootStackParamList, 'DeleteService'>;

export default function DeleteServiceScreen({ route, navigation }: Props) {
  const { id } = route.params;

  const handleDelete = async () => {
    try {
      await deleteServiceApi(id);
      navigation.navigate('Home');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.overlay}>
      <View style={styles.box}>
        <Text style={styles.title}>Warning</Text>
        <Text style={styles.text}>
          Are you sure you want to remove this service? This operation cannot be
          returned
        </Text>

        <View style={styles.row}>
          <TouchableOpacity style={styles.deleteBtn} onPress={handleDelete}>
            <Text style={styles.deleteText}>DELETE</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.cancelBtn}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.cancelText}>CANCEL</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const pink = '#ff5a7a';

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: { backgroundColor: 'white', borderRadius: 8, padding: 20, width: '85%' },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  text: { marginBottom: 20 },
  row: { flexDirection: 'row', justifyContent: 'flex-end' },
  deleteBtn: { marginRight: 16 },
  deleteText: { color: pink, fontWeight: 'bold' },
  cancelBtn: {},
  cancelText: { fontWeight: 'bold' },
});
