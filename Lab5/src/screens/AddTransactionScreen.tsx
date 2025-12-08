// src/screens/AddTransactionScreen.tsx
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import {
  addTransactionApi,
  fetchCustomersApi,
  fetchServicesApi,
  TransactionServiceInput,
} from '../services/api';
import { Dropdown } from 'react-native-element-dropdown';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

type Props = NativeStackScreenProps<RootStackParamList, 'AddTransaction'>;

interface CustomerOption {
  label: string;
  value: string;
}

interface ServiceItem {
  _id: string;
  name: string;
  price: number;
  selected: boolean;
  quantity: number;
}

const AddTransactionScreen: React.FC<Props> = ({ navigation }) => {
  const [customers, setCustomers] = useState<CustomerOption[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<string>('');

  const [services, setServices] = useState<ServiceItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const loadData = async () => {
    try {
      const [cusRaw, servRaw] = await Promise.all([
        fetchCustomersApi(),
        fetchServicesApi(),
      ]);

      const customerOptions: CustomerOption[] = (cusRaw || [])
        .filter((c: any) => c && c._id && c.name)
        .map((c: any) => ({
          label: c.name,
          value: String(c._id),
        }));

      setCustomers(customerOptions);

      const serviceItems: ServiceItem[] = (servRaw || [])
        .filter((s: any) => s && (s._id || s.id) && s.name != null)
        .map((s: any) => ({
          _id: String(s._id ?? s.id),
          name: s.name,
          price: Number(s.price) || 0,
          selected: false,
          quantity: 1,
        }));

      setServices(serviceItems);
    } catch (error) {
      console.log('Error loading customers/services:', error);
    }
  };

  useEffect(() => {
    void loadData();
  }, []);

  const toggleService = (id: string, value: boolean) => {
    setServices(prev =>
      prev.map(s => (s._id === id ? { ...s, selected: value } : s)),
    );
  };

  const changeQuantity = (id: string, delta: number) => {
    setServices(prev =>
      prev.map(s =>
        s._id === id ? { ...s, quantity: Math.max(1, s.quantity + delta) } : s,
      ),
    );
  };

  const total = services
    .filter(s => s.selected)
    .reduce((sum, s) => sum + s.price * s.quantity, 0);

  const handleSubmit = async () => {
    if (!selectedCustomer) {
      Alert.alert('Validation', 'Please select a customer');
      return;
    }
    const chosen = services.filter(s => s.selected);
    if (chosen.length === 0) {
      Alert.alert('Validation', 'Please select at least one service');
      return;
    }

    setLoading(true);
    try {
      const bodyServices: TransactionServiceInput[] = chosen.map(s => ({
        _id: s._id,
        quantity: s.quantity,
        // userID: '...', // if you later want to send executor here
      }));

      await addTransactionApi(selectedCustomer, bodyServices);
      Alert.alert('Success', 'Transaction created successfully');
      navigation.goBack();
    } catch (error: any) {
      console.log('Error creating transaction:', error.response);

      const msg =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        'Unknown error (status ' + (error?.response?.status ?? 'N/A') + ')';

      Alert.alert('Create transaction failed', String(msg));
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ padding: 16, paddingBottom: 40 }}
    >
      <Text style={styles.label}>Customer *</Text>
      <Dropdown
        style={styles.dropdown}
        data={customers}
        labelField="label"
        valueField="value"
        placeholder="Select customer"
        value={selectedCustomer}
        onChange={item => setSelectedCustomer(item.value)}
      />

      {services.map((s, index) => (
        <View key={s._id ?? String(index)} style={styles.serviceCard}>
          {/* Checkbox + label (no strike-through) */}
          <View style={styles.serviceHeader}>
            <BouncyCheckbox
              size={22}
              fillColor="#ff5a7a"
              unFillColor="#FFFFFF"
              iconStyle={{ borderColor: '#ff5a7a' }}
              disableText
              cross-line
              style={{ marginRight: 8 }}
              isChecked={s.selected}
              onPress={(checked: boolean) => toggleService(s._id, checked)}
            />
            <Text style={styles.serviceName}>{s.name}</Text>
          </View>

          {s.selected && (
            <>
              <View style={styles.qtyRow}>
                <TouchableOpacity
                  style={styles.qtyButton}
                  onPress={() => changeQuantity(s._id, -1)}
                >
                  <Text style={styles.qtyText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.qtyValue}>{s.quantity}</Text>
                <TouchableOpacity
                  style={styles.qtyButton}
                  onPress={() => changeQuantity(s._id, 1)}
                >
                  <Text style={styles.qtyText}>+</Text>
                </TouchableOpacity>

                {/* Executor dropdown – placeholder */}
                <View style={{ flex: 1, marginLeft: 8 }}>
                  <Dropdown
                    style={styles.executorDropdown}
                    data={[{ label: 'Executor', value: 'executor' }]}
                    labelField="label"
                    valueField="value"
                    placeholder="Executor"
                    value="executor"
                    onChange={() => {}}
                  />
                </View>
              </View>

              <Text style={styles.price}>
                Price: {s.price.toLocaleString()} đ
              </Text>
            </>
          )}
        </View>
      ))}

      <TouchableOpacity
        style={[
          styles.summaryButton,
          (!selectedCustomer || total === 0 || loading) && { opacity: 0.5 },
        ]}
        onPress={handleSubmit}
        disabled={!selectedCustomer || total === 0 || loading}
      >
        <Text style={styles.summaryText}>
          See summary: ({total.toLocaleString()} đ)
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const pink = '#ff5a7a';

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },
  label: { fontWeight: '600', marginBottom: 6 },
  dropdown: {
    borderRadius: 8,
    backgroundColor: '#f7f7f7',
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginBottom: 16,
  },
  serviceCard: {
    backgroundColor: '#fafafa',
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
    elevation: 1,
  },
  serviceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  serviceName: {
    fontSize: 15,
    flex: 1,
    flexShrink: 1,
  },
  qtyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  qtyButton: {
    width: 32,
    height: 32,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center',
    justifyContent: 'center',
  },
  qtyText: { fontSize: 20 },
  qtyValue: { marginHorizontal: 12, fontSize: 16 },
  executorDropdown: {
    borderRadius: 8,
    backgroundColor: '#f7f7f7',
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  price: { marginTop: 6, color: pink, fontWeight: 'bold' },
  summaryButton: {
    marginTop: 16,
    backgroundColor: pink,
    borderRadius: 8,
    padding: 14,
    alignItems: 'center',
  },
  summaryText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
});

export default AddTransactionScreen;
