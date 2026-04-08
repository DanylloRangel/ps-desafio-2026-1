'use client';

import { sportsItemType } from '@/types/sportsItem';
import styles from './Products.module.css';
import ProductCard from './ProductCard';
import {useEffect, useState} from 'react';
import {api} from '@/services/api';

export default function Products() {
    const [product, setProduct] = useState<sportsItemType[]>([]);

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
    
    return (
        <section className={styles.products}>
            <div className={styles.container}>
                <h1 className={styles.title} id = "products">Nossos Produtos</h1>
                <div className={styles.productList}>
                    {product.map((product) => (
                        <ProductCard key={product.id} {...product} />
                    ))}
                </div>
            </div>
        </section>
    );
}