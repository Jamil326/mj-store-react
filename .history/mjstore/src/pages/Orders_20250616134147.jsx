import OrderCard from '../components/OrderCard';
import { useState , useEffect } from 'react';
const Orders = () => {
  const [ data , setData ] = useState({})

  const getData = async () => {
      try {
          const url = 'https://mj-store.onrender.com/'
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