import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList, Service } from '../types/navigation';
import { fetchServiceApi } from '../services/api';
type Props = NativeStackScreenProps<RootStackParamList, 'ServiceDetail'>;

const ServiceDetailScreen: React.FC<Props> = ({ route, navigation }) => {
  const { id } = route.params;
  const [service, setService] = useState<Service | null>(null);

  useEffect(() => {
    const loadService = async () => {
      try {
        const data = await fetchServiceApi(id);
        setService(data);
      } catch (error) {
        console.log(error);
      }
    };
    loadService();
  });

  if (!service) return null;

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>Service detail - Tran Vu Truong Huy</Text>

        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => navigation.navigate('DeleteService', { id })}
        >
          <Text style={styles.menuText}>⋮</Text>
        </TouchableOpacity>
      </View>

      <Text>
        <Text style={styles.bold}>Service name: </Text>
        {service.name}
      </Text>
      <Text>
        <Text style={styles.bold}>Price: </Text>
        {service.price.toLocaleString()} đ
      </Text>
      <Text>
        <Text style={styles.bold}>Creator: </Text>
        {service.creator ?? '-'}
      </Text>
      <Text>
        <Text style={styles.bold}>Time: </Text>
        {service.createdAt ?? '-'}
      </Text>
      <Text>
        <Text style={styles.bold}>Final update: </Text>
        {service.updatedAt ?? '-'}
      </Text>

      <TouchableOpacity
        style={styles.editButton}
        onPress={() => navigation.navigate('EditService', { service })}
      >
        <Text style={styles.editText}>Edit</Text>
      </TouchableOpacity>
    </View>
  );
};

const pink = '#ff5a7a';

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: 'white' },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: { fontSize: 20, fontWeight: 'bold' },
  menuButton: { padding: 8 },
  menuText: { fontSize: 22 },
  bold: { fontWeight: 'bold' },
  editButton: {
    marginTop: 24,
    alignSelf: 'flex-start',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: pink,
    borderRadius: 8,
  },
  editText: { color: 'white', fontWeight: 'bold' },
});

export default ServiceDetailScreen;
