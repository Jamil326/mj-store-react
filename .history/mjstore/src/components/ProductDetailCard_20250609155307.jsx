import { useState , useEffect } from 'react';
import { Col , Row , Button , Carousel ,CarouselItem  ,Image} from 'react-bootstrap';

const ProductDetailCard = ({ Product }) => {
    const { length ,width ,height } = Product.size;
    const {
            _id, price , title,
            brand, category , color,
            description ,material, name ,
            power, power_supply ,usage , warranty ,
            image 
          } = Product;

          return (
              
              <Col xs = {12} sm = {6} md = {4} >
               <Carousel>
               { image.map((img ,index )=>(
                    
                  <Carousel.Item key = { index }>
                    <Image src= { img.url }/>
                  </Carousel.Item> 
               ))}
               </Carousel>
              </Col>    
              
          )

}