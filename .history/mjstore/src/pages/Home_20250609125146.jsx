import Banner from '../components/Banner';
import { useState , useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { FaHeadphones } from "react-icons/fa";
import { FaTools } from "react-icons/fa";
import { GiClothes } from "react-icons/gi";
import toolsImage from '../assets/tools.jpg';
import { toast } from 'react-toastify';
import { Button } from 'react-bootstrap';







const Home = () => {
  
  const [ page, setPage ] = useState(1);
  const [product ,setProduct] = useState([]);
  
  const HandleNext = () => {
    setPage((prev)=>{
      const nextPage = prev+1;
    console.log(page);
      return nextPage;
      
      
    })
  }

  const HandlePrev = () => {
    
    setPage((prev)=>{
      
      const nextPage = Math.max(prev-1,1);
      console.log(page);
      return nextPage;
    })
  }

   const getData = async (page)=>{
     let limit=14;
  const baseUrl =`https://mj-store.onrender.com/api/v1/product/get/product?page=${page}&limit=${limit}`;
 

  try {

    const res = await fetch(baseUrl,{
      method:'GET',
      mode:'cors',
      headers:{
        'content-type':'application/json',
      }
      
    });

    const data = await res.json();

    if(!res.ok) {
      throw new Error(data.message);
    }
    toast.success(data.message)
    if(data.data.getProduct.length==='')
    setProduct(data.data.getProduct);
    
    
    
  } catch (error) {
    return toast.warn(error);
    
  }

  }


useEffect(()=>{

  getData(page);
  
},[page])


  
 

const categories = [
  {name: 'Hardwares' , icon:<FaTools/>},
  {name:'Electronics' , icon:<FaHeadphones/>},
  {name:'Clothes' , icon:<GiClothes/>},
  {name: 'Hardwares' , icon:<FaTools/>},
  {name:'Electronics' , icon:<FaHeadphones/>},
  {name:'Clothes' , icon:<GiClothes/>}
]

  
    return (
        <div className='d-flex flex-column '>
          
       <header id='category' className='container overflow-x-scroll overflow-md-hidden '>
       <ul className='list-unstyled d-flex  fw-bold    '>
         {categories.map((item,index)=> (
           <div className='d-flex flex-grow-1  flex-column p-2  m-3 bg-light shadow  justify-content-center rounded' key={item.id}  style={{cursor:'pointer'}}>
             <span className='text-center  fs-5   '>{item.icon}</span>
             <span className='text-center '>{item.name}</span>
           </div>
         ))}
       </ul>
       </header>

       <div className='container-fluid   mt-3 p-0'>
         <div className='row  p-0 m-0   '>
           {
             product.length>0?(
               product.map((item,index)=>{
                 return <div className='col-6 col-md-4 mb-1  p-0' key={ item.id } style={{cursor:'pointer'}}>
                   <ProductCard
                   product={item}
                   />
                 </div>
               })
           ):(<h3>No product Available</h3>)}
         </div>
       </div>

       <div className='d-flex justify-content-center align-items-center mt-2'>
         <Button onClick = {HandlePrev} className='me-3'>Previous</Button>
         <Button onClick = {HandleNext}  className=''>Next</Button>
       </div>
      
      
        </div>
              

    );
}



export default Home;