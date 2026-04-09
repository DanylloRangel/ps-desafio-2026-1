'use client';

import { sportsItemType } from '@/types/sportsItem';
import styles from './Products.module.css';
import ProductCard from './ProductCard';
import {useEffect, useState} from 'react';
import {api} from '@/services/api';
import Pagination from './Pagination';

export default function Products() {
    const [product, setProduct] = useState<sportsItemType[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [productPerPage, setProductPerPage] = useState(6);

    useEffect(() => {
        async function getProducts() {
            const {response, error } = await api('GET', '/sports-articles');

            if(response){
                setProduct(response as sportsItemType[]);
            }
            else{
                console.error(error?.message);
            }
        }
        getProducts();
    }, []);

    const indexOfLastProduct = currentPage * productPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productPerPage;
    const currentProducts = product.slice(indexOfFirstProduct, indexOfLastProduct);

    return (
        <section className={styles.products}>
            <div className={styles.container}>
                <h1 className={styles.title} id = "products">Nossos Produtos</h1>
                <div className={styles.productList}>
                    {currentProducts.map((product) => (
                        <ProductCard key={product.id} {...product} />
                    ))}
                </div>
                <Pagination totalProducts={product.length} productPerPage={productPerPage} currentPage={currentPage} setCurrentPage={setCurrentPage} />
            </div>
        </section>
    );
}