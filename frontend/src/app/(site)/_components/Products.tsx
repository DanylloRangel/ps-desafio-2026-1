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
            console.log('Fetching products...');
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

/*     const product: sportsItemType[] = [
        {
            id: '1',
            name: 'Tênis de Corrida',
            brand: 'Nike',
            price: 299.99,
            year: 2023,
            image: 'https://picsum.photos/300/200?random=1',
            category_id: '1',
            amount: 10
        },

        {
            id: '2',
            name: 'Tênis de Corrida',
            brand: 'Nike',
            price: 299.99,
            year: 2023,
            image: 'https://picsum.photos/300/200?random=2',
            category_id: '1',
            amount: 10
        },

        {
            id: '3',
            name: 'Tênis de Corrida',
            brand: 'Nike',
            price: 299.99,
            year: 2023,
            image: 'https://picsum.photos/300/200?random=3',
            category_id: '1',
            amount: 10
        },

        {
            id: '4',
            name: 'Tênis de Corrida',
            brand: 'Nike',
            price: 299.99,
            year: 2023,
            image: 'https://picsum.photos/300/200?random=4',
            category_id: '1',
            amount: 10
        },

        {
            id: '5',
            name: 'Tênis de Corrida',
            brand: 'Nike',
            price: 299.99,
            year: 2023,
            image: 'https://picsum.photos/300/200?random=5',
            category_id: '1',
            amount: 10
        }
    ] */
    
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