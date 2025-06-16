import ProductCard from '../components/ProductCard';
import { useLocation ,useNavigate } from 'react-router-dom';
import { Card ,ListGroup ,Button} from 'react-bootstrap';
import { useState ,useEffect ,useContext} from 'react';
import CartCard from '../components/CartCard';
import { ImCross } from "react-icons/im";
import { UserContext }  from '../context/userContext';


const Cart = () => {
    
    
    const dir = useNavigate();
    const location = useLocation();
    const { product } = location?.state || {};
    const [ items , setItems ] = useState(product?[product]:[]);

    const getData =async () => {
        const url = 
    }

    const HandleRemove = (indexToRemove) => {
    setItems((prevItems) => prevItems.filter((_, index) => index !== indexToRemove));
  };

  const handleAddToCart = () => {
    if (product) {
      setItems((prevItems) => [...prevItems, product]);
    }
  };


  const HandleDone = () => {
       dir('/checkout',{ state:{ item:product  }});
  }

 

    useEffect(()=>{
        
    })
    
    return (
      <div>
          {
              items.length>0?items.map((item,index)=> (
                  <div key={index}>


                     <CartCard product={item}  />

                     <div className='d-flex flex-column gap-1  mt-3 mb-3 p-3'>
                         <Button onClick={()=>HandleDone()} variant='success' className='col-12' >Check Out</Button>
                         

                     </div>
                        <div onClick={()=>HandleRemove(index)} className='ms-3 position-absolute text-danger border px-4 py-1' style={{top:'13%',cursor:'pointer'}}>
                            <ImCross className='' />
                        </div>



  
                  </div>
                  

              )):(<h1 className='text-center position-absolute top-50 left-50'>cart is empty</h1>)
          }


        

          
      </div>
    );
}



export default Cart;