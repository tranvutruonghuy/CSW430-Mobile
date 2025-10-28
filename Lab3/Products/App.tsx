import React, { useState } from 'react';
import Products from './Products.tsx';
import Product_Add from './Product_Add.tsx';
import Product_Search from './Product_Search.tsx';
import Product_Detail from './Product_Detail.tsx';
import { BottomNavigation } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
const App = () => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'Products', title: 'Products', focusedIcon: 'folder' },
    { key: 'Product_Add', title: 'Add', focusedIcon: 'new-box' },
    { key: 'Product_Search', title: 'Search', focusedIcon: 'find' },
    { key: 'Product_Detail', title: 'Detail', focusedIcon: 'calendar' },
  ]);
  const renderScene = BottomNavigation.SceneMap({
    Products: Products,
    Product_Add: Product_Add,
    Product_Search: Product_Search,
    Product_Detail: Product_Detail,
  });
  return (
    <SafeAreaProvider>
      <BottomNavigation
        navigationState={{ index, routes }}
        onIndexChange={setIndex}
        renderScene={renderScene}
      />
    </SafeAreaProvider>
  );
};

export default App;
