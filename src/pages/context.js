import React from 'react';

const AppContext = React.createContext({ cartItems: [], setCartItems: () => {} });

export default AppContext;
