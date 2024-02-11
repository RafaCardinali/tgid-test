import React from 'react';
import { useCart } from '../../context/CartContext';

export const CartSummary = () => {
    const { cartItems } = useCart();

    const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

    return (
        <div className='cart-summary'>
            <p>Total de Itens: {cartItems.reduce((acc, item) => acc + item.quantity, 0)}</p>
            <p>Total a Pagar: R$ {total.toFixed(2)}</p>
        </div>
    );
};
