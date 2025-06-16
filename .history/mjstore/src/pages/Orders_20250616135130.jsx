import OrderCard from '../components/OrderCard';
import { useState , useEffect } from 'react';
import { toast } from 'react-toastify';
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
          console.log(result);

          if(!res.ok){
              throw new Error(result.message)
          }

          if(res.)

          if ( res.status === 200 ){
              setData(result.data);
              console.log(result.data);
          }
      } catch (error) {
          toast.error(error.message);
      }
  }

  useEffect(()=>{
      getData();
  },[data])
    
    return (
        <div>
            <OrderCard data = { data }  />
        </div>
    )
}


export default Orders;