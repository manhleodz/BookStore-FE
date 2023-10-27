import React from "react";
import {
  Route, Routes
} from "react-router-dom";
import AppRoutes from "./AppRoutes";


export function StartRoutes() {
  return (
    <Routes>
      <Route path="/*" element={<AppRoutes />} />
    </Routes>
  )
}
