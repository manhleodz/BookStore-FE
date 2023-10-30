import React from "react";
import { useEffect, useState } from "react";
import bgsvg from "../Assets/undraw_welcome_cats_thqn.svg";
import { useNavigate } from "react-router-dom";
import Otp from "./Widgets/OTP/Otp";
import { Authentication } from "../Network/Authentication";

function Signup() {


  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phonenumber, setphonenumber] = useState("");
  const [excuting, setExcuting] = useState(false);
  const [alert, setAlert] = useState(null);

  const signUp = () => {
    Authentication.signUp(
      {
        username: username,
        password: password,
        phonenumber: phonenumber,
        email: email
      },
      (user) => {
        const timeOut = setTimeout(() => {
          navigate("/login", {
            preventScrollReset: true,
          });
          clearTimeout(timeOut);
        }, 1000);
      },
      (error) => {
        document.getElementById("otp").style.display = "none";
        setExcuting(false);
        setAlert(error);
      }
    )
  }

  useEffect(() => {
    document.title = "Sign up";

  }, []);

  return (
    <>
      <img src="https://previews.123rf.com/images/muhammadmisbakhujjamil/muhammadmisbakhujjamil1809/muhammadmisbakhujjamil180900002/109100933-bookstore-logo-design-template-icon-vector.jpg"
        className="w-40 absolute rounded-full  cursor-pointer"
        alt="Flowbite Logo"
        onClick={() => navigate("/")}
      />
      <section className="flex flex-row items-center justify-center">
        <div className="max-xl:hidden">
          <img src={bgsvg} alt="svgbg" />
        </div>
        <form
          className="min-h-screen flex flex-col justify-center sm:py-6"
          onSubmit={(e) => {
            e.preventDefault();
            setExcuting(true);
            setAlert(null);
            var pattern1 = new RegExp("^[A-Za-z][A-Za-z0-9_]{6,29}$");
            if (!pattern1.test(username)) {
              setExcuting(false);
              setAlert("Tên người dùng gồm ít nhất 6 chữ cái")
            } else if (password.length < 8) {
              setExcuting(false);
              setAlert("Mật khẩu phải nhiều hơn 7 kí tự");
            } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
              setExcuting(false);
              setAlert("Sai email");
            } else if (!/(84|0[3|5|7|8|9])+([0-9]{8})\b/.test(phonenumber)) {
              setExcuting(false);
              setAlert("Nhập số điện thoại 10 số");
            }

            if (excuting) {
              document.getElementById('otp').style.display = 'block';
            }
          }}
        >
          <div>
            <div className="relative py-3 sm:max-w-xl sm:mx-auto" >
              <div
                className="absolute inset-0 bg-gradient-to-r from-green-300 to-green-600 shadow-lg transhtmlForm -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl max-sm:hidden">
              </div>
              <div className="relative px-4 bg-white shadow-lg sm:rounded-3xl sm:p-20">
                <div className="max-w-md mx-auto">
                  <div>
                    <h1 className="text-2xl font-semibold font-mono">Hi! Chúc một ngày tốt lành</h1>
                  </div>
                  <div className="divide-y divide-gray-200 mt-3">
                    <div className="text-base leading-6 space-y-8 text-gray-700 sm:text-lg sm:leading-7">
                      <div className="relative">
                        <input autoComplete="off" id="username" name="username" type="text" className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600 rounded-md"
                          placeholder="Username"
                          onChange={(event) => {
                            setUsername(event.target.value);
                          }}
                          autoFocus={true}
                          autoCorrect="false"
                          required
                        />
                        <label className=" absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Tên người dùng</label>
                        {(alert === "Tên người dùng đã tồn tại" || alert === "Tên người dùng gồm ít nhất 6 chữ cái") && (
                          <h1 className=" text-red-600 font-semibold text-base absolute">
                            {alert}
                          </h1>
                        )}
                      </div>
                      <div className="relative">
                        <input autoComplete="off" id="email" name="email" type="text" className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600 rounded-md"
                          placeholder="email"
                          onChange={(event) => {
                            setEmail(event.target.value);
                          }}
                          autoFocus={false}
                          autoCorrect="false"
                          required
                        />
                        <label htmlFor="email" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Email</label>
                        {(alert === "Sai email" || alert === "Email đã được sử dụng") && (
                          <h1 className="text-red-600 font-semibold text-base absolute">
                            {alert}
                          </h1>
                        )}
                      </div>
                      <div className="relative">
                        <input autoComplete="off" id="password" name="password" type="password" className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600 rounded-md"
                          placeholder="Password"
                          onChange={(event) => {
                            setPassword(event.target.value);
                          }}
                          autoFocus={false}
                          autoCorrect="false"
                          required
                        />
                        <label htmlFor="password" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Mật khẩu</label>
                        {(alert === "Mật khẩu phải nhiều hơn 7 kí tự") && (
                          <h1 className="text-red-600 font-semibold text-base absolute">
                            {alert}
                          </h1>
                        )}
                      </div>
                      <div className="relative">
                        <input autoComplete="off" id="phonenumber" name="phonenumber" type="phonenumber" className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600 rounded-md"
                          placeholder="phonenumber"
                          onChange={(event) => {
                            setphonenumber(event.target.value);
                          }}
                          autoFocus={false}
                          autoCorrect="false"
                          required
                        />
                        <label htmlFor="phonenumber" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Số điện thoại</label>
                        {(alert === "Số điện thoại đã được sử dụng" || alert === "Nhập số điện thoại 10 số") && (
                          <h1 className="text-red-600 font-semibold text-base absolute">
                            {alert}
                          </h1>
                        )}
                      </div>
                      <div className="relative">
                        <button
                          className="bg-blue-500 text-white rounded-md px-2 py-1"
                          type="submit"
                        >
                          Đăng ký
                        </button>
                        <div className="flex m-1">
                          <p className="text-m">Bạn đã có tài khoản rồi?</p>
                          <a href="/login" className="text-sky-600 underline underline-offset-8 font-bold">Đăng nhập</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </section>
      <div
        className={`${excuting !== true ? 'hidden' : ''}`}
        id='otp'
        onClick={e => {
          if (e.target.id === 'background') {
            document.getElementById('otp').style.display = 'none';
          }
        }}
      >
        <Otp email={email} username={username} signUp={signUp} />
      </div>
    </>
  );
}

export default Signup;
