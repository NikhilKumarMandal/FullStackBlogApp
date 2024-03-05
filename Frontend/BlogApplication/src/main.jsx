import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Layout from './Layout.jsx'
import SignIn from './pages/SignIn.jsx'
import { Provider } from 'react-redux'
import Login from './pages/Login.jsx'
import { store } from './store/store.js'
import Blog from './pages/Blog.jsx'
import { Toaster } from "react-hot-toast";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
    <Route path='' element={<Blog/>} />
    <Route path='/register' element={<SignIn/>} />
    <Route path='/LogIn' element={<Login/>} />
       
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  
  <React.StrictMode>
    <Toaster />
    <Provider store={store}>
    <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
