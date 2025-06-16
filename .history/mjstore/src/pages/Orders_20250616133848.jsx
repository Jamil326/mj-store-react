import OrderCard from '../components/OrderCard';
import { use } from 'react';
const Orders = () => {

    const data= {};
    return (
        <div>
            <OrderCard data={data}  />
        </div>
    )
}


export default Orders;