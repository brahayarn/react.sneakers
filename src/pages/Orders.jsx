import React from 'react'
import Card from '../components/Card'
import axios from 'axios'
import AppContext from './context'; 

export const Orders = () => {
  const { onAddToFavorite, onAddToCart } = React.useContext(AppContext);
  const [orders, setOrders] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true); 

  React.useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get('https://6627dd4cb625bf088c0a16ae.mockapi.io/orders');
        setOrders(data.reduce((prev, obj) => [...prev, ...obj.items], []));
        setIsLoading(false);
      } catch (error) {
        alert('Помилка при запросі на сервер')
        console.error(error);
      }
    })();
  }, []);

  return (
    <div className="content p-40">
      <div className="d-flex justify-between align-center mb-40">
        <h1>Закази</h1>
      </div>

      <div className="d-flex flex-wrap">
        {(isLoading ? [...Array(12)] : orders).map((item, index) => (
          <Card
            key={index}
            onFavorite={(obj) => onAddToFavorite(obj)}
            onPlus={(obj) => onAddToCart(obj)}
            loading={isLoading}
            {...item} />
        ))}
      </div>
    </div>
  )
}
