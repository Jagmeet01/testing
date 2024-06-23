import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../component/Loader/Loader";
import { updatePassword, clearErrors } from "../Redux/actions/UserActions";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { UPDATE_PASSWORD_RESET } from "../Redux/Constants";
import MetaData from "../component/MetaData";

const UpdatePassword = () => {
  const alert = useAlert();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { error, isUpdated, loading } = useSelector((state) => state.profile);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const updatePasswordSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("oldPassword", oldPassword);
    myForm.set("newPassword", newPassword);
    myForm.set("confirmPassword", confirmPassword);

    dispatch(updatePassword(myForm));
  };

  useEffect(() => {
    if (error) {
        alert.error(error);
        dispatch(clearErrors());
      }

    if (isUpdated) {
      alert.success("Profile Updated Successfully");
      

      navigate("/account");

      dispatch({
        type: UPDATE_PASSWORD_RESET,
      });
    }
  }, [dispatch, error, alert, isUpdated, navigate]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="Change Password" />
          <div className="flex flex-col  flex-wrap justify-center items-center md:flex-row w-full h-full">
            <div className=" w-[70%]">
              <h2 className="text-center text-slate-600 p-4 w-auto text-3xl font-semibold md:w-[50%] md:ml-[24%]	">
                Change Password
              </h2>

              <form onSubmit={updatePasswordSubmit}>
                <div className="flex flex-col justify-center items-center m-2 space-y-6 md:space-y-4">
                  <div className=" text-center sm:flex sm:gap-10">
                    <input
                      type="password"
                      placeholder="Old Password"
                      name="password"
                      required
                      className="m-2 p-2 bg-gray-100 rounded-lg px-5 py-2 focus:border border-blue-600 focus:outline-none text-black placeholder:text-gray-600 placeholder:opacity-50 font-semibold md:w-72 lg:w-[340px]"
                      value={oldPassword}
                      onChange={(e) => setOldPassword(e.target.value)}
                    />
                  </div>

                  <div className=" text-center sm:flex sm:gap-10">
                    <input
                      type="password"
                      placeholder=" New Password"
                      name="password"
                      required
                      className="m-2 p-2 bg-gray-100 rounded-lg px-5 py-2 focus:border border-blue-600 focus:outline-none text-black placeholder:text-gray-600 placeholder:opacity-50 font-semibold md:w-72 lg:w-[340px]"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                  </div>

                  <div className=" text-center sm:flex sm:gap-10">
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
                    value="Change"
                    className=" px-24 md:px-[118px] lg:px-[140px] py-2 rounded-md text-white bg-[tomato] font-medium mt-0 m-2 "
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

export default UpdatePassword;
