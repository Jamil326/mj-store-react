import { createContext , useState , useEffect } from 'react';

export const UserContext = createContext();


 const UserProvider = ({ children })=> {

     const [ user , setUser ] = useState ({});
     const [ logged , setLogged ] = useState (false);
     const token = localStorage.getItem('token');


     useEffect(()=> {
         if(token){
             setLogged(true);
         }
         
     },[logged]);

    

    
     return(
         <UserContext.Provider value={{user ,setUser , logged ,setLogged}}>
         { children }
         </UserContext.Provider>
     )

 }

 export default UserProvider;