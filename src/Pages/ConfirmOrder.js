import React from "react";
import CheckoutSteps from "./CheckoutSteps";
import { useSelector } from "react-redux";
import MetaData from "../component/MetaData";
import { Link, useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";
import "./ConfirmOrder.css";

const ConfirmOrder = () => {
  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const shippingInfo = JSON.parse(localStorage.getItem("shippingInfo"));
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  const shippingCharges = subtotal > 1000 ? 0 : 200;

  const tax = subtotal * 0.18;

  const totalprice = subtotal + tax + shippingCharges;


    // Round the values to 0 decimal places
  const roundedSubtotal = Math.round(subtotal);
  const roundedShippingCharges = Math.round(shippingCharges);
  const roundedTax = Math.round(tax);
  const roundedTotalPrice = Math.round(roundedSubtotal + roundedTax + roundedShippingCharges);


  const address = `${shippingInfo?.address}, ${shippingInfo?.city}, ${shippingInfo?.state}, ${shippingInfo?.pinCode}, ${shippingInfo?.country},  `;

  const proceedToPayment = () => {
    const data = {
      subtotal: roundedSubtotal,
      shippingCharges: roundedShippingCharges,
      tax: roundedTax,
      totalprice: roundedTotalPrice,
    };

    sessionStorage.setItem("orderInfo", JSON.stringify(data));

    navigate("/process/payment");
  };

  return (
    <>
      <MetaData title="Confirm Order" />

      <div className="my-10">
        <CheckoutSteps activeStep={1} />
      </div>
      <div className="confirmOrderPage">
        <div>
          <div className="confirmshippingArea">
            <Typography>Shipping Info</Typography>
            <div className="confirmshippingAreaBox">
              <div>
                <p>Name:</p>
                <span>{user?.name}</span>
              </div>
              <div>
                <p>Phone:</p>
                <span>{shippingInfo?.phoneNo}</span>
              </div>
              <div>
                <p>Address:</p>
                <span>{address}</span>
              </div>
            </div>
          </div>

          <div className="confirmcartItems marginRR">
            <Typography>Your Cart Items:</Typography>
            <div className="confirmCartItemsContainer">
              {cartItems &&
                cartItems.map((item) => (
                  <div key={item.product}>
                    <img src={item.image} alt="Product" />
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                    <span>
                      {item.quantity} X ₹{item.price} ={" "}
                      <b>₹{item.price * item.quantity}</b>
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>
        {/*  */}
        <div>
          <div className="orderSummary">
            <Typography>Order Summary</Typography>
            <div>
              <div>
                <p>Subtotal:</p>
                <span>₹{roundedSubtotal}</span>
              </div>
              <div>
                <p>Shipping Charges:</p>
                <span>₹{roundedShippingCharges}</span>
              </div>
              <div>
                <p>GST:</p>
                <span>₹{roundedTax}</span>
              </div>
            </div>

            <div className="orderSummaryTotal">
              <p>
                <b>Total:</b>
              </p>
              <span>₹{roundedTotalPrice}</span>
            </div>

            <button onClick={proceedToPayment}>Proceed To Payment</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmOrder;
