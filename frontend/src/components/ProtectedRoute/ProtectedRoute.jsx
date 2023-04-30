import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet, Route } from 'react-router-dom'
import Login from '../Login/Login'

const ProtectedRoute = () => {
    const {loading,user,isAuthenticated} = useSelector(state=>state.loginReducer)
  return (
    loading === false && isAuthenticated === true ?
     <Outlet /> :
     <Navigate to='/login' replace/>

  )
}

export default ProtectedRoute