import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../component/Loader/Loader";
import { clearErrors, forgotPassword } from "../Redux/actions/UserActions";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import MetaData from "../component/MetaData";

const ForgotPassword = () => {
    const alert = useAlert();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { error, message, loading } = useSelector((state) => state.forgotPassword);

    const [email, setEmail] = useState("");

    const forgotPasswordSubmit = (e) => {
        e.preventDefault();
    
        const myForm = new FormData();
    
        myForm.set("email", email);
    
        dispatch(forgotPassword(myForm));
      };

      useEffect(() => {
      
    
        if (error) {
          alert.error(error);
          dispatch(clearErrors());
        }
    
        if (message) {
          alert.success(message);
          
        }
      }, [dispatch, error, alert, message]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="Forgot Password" />
          <div className="flex flex-col  flex-wrap justify-center items-center md:flex-row w-full h-full">
            <div className=" w-[70%]">
            <h2 className="text-center p-4 border-b-2 border-black w-auto text-3xl font-semibold opacity-40 md:w-[50%] md:ml-[24%]	">
                Forgot Password
              </h2>

              <form onSubmit={forgotPasswordSubmit}>
                <div className="flex flex-col justify-center items-center m-2 space-y-6 md:space-y-8">
                  <div className=" text-center sm:flex sm:gap-10 sm:h-11">
                    <input
                      type="text"
                      placeholder="Email"
                      name="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="m-2 p-2 bg-gray-100 rounded-lg px-5 py-2 focus:border border-blue-600 focus:outline-none text-black placeholder:text-gray-600 placeholder:opacity-50 font-semibold md:w-72 lg:w-[340px]"
                    />
                  </div>
                </div>

                <div className="text-center mt-9 my-6">
                  <input
                    type="submit"
                    value="send"
                    className=" px-24 md:px-[118px] lg:px-[140px] py-2 rounded-md text-white bg-gradient-to-l from-blue-400 to-emerald-400  font-medium mt-0 m-2 "
                  />
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ForgotPassword;
