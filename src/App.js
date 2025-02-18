import React, { useContext, useEffect } from 'react'
import { RouterProvider, createBrowserRouter, createHashRouter } from 'react-router-dom'
import Login from './Component/Login/Login'
import Register from './Component/Register/Register'
import GuardRouting from './Component/GuardRouting/GuardRouting'
import Home from './Component/Home/Home'
import Footer from './Component/Footer/Footer'
import Cart from './Component/Cart/Cart'
import Categories from './Component/Categories/Categories'
import Brands from './Component/Brands/Brands'
import Navbar from './Component/Navbar/Navbar'
import Products from './Component/Products/Products'
import ResetPassword from './Component/ResetPassword/ResetPassword'
import NotFound from './Component/NotFound/NotFound'
import ForgetPassword from './Component/forgetPassword/ForgetPassword'
import Layout from './Component/LayOut/Layout'
import { UserContext, UserContextProvider } from './Component/Context/UserContext'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import ProductDetails from './Component/ProductDetails/ProductDetails'
import { CartContextProvider } from './Component/Context/CartContext'
import AllOrders from './Component/AllOrders/AllOrders'
import CheckOut from './Component/CheckOut/CheckOut'

export default function App() {
  let QueryClients = new QueryClient()
  let Routes = createHashRouter([
    {
      path: '', element: <Layout />, children: [
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
        { path: 'home', element:<GuardRouting><Home /></GuardRouting>  },
        { path: '/', element: <GuardRouting><Home /> </GuardRouting>},
        { path: 'footer', element: <Footer /> },
        { path: 'cart', element: <GuardRouting><Cart/></GuardRouting>},
        { path: 'categories', element:<GuardRouting><Categories /> </GuardRouting> },
        { path: 'brands', element:<GuardRouting><Brands/> </GuardRouting> },
        { path: 'allOrders', element:<GuardRouting><AllOrders /> </GuardRouting> },
        { path: 'checkout/:id', element: <GuardRouting><CheckOut /> </GuardRouting>},
        { path: 'navbar', element: <GuardRouting><Navbar /> </GuardRouting>},
        { path: 'prouducts', element: <GuardRouting><Products /> </GuardRouting>},
        { path: 'productDetails/:title/:id', element: <GuardRouting><ProductDetails /></GuardRouting> },
        { path: 'forgetPassword', element: <ForgetPassword /> },
        { path: 'ResetPassword', element: <ResetPassword /> },
        { path: '*', element: <NotFound /> },
      ]
    },
  ])

  return (
    <>
      <QueryClientProvider client={QueryClients}>
        <ReactQueryDevtools></ReactQueryDevtools>
        <CartContextProvider>
        <UserContextProvider>
        <RouterProvider router={Routes} />
        </UserContextProvider>
        </CartContextProvider>
      </QueryClientProvider>
    </>
  )
}
