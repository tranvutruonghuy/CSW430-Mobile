// src/screens/HomeScreen.tsx
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ListRenderItem,
} from 'react-native';
import { CompositeScreenProps } from '@react-navigation/native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MainTabParamList, RootStackParamList, Service } from '../types/navigation';
import { fetchServicesApi } from '../services/api';

type Props = CompositeScreenProps<
  BottomTabScreenProps<MainTabParamList, 'Home'>,
  NativeStackScreenProps<RootStackParamList>
>;

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const [services, setServices] = useState<Service[]>([]);

  

  useEffect(() => {
    const loadServices = async () => {
    try {
      const data = await fetchServicesApi();
      setServices(data);
    } catch (error) {
      console.log(error);
    }
  };
    // const unsub = navigation.addListener('focus', () => {
    //   void loadServices();
    // });
    // return unsub;
    loadServices();
  }, []);

  const renderItem: ListRenderItem<Service> = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('ServiceDetail', { id: item._id })}
    >
      <Text numberOfLines={1} style={styles.serviceName}>
        {item.name}
      </Text>
      <Text style={styles.price}>
        {item.price.toLocaleString()} đ
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.userName}>HUYỀN TRINH</Text>
        <View style={styles.avatarCircle} />
      </View>

      <Text style={styles.sectionTitle}>Danh sách dịch vụ</Text>

      <FlatList
        data={services}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 80 }}
      />

      {/* Add button */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AddService')}
      >
        <Text style={styles.addButtonText}>＋</Text>
      </TouchableOpacity>
    </View>
  );
};

const pink = '#ff5a7a';

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white', padding: 16 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  userName: { fontWeight: 'bold', fontSize: 18 },
  avatarCircle: { width: 32, height: 32, borderRadius: 16, backgroundColor: pink },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', marginVertical: 8 },
  card: {
    padding: 14,
    borderRadius: 10,
    backgroundColor: '#fafafa',
    marginBottom: 10,
    elevation: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  serviceName: { fontSize: 15, flex: 1, marginRight: 8 },
  price: { fontWeight: '600' },
  addButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: pink,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText: { color: 'white', fontSize: 26, lineHeight: 26 },
});

export default HomeScreen;
