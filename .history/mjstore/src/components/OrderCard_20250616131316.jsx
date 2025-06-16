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
           { items.length>0? it
           <Card>
            <ListGroup>
            <ListGroup.Item>
            </ListGroup.Item>
            </ListGroup>
           </Card>
           }
           </Row>       
        </div>
    )
}