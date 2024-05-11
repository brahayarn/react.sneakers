import React from 'react';
import Card from '../components/Card';

export default function Home({
    items,
    searchValue,
    setSearchValue,
    onChangeSearchInput,
    onAddToFavorite,
    onAddToCart,
    isLoading,
    isItemAdded 
  }) {

  const renderItems = () => {
    const filteredItems = items.filter(item => 
      item.title.toLowerCase().includes(searchValue.toLowerCase()));
    return (isLoading ? [...Array(12)] : filteredItems)
      .map((item,index) => (
        <Card
          key={index} 
          onFavorite={(obj) => onAddToFavorite(obj)}
          onPlus={(obj) => onAddToCart(obj)}
          added={isItemAdded && isItemAdded(item.id)} // Перевірка, чи isItemAdded існує перед викликом
          loading={isLoading}
          {...item}
        />
      ))
  }

  return (
    <div className="content p-40">
      <div className="d-flex justify-between align-center mb-40">
        <h1>{searchValue ? `Пошук по запросу: "${searchValue}"` : 'Всі кросівки'}</h1>
        <div className="search-block d-flex">      
          <img src="img/search.svg" alt="Search" />
          {searchValue && <img  
            onClick={() => setSearchValue('')} 
            className=" clear cu-p" src="img/close.svg" alt="clear"/>
          }
          <input onChange={onChangeSearchInput} 
            value={searchValue} placeholder="Пошук..." />
        </div>
      </div>
      <div className="d-flex flex-wrap">
        {renderItems()}
      </div>
    </div>
  );
}
