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

  const OrderCancel = async (id) => {
         const token = localStorage.getItem('token');  
         const url = `https://mj-store.onrender.com/api/v1/user/order/cancel/:${id}`;
         const res = await fetch ( url ,{
             method:'DELETE',
             mode:'cors',
             headers:{
                 'Content-Type':'application/json',
                  Authorization:`Bearer ${token}`
             }
         })

         const result = await res.json();

         if (!res.ok) {
             
         }

        
  }
    
    return (
        <div className='container  d-flex flex-column '>
         <h1 className='text-center mt-1 border-bottom py-3'>Orders Summary</h1>      
              
          
           {datas.length>0?(datas.map((dt,index)=>(
               <div key={dt._id} className='row mt-5 shadow mb-3 '> 
               <div className='col '>
                    <h6>Order ID : {dt._id}</h6>
                     <OrderCard key={index} details={ dt } />
                     <div className='text-center px-3 py-2 '>
                         <strong>TotalCart Value :</strong>
                         <strong>{dt.totalAmount}</strong>
                     </div>
                     

                     <div>
                         <Button onClick={()=> OrderCancel(dt._id
                             )} variant='dark ms-2' >Cancel Order</Button>
                     </div>
               </div>
                 

               </div>
           ))):(<div className='vh-100 text-center '>
               <p className=''>Data not Available</p>
           </div>)}
        </div>
    )
}


export default Orders;