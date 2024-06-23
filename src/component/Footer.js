import React from "react";
import { FaLinkedinIn, FaFacebookF, FaPhoneAlt } from "react-icons/fa";
import { FaXTwitter, FaInstagram, FaEnvelope } from "react-icons/fa6";

const Footer = () => {
  return (
    <>
      <div className="bg-slate-200 w-full h-auto flex justify-center ">
        <div className="w-11/12">
          <div className="footerUpper flex justify-around flex-wrap py-5">
            <div className="w-72">
              <h2 className="text-orange-500 text-2xl font-medium">
                Social links
              </h2>
              <div className="flex justify-around mt-3 w-72">
                <div className="w-14 h-14 rounded-full bg-slate-100 items-center flex justify-center ease-in duration-500 hover:bg-orange-200 drop-shadow-md">
                  <FaLinkedinIn className="w-6 h-6 font-light" />
                </div>

                <div className="w-14 h-14 rounded-full bg-slate-100 items-center flex justify-center    ease-in duration-500 hover:bg-orange-200 drop-shadow-md">
                  <FaFacebookF className="w-6 h-6 font-light" />
                </div>

                <div className="w-14 h-14 rounded-full bg-slate-100 items-center flex justify-center    ease-in duration-500 hover:bg-orange-200 drop-shadow-md">
                  <FaXTwitter className="w-6 h-6 font-light" />
                </div>

                <div className="w-14 h-14 rounded-full bg-slate-100 items-center flex justify-center    ease-in duration-500 hover:bg-orange-200 drop-shadow-md">
                  <FaInstagram className="w-6 h-6 font-light" />
                </div>
              </div>

              <p className="mt-3">
                Stay connected with{" "}
                <a href="/">
                  <span className="text-orange-500 font-semibold text-xl">
                    One
                  </span>{" "}
                  <span className="font-semibold text-xl">Store</span>
                </a>{" "}
                for the latest updates, promotions, and product launches!
              </p>
            </div>

            <div className="w-72  mt-8 sm:mt-0">
              <h2 className="text-orange-500 text-2xl font-medium">
                Get in Touch
              </h2>
              <p className="mt-3">
                Phase 3B2, Sector 60, Sahibzada Ajit Singh Nagar, Punjab 160059
              </p>
              <p className="mt-2 text-slate-500">
                Got questions or need assistance? Don't hesitate to contact us
                via phone, email, or visit us at our physical location. Our team
                at One Store is here to assist you!
              </p>
            </div>

            <div className="w-72 mt-8 md:mt-0">
              <h2 className="text-orange-500 text-2xl font-medium">
                Contact Us
              </h2>
              <div className="flex mt-5">
                <div className="w-12 h-12 rounded-full bg-slate-100 items-center flex justify-center    ease-in duration-500 hover:bg-orange-200 drop-shadow-md">
                  <FaPhoneAlt className="w-6 h-6 font-light" />
                </div>

                <div className="ml-5">
                  <p>Phone No.</p>
                  <p>+91-955-555-2566</p>
                </div>
              </div>

              <div className="flex mt-5">
                <div className="w-12 h-12 rounded-full bg-slate-100 items-center flex justify-center ease-in duration-500   hover:bg-orange-200 drop-shadow-md">
                  <FaEnvelope className="w-6 h-6 font-light" />
                </div>

                <div className="ml-5">
                  <p>Email</p>
                  <p>onestore@gmail.com</p>
                </div>
              </div>
            </div>
          </div>

          <hr className="border-black" />
          <div className="flex justify-center text-center pt-4 pb-2">
            <p>@2024 One Store. All rights reserved.</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
