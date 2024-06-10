import React, { useState, useEffect } from "react";
import MetaData from "../component/MetaData";
import CheckoutSteps from "./CheckoutSteps";
import "./PaymentSample.css";
import { useAlert } from "react-alert";
import { EmptyCart } from "../Redux/actions/cartAction";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createOrder } from "../Redux/actions/orderAction";

const PaymentSample = () => {
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
  const { order } = useSelector((state) => state.newOrder);
  const { cartItems } = useSelector((state) => state.cart);
  const shippingInfo = JSON.parse(localStorage.getItem("shippingInfo"));
  const alert = useAlert();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
  });

  useEffect(() => {
    if (order?.success) {
      alert.success("Order placed successfully");
      dispatch(EmptyCart());
      setTimeout(() => {
        navigate("/");
      }, [1000]);
    }
  }, [order, dispatch, alert, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const paymentData = {
    amount: Math.round(orderInfo.totalprice),
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const order = {
      shippingInfo,
      orderItems: cartItems,
      itemPrice: orderInfo.subtotal,
      taxPrice: orderInfo.tax,
      shippingPrice: orderInfo.shippingCharges,
      totalPrice: orderInfo.totalprice,
    };

    try {
      dispatch(createOrder(order));
    } catch (error) {
      alert.error(error.response.data.message);
    }
  };

  return (
    <>
      <MetaData title="Payment" />
      <div className="my-10">
        <CheckoutSteps activeStep={2} />
      </div>

      <div className="payment-container">
        <h1>Payment Information</h1>
        <form className="payment-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="cardNumber">Card Number</label>
            <input
              type="text"
              id="cardNumber"
              name="cardNumber"
              maxLength="16"
              minLength="16"
              value={formData.cardNumber}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="cardName">Cardholder Name</label>
            <input
              type="text"
              id="cardName"
              name="cardName"
              maxLength="30"
              value={formData.cardName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="expiryDate">Expiry Date</label>
            <input
              type="text"
              id="expiryDate"
              name="expiryDate"
              value={formData.expiryDate}
              onChange={handleChange}
              placeholder="MM/YY"
              maxLength="4"
              minLength="4"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="cvv">CVV</label>
            <input
              type="text"
              id="cvv"
              name="cvv"
              value={formData.cvv}
              onChange={handleChange}
              maxLength="4"
              minLength="3"
              required
            />
          </div>
          <button type="submit" className="submit-button">{`pay- ₹${
            orderInfo && orderInfo.totalprice
          }`}</button>
        </form>
      </div>
    </>
  );
};

export default PaymentSample;
