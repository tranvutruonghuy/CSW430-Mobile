// src/screens/CustomerDetailScreen.tsx
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { fetchCustomerApi } from '../services/api';

type Props = NativeStackScreenProps<RootStackParamList, 'CustomerDetail'>;

interface CustomerDetail {
  _id: string;
  name: string;
  phone: string;
  totalMoney?: number;
  createdAt?: string;
  updatedAt?: string;
  transactions?: {
    _id: string;
    code?: string;
    createdAt?: string;
    totalMoney?: number;
  }[];
}

const CustomerDetailScreen: React.FC<Props> = ({ route, navigation }) => {
  const { id } = route.params;
  const [customer, setCustomer] = useState<CustomerDetail | null>(null);

  const loadCustomer = async () => {
    try {
      const data = await fetchCustomerApi(id);
      setCustomer(data as CustomerDetail);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    void loadCustomer();
  }, [id]);

  if (!customer) return null;

  const transactions = customer.transactions ?? [];

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ padding: 16 }}
    >
      {/* Menu */}
      <View style={styles.menuRow}>
        <View style={{ flex: 1 }} />
        <TouchableOpacity
          style={styles.menuButton}
          onPress={() =>
            navigation.navigate('EditCustomer', { customer: customer })
          }
        >
          <Text style={styles.menuText}>✏️</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => navigation.navigate('DeleteCustomer', { id })}
        >
          <Text style={styles.menuText}>🗑️</Text>
        </TouchableOpacity>
      </View>

      {/* General information */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: '#ff5a7a' }]}>
          General information
        </Text>
        <Text>
          Name: <Text style={styles.bold}>{customer.name}</Text>
        </Text>
        <Text>
          Phone: <Text style={styles.bold}>{customer.phone}</Text>
        </Text>
        <Text>
          Total spent:{' '}
          <Text style={[styles.bold, { color: '#ff5a7a' }]}>
            {(customer.totalMoney ?? 0).toLocaleString()} đ
          </Text>
        </Text>
        <Text>Time: {customer.createdAt ?? ''}</Text>
        <Text>Last update: {customer.updatedAt ?? ''}</Text>
      </View>

      {/* Transaction history */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: '#ff5a7a' }]}>
          Transaction history
        </Text>
        {transactions.map(t => (
          <TouchableOpacity
            key={t._id}
            style={styles.txCard}
            onPress={() =>
              navigation.navigate('TransactionDetail', { id: t._id })
            }
          >
            <Text style={styles.bold}>
              {t.code ?? t._id} {t.createdAt ? `- ${t.createdAt}` : ''}
            </Text>
            <Text style={styles.money}>
              {(t.totalMoney ?? 0).toLocaleString()} đ
            </Text>
          </TouchableOpacity>
        ))}
        {transactions.length === 0 && <Text>No transactions yet.</Text>}
      </View>
    </ScrollView>
  );
};

const pink = '#ff5a7a';

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },
  menuRow: { flexDirection: 'row', marginBottom: 8 },
  menuButton: { paddingHorizontal: 8, paddingVertical: 4 },
  menuText: { fontSize: 18 },
  section: {
    backgroundColor: '#fafafa',
    borderRadius: 10,
    padding: 14,
    marginBottom: 12,
    elevation: 1,
  },
  sectionTitle: { fontWeight: 'bold', marginBottom: 8 },
  bold: { fontWeight: 'bold' },
  money: { color: pink, fontWeight: 'bold' },
  txCard: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 10,
    marginTop: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default CustomerDetailScreen;
