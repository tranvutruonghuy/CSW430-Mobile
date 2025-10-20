import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
} from 'react-native';

export default function Hailstone() {
  const [n, setN] = useState('');
  const [sequence, setSequence] = useState([]);

  const generate = () => {
    const num = parseInt(n);
    if (isNaN(num) || num <= 0) {
      alert('Please enter a positive number!');
      return;
    }
    let arr = [];
    let current = num;
    while (current !== 1) {
      arr.push(current);
      if (current % 2 === 0) current = current / 2;
      else current = current * 3 + 1;
    }
    arr.push(1);
    setSequence(arr);
  };

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Hailstone Sequence</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter n > 0"
        keyboardType="numeric"
        value={n}
        onChangeText={setN}
      />
      <Button title="Generate" onPress={generate} />
      <ScrollView style={{ marginTop: 10, maxHeight: 120 }}>
        {sequence.length > 0 && (
          <Text>
            {sequence.join(' → ')}
            {'\n'}Length: {sequence.length}
          </Text>
        )}
      </ScrollView>
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
});
