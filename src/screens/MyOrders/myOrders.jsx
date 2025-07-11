import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import Loader from '../../components/Loader/loader';
import { Storecontext } from '../../context/Storecontext';
import { assets } from '../../assets/assets';
import './myOrders.css'
import { useTheme } from '../../hooks/useTheme';

const MyOrders = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { url, token } = useContext(Storecontext);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`${url}/api/order/userorders`, {
        headers: { token },
      });
      setData(response.data.data);
      console.log(response);
    } catch (error) {
      console.log('error fetching orders', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="my-orders">
      <h2>My Orders</h2>
      <div className="container">
        {data.map((order, index) => (
          <div key={index}  className="my-orders-order">
            <img src={assets.parcel_icon} alt="" />
            <p>
              {order.items.map((item, itemIndex) => {
                if (itemIndex === order.items.length - 1) {
                  return `${item.name} x ${item.quantity}`;
                } else {
                  return `${item.name} x ${item.quantity}, `;
                }
              })}
            </p>
            <p>₹{order.amount}</p>
            <p>Items: {order.items.length}</p>
            <p>
              <span>&#x25cf;</span> <b>{order.status}</b>
            </p>
            <button onClick={fetchOrders}>Track Order</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyOrders;
