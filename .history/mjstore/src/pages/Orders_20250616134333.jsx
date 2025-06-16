import OrderCard from '../components/OrderCard';
import { useState , useEffect } from 'react';
const Orders = () => {
  const [ data , setData ] = useState({})

  const getData = async () => {
      try {
          const url = 'https://mj-store.onrender.com/api/user/order/orders';
          const token = localStorage.getItem('token');
          if(!token) {
              throw new Error('token required')
          }
      } catch (error) {
          
      }
  }
    
    return (
        <div>
            <OrderCard data={data}  />
        </div>
    )
}


export default Orders;