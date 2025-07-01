// src/user/context/Storecontext.jsx

import { createContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export const Storecontext = createContext();

const Storecontextprovider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [food_list, setFoodList] = useState([]);
  const url = "http://localhost:4000";
  const [promo, setPromo] = useState(0);    


  const fetchfoodlist = async () => {
    const response = await axios.get(url + "/api/food/list");
    setFoodList(response.data.data);
  };

  useEffect(() => {
    async function loadData() {
      await fetchfoodlist();
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        setToken(storedToken);
        await loadCartData(storedToken);
      }
    }
    loadData();
  }, []);

  const loadCartData = async (token) => {
    const response = await axios.get(url + "/api/cart/get", {
      headers: { token },
    });
    setCartItems(response.data.cartData);
  };

  // Add item to cart
  const addToCart = async (itemId, suppressToast = false) => {
    // Optimistic UI update
    setCartItems((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1,
    }));

    // Persist to backend
    if (token) {
      try {
        await axios.post(
          url + "/api/cart/add",
          { itemId },
          { headers: { token } }
        );
      } catch (error) {
        console.error(error);
      }
    }

    // Toast with Undo
    if (!suppressToast) {
      toast.success("Added to cart!", {
        duration: 3000,
        action: {
          text: "Undo",
          onClick: () => {
            removeFromCart(itemId, true);
            toast("Removed!", { icon: "🗑️" });
          },
        },
      });
    }
  };

  // Remove item from cart
  const removeFromCart = async (itemId, suppressToast = false) => {
    // Optimistic UI update
    setCartItems((prev) => ({
      ...prev,
      [itemId]: Math.max((prev[itemId] || 1) - 1, 0),
    }));

    // Persist to backend
    if (token) {
      try {
        await axios.delete(`${url}/api/cart/remove?id=${itemId}`, {
          headers: { token },
        });
      } catch (error) {
        console.error(error);
      }
    }

    // Toast with Undo
    if (!suppressToast) {
      toast.error("Removed from cart", {
        duration: 3000,
        action: {
          text: "Undo",
          onClick: () => {
            addToCart(itemId, true);
            toast("Restored!", { icon: "✅" });
          },
        },
      });
    }
  };

  const getTotalCartAmount = () => {
    let total = 0;
    for (let item in cartItems) {
      if (cartItems[item] > 0) {
        const iteminfo = food_list.find((food) => food._id === item);
        total += iteminfo.price * cartItems[item];
      }
    }
    return total;
  };
  const applyPromo = async (code) => {
    if (!code.trim()) {
      toast.error("Please enter a promo code");
      return;
    }
    try {
      const res = await axios.post(
        `${url}/api/cart/apply-promo`,
        { code },
        { headers: { token } }         // ← raw token header matches your authMiddleware
      );
      const { discount } = res.data;
      setPromo(discount);
      toast.success(`Promo applied! You saved ₹${discount}`);
    } catch (err) {
      // show error message from backend
      const msg =
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.message;
      toast.error(msg);
    }
  };

  const contextvalues = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken,
    promo,
    applyPromo
  };

  return (
    <Storecontext.Provider value={contextvalues}>
      {props.children}
    </Storecontext.Provider>
  );
};

export default Storecontextprovider;