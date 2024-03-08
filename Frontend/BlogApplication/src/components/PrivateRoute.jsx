import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet, Navigate } from 'react-router-dom';

function PrivateRoute() {
    const {currentUser} =useSelector((state) => state.user)
    return currentUser ? <Outlet /> : <Navigate to='/signIn' />;
}

export default PrivateRoute