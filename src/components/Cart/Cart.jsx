import React, { useState, useRef } from 'react';
import { useCart } from '../../context/CartContext';
import { CartSummary } from './CartSummary';
import './Cart.css';
import useOutsideClick from '../../context/useOutsideClick';

export const Cart = () => {
    const [isVisible, setIsVisible] = useState(false);
    const { cartItems, removeFromCart, addToCart, decreaseItemQuantity } = useCart();
    const cartRef = useRef(null);

    useOutsideClick(cartRef, () => setIsVisible(false));

    const toggleVisibility = () => setIsVisible(!isVisible);

    return (
        <>
            <div className="topbar">
                <button className="topbar__open-cart-button" onClick={toggleVisibility}>
                    <span className="material-symbols-outlined">shopping_bag</span>
                    {cartItems.length > 0 && <div className="cart-indicator"></div>}
                </button>
            </div>
            {isVisible && <div className="overlay" onClick={toggleVisibility}></div>}
            <div ref={cartRef} className={`Cart ${isVisible ? 'visible' : ''}`}>
                <button onClick={toggleVisibility} className="close-cart-button">
                    <span className="material-symbols-outlined">close</span>
                </button>
                <h2>Carrinho de Compras</h2>
                <div className="cart-items__container">
                    {cartItems.map(item => (
                        <div key={item.id} className="cart-item">
                            <div className="cart-items__item-header">
                                <h4>{item.name}</h4>
                                <p>Quantidade: {item.quantity}</p>
                            </div>
                            <div className="cart-items__item-footer">
                                <p>R$ {(item.price * item.quantity).toFixed(2)}</p>
                                <div>
                                    <button className="button" onClick={() => addToCart(item)}>
                                        <span className="material-symbols-outlined">add</span>
                                    </button>
                                    <button className="button" onClick={() => decreaseItemQuantity(item.id)}>
                                        <span className="material-symbols-outlined">remove</span>
                                    </button>
                                    <button className="button" onClick={() => removeFromCart(item.id)}>
                                        <span className="material-symbols-outlined">delete</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <CartSummary />
            </div>
        </>
    );
};
