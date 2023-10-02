import React from 'react';
import { useNavigate } from 'react-router-dom';
import emptyCart from '../img/empty-cart.png';

const CartEmpty: React.FC = () => {
    const navigate = useNavigate();
    return (
        <div className="cart cart--empty">
            <h2>Cart is empty 😕</h2>
            <p>
                You haven't already order the pizza
                <br />
                To order some pizza move to main page
            </p>
            <img src={emptyCart} alt="Empty cart" />
            <a href="/" className="button button--black">
                <span onClick={() => navigate('..')}>Go back</span>
            </a>
        </div>
    );
};

export default CartEmpty;
