import React, { useContext } from 'react'
import { StoreContext } from '../../Context/StoreContext'
import FoodItem from '../FoodItem/FoodItem'
import './FoodDisplay.css'


const FoodDisplay = ({category}) => {

    const {food_list} = useContext(StoreContext)
  return (
    <div className='Food-Display' id='Food-Display'>
        <h2>Top dishes near you </h2>
        <div className="Food-Diplay-list">
            {food_list.map((item,index)=>{
              if (category==="ALL" || category===item.category) {
                return <FoodItem key={index} id={item._id} name={item.name} description={item.description} price={item.price} image={item.image}/>
              }

            })}
        </div>
      
    </div>
  )
}

export default FoodDisplay;


/*import React, { useContext } from 'react';
import { StoreContext } from '../../Context/StoreContext';
import FoodItem from '../FoodItem/FoodItem';
import './FoodDisplay.css';

const FoodDisplay = ({ category }) => {
    const { food_list = [] } = useContext(StoreContext);

    return (
        <div className='Food-Display' id='Food-Display'>
            <h2>Top dishes near you</h2>
            <div className="Food-Display-list">
                {food_list.length > 0 ? (
                    food_list
                        .filter((item) => category === "ALL" || item.category === category)
                        .map((item) => (
                            <FoodItem 
                                key={item._id} 
                                id={item._id} 
                                name={item.name} 
                                description={item.description} 
                                price={item.price} 
                                image={item.image} 
                            />
                        ))
                ) : (
                    <p>Loading food items...</p> // Optional: Handles empty state
                )}
            </div>
        </div>
    );
};

export default FoodDisplay;*/
