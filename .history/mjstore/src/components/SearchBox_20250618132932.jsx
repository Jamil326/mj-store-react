import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { FaSearch } from "react-icons/fa";



const SearchBox =() => {
    const [ item , setItem ] = useState('');

    const handleChange = (e) => {
        setItem(e.target.value);
    } 
return (
    <div className='form-control shadow  d-flex   p-1 justify-content-center align-items-center'>
        <input className="  text-center " style={{width:'100%',padding:'5px',border:0 , outline:0}}
 type='search' 
 name='search' 
 value={item}
 placeholder='Search'
 onChange={handleChange}
 
 /> 

 <span>  
<FaSearch className=' fs-3 mx-1  cursor-pointer'/>
</span>
 
    </div>




);

}



export default SearchBox;





