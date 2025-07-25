import { Col ,Row ,Button ,ListGroup ,Card } from 'react-bootstrap';

const CartCard = ({product}) => {
    const {name , price , _id , image=[]} = product;
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
             
           
           
       
       <Card className='border-0'>
       <ListGroup className=' '>
       <ListGroup.Item >
        <span>{name}</span>        

       </ListGroup.Item>
       <ListGroup.Item>
       <span>{price}</span>
       </ListGroup.Item>
       <ListGroup.Item >
       <span></span> 
       </ListGroup.Item>
       <ListGroup.Item>
       <span>{price*1}</span>
       </ListGroup.Item>
       </ListGroup>

      
       </Card>
                </div>

              </div>

       </div>
       </Col>
    )
}

export default CartCard;