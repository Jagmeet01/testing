import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaFacebookF } from "react-icons/fa";
import { FaXTwitter, FaGooglePlusG } from "react-icons/fa6";
import { register, clearErrors } from "../Redux/actions/UserActions";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../component/Loader/Loader";
import { useAlert } from "react-alert";

const SignUp = () => {
  const alert = useAlert();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = user;
  const [avatar, setAvatar] = useState();
  const [avatarPreview, setAvatarPreview] = useState("/Profile.jpg");

  const registerSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("password", password);
    myForm.set("avatar", avatar);

    dispatch(register(myForm));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isAuthenticated === true) {
      navigate("/account");
    }
  }, [dispatch, error, alert, isAuthenticated, navigate]);

  const registerDataChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="h-max">
          <div className="flex flex-col-reverse md:flex-col-reverse  flex-wrap justify-center items-center lg:flex-row w-full h-full">
            <div className=" w-[70%]">
              <div className="text-xl cursor-pointer flex flex-col justify-center items-center mt-5 md:mt-0 py-4">
                <h1 className="font-semibold text-xl md:text-5xl text-gray-600 m-1">
                  Signup to your account
                </h1>
                <h1 className="text-sm font-medium text-gray-600 m-2">
                  Signup using Social accounts
                </h1>
                <div className="text-lg lg:text-xl text-center space-x-5 m-2 flex">
                  <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-full flex justify-center items-center ease-in duration-500 bg-cyan-100 shadow hover:shadow-lg">
                    <a href="text">
                      <FaFacebookF className="w-4 h-4 sm:w-6 sm:6" />
                    </a>
                  </div>
                  <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-full flex justify-center items-center  bg-cyan-100 shadow hover:shadow-lg">
                    <a href="text">
                      <FaXTwitter className="w-4 h-4 sm:w-6 sm:6" />
                    </a>
                  </div>
                  <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-full flex justify-center items-center  bg-cyan-100 shadow hover:shadow-lg">
                    <a href="text">
                      <FaGooglePlusG className="w-4 h-4 sm:w-6 sm:6" />
                    </a>
                  </div>
                </div>
                <h1 className="text-sm font-medium text-gray-600 m-2">OR</h1>
              </div>

              <form onSubmit={registerSubmit}>
                <div className="flex flex-col justify-center items-center m-2 space-y-6 md:space-y-8">
                  <div className=" text-center sm:flex sm:gap-10 sm:h-11">
                    <input
                      type="text"
                      placeholder="Name"
                      name="name"
                      required
                      value={name}
                      onChange={registerDataChange}
                      className="m-2 p-2 bg-gray-100 rounded-lg px-5 py-2 focus:border border-blue-600 focus:outline-none text-black placeholder:text-gray-600 placeholder:opacity-50 font-semibold md:w-72 lg:w-[340px]"
                    />
                    <input
                      type="text"
                      placeholder="Email"
                      name="email"
                      required
                      value={email}
                      onChange={registerDataChange}
                      className="m-2 p-2 bg-gray-100 rounded-lg px-5 py-2 focus:border border-blue-600 focus:outline-none text-black placeholder:text-gray-600 placeholder:opacity-50 font-semibold md:w-72 lg:w-[340px]"
                    />
                  </div>

                  <div className="flex-none justify-center text-center sm:flex sm:gap-10 sm:h-11">
                    <input
                      type="password"
                      placeholder="Password"
                      name="password"
                      required
                      className="m-2 p-2 bg-gray-100 rounded-lg px-5 py-2 focus:border border-blue-600 focus:outline-none text-black placeholder:text-gray-600 placeholder:opacity-50 font-semibold md:w-72 lg:w-[340px]"
                      value={password}
                      onChange={registerDataChange}
                    />
                    <div className="flex w-60 ml-2  sm:flex sm:w-fit registerImage">
                      <img
                        src={avatarPreview}
                        alt="Avatar Preview"
                        className="w-12 h-12 rounded-full"
                      />
                      <input
                        type="file"
                        name="avatar"
                        accept="image/*"
                        className="h-9 mt-2 text-center bg-gray-100 rounded-lg  py-2 focus:border border-blue-600 focus:outline-none text-black placeholder:text-gray-600 placeholder:opacity-50 font-semibold md:w-72 lg:w-[295px]"
                        onChange={registerDataChange}
                      />
                    </div>
                  </div>
                </div>

                <div className="text-center mt-9 my-6">
                  <input
                    type="submit"
                    value="Register"
                    className=" px-24 md:px-[118px] lg:px-[140px] py-2 rounded-md text-white bg-gradient-to-l from-blue-400 to-emerald-400  font-medium mt-0 m-2 "
                  />
                </div>
              </form>
            </div>

            <div className="h-[50vh] md:h-[50vh] lg:w-[30%] lg:h-[100vh] bg-gradient-to-l from-blue-400 to-emerald-400  items-center flex justify-center md:w-[80%] sm:w-[80%]">
              <div className="text-white text-base font-semibold text-center my-10 space-y-2 m-2">
                <h1 className="text-5xl">Already have account</h1>
                <h1 className="">Log In and discover new oppurtinities here</h1>
                <div className="mt-4">
                  <Link
                    to="/login"
                    className="bg-white rounded-2xl px-4 text-emerald-400 py-1"
                  >
                    Log In
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SignUp;
