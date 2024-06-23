import React, {useState} from 'react';
// import "./Shipping.css";
import { useSelector, useDispatch } from 'react-redux';
import { saveShippingInfo } from '../Redux/actions/cartAction';
import MetaData from '../component/MetaData';
import PinDropIcon from "@mui/icons-material/PinDrop";
import HomeIcon from "@mui/icons-material/Home";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import PublicIcon from "@mui/icons-material/Public";
import PhoneIcon from "@mui/icons-material/Phone";
import TransferWithinAStationIcon from "@mui/icons-material/TransferWithinAStation";
import { Country, State } from "country-state-city";
import { useNavigate } from 'react-router-dom';
import { useAlert } from 'react-alert';
import CheckoutSteps from "./CheckoutSteps.js"

const Shipping = () => {

    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();

    const { shippingInfo } = useSelector((state) => state.cart);

    const [address, setAddress] = useState(shippingInfo.address);
    const [city, setCity] = useState(shippingInfo.city);
    const [state, setState] = useState(shippingInfo.state);
    const [country, setCountry] = useState(shippingInfo.country);
    const [pinCode, setPinCode] = useState(shippingInfo.pincode);
    const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);

    const shippingSubmit = (e) => {
      e.preventDefault();

      if(phoneNo.length < 10 || phoneNo.length > 10){
        alert.error("Phone number should be 10 digit")
        return;
      }
      dispatch(
        saveShippingInfo({address, city, state, country, pinCode, phoneNo})
      );
      navigate("/order/confirm");
    }


  return (
    <>
    <MetaData title="Shipping Details" />

   <div className='my-10'>
   <CheckoutSteps activeStep={0} />
   </div>

        <div className='shippingContainer min-h-screen'>
            <div className='shippingBox'>
            <div className='flex justify-around w-full mb-3'>
            <h2 className="font-semibold text-center w-[50%] text-xl md:text-3xl text-gray-600 mb-4">
                    Shipping Details
                  </h2>
            </div>

                <form onSubmit={shippingSubmit}>
                  <div className="flex flex-col justify-center items-center space-y-3  md:space-y-3">
                    <div className=" text-center sm:flex sm:gap-6 sm:h-11 ">
                        <HomeIcon />
                      <input
                        type="text"
                        placeholder="Address"
                        required
                        value={address}
                        onChange={(e)=> setAddress(e.target.value)}
                        className=" h-11 w-[230px] bg-gray-100 rounded-lg px-5 focus:border border-blue-600 focus:outline-none text-black placeholder:text-gray-600 placeholder:opacity-50 font-semibold md:w-72 lg:w-[340px]"
                      />
                    </div>

                    <div className=" text-center sm:flex sm:gap-6 sm:h-11">
                    <LocationCityIcon />
                      <input
                        type="text"
                        placeholder="City"
                        required
                        value={city}
                        onChange={(e)=> setCity(e.target.value)}
                        className="h-11 w-[230px] bg-gray-100 rounded-lg px-5 focus:border border-blue-600 focus:outline-none text-black placeholder:text-gray-600 placeholder:opacity-50 font-semibold md:w-72 lg:w-[340px]"
                      />
                    </div>

                    <div className=" text-center sm:flex sm:gap-6 sm:h-11">
                    <PinDropIcon />
                      <input
                        type="number"
                        placeholder="Pin Code"
                        required
                        value={pinCode}
                        onChange={(e)=> setPinCode(e.target.value)}
                        className="h-11 w-[230px] bg-gray-100 rounded-lg px-5  focus:border border-blue-600 focus:outline-none text-black placeholder:text-gray-600 placeholder:opacity-50 font-semibold md:w-72 lg:w-[340px]"
                      />
                    </div>

                    <div className=" text-center sm:flex sm:gap-6 sm:h-11">
                    <PhoneIcon />
                      <input
                        type="number"
                        placeholder="Phone Number"
                        required
                        value={phoneNo}
                        onChange={(e)=> setPhoneNo(e.target.value)}
                        className=" h-11 w-[230px] bg-gray-100 rounded-lg px-5 focus:border border-blue-600 focus:outline-none text-black placeholder:text-gray-600 placeholder:opacity-50 font-semibold  md:w-72 lg:w-[340px]"
                      />
                    </div>

                    <div className=" text-center sm:flex sm:gap-6 sm:h-11">
                        <PublicIcon />
                      <select
                        required
                        value={country}
                        onChange={(e)=> setCountry(e.target.value)}
                        className="  h-11 w-[230px] bg-gray-100 rounded-lg px-5  focus:border border-blue-600 focus:outline-none text-black placeholder:text-gray-300 placeholder:opacity-50 font-semibold md:w-72 lg:w-[340px]"
                      >

                        <option value="">Options</option>
                        {Country && 
                        Country.getAllCountries().map(( item)=>(
                            <option key={item.isoCode} value={item.isoCode}>
                                {item.name}
                            </option>
                        ))}

                      </select>
                    </div>

                    {country && (
                        <div className=" text-center sm:flex sm:gap-6 sm:h-11">
                            <TransferWithinAStationIcon />
                        <select
                          required
                          value={state}
                          onChange={(e)=> setState(e.target.value)}
                          className=" h-11 w-[230px]  bg-gray-100 rounded-lg px-5  focus:border border-blue-600 focus:outline-none text-black placeholder:text-gray-600 placeholder:opacity-50 font-semibold md:w-72 lg:w-[340px]"
                        >
  
                          <option value="">State</option>
                          {State && 
                          State.getStatesOfCountry(country).map(( item)=>(
                              <option key={item.isoCode} value={item.isoCode}>
                                  {item.name}
                              </option>
                          ))}
  
                        </select>
                      </div>
                    )}
      
      
                   
                  </div>
      
                  <div className="text-center py-9">
                    <input
                      type="submit"
                      value="Continue"
                      disabled={state? false: true}

                      className="w-[300px] md:w-[388px] py-3 rounded-md text-white bg-[tomato] font-medium cursor-pointer"
                    />
                    
                  </div>
                </form>



            </div>
        </div>
    </>
  )
}

export default Shipping
