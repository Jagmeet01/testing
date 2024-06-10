import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../component/Loader/Loader";
import { resetPassword, clearErrors } from "../Redux/actions/UserActions";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import MetaData from "../component/MetaData";

const ResetPassword = () => {
    const alert = useAlert();
  const navigate = useNavigate();
  const { token } = useParams();
  const dispatch = useDispatch();
  const { error, success, loading } = useSelector((state) => state.forgotPassword);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const resetPasswordSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("password", password);
    myForm.set("confirmPassword", confirmPassword);

    dispatch(resetPassword(token, myForm));
  };

  useEffect(() => {
    if (error) {
        alert.error(error);
        dispatch(clearErrors());
      }

    if (success) {
      alert.success("Password Updated Successfully");
      

      navigate("/login");

    }
  }, [dispatch, error, alert, success, navigate]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="Change Password" />
          <div className="flex flex-col  flex-wrap justify-center items-center md:flex-row w-full h-full">
            <div className=" w-[70%]">
              <h2 className="text-center p-4 border-b-2 border-black w-auto text-3xl font-semibold opacity-40 md:w-[50%] md:ml-[24%]	">
                Change Password
              </h2>

              <form onSubmit={resetPasswordSubmit}>
                <div className="flex flex-col justify-center items-center m-2 space-y-6 md:space-y-8">
                  <div className=" text-center sm:flex sm:gap-10 sm:h-11">
                    <input
                      type="password"
                      placeholder="Old Password"
                      name="password"
                      required
                      className="m-2 p-2 bg-gray-100 rounded-lg px-5 py-2 focus:border border-blue-600 focus:outline-none text-black placeholder:text-gray-600 placeholder:opacity-50 font-semibold md:w-72 lg:w-[340px]"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>

                  

                  <div className=" text-center sm:flex sm:gap-10 sm:h-11">
                    <input
                      type="password"
                      placeholder="Confirm Password"
                      name="password"
                      required
                      className="m-2 p-2 bg-gray-100 rounded-lg px-5 py-2 focus:border border-blue-600 focus:outline-none text-black placeholder:text-gray-600 placeholder:opacity-50 font-semibold md:w-72 lg:w-[340px]"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>
                </div>

                <div className="text-center mt-9 my-6">
                  <input
                    type="submit"
                    value="Update"
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
}

export default ResetPassword
