'use client'

import * as styles from './styles'; // Import styles from styles.ts
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Rating } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css';
import RatingComponent from '@/components/ratings/ratings';
import ColorComponent from '@/components/color/color';
import SizeComponent from '@/components/size/size';
import { useCart } from '@/providers/cart';
import { ApiRatings } from '@/services/ratings';

export default function Item({ params }: { params: { itemId: string } }) {
    const [item, setItem] = useState<ApiRatings.Item | null>(null);
    const [selectedColor, setSelectedColor] = useState('preto');
    const [selectedSize, setSelectedSize] = useState('P');

    const { cart, addItemToCart } = useCart();

    const handleColorSelect = (color: string) => {
        setSelectedColor(color);
    };

    const handleSizeSelect = (size: string) => {
        setSelectedSize(size);
    };

    const handleAddCart = (item: ApiRatings.Item) => {
        addItemToCart({
            cor: selectedColor,
            size: selectedSize,
            id: item.id,
            image: item.image,
            name: item.name,
            price: item.price,
        })
    }

    useEffect(() => {
        async function fetchItem() {
            const item = await ApiRatings.getItemById(params.itemId);
            setItem(item);
        }

        fetchItem();
    }, [])

    useEffect(() => console.log(cart), [cart])

    if (!item) return (
        <div style={styles.pageContainer}>
            <p>Carregando dados...</p>
        </div>
    );

    return (
        <div style={styles.pageContainer}>
            <div style={styles.sectionContainer}>
                <div style={styles.rowContainer}>
                    <div style={styles.columnContainer}>
                        <img 
                            src={item.image}
                            style={styles.itemImage}
                            alt="Item Image"
                        />
                        <p style={styles.itemPrice} className='font-semibold'>{item.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                    </div>

                    <div style={styles.itemNameContainer}>
                        <div style={styles.blackBar}></div>

                        <div>
                            <text style={styles.itemName} className='font-bold'>{item.name}</text>
                        </div>

                        <p style={styles.itemAttribute} className='font-medium'><strong>Cor:</strong> {selectedColor}</p>

                        <div style={styles.colorSizeRow}>
                            <ColorComponent color='preto' selected={selectedColor === 'preto'} onClick={() => handleColorSelect('preto')} />
                            <ColorComponent color='vermelho' selected={selectedColor === 'vermelho'} onClick={() => handleColorSelect('vermelho')} />
                            <ColorComponent color='azul' selected={selectedColor === 'azul'} onClick={() => handleColorSelect('azul')} />
                        </div>

                        <p style={styles.itemAttribute}><strong>Tamanho:</strong> {selectedSize}</p>
                        
                        <div style={styles.colorSizeRow}>
                            <SizeComponent size='P' selected={selectedSize === 'P'} onClick={() => handleSizeSelect('P')} />
                            <SizeComponent size='M' selected={selectedSize === 'M'} onClick={() => handleSizeSelect('M')} />
                            <SizeComponent size='G' selected={selectedSize === 'G'} onClick={() => handleSizeSelect('G')} />
                        </div>

                        <button style={styles.addToCartButton} onClick={() => handleAddCart(item)}>
                            <p style={styles.addToCartButtonText} className='font-semibold'>Adicionar ao carrinho</p>
                        </button>
                    </div>
                </div>  
                
                <div style={styles.descriptionSection}>
                    <p style={styles.itemPrice} className='font-bold'>Descrição</p>
                    <p style={styles.itemAttribute} className='font-medium'>{item.description}</p>
                </div>
                <div>
                    <div style={styles.ratingsRow}>
                        <p style={styles.itemPrice} className='font-bold'>Avaliações</p>
                        <Rating style={{ maxWidth: 250, marginBottom: '5px' }} value={3} readOnly={true}/>
                    </div>
                    <div style={{ marginLeft: '30px', marginTop: '30px' }}>
                        <RatingComponent rating={3} comment='Sed vulputate porta facilisis Curabitur.'/>
                    </div>
                    <div style={styles.viewMoreRow}>
                        <a href="#" style={styles.viewMoreLink} className='font-medium'>Ver mais</a>
                        <a href='/cart' style={styles.goToCartButton}>
                            <p style={styles.goToCartButtonText} className='font-semibold'>Ir para o carrinho</p>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
