import React from 'react';
import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";

import Login from '../Login';
import SignUp from '../SignUp';
import HomeRoutes from './HomeRoutes';

export default function AppRoutes() {

  const user = useSelector((state) => state.authentication.user);
  const token = localStorage.getItem('accessToken');

  return (
    <>
      <Routes>
        {token === null && (
          <>
            <Route path='/*' element={<HomeRoutes />} />
            <Route path='login' element={<Login />} />
            <Route path='signup' element={<SignUp />} />
          </>
        )}
      </Routes>
      <Routes>

        {token && (
          <>
            <Route path='/*' element={<HomeRoutes />} />
          </>
        )}
      </Routes>
    </>
  )
}
