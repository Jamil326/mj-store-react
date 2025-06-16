import OrderCard from '../components/OrderCard';
import { useState , useEffect } from 'react';
import { toast } from 'react-toastify';
const Orders = () => {
  const [ datas , setData ] = useState([])

  const getData = async () => {
      try {
          const url = 'https://mj-store.onrender.com/api/v1/user/order/orders';
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

          if(res.status===404) {
              console.log(res);
          }

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
  },[])
    
    return (
        <div>
           {datas.length>0?(datas.map((dt,index)=>(
               <OrderCard key= />
           )))}
        </div>
    )
}


export default Orders;