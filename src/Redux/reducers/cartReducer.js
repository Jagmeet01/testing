import {
  ADD_TO_CART,
  REMOVE_CART_ITEM,
  SAVE_SHIPPING_INFO,
  EMPTY_CART_DATA,
} from "../Constants";

export const cartReducer = (
  state = { cartItems: [], shippingInfo: {} },
  action
) => {
  switch (action.type) {
    case ADD_TO_CART:
      const item = action.payload;

      const isCartExist = state.cartItems.find(
        (i) => i.product === item.product
      );

      if (isCartExist) {
        return {
          ...state,
          cartItems: state.cartItems.map((i) =>
            i.product === isCartExist.product ? item : i
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }

    case REMOVE_CART_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter((i) => i.product !== action.payload),
      };

    case EMPTY_CART_DATA:
      return {
        ...state,
        cartItems: [],
        shippingInfo: {},
      };
      
    case SAVE_SHIPPING_INFO:
      return {
        ...state,
        shippingInfo: action.payload,
      };

    default:
      return state;
  }
};
