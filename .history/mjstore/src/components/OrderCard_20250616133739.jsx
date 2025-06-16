import { Col , Row , Card , ListGroup } from 'react-bootstrap';

const OrderCard = ({details}) =>{
    if(!details){
        return <p>details is empty</p>
    }
    const { 
            items=[], 
            orderDate , 
            orderStatus ,
            paymentMethod ,
            paymentStatus,
            shippingAddress = {},
            totalAmount
          } = details;

          const {city ,street , pin , landmark ,state } = shippingAddress;

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
            <span>Quantity :</span>
            <span>{item.totalValue}</span>
            </ListGroup.Item>


            <ListGroup.Item>
            <span>OrderDate :</span>
            <span>{orderDate}</span>
            </ListGroup.Item>

            <ListGroup.Item>
            <span>OrderStatus :</span>
            <span>{orderStatus}</span>
            </ListGroup.Item>


             <ListGroup.Item>
            <span>PaymentMethod :</span>
            <span>{paymentMethod}</span>
            </ListGroup.Item>


             <ListGroup.Item>
            <span>PaymentStatus :</span>
            <span>{paymentStatus}</span>
            </ListGroup.Item>


             <ListGroup.Item>
            <span>Streer :</span>
            <span>{street}</span>
            </ListGroup.Item>


             <ListGroup.Item>
            <span>Landmark :</span>
            <span>{landmark}</span>
            </ListGroup.Item>

             <ListGroup.Item>
            <span>City :</span>
            <span>{city}</span>
            </ListGroup.Item>


             <ListGroup.Item>
            <span>Pin :</span>
            <span>{pin}</span>
            </ListGroup.Item>


             <ListGroup.Item>
            <span>State :</span>
            <span>{state}</span>
            </ListGroup.Item>


             <ListGroup.Item>
            <span>TotalAmount :</span>
            <span>{totalAmount}</span>
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


export default ;