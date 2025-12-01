// src/screens/SettingScreen.tsx
import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import { CompositeScreenProps, useNavigation } from '@react-navigation/native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MainTabParamList, RootStackParamList } from '../types/navigation';
import { clearToken } from '../services/api';

type Props = CompositeScreenProps<
  BottomTabScreenProps<MainTabParamList, 'Setting'>,
  NativeStackScreenProps<RootStackParamList>
>;

const SettingScreen: React.FC = () => {
  const navigation = useNavigation<Props['navigation']>();

  const handleLogout = async () => {
    await clearToken();
    Alert.alert('Logout', 'You have been logged out');
    // navigation.reset({
    //   index: 0,
    //   routes: [{ name: 'Login' }],
    // });
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <Text>Tran Vu Truong Huy</Text>
      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const pink = '#ff5a7a';

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white', padding: 16 },
  button: {
    marginTop: 16,
    padding: 14,
    borderRadius: 8,
    backgroundColor: pink,
    alignItems: 'center',
  },
  buttonText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
});

export default SettingScreen;
