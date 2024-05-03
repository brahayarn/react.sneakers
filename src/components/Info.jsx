import React from 'react'
import AppContext from '../pages/context';

export const Info = ({image,title,description}) => {
    const {setCartOpened} = React.useContext(AppContext);
  return (
    <div className="cartEmpty d-flex align-center justify-center flex-column flex">
            <img className="mb-20" width={120} src={image} alt="empty" />
            <h2>{title}</h2>
            <p className="opacity-6">{description}</p>
            <button className="greenButton">
              <img onClick={() => setCartOpened(false)} src="img/arrow.svg" alt="arrow" />
              Повернутися назад
            </button>
          </div>
  )
}
