import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

export default function MinOfThree() {
  const [a, setA] = useState('');
  const [b, setB] = useState('');
  const [c, setC] = useState('');
  const [min, setMin] = useState(null);

  const calculateMin = (valA, valB, valC) => {
    if (valA && valB && valC) {
      const result = Math.min(Number(valA), Number(valB), Number(valC));
      setMin(result);
    } else {
      setMin(null);
    }
  };

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Find Minimum Between Three Numbers</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter number A"
        keyboardType="numeric"
        value={a}
        onChangeText={v => {
          setA(v);
          calculateMin(v, b, c);
        }}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter number B"
        keyboardType="numeric"
        value={b}
        onChangeText={v => {
          setB(v);
          calculateMin(a, v, c);
        }}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter number C"
        keyboardType="numeric"
        value={c}
        onChangeText={v => {
          setC(v);
          calculateMin(a, b, v);
        }}
      />
      {min !== null && <Text style={styles.result}>Minimum = {min}</Text>}
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
