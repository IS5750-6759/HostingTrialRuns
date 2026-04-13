import React from 'react'
import { Outlet } from 'react-router'
import { Navbar } from '../components/Layout/Navbar'

export const DefaultLayout = () => {
  return (
    <>
    <Navbar/>
    <Outlet/>
    </>
  )
}
