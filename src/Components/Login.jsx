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
  const [alert, setAlert] = useState();
  const [reload, setReload] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();

    if (!alert) {
      setReload(true);
      Authentication.login(
        {
          username: username,
          password: password,
        },
        (user) => {
          setReload(false);
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
          setReload(false);
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
      {reload && (
        <div className=' fixed z-50 w-full h-full top-0 left-0 flex justify-center items-center'
          style={{ backgroundColor: 'rgb(0,0,0,0.4)' }}>
          <div role="status">
            <svg aria-hidden="true" className="w-8 h-8 mr-2 text-gray-200 animate-spin fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" /><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" /></svg>
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      )}
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
                            if (event.target.value.length < 6) {
                              setExcuting(false);
                              setAlert("Tên người dùng gồm ít nhất 6 chữ cái")
                            } else {
                              setAlert();
                            }
                          }}
                          value={username}
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
                            if (event.target.value.length < 7) {
                              setExcuting(false);
                              setAlert("Mật khẩu phải nhiều hơn 7 kí tự");
                            } else {
                              setAlert();
                            }
                          }}
                          defaultValue={password}
                          value={password}
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
