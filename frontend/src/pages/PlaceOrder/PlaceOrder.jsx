/* original vala ahe code
import React, { useContext, useState } from 'react'
import { StoreContext } from '../../Context/StoreContext'
import './PlaceOrder.css'

const PlaceOrder = () => {

  const { getTotalCartAmount, token, food_list, cartitems, url } = useContext(StoreContext)


  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: ""

  })

  const onChangeHandeler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({ ...data, [name]: value }))
  }

  const placeOrder = async (event) => {
    event.preventDefaul();
    let oderItems = [];
    food_list.map((item) => {
      if (cartitems[item._id] > 0) {
        let itemInfo = item;
        itemInfo["quantity"] = cartitems[item._id];
        oderItems.push(itemInfo);
      }
    })

    let orderData = {
      address:data,
      items:orderItems,
      amount:getTotalCartAmount()+2,
    }
    let res = await axios.post(url+"/api/order/place",orderData,{headers:{token}});
    if (Response.data.success) {
      const {session_url} = Response.data;
      window.location.replace(session_url);
    }
    else{
      alert("error");
    }
    
  }
  return (
    <div>
      <form onSubmit={placeOrder} className='place-order'>
        <div className="place-order-left">
          <p className='tittle'>Delivery information</p>
          <div className="multi-fields">
            <input required   name='firstName' onChange={onChangeHandeler} value={data.firstName} type="text" placeholder='first name' />
            <input required  name='lastName' onChange={onChangeHandeler} value={data.lastName} type="text" placeholder='last name' />
          </div>
          <input required  name='email' onChange={onChangeHandeler} value={data.email} type="email" placeholder='email addres' />
          <input required  name='street' onChange={onChangeHandeler} value={data.street} type="text" placeholder='street' />
          <div className="multi-fields">
            <input required  name='city' onChange={onChangeHandeler} value={data.city} type="text" placeholder='city' />
            <input required  name='state' onChange={onChangeHandeler} value={data.state} type="text" placeholder='state' />
          </div>
          <div className="multi-fields">
            <input required  name='zipcode' onChange={onChangeHandeler} value={data.zipcode} type="text" placeholder='zipcode' />
            <input required  name='country' onChange={onChangeHandeler} value={data.country} type="text" placeholder='country' />
          </div>
          <input required  name='phone' onChange={onChangeHandeler} value={data.phone} type="text" placeholder='phone' />
        </div>
        <div className="place-order-right">
          <div className="cart-total">
            <h2>cart totals</h2>
            <div>
              <div className="cart-total-details">
                <p>sub total</p>
                <p>${getTotalCartAmount()}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <p>deleviry fee</p>
                <p>*{getTotalCartAmount() === 0 ? 0 : 5}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <p>total</p>
                <p>${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 5}</p>
              </div>
            </div>
            <button type='submit'>PROCEED TO PAYMENT</button>
          </div>
        </div>

      </form >

    </div >
  )
}
export default PlaceOrder;*/

import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { StoreContext } from '../../Context/StoreContext';
import './PlaceOrder.css';
import axios from 'axios';

const PlaceOrder = () => {
  const { getTotalCartAmount, token, food_list, cartitems, url } = useContext(StoreContext);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: ""
  });

  const onChangeHandeler = (event) => {
    const { name, value } = event.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const placeOrder = async (event) => {
    event.preventDefault();

    if (!cartitems || Object.keys(cartitems).length === 0) {
      alert("Your cart is empty!");
      return;
    }

    const orderItems = food_list
      .filter((item) => cartitems[item._id] > 0)
      .map((item) => ({
        ...item,
        quantity: cartitems[item._id]
      }));

    const orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 5,
    };

    try {
      const res = await axios.post(url + "/api/order/place", orderData, {
        headers: { token },
      });
      


      if (res.data.success) {
        window.location.replace(res.data.session_url);
      } else {
        alert("Order failed: " + res.data.message);
      }
    } catch (err) {
      console.error("Order error:", err);
      alert("Something went wrong, try again later.");
    }
  }

  const navigate = useNavigate();

  useEffect(()=>{
    if (!token) {
      navigate('/cart')
    }
    else if(getTotalCartAmount()===0)
    {
      navigate('/cart')
    }
  
  },[token])

  return (
    <div>
      <form onSubmit={placeOrder} className="place-order">
        <div className="place-order-left">
          <p className="tittle">Delivery information</p>
          <div className="multi-fields">
            <input required name="firstName" onChange={onChangeHandeler} value={data.firstName} type="text" placeholder="First name" />
            <input required name="lastName" onChange={onChangeHandeler} value={data.lastName} type="text" placeholder="Last name" />
          </div>
          <input required name="email" onChange={onChangeHandeler} value={data.email} type="email" placeholder="Email address" />
          <input required name="street" onChange={onChangeHandeler} value={data.street} type="text" placeholder="Street" />
          <div className="multi-fields">
            <input required name="city" onChange={onChangeHandeler} value={data.city} type="text" placeholder="City" />
            <input required name="state" onChange={onChangeHandeler} value={data.state} type="text" placeholder="State" />
          </div>
          <div className="multi-fields">
            <input required name="zipcode" onChange={onChangeHandeler} value={data.zipcode} type="text" placeholder="Zipcode" />
            <input required name="country" onChange={onChangeHandeler} value={data.country} type="text" placeholder="Country" />
          </div>
          <input required name="phone" onChange={onChangeHandeler} value={data.phone} type="text" placeholder="Phone" />
        </div>

        <div className="place-order-right">
          <div className="cart-total">
            <h2>Cart Totals</h2>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${getTotalCartAmount() === 0 ? 0 : 5}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Total</p>
              <p>${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 5}</p>
            </div>
            <button type="submit">PROCEED TO PAYMENT</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PlaceOrder;
