import ProductCard from '../components/ProductCard';
import { useLocation ,useNavigate } from 'react-router-dom';
import { Card ,ListGroup ,Button} from 'react-bootstrap';
import { useState ,useEffect ,useContext} from 'react';
import CartCard from '../components/CartCard';
import { ImCross } from "react-icons/im";
import { UserContext }  from '../context/userContext';
import { toast } from 'react-toastify';
import { HiOutlineShoppingCart } from "react-icons/hi2";



const Cart = () => {
    
    
    const dir = useNavigate();
    const location = useLocation();
    const { product } = location?.state || {};
    const [ items , setItems ] = useState([]);
    

    const getData =async () => {
        const url = 'https://mj-store.onrender.com/api/v1/user/cart/fetch'
        const token = localStorage.getItem('token');
        try {
            if(!token) {
                throw new Error('token is invalid');
            }
            const res = await fetch(url ,{
                method:'GET',
                mode:'cors',
                headers:{
                    'Content-Type':'application/json',
                    Authorization:`Bearer ${token}`
                },
                
            });

            const result = await res.json();
            console.log( result.data.items );

            if(res.status===200){
                setItems( result.data.items );
                
                            
            }

            if(res.status===404) {
                toast.warn('no items found')
            }
           
        } catch (error) {
            toast.error(error.message);
        }
        
        
    }

    useEffect(()=>{
      getData();
    },[])

    const HandleRemove = (indexToRemove) => {
    setItems((prevItems) => prevItems.filter((_, index) => index !== indexToRemove));
  };

  const handleAddToCart = () => {
    if (product) {
      setItems((prevItems) => [...prevItems, product]);
    }
  };


  const HandleDone = () => {
       dir('/checkout',{ state:{ item:items[0].product, quantity:items[0].quantity }});
  }

 
useEffect(()=>{
    console.log('from cart items ',items);
},[items])
   
    
    return (
      <div>
          {
              items.length>0?items.map(( item, index)=> (
                  <div key={index}>

                     <CartCard product={ {product:item.product,quantity:item.quantity} }  />


                     <div className='d-flex flex-column gap-1  mt-3 mb-3 p-3'>
                         <Button onClick={()=>HandleDone()} variant='success' className='col-12' >Check Out</Button>
                         

                     </div>
                        <div onClick={()=>HandleRemove(index)} className='ms-3 position-absolute text-danger border px-4 py-1' style={{top:'13%',cursor:'pointer'}}>
                            <ImCross className='' />
                        </div>



  
                  </div>
                  

              )):( <div className='d-flex flex-column justify-content-center text-center align-items-center bg- '>
                     
                     <div className='fs-1'>
                                           <HiOutlineShoppingCart />

                     </div>

                     
                         <span>Cart is Empty</span>
                     

              </div>
                  )
          }


        

          
      </div>
    );
}



export default Cart;