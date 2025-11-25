import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Service } from '../types/navigation';

export const API_BASE_URL = 'https://kami-backend-5rs0.onrender.com'; // note the "-"

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

// 1. LOGIN
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

// 2. GET ALL SERVICES
export const fetchServicesApi = async (): Promise<Service[]> => {
  const token = await getToken();
  const res = await axios.get<Service[]>(`${API_BASE_URL}/services`, {
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  });
  return res.data;
};

// 3. GET ONE SERVICE
export const fetchServiceApi = async (id: string): Promise<Service> => {
  const token = await getToken();
  const res = await axios.get<Service>(`${API_BASE_URL}/services/${id}`, {
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  });
  return res.data;
};

// 4. ADD SERVICE
export const addServiceApi = async (
  name: string,
  price: number,
): Promise<void> => {
  const token = await getToken();
  const res = await axios.post(
    `${API_BASE_URL}/services`,
    { name, price }, // if backend wants token in body: add token here
    { headers: token ? { Authorization: `Bearer ${token}` } : undefined },
  );
  return res.data;
};

// 5. UPDATE SERVICE
export const updateServiceApi = async (
  id: string,
  name: string,
  price: number,
): Promise<void> => {
  const token = await getToken();
  const res = await axios.put(
    `${API_BASE_URL}/services/${id}`,
    { name, price },
    { headers: token ? { Authorization: `Bearer ${token}` } : undefined },
  );
  return res.data;
};

// 6. DELETE SERVICE
export const deleteServiceApi = async (id: string): Promise<void> => {
  const token = await getToken();
  const res = await axios.delete(`${API_BASE_URL}/services/${id}`, {
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  });
  return res.data;
};
