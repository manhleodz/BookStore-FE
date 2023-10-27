import React, { useEffect, useState } from 'react'
import { Bill } from '../../../Network/Bill'
import { useParams } from 'react-router-dom';
import ListBill from './ListBill';

export default function Processing() {

  const userId = useParams().id;
  const [bills, getBill] = useState();

  useEffect(() => {
    Bill.getProcessingBillByUser(userId, getBill);
  }, [userId]);

  if (!bills) return null;
  if (bills.length === 0) return (
    <div className='flex flex-col items-center justify-center'>
      <img alt='...' src='https://cdni.iconscout.com/illustration/premium/thumb/person-getting-online-shopping-invoice-4438804-3718482.png?f=webp' className=' w-3/12'/>
      Không có đơn hàng nào
    </div>
  )
  return (
    <div className='divide-y-2 divide-gray-200'>
      <h1 className='text-center text-2xl font-semibold'>Danh sách đơn hàng đang xử lý</h1>
      {bills.map((bill, index) => (
        <ListBill key={index} bill={bill} bills={bills} getBill={getBill}/>
      ))}
    </div>
  )
}
