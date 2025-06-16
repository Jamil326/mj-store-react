import OrderCard from '../components/OrderCard';
import { useState , useEffect } from 'react';
const Orders = () => {
  const [ data,setData ] = useState()
    const data= {};
    return (
        <div>
            <OrderCard data={data}  />
        </div>
    )
}


export default Orders;