import OrderCard from '../components/OrderCard';
import { moduleName } from 'rea';
const Orders = () => {

    const data= {};
    return (
        <div>
            <OrderCard data={data}  />
        </div>
    )
}


export default Orders;