// src/screens/TransactionListScreen.tsx
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
import { fetchTransactionsApi } from '../services/api';

type Props = CompositeScreenProps<
  BottomTabScreenProps<MainTabParamList, 'Transaction'>,
  NativeStackScreenProps<RootStackParamList>
>;

interface TransactionItem {
  _id: string;
  code?: string;
  createdAt?: string;
  customerName?: string;
  status?: string;
  totalMoney?: number;
}

const TransactionListScreen: React.FC<Props> = ({ navigation }) => {
  const [transactions, setTransactions] = useState<TransactionItem[]>([]);

  const loadTransactions = async () => {
    try {
      const data = await fetchTransactionsApi();
      setTransactions(data as TransactionItem[]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const unsub = navigation.addListener('focus', () => {
      void loadTransactions();
    });
    return unsub;
  }, [navigation]);

  const renderItem: ListRenderItem<TransactionItem> = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('TransactionDetail', { id: item._id })}
    >
      <View style={{ flex: 1 }}>
        <Text style={styles.bold}>
          {item.code ?? item._id}
          {item.createdAt ? ` - ${item.createdAt}` : ''}
        </Text>
        <Text>Customer: {item.customerName ?? ''}</Text>
        {item.status && <Text style={styles.status}>{item.status}</Text>}
      </View>
      <Text style={styles.money}>
        {(item.totalMoney ?? 0).toLocaleString()} đ
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={transactions}
        keyExtractor={item => item._id}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 16, paddingBottom: 80 }}
      />

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AddTransaction')}
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
  status: { color: pink },
  money: { color: pink, fontWeight: 'bold', marginLeft: 8 },
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

export default TransactionListScreen;
