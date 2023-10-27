import React from 'react';
import { useDispatch, useSelector } from "react-redux";


export default function Vouchers() {

  const user = useSelector((state2) => state2.authentication.user);

  return (
    <div>Vouchers</div>
  )
}
