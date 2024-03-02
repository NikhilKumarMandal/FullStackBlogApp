import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Layout from './Layout.jsx'
import Hero from "./pages/Hero.jsx"
import SignIn from './pages/SignIn.jsx'
import { Provider } from 'react-redux'
import Login from './pages/Login.jsx'
import { store } from './store/store.js'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
    <Route path='' element={<Hero/>} />
    <Route path='/register' element={<SignIn/>} />
    <Route path='/LogIn' element={<Login/>} />
       
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
