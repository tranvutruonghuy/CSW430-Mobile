import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

export default function SumFirstLastDigit() {
  const [number, setNumber] = useState('');
  const [sum, setSum] = useState(null);

  const handleChange = val => {
    setNumber(val);
    if (!val) {
      setSum(null);
      return;
    }
    const str = val.replace(/\D/g, ''); // chỉ lấy số
    if (str.length > 0) {
      const first = parseInt(str[0]);
      const last = parseInt(str[str.length - 1]);
      setSum(first + last);
    } else {
      setSum(null);
    }
  };

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Sum of First and Last Digit</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Enter a number"
        value={number}
        onChangeText={handleChange}
      />
      {sum !== null && <Text style={styles.result}>Sum = {sum}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fafafa',
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 10,
    marginBottom: 10,
  },
  result: { fontWeight: 'bold', color: 'green' },
});
