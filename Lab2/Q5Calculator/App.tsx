import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './style.js';
function App() {
  const [displayValue, setDisplayValue] = useState('0');
  const [operator, setOperator] = useState(null);
  const [firstValue, setFirstValue] = useState('');

  //Function to handle number inputs
  const handleNumberInput = num => {
    if (displayValue === '0') {
      setDisplayValue(num.toString());
    } else {
      setDisplayValue(displayValue + num);
    }
  };

  // Function to handle operator inputs
  const handleOperatorInput = operator => {
    setOperator(operator);
    setFirstValue(displayValue);
    setDisplayValue('0');
  };

  // Function to handle equal button press

  const handleEqual = () => {
    const num1 = parseFloat(firstValue);
    const num2 = parseFloat(displayValue);
    if (operator === '+') {
      setDisplayValue((num1 + num2).toString());
    } else if (operator === '-') {
      setDisplayValue((num1 - num2).toString());
    } else if (operator === '*') {
      setDisplayValue((num1 * num2).toString());
    } else if (operator === '/') {
      setDisplayValue((num1 / num2).toString());
    }
    setOperator(null);
    setFirstValue('');
  };

  // Function to handle clear button press
  const handleClear = () => {
    setDisplayValue('0');
    setOperator(null);
    setFirstValue('');
  };
  return (
    <View style={styles.container}>
      <Text>Trần Vũ Trường Huy</Text>
      <Text style={styles.display}>{displayValue}</Text>

      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleNumberInput(1)}
        >
          <Text style={styles.buttonText}>1</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleNumberInput(2)}
        >
          <Text style={styles.buttonText}>2</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleNumberInput(3)}
        >
          <Text style={styles.buttonText}>3</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.operatorButton]}
          onPress={() => handleOperatorInput('+')}
        >
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleNumberInput(4)}
        >
          <Text style={styles.buttonText}>4</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleNumberInput(5)}
        >
          <Text style={styles.buttonText}>5</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleNumberInput(6)}
        >
          <Text style={styles.buttonText}>6</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.operatorButton]}
          onPress={() => handleOperatorInput('-')}
        >
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleNumberInput(7)}
        >
          <Text style={styles.buttonText}>7</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleNumberInput(8)}
        >
          <Text style={styles.buttonText}>8</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleNumberInput(9)}
        >
          <Text style={styles.buttonText}>9</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.operatorButton]}
          onPress={() => handleOperatorInput('*')}
        >
          <Text style={styles.buttonText}>×</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={[styles.button, styles.clearButton]}
          onPress={handleClear}
        >
          <Text style={styles.buttonText}>C</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.zeroButton}
          onPress={() => handleNumberInput(0)}
        >
          <Text style={styles.buttonText}>0</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.equalButton]}
          onPress={handleEqual}
        >
          <Text style={[styles.buttonText, { color: '#fff' }]}>=</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.operatorButton]}
          onPress={() => handleOperatorInput('/')}
        >
          <Text style={styles.buttonText}>÷</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default App;
