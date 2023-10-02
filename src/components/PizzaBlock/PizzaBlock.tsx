import React from 'react';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addItem } from '../../redux/cart/cartSlice';
import { Link } from 'react-router-dom';

export const TYPES = ['thin', 'traditional'];

type PizzaBlockProps = {
    pizza: Pizza,
}

type Pizza = {
    id: string,
    name:string,
    price: number,
    imageUrl: string,
    types: string[],
    sizes: number[]
    rating: number,
    category: number,
}

const PizzaBlock: React.FC<PizzaBlockProps> = ({ pizza }) => {
    const [activeSize, setActiveSize] = useState<number>(pizza.sizes[0]);
    const [typeIndex, setTypeIndex] = useState<number>(0);

    const dispatch = useDispatch();
    const cartItem = useSelector((state: any) => state.cart.items).find((obj) => obj.id === pizza.id);

    const addItemHandler = () => {
        const item = {
            id: pizza.id,
            name: pizza.name,
            price: pizza.price,
            imageUrl: pizza.imageUrl,
            type: TYPES[typeIndex],
            size: activeSize,
            rating: pizza.rating,
            amount: 0,
        };

        dispatch(addItem(item));
    };

    return (
        <div className="pizza-block">
            <Link to={`/pizzas/${pizza.id}`}>
                <img className="pizza-block__image" src={pizza.imageUrl} alt="Pizza" />
            </Link>
            <h4 className="pizza-block__title">{pizza.name}</h4>
            <div className="pizza-block__selector">
                <ul>
                    {pizza.types.map((type: string, index: number ) => (
                        <li
                            key={type}
                            className={typeIndex === index ? 'active' : ''}
                            onClick={() => setTypeIndex(index)}>
                            {TYPES[index]}
                        </li>
                    ))}
                </ul>
                <ul>
                    {pizza.sizes.map((size) => (
                        <li
                            key={size}
                            className={size === activeSize ? 'active' : ''}
                            onClick={() => setActiveSize(size)}>
                            {size} сm.
                        </li>
                    ))}
                </ul>
            </div>
            <div className="pizza-block__bottom">
                <div className="pizza-block__price">от {pizza.price} UAH</div>
                <button className="button button--outline button--add">
                    <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                            fill="white"></path>
                    </svg>
                    <span onClick={addItemHandler}>Buy</span>
                    {cartItem && <i>{cartItem.amount}</i>}
                </button>
            </div>
        </div>
    );
};

export default PizzaBlock;
