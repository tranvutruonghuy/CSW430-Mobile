import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, Text, Button } from 'react-native-paper';

interface Product {
  thumbnail?: string;
  title?: string;
  description?: string;
  price?: number;
  discountPercentage?: number;
  rating?: number;
  stock?: number;
  brand?: string;
  category?: string;
}

const Product_Detail = () => {
  const [data, setData] = useState<Product>();
  const filePath = 'https://dummyjson.com/products/2';

  useEffect(() => {
    //Alert.alert(filePath);
    fetch(filePath)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(d => {
        setData(d);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);
  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Text style={styles.detail}>Product Detail - Tran Vu Truong Huy</Text>
        <Card.Cover
          style={styles.cardCover}
          source={{ uri: data?.thumbnail }}
        />
        <Card.Content>
          <Text style={styles.cardContent}>Title: {data?.title}</Text>
        </Card.Content>
        <Card.Content>
          <Text style={styles.info}>Description: {data?.description}</Text>
          <Text style={styles.info}>Price: ${data?.price}</Text>
          <Text style={styles.info}>Discount: {data?.discountPercentage}%</Text>
          <Text style={styles.info}>Rating: {data?.rating} stars</Text>
          <Text style={styles.info}>Stock: {data?.stock} units</Text>
          <Text style={styles.info}>Brand: {data?.brand}</Text>
          <Text style={styles.info}>Category: {data?.category}</Text>
        </Card.Content>
        <Card.Actions>
          <Button onPress={() => console.log('Pressed')}>Delete</Button>
          <Button onPress={() => console.log('Pressed')}>Cancel</Button>
        </Card.Actions>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
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
    color: 'black',
  },
  btn: {
    backgroundColor: '#674FA3',
    borderRadius: 50,
  },
  cardCover: { borderRadius: 20 },
  cardContent: { color: 'black', fontSize: 25 },
  container: {
    margin: 20,
    marginTop: 50,
    marginBottom: 73,
  },
});

export default Product_Detail;
