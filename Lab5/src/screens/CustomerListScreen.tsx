// src/screens/CustomerListScreen.tsx
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
import { MainTabParamList, RootStackParamList } from '../types/navigation';
import { fetchCustomersApi } from '../services/api';

type Props = CompositeScreenProps<
  BottomTabScreenProps<MainTabParamList, 'Customer'>,
  NativeStackScreenProps<RootStackParamList>
>;

interface Customer {
  _id?: string;
  name: string;
  phone: string;
  totalMoney?: number;
  type?: string; // Guest / Member
}

const CustomerListScreen: React.FC<Props> = ({ navigation }) => {
  const [customers, setCustomers] = useState<Customer[]>([]);

  const loadCustomers = async () => {
    try {
      const data = await fetchCustomersApi();
      setCustomers(data as Customer[]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const unsub = navigation.addListener('focus', () => {
      void loadCustomers();
    });
    return unsub;
  }, [navigation]);

  const renderItem: ListRenderItem<Customer> = ({ item }) => (
    <View style={styles.card}>
      <View>
        <Text style={styles.bold}>
          Customer: <Text style={styles.normal}>{item.name}</Text>
        </Text>
        <Text>Phone: {item.phone}</Text>
        <Text>
          Total money:{' '}
          <Text style={styles.money}>
            {(item.totalMoney ?? 0).toLocaleString()} đ
          </Text>
        </Text>
      </View>
      <View style={styles.right}>
        <Text style={styles.crown}>👑</Text>
        <Text style={styles.typeText}>{item.type ?? 'Guest'}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.bold}>Tran Vu Truong Huy</Text>
      <FlatList
        data={customers}
        keyExtractor={(item, index) => item._id ?? index.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 16, paddingBottom: 80 }}
      />

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AddCustomer')}
      >
        <Text style={styles.addButtonText}>＋</Text>
      </TouchableOpacity>
    </View>
  );
};

const pink = '#ff5a7a';

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },
  card: {
    backgroundColor: '#fafafa',
    borderRadius: 10,
    padding: 14,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    elevation: 1,
  },
  bold: { fontWeight: 'bold' },
  normal: { fontWeight: 'normal' },
  money: { color: pink, fontWeight: 'bold' },
  right: { alignItems: 'center', justifyContent: 'center' },
  crown: { fontSize: 22, marginBottom: 4 },
  typeText: { color: pink, fontWeight: '600' },
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

export default CustomerListScreen;
