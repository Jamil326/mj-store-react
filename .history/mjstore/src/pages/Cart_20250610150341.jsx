import ProductCard from '../components/ProductCard';
import { useLocation } from 'react-router-dom';
import { Card ,ListGroup ,Button} from 'react-bootstrap';
import { useState ,useEffect} from 'react';
import CartCard from '../components/CartCard';
import { ImCross } from "react-icons/im";


const Cart = () => {

    const location = useLocation();
    const { product } = location.state;
    const [ items , setItems ] = useState([product]);
    const HandleRemove = () =>{
        setItems([]);
    }

    useEffect(()=>{
        console.log(items);
    })
    
    return (
      <div>
          {
              items.length>0?items.map((item,index)=>(
                  <div>


                     <CartCard product={item} key={index} />

                     <div className='d-flex flex-column gap-1  mt-3 mb-3 p-3'>
                         <Button variant='success' className='col-12' >Confirm Order</Button>
                         

                     </div>
                        <div className=''>
                            <ImCross className='position-absolute  ' style={{top:'75%'}} />
                        </div>



  
                  </div>
                  

              )):(<h1>cart is empty</h1>)
          }
      </div>
    );
}



export default Cart;