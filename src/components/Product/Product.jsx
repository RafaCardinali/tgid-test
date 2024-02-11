import React from 'react';
import { useCart } from '../../context/CartContext';

export const Product = ({ product }) => {
    const { addToCart } = useCart();

    const formattedPrice = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(product.price);

    return (
        <div className='product'>
            <img src={product.image} alt={product.name} />
            <div className="product__content">
                <h2>{product.name}</h2>
                <p>{product.description}</p>
                <p>{formattedPrice}</p>
            </div>
            <button className="product__button-add-to-cart" onClick={() => addToCart(product)}>Adicionar ao Carrinho</button>
        </div>
    );
};
