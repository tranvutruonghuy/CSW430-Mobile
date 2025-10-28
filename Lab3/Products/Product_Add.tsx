import { useState } from 'react';
import { Text, View, StyleSheet, Button, Alert, TextInput } from 'react-native';
export default function Product_Add() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [discountPercentage, setDiscountPercentage] = useState('');
  const [rating, setRating] = useState('');
  const [stock, setStock] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [images, setImages] = useState('');

  const handleSubmit = () => {
    fetch('https://dummyjson.com/products/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: title,
        description: description,
        price: price,
        discountPercentage: discountPercentage,
        rating: rating,
        stock: stock,
        brand: brand,
        category: category,
        images: images,
      }),
    })
      .then(res => res.json())
      .then(console.log);
    Alert.alert('Add sucessfully');
    clearForm();
  };
  const clearForm = () => {
    setTitle('');
    setDescription('');
    setPrice('');
    setDiscountPercentage('');
    setRating('');
    setStock('');
    setBrand('');
    setCategory('');
    setImages('');
  };
  return (
    <View style={styles.container}>
      <Text style={styles.addProduct}>Add a Product - Tran Vu Truong Huy</Text>
      <Text style={styles.label}>Title</Text>
      <TextInput
        value={title}
        onChangeText={text => setTitle(text)}
        placeholder="Enter title"
      />
      <Text style={styles.label}>Description</Text>
      <TextInput
        placeholder="Enter description"
        value={description}
        onChangeText={text => setDescription(text)}
      />
      <Text style={styles.label}>Price</Text>
      <TextInput
        placeholder="Enter price"
        value={price}
        onChangeText={text => setPrice(text)}
      />
      <Text style={styles.label}>Discount Percentage</Text>
      <TextInput
        placeholder="Enter discount percentage"
        value={discountPercentage}
        onChangeText={text => setDiscountPercentage(text)}
      />
      <Text style={styles.label}>Rating</Text>
      <TextInput
        placeholder="Enter rating"
        value={rating}
        onChangeText={text => setRating(text)}
      />
      <Text style={styles.label}>Stock</Text>
      <TextInput
        placeholder="Enter stock"
        value={stock}
        onChangeText={text => setStock(text)}
      />
      <Text style={styles.label}>Brand</Text>
      <TextInput
        placeholder="Enter brand"
        value={brand}
        onChangeText={text => setBrand(text)}
      />
      <Text style={styles.label}>Category</Text>
      <TextInput
        placeholder="Enter category"
        value={category}
        onChangeText={text => setCategory(text)}
      />
      <Text style={styles.label}>Images</Text>
      <TextInput
        placeholder="Enter images URL(s)"
        value={images}
        onChangeText={text => setImages(text)}
      />
      <Button title="SUBMIT" onPress={handleSubmit} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    margin: 20,
    marginTop: 50,
    marginBottom: 73,
  },
  label: {
    fontWeight: 'bold',
  },
  addProduct: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 20,
  },
});
