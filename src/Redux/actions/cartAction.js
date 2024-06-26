import {
  ADD_TO_CART,
  REMOVE_CART_ITEM,
  SAVE_SHIPPING_INFO,
  EMPTY_CART_DATA,
} from "../Constants";
import axios from "axios";
const url = process.env.REACT_APP_BACKEND_URL;

// Add to Cart
export const addItemsToCart = (id, quantity) => async (dispatch, getState) => {
  const { data } = await axios.get(`${url}api/v1/product/${id}`);
  dispatch({
    type: ADD_TO_CART,
    payload: {
      product: data?.product._id,
      name: data?.product.name,
      price: data?.product.price,
      image: data?.product.images[0]?.url,
      stock: data?.product.Stock,
      quantity,
    },
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

// REMOVE FROM CART

export const removeItemsFromCart = (id) => async (dispatch, getState) => {
  dispatch({
    type: REMOVE_CART_ITEM,
    payload: id,
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

// Empty Cart

export const EmptyCart = () => {
  localStorage.removeItem("cartItems");
  return {
    type: EMPTY_CART_DATA,
  };
};

// SAVE SHIPPING INFO

export const saveShippingInfo = (data) => async (dispatch) => {
  dispatch({
    type: SAVE_SHIPPING_INFO,
    payload: data,
  });

  localStorage.setItem("shippingInfo", JSON.stringify(data));
};
