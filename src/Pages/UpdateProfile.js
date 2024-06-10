import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../component/Loader/Loader";
import {
  updateProfile,
  clearErrors,
  loadUser,
} from "../Redux/actions/UserActions";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { UPDATE_PROFILE_RESET } from "../Redux/Constants";
import MetaData from "../component/MetaData";

const UpdateProfile = () => {
  const alert = useAlert();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { error, isUpdated, loading } = useSelector((state) => state.profile);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("/Profile.jpg");

  const updateProfileSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("avatar", avatar);

    dispatch(updateProfile(myForm));
  };

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setAvatarPreview(user?.avatar?.url);
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("Profile Updated Successfully");
      dispatch(loadUser());

      navigate("/account")

      dispatch({
        type: UPDATE_PROFILE_RESET,
      });
    }
  }, [dispatch, error, alert, user, isUpdated, navigate]);
  
  const updateProfileDataChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  return (
   <>
    {loading? (<Loader />) : (
         <>
         <MetaData title="Update Profile" />
           <div className="flex flex-col  flex-wrap justify-center items-center md:flex-row w-full h-full">
             <div className=" w-[70%]">
               <h2 className="text-center p-4 border-black w-[50%] ml-[27%] text-3xl font-semibold opacity-85	">Update Profile</h2>
     
               <form onSubmit={updateProfileSubmit}>
                 <div className="flex flex-col justify-center items-center m-2 space-y-6 md:space-y-8">
                   <div className=" text-center sm:flex sm:gap-10">
                     <input
                       type="text"
                       placeholder="Name"
                       name="name"
                       required
                       value={name}
                       onChange={(e) => setName(e.target.value)}
                       className="m-2 p-2 bg-gray-100 rounded-lg px-5 py-2 focus:border border-blue-600 focus:outline-none text-black placeholder:text-gray-600 placeholder:opacity-50 font-semibold md:w-72 lg:w-[340px]"
                     />
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
     
                   <div className="flex-none justify-center text-center sm:flex sm:gap-10">
                    
                     <div className="flex w-60 ml-2  sm:flex sm:w-fit registerImage">
                       <img
                         src={avatarPreview}
                         alt="Avatar Preview"
                         className="w-12 h-12 rounded-full mr-3"
                       />
                       <input
                         type="file"
                         name="avatar"
                         accept="image/*"
                         className="h-9 mt-2 text-center bg-gray-100 rounded-lg  py-2 focus:border border-blue-600 focus:outline-none text-black placeholder:text-gray-600 placeholder:opacity-50 font-semibold md:w-72 lg:w-[295px]"
                         onChange={updateProfileDataChange}
                       />
                     </div>
                   </div>
                 </div>
     
                 <div className="text-center mt-9 my-6">
                   <input
                     type="submit"
                     value="Update"
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

export default UpdateProfile;

