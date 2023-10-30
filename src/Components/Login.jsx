import React from "react";
import { useEffect, useState } from "react";
import bgsvg from "../Assets/undraw_books_re_8gea.svg";
import { Authentication } from "../Network/Authentication"
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../Redux/AuthenticationSlice";

function Login() {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [excuting, setExcuting] = useState(false);
  const [alert, setAlert] = useState(null);

  const onSubmit = (e) => {
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
    }

    if (excuting) {
      Authentication.login(
        {
          username: username,
          password: password,
        },
        (user) => {
          const timeOut = setTimeout(() => {
            dispatch(setUser(user));
            navigate("/", {
              preventScrollReset: true,
            });
            clearTimeout(timeOut);
          }, 1000);
          console.log("Redirecting...");
        },
        (error) => {
          setAlert(error);
        }
      )
    }
  }

  useEffect(() => {
    document.title = "Sign in";

  }, []);

  return (
    <>
      <img src="https://previews.123rf.com/images/muhammadmisbakhujjamil/muhammadmisbakhujjamil1809/muhammadmisbakhujjamil180900002/109100933-bookstore-logo-design-template-icon-vector.jpg"
        className="w-40 absolute rounded-full  cursor-pointer"
        alt="Flowbite Logo"
        onClick={() => navigate("/")}
      />
      <section className="flex flex-row items-center justify-center space-x-6">
        <div className="max-xl:hidden">
          <img src={bgsvg} alt="svgbg" />
        </div>
        <form
          className="min-h-screen  py-6 flex flex-col justify-center sm:py-12"

          onSubmit={onSubmit}
        >
          <div>
            <div className="relative py-3 sm:max-w-xl sm:mx-auto" >
              <div
                className="absolute inset-0 bg-gradient-to-r from-green-300 to-green-600 shadow-lg transhtmlForm -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl max-sm:hidden">
              </div>
              <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
                <div className="max-w-md mx-auto">
                  <div>
                    <h1 className="text-2xl font-semibold font-mono">Hi! Chúc một ngày tốt lành</h1>
                  </div>
                  <div className="divide-y divide-gray-200">
                    <div className="py-4 text-base leading-6 space-y-8 text-gray-700 sm:text-lg sm:leading-7">
                      <div className="relative">
                        <input autoComplete="off" id="username" name="username" type="text" className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600 rounded-md"
                          placeholder="Username"
                          onChange={(event) => {
                            setUsername(event.target.value);
                          }}
                          autoCorrect="false"
                          required={true}
                        />
                        <label className=" absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Username</label>
                        {(alert === "Tên người dùng không tồn tại" || alert === "Tên người dùng gồm ít nhất 6 chữ cái") && (
                          <h1 className=" text-red-600 font-semibold text-base absolute">
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
                          autoCorrect="false"
                          required={true}
                        />
                        <label htmlFor="password" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Password</label>
                        {(alert === "Mật khẩu phải nhiều hơn 7 kí tự" || alert === "Sai mật khẩu") && (
                          <h1 className="text-red-600 font-semibold text-base absolute">
                            {alert}
                          </h1>
                        )}
                      </div>
                      <div className="relative">
                        <button
                          type="submit"
                          onDoubleClick={(e) => e.preventDefault()}
                          onClick={onSubmit}
                          className="bg-blue-500 hover:bg-blue-600 active:bg-blue-700 active:ring-blue-400 ring-3 text-white rounded-md px-2 py-1"
                        >
                          Đăng nhập
                        </button>
                        <div className="flex m-1">
                          <p className="text-m">Bạn chưa có tài khoản seo?</p>
                          <a href="/signup" className="text-sky-600 underline underline-offset-8 font-bold">Đăng ký</a>
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
    </>
  );
}

export default Login;
