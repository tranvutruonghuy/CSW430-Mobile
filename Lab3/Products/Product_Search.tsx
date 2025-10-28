import React, { useState } from 'react';
import {
  View,
  FlatList,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Card, Text } from 'react-native-paper';

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
}

const Product_Search = () => {
  const [data, setData] = useState<Product[]>([]);
  const [value, setValue] = useState('');
  let filePath = 'https://dummyjson.com/products';

  const searchProduct = () => {
    if (value !== '')
      filePath = 'https://dummyjson.com/products/search?q=' + value;
    fetch(filePath)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(d => {
        setData(d.products);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Search Products - Tran Vu Truong Huy</Text>
      <TextInput
        style={styles.input}
        placeholder="Search for products"
        value={value}
        onChangeText={setValue}
      />

      <TouchableOpacity style={styles.search} onPress={searchProduct}>
        <Text style={styles.searchText}>SEARCH</Text>
      </TouchableOpacity>
      <FlatList
        data={data}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <Text style={styles.detail}>Product Detail</Text>
            <Card.Cover
              style={styles.cardCover}
              source={{ uri: item.thumbnail }}
            />
            <Card.Content>
              <Text style={styles.cardContent}>Title: {item.title}</Text>
            </Card.Content>
            <Card.Content>
              <Text style={styles.info}>Description: {item.description}</Text>
              <Text style={styles.info}>Price: ${item.price}</Text>
              <Text style={styles.info}>
                Discount: {item.discountPercentage}%
              </Text>
              <Text style={styles.info}>Rating: {item.rating} stars</Text>
              <Text style={styles.info}>Stock: {item.stock} units</Text>
              <Text style={styles.info}>Brand: {item.brand}</Text>
              <Text style={styles.info}>Category: {item.category}</Text>
            </Card.Content>
          </Card>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  searchText: {
    color: 'white',
    fontSize: 15,
  },
  title: {
    marginBottom: 10,
    fontWeight: 'bold',
    fontSize: 15,
    color: '#747274',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  search: {
    marginBottom: 10,
    backgroundColor: '#2196F3',
    alignItems: 'center',
    paddingTop: 5,
    paddingBottom: 5,
  },
  detail: {
    fontSize: 15,
    marginLeft: 10,
    marginBottom: 10,
  },
  card: {
    marginBottom: 10,
  },
  info: {
    color: '#747274',
  },
  cardCover: { borderRadius: 20 },
  cardContent: { color: '#747274', fontSize: 25 },
  container: {
    margin: 20,
    marginTop: 50,
    marginBottom: 73,
  },
});

export default Product_Search;
