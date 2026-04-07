'use client';

import { sportsItemType } from '@/types/sportsItem';
import style from './ProductCard.module.css';
import Image from 'next/image';
import { useState } from 'react';

export default function ProductCard(product: sportsItemType){
    const [Quantidade, setQuantidade] = useState(1);
    

    const decrement = () => {
        if(Quantidade > 1){
            setQuantidade(Quantidade - 1);
        }
    }

    const increment = () => {
        if(Quantidade < product.amount){
            setQuantidade(Quantidade + 1);
        }
    }

    return (
        <div className={style.productCard}>
            <Image className={style.productImage} src={product?.image || '/assets/images/default.png'} alt="Product Image" width={200} height={200} />
            <div className={style.productInfo}>
                <h3 className={style.productName}>{product.name}</h3>
                <p className={style.productCategory}>{product.category.name}</p>
                <p className={style.productBrand}>{product.brand}</p>
                <p className={style.productYear}>{product.year}</p>
                <p className={style.productPrice}>R$ {product.price}</p>
                <p className={style.productAmount}>{product.amount} em estoque</p>
            </div>
            <div className={style.productActions}>
                {Quantidade > 1 ?(
                    <button className={style.decrement} onClick={decrement}>-</button>
                ): (
                    <button className={style.decrement} disabled>-</button>
                )}
                <span className={style.quantityDisplay}>{Quantidade}</span>
                {Quantidade < product.amount ?(
                    <button className={style.increase} onClick={increment}>+</button>
                ): (
                    <button className={style.decrement} disabled>+</button>
                )}
                {product.amount > 1 ?(
                    <button className={style.addToCartButton}>Comprar</button>
                ): (
                    <button className={style.addToCartButton} disabled>Esgotado</button>
                )}
            </div>
        </div>
    );
}