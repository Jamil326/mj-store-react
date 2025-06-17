import { Container , Col , Row, Form , Button , Spinner } from 'react-bootstrap';
import { useState , useContext ,useEffect} from 'react';
import { IoLogIn  } from "react-icons/io5";
import { toast } from 'react-toastify';
import { UserContext }from '../context/userContext';





const Login = () => {
    const { logged ,user , setUser ,setLogged } = useContext ( UserContext );
    const [ mobile , setMobile ] = useState('');
    const [ password , setPassword ] = useState('');
 
    const handleMobile = (e) => {
     setMobile(e.target.value);
       
    }

    const handlePassword = (e) => {
     setPassword(e.target.value);
       
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            mobile,
            password
        }

     if( !data.mobile || data.mobile.length !==10){
         toast.warn('Mobile Number Should BE 10 Digit');
        return setMobile('');
     }

      if( !data.password || data.password.length !==10){
         toast.warn('Password Should BE Atleast 6 Digit');
        return setPassword('');
     }

        try {

            

        const urlStr = 'https://mj-store.onrender.com/api/v1/user/login';

        const result = await fetch(urlStr,{
            method:'POST',
            mode:'cors',
            headers:{
                Accept:'application/json',
                'content-type':'application/json'
            },

            body:JSON.stringify(data)

        });
         const res = await result.json();
        if(result.status===401){
            toast.warn(res.message);
        }

        if(result.status===404) {
            toast.error(res.message);
        }

        if(!result.ok){
         
         throw new Error(res.message);   
        }

        const token = res.data.token;        
        localStorage.setItem('token',token);
        localStorage.setItem('user-info',JSON.stringify(res.data.existed));
        setLogged(true);
        toast.success(res.message);

        

        } catch (error) {
            toast.error(error);
        }finally{
           
        }
    }
    return (
       <Container className='mt-3'>
       <Row className='justify-content-center'>
       <Col md={6} >
       <h2 className='text-center mt-3'>Login</h2>
       <Form className='mt-5 form-control shadow'>
       <Form.Label>Mobile</Form.Label>
        <Form.Group className='mb-3' controlId='formMobile'>
        <Form.Control
        type='number'
        name='mobile'
        placeholder='Please Enter Mobile Number' 
        value={mobile}
        onChange={handleMobile}
        />
        </Form.Group>


         <Form.Label>Password</Form.Label>
        <Form.Group controlId='formPassword'>
        <Form.Control
        type='password'
        name='password'
        placeholder='Please Enter Password' 
        value={password}
        onChange={handlePassword}
        />
        </Form.Group>
        <div className='d-flex justify-content-end' ><Button variant='danger' className='mt-3'>ForgetPassword?</Button></div>

        <div className='d-grid mt-5 mb-5'>
            <Button onClick={handleSubmit} variant='dark'>
            <span className='px-3'>Submit</span>
</Button>

        </div>
       </Form>
       </Col>
       </Row>
       </Container>
           
       
    );
}



export default Login;