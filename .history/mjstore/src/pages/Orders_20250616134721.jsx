import OrderCard from '../components/OrderCard';
import { useState , useEffect } from 'react';
const Orders = () => {
  const [ data , setData ] = useState({})

  const getData = async () => {
      try {
          const url = 'https://mj-store.onrender.com/api/user/order/orders';
          const token = localStorage.getItem('token');
          if(!token) {
              throw new Error('token required');
          }

          const res = await fetch(url,{
              method:'GET',
              mode:'cors',
              headers:{
                  'Content-Type':'application/json',
                  Authorization:`Bearer ${token}`
              }
          })

          const result = await res.json();

          if(!res.ok){
              throw new Error(result.message)
          }

          if (res.status===200){
              setData(result.data)
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