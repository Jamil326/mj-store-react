import OrderCard from '../components/OrderCard';
import { moduleName } from 'react';
const Orders = () => {

    const data= {};
    return (
        <div>
            <OrderCard data={data}  />
        </div>
    )
}


export default Orders;