import React from 'react';
import { Info } from '../Info';
import axios from 'axios';
import styles from './Drawer.module.scss';
import useCart from '../../hooks/useCart';

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
export default function Drawer({ onClose, onRemove, items = [],opened }) {
  const{cartItems,setCartItems,totalprice} = useCart();
  const [orderId, setOrderId] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const[isCompleteOrder, setIsCompleteOrder] = React.useState(false);
 const onClickOrder = async() => {
    try {
      setIsLoading(true);
      const {data} = await axios.post('https://66221eb127fcd16fa6c8d659.mockapi.io/orders', { items: cartItems });
      setOrderId(data.id);
      setIsCompleteOrder(true);
      setCartItems([]);
      for (let i = 0; i < cartItems.length; i++) {
        const item = cartItems[i];
        await axios.delete('https://66221eb127fcd16fa6c8d659.mockapi.io/cart/' + item.id);
        await delay(1000);
      }
      
    }
    catch (error) {
      alert('Помилка при створенні замовлення');
    }
    setIsLoading(false);
 };
  return (
    <div className={`${styles.overlay} ${opened ? styles. overlayVisible : ''}`}>
      <div className={styles.drawer}>
        <h2 className="mb-30 justify-between mb-30">
          Кошик
          <img onClick={onClose} className="cu-p" src="img/close.svg" alt="close" />
        </h2>
        {items.length > 0 ? (
          <div className='d-flex flex-column flex'>
          <div className="items flex">
            {items.map((obj) => (
              <div key={obj.id} className="cartItem d-flex align-center mb-20">
                <div
                  style={{ backgroundImage: `url(${obj.imageUrl})` }}
                  className="cartItemImg"
                ></div>

                <div className="mr-20 flex">
                  <p className="mb-5">{obj.title}</p>
                  <b>{obj.price}грн</b>
                </div>
                <img
                  onClick={() => onRemove(obj.id)}
                  className="close"
                  src="img/close.svg"
                  alt="close"
                />
              </div>
            ))}
          </div>
          <div className="cartTotalBlock">
          <ul>
            <li>
              <span>Підсумок:</span>
              <div></div>
              <b>{totalprice}грн</b>
            </li>
            <li>
              <span>
                Налог 5%
              </span>
              <div>
              </div>
              <b>{totalprice / 100 * 5}</b>
            </li>
          </ul>
          <button disabled={isLoading} onClick={onClickOrder} className="greenButton">
          Оформити замовлення <img src="/img/arrow.svg" alt="arrow" />
          </button>
        </div>
        </div>
        ) : (
          <Info title ={isCompleteOrder ? "Замовлення оформлене" : "Кошик пустий"}
          description={isCompleteOrder ? `Више замовлення #${orderId}` : "Додайте хоча б одну пару кросівок, щоб зробити замовлення"} 
          image={isCompleteOrder ? "/img/done.png" : "/img/empty-cart.jpg"}/>  
        )}
      </div>
    </div>
  );
}
