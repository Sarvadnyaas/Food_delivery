import React, { useEffect, useState } from 'react'
import './List.css'
import axios from "axios"
import { toast } from 'react-toastify';

const List = ({ url }) => {

  const [List, setList] = useState([]);

  const fetchlist = async () => {
    const response = await axios.get(`${url}/api/food/list`);

    if (response.data.success) {
      setList(response.data.data);
    }
    else {
      toast.error("Error")
    }
  }
  const removefood = async (foodId) => {
    const response = await axios.post(`${url}/api/food/remove`, { id: foodId });
    await fetchlist();
    if (response.data.success) {
      toast.success(response.data.message)
    }
    else {
      toast.error("Error");
    }
  }




  useEffect(() => {
    fetchlist();
  }, [])





  return (
    <div className='list add flex-col'>
      <p>all food list </p>
      <div className="list-table">
        <div className="list-table-format tittle">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {List.map((item, index) => {
          return (
            <div key={index} className='list-table-format'>
              <img src={`${url}/images/`+item.image} alt="" />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>${item.price}</p>
              <p onClick={() => removefood(item._id)} className='cursor'> X</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default List