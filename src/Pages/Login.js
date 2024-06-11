import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaFacebookF } from "react-icons/fa";
import { FaXTwitter, FaGooglePlusG } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, login } from "../Redux/actions/UserActions";
import { useAlert } from "react-alert";
import Loader from "../component/Loader/Loader";

const Login = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const location = useLocation();

  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );
  const d = useSelector((state) => state.user);
  console.log("ddddd",d)
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const loginSubmit = (e) => {
    e.preventDefault();
    dispatch(login(loginEmail, loginPassword));
  };

  const redirect = location.search ? location.search.split("=")[1] : "/account";

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isAuthenticated) {
      navigate(redirect);
    }
  }, [dispatch, error, alert, isAuthenticated, redirect, navigate]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="">
            <div className="flex flex-col justify-center items-center md:flex-row max-w-7xl w-full">
              <div className=" w-[70%] ">
                <div className="text-xl cursor-pointer flex flex-col justify-center items-center mt-5 md:mt-0 py-4">
                  <h1 className="font-semibold text-xl md:text-5xl text-gray-600 m-2">
                    Login to your account
                  </h1>
                  <h1 className="text-sm font-medium text-gray-600 m-2">
                    Login using Social accounts
                  </h1>
                  <div className="text-lg lg:text-xl text-center space-x-5 m-2 flex">
                    <div className="w-14 h-14 rounded-full flex justify-center items-center bg-cyan-100 shadow hover:shadow-lg">
                      <a href="text">
                        <FaFacebookF className="w-6 h-6" />
                      </a>
                    </div>
                    <div className="w-14 h-14 rounded-full flex justify-center items-center  bg-cyan-100 shadow hover:shadow-lg">
                      <a href="text">
                        <FaXTwitter className="w-6 h-6" />
                      </a>
                    </div>
                    <div className="w-14 h-14 rounded-full flex justify-center items-center  bg-cyan-100 shadow hover:shadow-lg">
                      <a href="text">
                        <FaGooglePlusG className="w-7 h-7" />
                      </a>
                    </div>
                  </div>
                  <h1 className="text-sm font-medium text-gray-600 m-2">OR</h1>
                </div>

                <form onSubmit={loginSubmit}>
                  <div className="flex flex-col justify-center items-center m-2 space-y-6 md:space-y-8">
                    <div className="">
                      <input
                        type="email"
                        placeholder="Email"
                        required
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                        className=" bg-gray-100 rounded-lg px-5 py-2 focus:border border-blue-600 focus:outline-none text-black placeholder:text-gray-600 placeholder:opacity-50 font-semibold md:w-72 lg:w-[340px]"
                      />
                    </div>
                    <div className="">
                      <input
                        type="password"
                        placeholder="Password"
                        required
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        className=" bg-gray-100 rounded-lg px-5 py-2 focus:border border-blue-600 focus:outline-none text-black placeholder:text-gray-600 placeholder:opacity-50 font-semibold md:w-72 lg:w-[340px]"
                      />
                    </div>
                  </div>
                  <div className="text-center mt-7 flex flex-col items-center w-[100%]">
                    <Link to="password/forgot">Forgot Password ?</Link>
                    <input
                      type="submit"
                      value="Login"
                      className="px-24 md:px-[118px] lg:px-[140px] py-2 rounded-md text-white bg-gradient-to-l from-blue-400 to-emerald-400  font-medium m-2 mb-6 md:w-72 lg:w-[340px] "
                    />
                  </div>
                </form>
              </div>

              <div className="h-[100vh] w-[80%] sm:w-[30%]  bg-gradient-to-l from-blue-400 to-emerald-400  items-center flex justify-center">
                <div className="text-white text-base font-semibold text-center my-10 space-y-2 m-2">
                  <h1 className="text-5xl">New Here?</h1>
                  <h1 className="">
                    Sign Up and discover new oppurtinities here
                  </h1>
                  <div className="mt-4">
                    {" "}
                    <Link
                      to="/signup"
                      className="bg-white rounded-2xl px-4 text-emerald-400 py-1"
                    >
                      Sign Up
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Login;
