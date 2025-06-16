import ProductCard from '../components/ProductCard';
import { useLocation } from 'react-router-dom';
import { Card ,ListGroup ,Button} from 'react-bootstrap';
import { useState ,useEffect} from 'react';
import CartCard from '../components/CartCard';
import { ImCross } from "react-icons/im";


const Cart = () => {

    const location = useLocation();
    const { product } = location.state || {};
    const  getP  =JSON.parse(localStorage.getItem('cart'))  || {};
    const [ items , setItems ] = useState(product?[product]:[]);
    const HandleRemove = (indexToRemove) => {
    setItems((prevItems) => prevItems.filter((_, index) => index !== indexToRemove));
  };

  const handleAddToCart = () => {
    if (product) {
      setItems((prevItems) => [...prevItems, product]);
    }
  };

    useEffect(()=>{
        console.log(items);
    })
    
    return (
      <div>
          {
              items.length>0?items.map((item,index)=>(
                  <div key={index}>


                     <CartCard product={item}  />

                     <div className='d-flex flex-column gap-1  mt-3 mb-3 p-3'>
                         <Button variant='success' className='col-12' >Confirm Order</Button>
                         

                     </div>
                        <div onClick={()=>HandleRemove(index)} className='ms-3 position-absolute text-danger border px-4 py-1' style={{top:'13%',cursor:'pointer'}}>
                            <ImCross className='' />
                        </div>



  
                  </div>
                  

              )):(<h1 className='text-center'>cart is empty</h1>)
          }


          <div className="mt-4 text-center">
        <Button onClick={handleAddToCart} variant="primary">
          Add Another Product
        </Button>
      </div>

          
      </div>
    );
}



export default Cart;