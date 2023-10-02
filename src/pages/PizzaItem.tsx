import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../redux/cart/cartSlice';
import { useParams } from 'react-router-dom';
import { TYPES } from '../components/PizzaBlock/PizzaBlock';
import { selectCartItemById } from '../redux/cart/selectors';

const PizzaItem: React.FC = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const cartItem = useSelector(selectCartItemById(id));
    const [activeSize, setActiveSize] = useState(26);
    const [typeIndex, setTypeIndex] = useState(0);
    const navigate = useNavigate();
    const addedCount = cartItem ? cartItem.amount : 0;
    const [isError, setIsError] = useState(false);
    const [fetchedPizza, setFetchedPizza] =
        useState <
        {
            id: string,
            name: string,
            price: number,
            imageUrl: string,
            type: number,
            size: number,
            rating: number,
            sizes: number[],
            types: string[],
        } >
        ();

    useEffect(() => {
        const fetchPizzaById = async (id) => {
            try {
                const res = await axios.get(
                    `https://64a8288adca581464b8568db.mockapi.io/api/v1/pizzas/${id}`,
                );

                if (res.status < 200 && res.status >= 300) {
                    setIsError(true);
                }

                setFetchedPizza(res.data);
                setActiveSize(fetchedPizza.sizes[0]);
            } catch (err) {
                setIsError(true);
            }
        };

            fetchPizzaById(id);
    
    }, []);

    const addItemHandler = () => {
        const item = {
            id: fetchedPizza.id,
            name: fetchedPizza.name,
            price: fetchedPizza.price,
            imageUrl: fetchedPizza.imageUrl,
            type: TYPES[typeIndex],
            size: activeSize,
            amount: 0,
        };

        dispatch(addItem(item));
    };

    return (
        <div>
            {fetchedPizza && isError ? (
                <div className="pizzaItem container">
                    <img src={fetchedPizza.imageUrl} alt="pizza" />
                    <div>
                        <div>
                            <h2>{fetchedPizza.name}</h2>
                            <p>
                                Minim deserunt excepteur aliqua enim deserunt eu excepteur est
                                tempor. Pariatur exercitation irure et voluptate tempor elit
                                adipisicing cillum do tempor cupidatat qui ex. Non amet commodo
                                laborum excepteur. Tempor consectetur eiusmod deserunt nulla ex
                                aliquip laborum. Enim in pariatur consectetur tempor exercitation.
                                Irure duis laborum aliqua cillum sunt. Excepteur ipsum eiusmod
                                excepteur eu anim Lorem. Minim deserunt excepteur aliqua enim
                                deserunt eu excepteur est tempor. Pariatur exercitation irure et
                                voluptate tempor elit adipisicing cillum do tempor cupidatat qui ex.
                                Non amet commodo laborum excepteur. Tempor consectetur eiusmod
                                deserunt nulla ex aliquip laborum. Enim in pariatur consectetur
                                tempor exercitation. Irure duis laborum aliqua cillum sunt.
                                Excepteur ipsum eiusmod excepteur eu anim Lorem.
                            </p>
                        </div>
                        <div className="pizzaItem-options">
                            <span>Rating: {fetchedPizza.rating}/10</span>
                            <ul>
                                Sizes:
                                {fetchedPizza?.sizes?.map((size) => (
                                    <li
                                        key={size}
                                        className={size === activeSize ? 'active' : ''}
                                        onClick={() => setActiveSize(size)}>
                                        {size} cm.
                                    </li>
                                ))}
                            </ul>
                            <ul>
                                Types:
                                {fetchedPizza?.types?.map((type) => (
                                    <li
                                        key={type}
                                        className={typeIndex === parseInt(type, 10) ? 'active' : ''}
                                        onClick={() => setTypeIndex(parseInt(type, 10))}>
                                        {TYPES[type]}
                                    </li>
                                ))}
                            </ul>
                            <span>Price: {fetchedPizza.price} UAH</span>
                        </div>
                        <div className="pizzaitem__actions">
                            <button className="go-back-btn" onClick={() => navigate('..')}>
                                Go Back
                            </button>
                            <button className="add-to-cart-btn" onClick={addItemHandler}>
                                Add to Cart {<span>{addedCount}</span>}
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <div style={{'textAlign': 'center', 'fontWeight': 'bolder', 'fontSize':'36px'}}>Loading...</div>
            )}
        </div>
    );
};

export default PizzaItem;
