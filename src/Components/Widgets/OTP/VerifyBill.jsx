import React, { useState } from 'react';
import { firebase } from '../../../Firebase/StorageFireBase';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import OtpInput from "otp-input-react";
import { useNavigate } from 'react-router-dom';
import { Bill } from '../../../Network/Bill';
import ToastMessage from '../ToastMessage';
import { ToastContainer } from 'react-toastify';

export default function VerifyBill({ phone, getPhone, bill, name, address, note }) {

    const [otp, setotp] = useState('');
    const [show, setshow] = useState(false);
    const [final, setfinal] = useState('');
    const navigate = useNavigate();

    // Sent OTP
    const signin = () => {

        if (phone === "" || phone < 10) return;

        let verify = new firebase.auth.RecaptchaVerifier('recaptcha-container');
        firebase.auth().signInWithPhoneNumber(`+${phone}`, verify).then((result) => {
            setfinal(result);
            setshow(true);
            verify.render();
        })
            .catch((err) => {
                verify.clear();
                console.log(err);
            });
    }

    const ValidateOtp = () => {
        if (otp.length !== 6 || final === null)
            return;

        final.confirm(otp).then(() => {
            Bill.updateBill({
                receiver: name,
                phone: phone,
                address: address,
                note: note,
                status: 'đã xử lý'
            }, bill.id).then((res) => {
                ToastMessage.showToastSuccessMessage("Xác nhận thành công");
                navigate('/');
            }).catch((err) => {
                console.log(err);
            });
        }).catch((res) => {
            if (res.message.includes("Firebase: The SMS code has expired. Please re-send the verification code to try again. (auth/code-expired).")) {
                ToastMessage.showToastWarnMessage("Mã hết hạn");
            } else if (res.message.includes("the phone auth credential is invalid")) {
                ToastMessage.showToastWarnMessage("Sai mã!");
            }
        })
    }

    return (
        <div
            id='form'
            className=' fixed z-50 w-screen h-screen flex top-0 justify-center items-center'
            style={{ backgroundColor: 'rgb(0,0,0,0.4)' }}
        >
            <center className=' bg-white p-5 rounded-lg  w-3/12 h-2/6 flex flex-col justify-around items-center'>
                <h1 className=' text-2xl font-semibold'>Xác nhận số điện thoại</h1>
                <div style={{ display: !show ? "block" : "none" }}>
                    <PhoneInput
                        country={'vn'}
                        value={phone}
                        onChange={getPhone}
                        disabled
                    />
                    <div id="recaptcha-container"></div>
                    <div className=' flex flex-col w-4/6 space-y-2'>
                        <button className=' p-2 bg-green-500 text-white text-2xl font-semibold rounded-lg hover:bg-green-600 active:ring-1 active:ring-green-400 mt-3' onClick={signin}>Gửi mã OTP</button>
                    </div>
                </div>
                <div style={{ display: show ? "block" : "none" }}>
                    <OtpInput
                        value={otp}
                        onChange={setotp}
                        OTPLength={6}
                        otpType="number"
                        disabled={false}
                        autoFocus
                        className=" p-2 bg-gray-300"
                    ></OtpInput>
                    <br /><br />
                    <div className=' flex flex-col w-4/6 space-y-2'>
                        <button className=' p-2 bg-green-500 text-white text-2xl font-semibold rounded-lg hover:bg-green-600 active:ring-1 active:ring-green-400' onClick={ValidateOtp}>Xác nhận</button>
                    </div>
                </div>
            </center>
            <ToastContainer autoClose={1000} />
        </div>
    )
}
