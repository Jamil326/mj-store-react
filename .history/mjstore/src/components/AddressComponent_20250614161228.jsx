import { useState ,useEffect } from 'react';
import { Form } from 'react-bootstrap';

const AddressForm = () => {
    const [ address,setAddress ] = useState({
        street:'',
        landmark:'',
        city:'',
        pin:'',
        state:''


    })

    const handleSubmit= (e) => {
        e.preventDefault();
        console.log(FormData);
    }

    const handleChange =(e)=>{
        
        const {name,value} = e.target;
        setAddress((prev)=>{
           return {...prev ,[name]:value}

        })
    }
    return (
        <div className='mt-3 shadow-normal  '>
        <h1>Fill Up Add</h1>
         <form className='form-control d-flex flex-column gap-1 p-5' onSubmit={handleSubmit}>
             <input 
             type="text" 
             name="street" 
             value={address.street}
             placeholder='Street'
             onChange={handleChange}
             className='rounded p-2 border-0 border-bottom'
             />

             <input  
             type="text" 
             name="landmark" 
             value={address.landmark}
             placeholder='Landmark'
             onChange={handleChange}
             className='rounded p-2 border-0 border-bottom'
             />

             <input  
             type="text" 
             name="city" 
             value={address.city}
             placeholder='City'
             onChange={handleChange}
             className='rounded p-2 border-0 border-bottom'

             />


             <input  
             type="number" 
             name="pin" 
             value={address.pin}
             placeholder='Pin'
             onChange={handleChange}
             className='rounded p-2 border-0 border-bottom'
             
             />


             <input  
             type="text" 
             name="state" 
             value={address.state}
             placeholder='State'
             onChange={handleChange}
             className='rounded p-2 border-0 border-bottom'
             
             />
         </form>
        </div>
    )
} 



export default AddressForm;