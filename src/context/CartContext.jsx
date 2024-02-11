import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    const addToCart = (product) => {
        const exists = cartItems.find(item => item.id === product.id);
        if (exists) {
            setCartItems(cartItems.map(item =>
                item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
            ));
        } else {
            setCartItems([...cartItems, { ...product, quantity: 1 }]);
        }
    };

    const decreaseItemQuantity = (productId) => {
        setCartItems(currentItems =>
            currentItems.map(item =>
                item.id === productId
                    ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 0 }
                    : item
            ).filter(item => item.quantity > 0)
        );
    };

    const removeFromCart = (productId) => {
        setCartItems(currentItems => currentItems.filter(item => item.id !== productId));
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, decreaseItemQuantity }}>
            {children}
        </CartContext.Provider>
    );
};
