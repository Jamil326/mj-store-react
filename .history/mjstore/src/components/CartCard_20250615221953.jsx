import { Col ,Row ,Button ,ListGroup ,Card } from 'react-bootstrap';
import { useState ,useEffect } from 'react';

const CartCard = ({ product }) => {

   console.log('whole product',);
    if( !product ){
        return <p>no item in Cart</p>
    }
    const { quantity } = product.quantity;
    console.log('total quantity',quantity);
    const { name , price , _id , image=[]  } = product.product;
    const [ quantityy , setQuantity ] = useState(quantity || 1);
    const HandleIncrease = () =>{
        setQuantity((prev) => {
           const  nextValue=prev+1;
           return nextValue;
        })
    }

     const HandleDecrease = () =>{
        setQuantity((prev)=> {
            const  nextValue=Math.max(prev-1,1);
            return nextValue;
            
        })
    }

    useEffect(()=>{
       const obj = {
           item:product,
           quantity:quantityy
       }
       localStorage.setItem('cart',JSON.stringify(obj))
    },[quantity])

    

   

    
    return(
        
       <Col xs={12} sm={10} md={4} >
       <Card>
       <Card.Img 
        className='p-5'
        src={image[0].url} />
       </Card>
       <div className='conatiner'>
       <div className='row'>
        


                 <div className='col'>
             
           
           
       
       <Card className='border-0 text-center '>
       <ListGroup className=' '>
       <ListGroup.Item >
        <span>{name}</span>        

       </ListGroup.Item>
       <ListGroup.Item>
       <span className="me-5">Price :</span>
       <span>{price}</span>
       </ListGroup.Item>
       <ListGroup.Item >
       <span className='me-5'>Quantity :</span>
       <span>{quantityy}</span> 
       </ListGroup.Item>
       <ListGroup.Item className='fw-bold'>
       <span className="me-5">Total :</span><span>{price*quantityy}</span>
       </ListGroup.Item>
       
       </ListGroup>

       <div className='mt-3'>
           <Button variant='dark w-25' onClick={()=>HandleDecrease()} className='me-2'>-</Button>
           <Button variant='success w-25' onClick={()=>HandleIncrease()} >+</Button>
       
       </div>

       

      
       </Card>

      
                </div>

              </div>

       </div>
       </Col>
        
    )
}

export default CartCard;