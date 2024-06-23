import {
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAIL,
  MY_ORDER_REQUEST,
  MY_ORDER_SUCCESS,
  MY_ORDER_FAIL,
  ALL_ORDER_REQUEST,
  ALL_ORDER_SUCCESS,
  ALL_ORDER_FAIL,
  UPDATE_ORDER_REQUEST,
  UPDATE_ORDER_SUCCESS,
  UPDATE_ORDER_FAIL,
  DELETE_ORDER_REQUEST,
  DELETE_ORDER_SUCCESS,
  DELETE_ORDER_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  CLEAR_ERRORS,
} from "../Constants";

import axios from "axios";
const url = process.env.REACT_APP_BACKEND_URL;
// create Order
export const createOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({ type: CREATE_ORDER_REQUEST });

   


    const token =localStorage.getItem('token')
    const config = {
      headers: {
        "Contant-Type": "application/json",
        'Authorization': `Bearer ${token}`
      }
    };
    const { data } = await axios.post(`${url}api/v1/order/new`, order, config);

   
    dispatch({ type: CREATE_ORDER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CREATE_ORDER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// My Orders
export const myOrders = () => async (dispatch) => {
  try {
    dispatch({ type: MY_ORDER_REQUEST });

    const { data } = await axios.get(`${url}api/v1/orders/me`);

    dispatch({ type: MY_ORDER_SUCCESS, payload: data.orders });
  } catch (error) {
    dispatch({
      type: MY_ORDER_FAIL,
      payload: error.response.data.message,
    });
  }
};


// Get All Orders (-- Admin)
export const getAllOrders = () => async (dispatch) => {
    try {
      dispatch({ type: ALL_ORDER_REQUEST });
      const token =localStorage.getItem('token')
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      };
      const { data } = await axios.get(`${url}api/v1/admin/orders`,config);
  
      dispatch({ type: ALL_ORDER_SUCCESS, payload: data.orders });
    } catch (error) {
      dispatch({
        type: ALL_ORDER_FAIL,
        payload: error.response.data.message,
      });
    }
  };

  // Update Order --Admin
export const updateOrder = (id, order) => async (dispatch, getState) => {
    try {
      dispatch({ type: UPDATE_ORDER_REQUEST });
  
     

      const token =localStorage.getItem('token')
    const config = {
      headers: {
        "Contant-Type": "application/json",
        'Authorization': `Bearer ${token}`
      }
    };
      const { data } = await axios.put(`${url}api/v1/admin/order/${id}`, order, config);
  
      dispatch({ type: UPDATE_ORDER_SUCCESS, payload: data.success });
    } catch (error) {
      dispatch({
        type: UPDATE_ORDER_FAIL,
        payload: error.response.data.message,
      });
    }
  };


    // Delete Order --Admin
export const deleteOrder = (id) => async (dispatch, getState) => {
    try {
      dispatch({ type: DELETE_ORDER_REQUEST });
  

      const token =localStorage.getItem('token')
    const config = {
      headers: {
       
        'Authorization': `Bearer ${token}`
      }
    };

      const { data } = await axios.delete(`${url}api/v1/admin/order/${id}`, config);
  
      dispatch({ type: DELETE_ORDER_SUCCESS, payload: data.success });
    } catch (error) {
      dispatch({
        type: DELETE_ORDER_FAIL,
        payload: error.response.data.message,
      });
    }
  };





// get Order Details
export const getOrderDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: ORDER_DETAILS_REQUEST });

    const token =localStorage.getItem('token')
    const config = {
      headers: {
        
        'Authorization': `Bearer ${token}`
      }
    };

    const { data } = await axios.get(`${url}api/v1/order/${id}`, config);

    dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data.order });
  } catch (error) {
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

//   Clearing errors
export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
