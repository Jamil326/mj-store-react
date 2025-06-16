import OrderCard from '../components/OrderCard';
import { Button } from 'react-bootstrap';
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

  useEffect(()=>{
  console.log('inside orders',datas);
  },[]);
    
    return (
        <div className='container'>
          
              
          
           {datas.length>0?(datas.map((dt,index)=>(
               <div className='row '> 
               <div className='col'>
                    <h2>Order ID : {dt._id}</h2>
                     <OrderCard key={index} details={ dt } />

                     <div>
                         <Button variant='dark' >Cancel Order</Button>
                     </div>
               </div>
                 

               </div>
           ))):(<div>
               <p>Data not Available</p>
           </div>)}
        </div>
    )
}


export default Orders;