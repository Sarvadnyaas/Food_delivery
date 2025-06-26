import React, { useContext, useState } from 'react'
import { assets } from '../../assets/assets'
import './LoginPopup.css'
import { StoreContext } from '../../Context/StoreContext'
import axios from "axios"

const LoginPopup = ({ setshowlogin }) => {

  const { url ,setToken} = useContext(StoreContext)

  const [currstate, setcurrstate] = useState("login")
  const [data, setdata] = useState({
    name: "",
    email: "",
    password: "",

  })

  const onChangeHandeler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setdata(data => ({ ...data, [name]: value }))
  }

  /*const onLogin = async (event) =>{
    event.preventDefault()
    let newUrl = url;
    if (currstate==="Login") {
      newUrl += "/api/user/login"
      
    }
    else{
      newUrl += "/api/user/register"
    }

    const response = await axios.post(newUrl,data);

    if (response.data.success) {
      setToken(response.data.token);
      localStorage.setItem("token",response.data.token);
      setshowlogin(false)
    }
    else{
      alert(response.data.message)
    }*/
  const onLogin = async (event) => {
  event.preventDefault();
  let newUrl = url;

  if (currstate === "login") {
    newUrl += "/api/user/login";
  } else {
    newUrl += "/api/user/register";
  }

  const response = await axios.post(newUrl, data);

  if (response.data.success) {
    setToken(response.data.token);
    localStorage.setItem("token", response.data.token);
    setshowlogin(false);
  } else {
    alert(response.data.message);
  }
  }

  return (
    <div className='login-Popup'>
      <form onSubmit={onLogin} className="login-popup-container">
        <div className="Login-Popup-tittle">
          <h2>{currstate}</h2>
          <img onClick={() => setshowlogin(false)} src={assets.cross_icon} alt="" />
        </div>
        <div className="login-poppup-inputs">
          {currstate === "login" ? <></> : <input name='name' onChange={onChangeHandeler} value={data.name} type="text" placeholder='your name' required />}
          <input name='email' onChange={onChangeHandeler} value={data.email} type="email" placeholder='your email' required />
          <input name='password' onChange={onChangeHandeler} value={data.password} type="password" placeholder='password' required />
        </div>
        <button type='submit'>{currstate === "sign up" ? "create account" : "login"}</button>
        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>by continuing i agrre to the terms of use & privacy policy.</p>
        </div>
        {currstate === "login"
          ? <p>create a new account? <span onClick={() => setcurrstate("sign up")}>click here</span></p>
          : <p>Alredy have an account?<span onClick={() => setcurrstate("login")}>login here </span></p>
        }
      </form>
    </div>
  )
}

export default LoginPopup
