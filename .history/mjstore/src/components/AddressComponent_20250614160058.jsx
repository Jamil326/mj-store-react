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
        <div className='mt-3 shadow-normal '>
         <form className='form-control d-flex flex-column gap-1 p-5' onSubmit={handleSubmit}>
             <label htmlFor="street">Street</label>
             <input 
             type="text" 
             name="street" 
             value={address.street}
             placeholder='street'
             onChange={handleChange}
             className='p-1'
             />

             <label htmlFor="landmark">landmark</label>
             <input  
             type="text" 
             name="landmark" 
             value={address.landmark}
             placeholder='landmark'
             onChange={handleChange}
             />

             <label htmlFor="city">City</label>
             <input  
             type="text" 
             name="city" 
             value={address.city}
             placeholder='city'
             onChange={handleChange}
             />


             <label htmlFor="pin">Pin</label>
             <input  
             type="number" 
             name="pin" 
             value={address.pin}
             placeholder='pin'
             onChange={handleChange}
             />


             <label htmlFor="state">State</label>
             <input  
             type="text" 
             name="state" 
             value={address.state}
             placeholder='state'
             onChange={handleChange}
             />
         </form>
        </div>
    )
} 



export default AddressForm;