import React from 'react';
import AppContext from '../pages/context';

const useCart = () => {
    const { cartItems, setCartItems } = React.useContext(AppContext);
    
    // Перевірка, чи cartItems є масивом перед використанням reduce
    const items = Array.isArray(cartItems) ? cartItems : [];
    
    // Розрахунок загальної ціни
    const totalprice = items.reduce((sum, obj) => obj.price + sum, 0);
    
    return { cartItems: items, setCartItems, totalprice };
}

export default useCart;
