import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Layout from './Layout.jsx'
import SingUp from './pages/SingUp.jsx'
import SingIn from './pages/SingIn.jsx'
import Home from './pages/Home.jsx'
import { store, persistor } from './redux/store.js';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
    <Route path='' element={<Home/>} />
    <Route path='/signUp' element={<SingUp/>} />
    <Route path='/signIn' element={<SingIn/>} />
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <PersistGate persistor={persistor}>
  <Provider store={store}>
  <RouterProvider router={router} />
  </Provider>
</PersistGate>
)
