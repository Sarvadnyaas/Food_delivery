/*import React, { useContext } from 'react'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../Context/StoreContext'
import './FoodItem.css'

const FoodItem = ({ id, name, price, description, image }) => {

  const { cartitems, addToCart, removeFromCart, url } = useContext(StoreContext);

  return (
    <div className='Food-Item'>
      <div className="food-item-img-container">
        <img className='food-item-image' src={url + "/images/" + image} alt="" />
        {!cartitems[id]
          ? <img className='add' onClick={() => addToCart(id)} src={assets.add_icon_white} alt="" />
          : <div className='food-item-counter'>
            <img onClick={() => removeFromCart(id)} src={assets.remove_icon_red} alt="" />
            <p>{cartitems[id]}</p>
            <img onClick={() => addToCart(id)} src={assets.add_icon_green} alt="" />
          </div>
        }
      </div>
      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p>{name}</p>
          <img src={assets.rating_starts} alt="" />
        </div>
        <p className="food-item-desc">{description}</p>
        <p className='food-item-price'>${price}</p>
      </div>

    </div>
  )
}
export default FoodItem;*/


import React, { useContext } from 'react';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../Context/StoreContext';
import './FoodItem.css';

const FoodItem = ({ id, name = "Unknown", price = 0, description = "No description", image }) => {
  const { cartitems = {}, addToCart, removeFromCart, url = "" } = useContext(StoreContext);

  return (
    <div className='Food-Item'>
      <div className="food-item-img-container">
        <img 
          className='food-item-image' 
          src={image ? `${url}/images/${image}` : assets.placeholder_image} 
          alt={name} 
        />
        {!cartitems[id] ? (
          <img 
            className='add' 
            onClick={() => addToCart(id)} 
            src={assets.add_icon_white || ""} 
            alt="Add to cart" 
          />
        ) : (
          <div className='food-item-counter'>
            <img 
              onClick={() => removeFromCart(id)} 
              src={assets.remove_icon_red || ""} 
              alt="Remove from cart" 
            />
            <p>{cartitems[id]}</p>
            <img 
              onClick={() => addToCart(id)} 
              src={assets.add_icon_green || ""} 
              alt="Add more" 
            />
          </div>
        )}
      </div>
      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p>{name}</p>
          {assets.rating_starts ? (
            <img src={assets.rating_starts} alt="Rating" />
          ) : (
            <p>⭐️⭐️⭐️⭐️⭐️</p>
          )}
        </div>
        <p className="food-item-desc">{description}</p>
        <p className='food-item-price'>${price.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default FoodItem;
