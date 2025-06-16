import { useLocation , useNavigate } from 'react-router-dom';
import { Card,  Button ,Image, Container ,Row ,Col ,ListGroup ,Form} from 'react-bootstrap';
import { useContext ,useState } from 'react';
import { UserContext } from '../context/userContext';
import  AddressForm  from '../components/AddressComponent';
import { toast } from 'react-toastify';


const CheckOut = () => {
    const { logged , setLogged } = useContext(UserContext);
    const [ visible ,setVisible ] = useState(false);
    const location = useLocation();


    const red = useNavigate();
    const handleDir = () => {
        red('/login');
    }

    
    if( !logged ) {
        return <div className='text-center mt-5'>
            <Button onClick={()=> handleDir()} className='bg-success py-2 ' >Please goto Login  page</Button>
            
        </div>
    }

  
    const user = JSON.parse(localStorage.getItem('user-info')||"{}");
    const { city ,state ,pin ,landmark ,street} =user?.address || {}; 
    const { item , quantity=1 } = location?.state|| {};
    console.log('from CheckOut page ',item,quantity);
    
    
  
const handleClick = ()=> {
return setVisible((prev)=>!prev)
}

const makeOrder = async ( token ) => {
    const paymentMethod = 'Cash On Delivery';
 const url = 'https://mj-store.onrender.com/api/v1/user/order';
 const res = await fetch(url,{
     method:'POST',
     mode:'cors',
     headers:{
         'Content-Type':'application/json',
         Authorization:`Bearer ${token}`,
     },
    body:JSON.stringify(paymentMethod)
 });

 const result = await res.json();
       console.log('Order',result);
 try {
     if(!res.ok) {
         throw new Error(result.message)
     }
 } catch (error) {
     toast.warning(error.message);
 }

 
}   


const createOrder = async () => {
    try {
        
 const url = 'https://mj-store.onrender.com/api/v1/user/cart/add';
    const token =localStorage.getItem('token')
    console.log(token);
    if(!token){
        return toast.warn('token required');
    }
    const res = await fetch(url,{
        method:'POST',
        mode:'cors',
        headers:{
            'content-Type':'application/json',
            Authorization:` Bearer ${token}`,
        },

       body:JSON.stringify({productId:item._id})

    });

    const result = await res.json();
    console.log(result);

    if(!res.ok){
        throw new Error (result.message)
    }

    if(res.status===200){
        toast.success(result.message);
        

        red('/')
    }

    


    } catch (error) {
        console.log(error);
        toast.error(error.message);
    }
}
   
    return (
        
       <Container sm={ 12 }>
       
       <Row>
       <div className='w-75 mx-auto mt-5'>
           <Image fluid src ={item?.image[0].url}/>
       </div>
       </Row>
      
       <Row className='text-center mt-3'>

       <ListGroup>
       <ListGroup.Item>
       <span className='ms-3 me-5'>Name :</span>
       {item.name||'na'}
       </ListGroup.Item>
       <ListGroup.Item>
       <span className='me-5'>Quantity :</span>
       <span>{quantity}</span>
       </ListGroup.Item>
       <ListGroup.Item>
       <span className='fw-bold me-5'>Price: </span>
      <span className='fw-bold'>{item.price}</span> 
       </ListGroup.Item>
       <ListGroup.Item className='fw-bold fs-4'>
       <span>Total : </span>
    <span>{(item.price*quantity)||'na'}</span>
       </ListGroup.Item>
       </ListGroup>
           
       
       </Row>
       <Row>
       {user.address?(
           <div className='mt-5'>

               <Card>
               <Card.Body>
                      <h4 className='text-center py-2'>Address Details</h4>

               <ListGroup>
                <ListGroup.Item>
                <span className='me-5'>Street :</span>
                <span>{street}</span>
                </ListGroup.Item>
                <ListGroup.Item>
                <span className='me-4'>Landmark :</span>
                <span>{landmark}</span>
                </ListGroup.Item>
                <ListGroup.Item>
                <span className='me-5'>City :</span>
                <span>{city}</span>
                </ListGroup.Item>          
                <ListGroup.Item>
                <span className='me-5'>Pin :</span>
                <span>{pin}</span>
                </ListGroup.Item>
                <ListGroup.Item>
                <span className='me-5'>State :</span>
                <span>{state}</span>
                </ListGroup.Item>
               </ListGroup>

            
               </Card.Body>
               </Card>   

               <div >
                   <Button onClick={()=>createOrder()} variant = 'success w-100 p-2 mt-3'  >Place Order</Button>
               </div>
 
           </div>
       ):( <div className='text-center mt-3'>
           <Button onClick={()=> handleClick()} variant='dark px-5 '>Add Address</Button>
       </div>)}
       </Row>

       { visible && <div>
           <AddressForm/>
       </div>}
       
      
       </Container>
        
        
    )
}



export default CheckOut;