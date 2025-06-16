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
           <Card key={item.product}>
            <ListGroup>
            <ListGroup.Item>
            <span>ProdcutID :</span>
            <span>{item.product}</span>
            </ListGroup.Item>

            <ListGroup.Item>
            <span>Q</span>
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