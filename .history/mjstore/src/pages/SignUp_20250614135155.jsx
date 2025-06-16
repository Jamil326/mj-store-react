import { Container , Col , Row, Button } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import { useState , useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
    let t;
    const navigate = useNavigate();
    const [formData,setFormData] =useState({
    name:'',
    email:'',
    mobile:'',
    password:'',
    confirmPassword:''
}); 

const str = 'user allready exist please goto login page'

const handleChange = (e) => {
    
    const { name, value } = e.target;
            setFormData((prevData)=>({
                ...prevData,
                [name]:value

            }));

}

const handleSubmit = async (e) =>{
    e.preventDefault();

    if(formData.password !== formData.confirmPassword) {
       setFormData((prevData)=>({
              ...prevData,
              password:'',
              confirmPassword:'',
       }))
      return  toast.warn('Password And ConfirmPassword Must Be Same');
    }


    try {
        const urlStr = 'https://mj-store.onrender.com/api/v1/user/signup';
        

        const result = await fetch(urlStr, {
            method:'POST',
            mode:'cors',
            headers:{
                Accept:'application/json',
                'content-type':'application/json'
            },

            body:JSON.stringify(formData)
        });

        if(!result.ok) {
            console.log(result);
            const res = await result.json();
              setFormData({
     name:'',
     email:'',
     mobile:'',
     password:'',
     confirmPassword:''
    
});


         if( res.message.trim().toLowerCase() === str ){
             t = setTimeout(() =>{
               navigate('/login');
        },2000);

         }
           
            throw new Error(res.message);
        }

        const data = await result.json();   

        toast.success(data.message);

          t = setTimeout(() =>{
               navigate('/login');
        },2000);

    } catch (error) {
         toast.error(error.message);
        
        
    }
    
    setFormData({
     name:'',
     email:'',
     mobile:'',
     password:'',
     confirmPassword:''
    
});
}

 useEffect(() => {
        // Cleanup timeout on component unmount
        return () => clearTimeout(t);
    }, []);


    return (
       <div className='mt-5  '>
       <Container fluid>
       <Row>
       <Col className='text-center border-bottom '> <h2>Welcome to Sign Up Page</h2></Col>
       </Row>

        <Row>
       <Col className='text-center '>
       <div className='mb-3 mt-5 d-md-flex justify-content-center align-items-center '>

       <form className='col-md-4 border p-4  rounded ' onSubmit={handleSubmit}>

         <h3 className='mb-5'>Sign Up</h3>

           <div className=' mb-3  '>           
           <input 
           type="text" 
           name="name" 
           value={formData.name}
           onChange={handleChange}
           placeholder='Please Enter Name'
           className='form-control'
           
           />
               
           </div>


            <div className=' mb-3  '>           
           <input 
           type="email" 
           name="email" 
           value={formData.email}
           onChange={handleChange}
           placeholder='Please Enter Email (optional)'
           className='form-control'
           
           />
               
           </div>

            <div className=' mb-3  '>           
           <input 
           type="number" 
           name="mobile" 
           value={formData.mobile}
           onChange={handleChange}
           placeholder='Please Enter Mobile'
           className='form-control'
           required
           />
               
           </div>

            <div className=' mb-3  '>           
           <input 
           type="password" 
           name="password" 
           value={formData.password}
           onChange={handleChange}
           placeholder='Please Enter Password'
           className='form-control'
           required
           />
               
           </div>


        <div className=' mb-5  '>           
           <input 
           type="password" 
           name="confirmPassword" 
           value={formData.confirmPassword}
           onChange={handleChange}
           placeholder='Please Confirm Password'
           className='form-control'
           required
           />
               
       </div>

       <div className='d-grid mb-3 '>
           <Button variant='dark' type='submit' >Sign Up</Button>
       </div>

       <ToastContainer/>
   
       
       </form>

       
           
       </div>
      
       </Col>
       </Row>

       </Container>
           
       </div>
    );
}



export default SignUp;