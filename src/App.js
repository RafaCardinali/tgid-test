import React from 'react';
import { Cart } from './components/Cart/Cart';
import { ProductList } from './components/Product/ProductList';
import { CartProvider } from './context/CartContext';

function App() {
    return (
      <CartProvider>
        <div className='app__container'>
            <Cart />
            <ProductList />
        </div>
      </CartProvider>
    );
}

export default App;
