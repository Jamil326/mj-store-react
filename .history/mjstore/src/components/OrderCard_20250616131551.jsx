import { Col , Row , Card , ListGroup } from 'react-bootstrap';

const OrderCard = ({details}) =>{
    const { 
            items=[], 
            orderDate , 
            orderStatus ,
            paymentMethod ,
            paymentStatus,
            shippingAddress = {},
            totalAmount
          } = details;

    return (
        <div>
           <Row>
           { items.length>0?(items.map((item)=> (
           <Card key>
            <ListGroup>
            <ListGroup.Item>
            </ListGroup.Item>
            </ListGroup>
           </Card>
           ))
           ):(
               <div>
                   <span>No Item Found</span>
               </div>
           )
          
           }
           </Row>       
        </div>
    )
}