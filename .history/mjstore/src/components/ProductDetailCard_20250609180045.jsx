import { useState , useEffect } from 'react';
import { Col , Row , Button , Carousel ,CarouselItem  ,Image , Card} from 'react-bootstrap';

const ProductDetailCard = ({ Product }) => {
    
    if(!Product) {
        return <p>no product</p>
    }
    
    const {
            _id, price , title,
            brand, category , color,
            description ,material, name ,
            power, power_supply ,usage , warranty ,
            image=[] ,size={} 
          } = Product;

          const  { length, width, height } = size;

          return (
              
              <Col xs = { 12 } sm = { 6 } md = { 4 } >
               <Carousel>
               { image.map(( img , index )=>(
                    
                  <Carousel.Item key = { index }>
                    <Image 
                    src= { img.url }
                    fluid
                    />
                  </Carousel.Item> 
               ))}
               </Carousel>

               <div className='mt-3 p-2'>
                   <Card className='lh-3'>
                   <Card.Body>
                   <Card.Title className=''>
                   {name}
                   </Card.Title>
                   <Card.Subtitle className=''>
                   {title}
                   </Card.Subtitle>
                   <Card.Subtitle className=''>
                   {description}
                   </Card.Subtitle>
                   <Card.Title className='text-dark fw-bold'>
                   <span className=''>₹ </span>{price}
                   </Card.Title>
                   </Card.Body>
                   </Card>
               </div>

             
              </Col>    
              
          )

}

export default ProductDetailCard;