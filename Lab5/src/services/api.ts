import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Service } from '../types/navigation';

export const API_BASE_URL = 'https://kami-backend-5rs0.onrender.com';

const TOKEN_KEY = 'authToken';
const NAME_KEY = 'name';
const PHONE_KEY = 'phone';
export const setToken = async (token: string) => {
  await AsyncStorage.setItem(TOKEN_KEY, token);
};

export const getToken = async (): Promise<string | null> => {
  return AsyncStorage.getItem(TOKEN_KEY);
};

export const setName = async (name: string) => {
  await AsyncStorage.setItem(NAME_KEY, name);
};

export const getName = async (): Promise<string | null> => {
  return AsyncStorage.getItem(NAME_KEY);
};

export const setPhone = async (phone: string) => {
  await AsyncStorage.setItem(PHONE_KEY, phone);
};

export const getPhone = async (): Promise<string | null> => {
  return AsyncStorage.getItem(PHONE_KEY);
};

export const clearToken = async () => {
  await AsyncStorage.removeItem(TOKEN_KEY);
  await AsyncStorage.removeItem(NAME_KEY);
  await AsyncStorage.removeItem(PHONE_KEY);
};

// ---------- API calls ----------

// ------------- AUTH -------------
// Helper to include Authorization header when token exists
const authHeader = async () => {
  const token = await getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// 1. LOGIN: POST /auth  { phone, password } -> { token }
export const loginApi = async (
  phone: string,
  password: string,
): Promise<any> => {
  const res = await axios.post(`${API_BASE_URL}/auth`, {
    phone,
    password,
  });
  return res.data;
};

// ------------- SERVICES CRUD -------------

// 2. GET all services
export const fetchServicesApi = async (): Promise<Service[]> => {
  const headers = await authHeader();
  const res = await axios.get<Service[]>(`${API_BASE_URL}/services`, {
    headers,
  });
  return res.data;
};

// 3. GET a service by id
export const fetchServiceApi = async (id: string): Promise<Service> => {
  const headers = await authHeader();
  const res = await axios.get<Service>(`${API_BASE_URL}/services/${id}`, {
    headers,
  });
  return res.data;
};

// 4. ADD service
export const addServiceApi = async (
  name: string,
  price: number,
): Promise<void> => {
  const headers = await authHeader();
  await axios.post(
    `${API_BASE_URL}/services`,
    { name, price }, // if backend requires token in body, add it here
    { headers },
  );
};

// 5. UPDATE service
export const updateServiceApi = async (
  id: string,
  name: string,
  price: number,
): Promise<void> => {
  const headers = await authHeader();
  await axios.put(
    `${API_BASE_URL}/services/${id}`,
    { name, price },
    { headers },
  );
};

// 6. DELETE service
export const deleteServiceApi = async (id: string): Promise<void> => {
  const headers = await authHeader();
  await axios.delete(`${API_BASE_URL}/services/${id}`, { headers });
};

// ------------- CUSTOMERS -------------

// GET all customers
export const fetchCustomersApi = async (): Promise<any[]> => {
  const headers = await authHeader();
  const res = await axios.get<any[]>(`${API_BASE_URL}/customers`, { headers });
  return res.data;
};

export const fetchCustomerApi = async (id: string): Promise<any> => {
  const headers = await authHeader();
  const res = await axios.get<any>(`${API_BASE_URL}/customers/${id}`, {
    headers,
  });
  return res.data;
};

// ADD customer: { name, phone, token }
export const addCustomerApi = async (
  name: string,
  phone: string,
): Promise<void> => {
  const headers = await authHeader();
  await axios.post(`${API_BASE_URL}/customers`, { name, phone }, { headers });
};

export const updateCustomerApi = async (
  id: string,
  name: string,
  phone: string,
): Promise<void> => {
  const headers = await authHeader();
  await axios.put(
    `${API_BASE_URL}/customers/${id}`,
    { name, phone },
    { headers },
  );
};

export const deleteCustomerApi = async (id: string): Promise<void> => {
  const headers = await authHeader();
  await axios.delete(`${API_BASE_URL}/customers/${id}`, { headers });
};

// ------------- TRANSACTIONS -------------

// GET all transactions
export const fetchTransactionsApi = async (): Promise<any[]> => {
  const headers = await authHeader();
  const res = await axios.get<any[]>(`${API_BASE_URL}/transactions`, {
    headers,
  });
  return res.data;
};

// GET a transaction by _id
export const fetchTransactionApi = async (id: string): Promise<any> => {
  const headers = await authHeader();
  const res = await axios.get<any>(`${API_BASE_URL}/transactions/${id}`, {
    headers,
  });
  return res.data;
};

interface TransactionServiceInput {
  _id: string;
  quantity: number;
  userID?: string;
}

export const addTransactionApi = async (
  customerId: string,
  services: TransactionServiceInput[],
): Promise<void> => {
  const headers = await authHeader();

  const payload = {
    customerId: customerId,
    services: services,
  };

  await axios.post(`${API_BASE_URL}/transactions`, payload, { headers });
};

export const deleteTransactionApi = async (id: string): Promise<void> => {
  const headers = await authHeader();
  await axios.delete(`${API_BASE_URL}/transactions/${id}`, { headers });
};
