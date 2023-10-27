import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Bill } from '../../../Network/Bill';
import ListBill from './ListBill';

export default function Completed() {

  const userId = useParams().id;
  const [bills, getBill] = useState();

  useEffect(() => {
    Bill.getCompletedBillByUser(userId, getBill);

  }, [userId]);

  if (!bills) return null;

  if (bills.length === 0) return (
    <div className='flex flex-col items-center justify-center'>
      <img alt='...' src='https://cdni.iconscout.com/illustration/premium/thumb/person-getting-online-shopping-invoice-4438804-3718482.png?f=webp' className=' w-3/12' />
      Không có đơn hàng nào
    </div>
  )

  return (
    <div>
      <h1 className='text-center text-2xl font-semibold'>Danh sách đơn hàng đang vận chuyển</h1>
      {bills.map((bill, index) => (
        <ListBill key={index} bill={bill} bills={bills} getBill={getBill} />
      ))}
    </div>
  )
}
