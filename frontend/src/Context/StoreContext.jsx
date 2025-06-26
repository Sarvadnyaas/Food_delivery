/*import { createContext, useEffect, useState } from "react";
import axios from "axios"

export const StoreContext = createContext(null)
const StoreContextProvider = (props) => {

    const [cartitems, setcartitems] = useState({});
    const url = "http://localhost:4000"
    const [token, setToken] = useState("");
    const [food_list, setFoodList] = useState([])


    const addToCart = async (itemId) => {
        if (!cartitems[itemId]) {
            setcartitems((prev) => ({ ...prev, [itemId]: 1 }))
        }
        else {
            setcartitems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }))
        }
        if (token) {
            await axios.post(url+"/api/cart/add",{itemId},{headers:{token}})
        }

    }


    const removeFromCart = async(itemId) => {
        setcartitems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
        if (token) {
            await axios.post(url+"/api/cart/remove",{itemId},{headers:{token}})
        }
    }

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartitems) {
            if (cartitems[item] > 0) {
                let itemInfo = food_list.find((product) => product._id === item);
                totalAmount += itemInfo.price * cartitems[item];
            }
        }
        return totalAmount;
    }

    const fetchFoodList = async () => {
        const response = await axios.get(url + "/api/food/list");
        setFoodList(response.data.data)
    }


    const loadCartData = async(token) => {
        const response = await axios.post(url+"/api/cart/get",{},{headers:{token}});
        setcartitems(response.data.cartData);
    }

    useEffect(() => {

        async function loadData() {
            await fetchFoodList();
            if (localStorage.getItem("token")) {
                setToken(localStorage.getItem("token"));
                await loadCartData(localStorage.getItem(token));

            }


        }
        loadData();

    }, [])


    const Contextvalue = {
        food_list,
        cartitems,
        setcartitems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,
        setToken
    }
    return (
        <StoreContext.Provider value={Contextvalue}>
            {props.children}
        </StoreContext.Provider>
    )

}
export default StoreContextProvider;*/


import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartitems, setcartitems] = useState({});
  const url = "http://localhost:4000";
  const [token, setToken] = useState("");
  const [food_list, setFoodList] = useState([]);

  const addToCart = async (itemId) => {
    setcartitems((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1,
    }));

    if (token) {
      try {
        await axios.post(url + "/api/cart/add", { itemId }, { headers: { token } });
      } catch (error) {
        console.error("Error adding item to cart:", error);
      }
    }
  };

  const removeFromCart = async (itemId) => {
    setcartitems((prev) => {
      const updatedCart = { ...prev };
      if (updatedCart[itemId] > 1) {
        updatedCart[itemId] -= 1;
      } else {
        delete updatedCart[itemId];
      }
      return updatedCart;
    });

    if (token) {
      try {
        await axios.post(url + "/api/cart/remove", { itemId }, { headers: { token } });
      } catch (error) {
        console.error("Error removing item from cart:", error);
      }
    }
  };

  const getTotalCartAmount = () => {
    let total = 0;
    for (const itemId in cartitems) {
      const food = food_list.find((f) => f._id === itemId);
      if (food) {
        total += food.price * cartitems[itemId];
      }
    }
    return total;
  };

  const fetchFoodList = async () => {
    try {
      const res = await axios.get(url + "/api/food/list");
      setFoodList(res.data.data || []);
    } catch (err) {
      console.error("Error fetching food list:", err);
    }
  };

  const loadCartData = async (userToken) => {
    try {
      const res = await axios.post(url + "/api/cart/get", {}, { headers: { token: userToken } });
      setcartitems(res.data.cartData || {});
    } catch (err) {
      console.error("Error loading cart:", err);
    }
  };

  useEffect(() => {
    async function load() {
      await fetchFoodList();
      const savedToken = localStorage.getItem("token");
      if (savedToken) {
        setToken(savedToken);
        await loadCartData(savedToken);
      }
    }
    load();
  }, []);

  return (
    <StoreContext.Provider
      value={{
        cartitems,
        setcartitems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        food_list,
        token,
        setToken,
        url,
      }}
    >
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;