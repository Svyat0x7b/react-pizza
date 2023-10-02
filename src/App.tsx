import React, {Suspense} from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import './scss/app.scss';
import MainNavigation from './layouts/MainNavigation';

const Cart = React.lazy(() => import(/*webpackChunkName: 'Cart'*/'./pages/Cart'));
const PizzaItem = React.lazy(() => import(/*webpackChunkName: 'PizzaItem'*/'./pages/PizzaItem'));
const NotFound = React.lazy(() => import(/*webpackChunkName: 'NotFound'*/'./pages/NotFound'));

function App() {
    return (
        <Routes>
            <Route path="/" element={<MainNavigation />}>
                <Route path="" element={<Home />} />
                <Route path="/cart" element={<Suspense fallback={<div style={{textAlign: 'center'}}>Loading...</div>}><Cart /></Suspense>} />
                <Route path="/pizzas/:id" element={<Suspense fallback={<div style={{textAlign: 'center'}}>Loading...</div>}><PizzaItem /></Suspense>} />
                <Route path="*" element={<Suspense fallback={<div style={{textAlign: 'center'}}>Loading...</div>}><NotFound />                                                  </Suspense>} />
            </Route>
        </Routes>
    );
}

export default App;
