'use client';

import { sportsItemType } from '@/types/sportsItem';
import style from './ProductCard.module.css';
import Image from 'next/image';
import { useState } from 'react';
import { buySportsItem } from '@/actions/sportsItem';

export default function ProductCard(product: sportsItemType){
    const [Quantidade, setQuantidade] = useState(1);
    const formattedPrice = (Number(product?.price)).toFixed(2).replace(".", ",");
    

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

    const comprar = async() => {
        
        const response = JSON.parse(await buySportsItem(product.id, Quantidade));

        if(response.error){
            alert(response.error.message);
        }
        else {
            alert('Compra realizada com sucesso!');
            window.location.reload();
        }
    }

    return (
        <div className={style.productCard}>
            <Image className={style.productImage} src={product?.image || '/assets/images/default.png'} alt="Product Image" width={200} height={200} />
            <div className={style.productInfo}>
                <h3 className={style.productName}>{product.name}</h3>
                <p className={style.productCategory}>{'Categoria: ' + product.category.name}</p>
                <p className={style.productBrand}>{'Marca: ' + product.brand}</p>
                <p className={style.productYear}>{'Ano: ' + product.year}</p>
                <p className={style.productPrice}>R$ {formattedPrice}</p>
                <p className={style.productAmount}>{product.amount} em estoque</p>
            </div>
            <div className={style.productActions}>
                
                <button className={style.decrement} onClick={decrement}>-</button>
                <span className={style.quantityDisplay}>{Quantidade}</span>
                <button className={style.increase} onClick={increment}>+</button>
                {product.amount > 1 ?(
                    <button className={style.addToCartButton} onClick={comprar}>
                        Comprar
                    </button>
                ): (
                    <button className={style.addToCartButton} disabled>Esgotado</button>
                )}
            </div>
        </div>
    );
}