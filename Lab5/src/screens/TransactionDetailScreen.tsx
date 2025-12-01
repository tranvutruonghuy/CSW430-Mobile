// src/screens/TransactionDetailScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { fetchTransactionApi } from '../services/api';

type Props = NativeStackScreenProps<RootStackParamList, 'TransactionDetail'>;

interface ServiceLine {
  name?: string;
  quantity?: number;
  price?: number;
}

interface TransactionDetail {
  _id: string;
  code?: string;
  customerName?: string;
  customerPhone?: string;
  createdAt?: string;
  amount?: number;
  discount?: number;
  totalPayment?: number;
  services?: ServiceLine[];
}

const TransactionDetailScreen: React.FC<Props> = ({ route }) => {
  const { id } = route.params;
  const [transaction, setTransaction] = useState<TransactionDetail | null>(
    null,
  );

  const loadDetail = async () => {
    try {
      const data = await fetchTransactionApi(id);
      setTransaction(data as TransactionDetail);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    void loadDetail();
  }, [id]);

  if (!transaction) {
    return null;
  }

  const services = transaction.services ?? [];
  const amount = transaction.amount ?? 0;
  const discount = transaction.discount ?? 0;
  const totalPayment = transaction.totalPayment ?? amount + discount;

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ padding: 16 }}
    >
      {/* General information */}
      <Text style={[styles.sectionTitle]}>Tran Vu Truong Huy</Text>
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: '#ff5a7a' }]}>
          General information
        </Text>
        <Text>
          Transaction code:{' '}
          <Text style={styles.bold}>{transaction.code ?? transaction._id}</Text>
        </Text>
        <Text>
          Customer:{' '}
          <Text style={styles.bold}>
            {transaction.customerName}
            {transaction.customerPhone ? ` - ${transaction.customerPhone}` : ''}
          </Text>
        </Text>
        <Text>
          Creation time:{' '}
          <Text style={styles.bold}>{transaction.createdAt}</Text>
        </Text>
      </View>

      {/* Services list */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: '#ff5a7a' }]}>
          Services list
        </Text>

        {services.map((s, index) => (
          <View key={index} style={styles.serviceRow}>
            <View style={{ flex: 1 }}>
              <Text>{s.name}</Text>
              {s.quantity != null && <Text>x{s.quantity}</Text>}
            </View>
            <Text>{(s.price ?? 0).toLocaleString()} đ</Text>
          </View>
        ))}

        <View style={styles.totalRow}>
          <Text style={styles.bold}>Total</Text>
          <Text style={styles.bold}>{amount.toLocaleString()} đ</Text>
        </View>
      </View>

      {/* Cost */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: '#ff5a7a' }]}>Cost</Text>
        <View style={styles.totalRow}>
          <Text>Amount of money</Text>
          <Text>{amount.toLocaleString()} đ</Text>
        </View>
        <View style={styles.totalRow}>
          <Text>Discount</Text>
          <Text>{discount.toLocaleString()} đ</Text>
        </View>

        <View style={styles.totalRow}>
          <Text style={styles.bold}>Total payment</Text>
          <Text style={[styles.bold, { color: '#ff5a7a' }]}>
            {totalPayment.toLocaleString()} đ
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },
  section: {
    backgroundColor: '#fafafa',
    borderRadius: 10,
    padding: 14,
    marginBottom: 12,
    elevation: 1,
  },
  sectionTitle: { fontWeight: 'bold', marginBottom: 8 },
  bold: { fontWeight: 'bold' },
  serviceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
});

export default TransactionDetailScreen;
