import { useState, useEffect } from 'react';
import {
  Text,
  View,
  FlatList,
  Image,
  StyleSheet,
  Button,
  Alert,
} from 'react-native';
// import { black } from 'react-native-paper/lib/typescript/styles/themes/v2/colors';
// import { Colors } from 'react-native/Libraries/NewAppScreen';
type ProductItem = {
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
};

export default function Product() {
  const [data, setData] = useState<ProductItem[]>([]);
  const filePath = 'https://dummyjson.com/products/';
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
        setData(d.products);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);
  return (
    <View style={styles.container}>
      <Text style={styles.name}>Product List - Tran Vu Truong Huy</Text>
      <FlatList
        data={data}
        renderItem={({ item }) => {
          return (
            <View>
              <View style={styles.div}>
                <View style={styles.img}>
                  <Image
                    source={{ uri: item.thumbnail }} // Accessing the first image
                    style={styles.thumbnail}
                  />
                </View>
                <View style={styles.info}>
                  <Text style={styles.title}>Title: {item.title}</Text>
                  <Text>Description: {item.description}</Text>
                  <Text>Price: {item.price}</Text>
                  <Text style={styles.discount}>
                    Discount: {item.discountPercentage} off
                  </Text>
                  <Text>Rating: {item.rating}</Text>
                  <Text>Stock: {item.stock}</Text>
                  <Text>Brand: {item.brand}</Text>
                  <Text>Category: {item.category}</Text>
                  <View style={styles.buttonGroup}>
                    <Button
                      title="DETAIL"
                      onPress={() => Alert.alert('Detail Button pressed')}
                    />
                    <Button
                      title="ADD"
                      onPress={() => Alert.alert('Add Button pressed')}
                    />
                    <Button
                      title="DELETE"
                      onPress={() => Alert.alert('Delete Button pressed')}
                    />
                  </View>
                </View>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  div: {
    flexDirection: 'row',
    marginBottom: 30,
  },
  img: {
    flex: 1.5,
  },

  info: {
    flex: 2.5,
  },

  title: {
    color: '#747274',
    fontWeight: 'bold',
  },

  discount: {
    color: 'green',
  },

  buttonGroup: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },

  container: {
    margin: 20,
    marginTop: 50,
    marginBottom: 73,
  },

  name: { color: '#747274', fontWeight: 'bold', fontSize: 30 },

  thumbnail: {
    width: 100,
    height: 100,
  },
});
