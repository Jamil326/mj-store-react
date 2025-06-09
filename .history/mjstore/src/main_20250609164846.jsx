import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App.jsx';

import { createBrowserRouter,
         RouterProvider } from 'react-router-dom';

import About from './pages/About';
import Home from './pages/Home';
import Cart from './pages/Cart';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Contact from './pages/Contact';
import Products from './pages/Products';



const router= createBrowserRouter([
  {
    path:'/',
    element:<App/>,
    children:[
      {
        path:'',
        element:<Home />,
      },

      {
       path:'Products',
       element:<Products />
      },
      
      {
        path:'about',
        element:<About />,
      },

      {
        path:'cart',
        element:<Cart />,
      },

      {
        path:'signup',
        element:<SignUp />
      },

      {
        path:'dashboard',
        element:<Dashboard />
      },

      {
        path:'login',
        element:<Login />
      },

      {
        path:'contact',
        element:<Contact />
      },

      {
        path:'productDetails',
        element:
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router = {router}/>
  </StrictMode>
)
