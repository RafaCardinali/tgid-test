import React, { useEffect, useState } from 'react';
import { Product } from './Product';
import './ProductList.css';

const useResponsiveProductsPerPage = () => {
    const [productsPerPage, setProductsPerPage] = useState(window.innerWidth <= 768 ? 4 : 6);

    useEffect(() => {
        const handleResize = () => {
            setProductsPerPage(window.innerWidth <= 768 ? 4 : 6);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return productsPerPage;
};

export const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = useResponsiveProductsPerPage();

    useEffect(() => {
        fetch('http://localhost:3001/products')
            .then(response => response.json())
            .then(data => setProducts(data));
    }, []);

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

    const paginate = pageNumber => setCurrentPage(pageNumber);

    return (
        <>
            <div className='product__page'>
                <div className="page-info">Página {currentPage} de {Math.ceil(products.length / productsPerPage)}</div>
                <div className="product__list">
                    {currentProducts.map(product => (
                        <Product key={product.id} product={product} />
                    ))}
                </div>
            </div>
            {products.length > productsPerPage && (
                <div className='pagination'>
                    {Array.from({ length: Math.ceil(products.length / productsPerPage) }, (_, index) => (
                        <button
                            key={index}
                            onClick={() => paginate(index + 1)}
                            aria-label={`Ir para página ${index + 1}`}>
                            {index + 1}
                        </button>
                    ))}
                </div>
            )}
        </>
    );
};
