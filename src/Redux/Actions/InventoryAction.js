import axios from 'axios';
import { logout } from "./UserActions";
import { INVENTORY_LIST_REQUEST, INVENTORY_LIST_RESET, INVENTORY_LIST_SUCCESS, INVENTORY_DETAILS_REQUEST, INVENTORY_DETAILS_SUCCESS, INVENTORY_DETAILS_FAIL, INVENTORY_DETAILS_RESET, INVENTORY_LIST_FAIL } from './../Constants/InventoryConstants';

export const listInventory= ( keyword = "", from=' ', to = ' ' ) => async (dispatch, getState) => {
  try {
    dispatch({ type: INVENTORY_LIST_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/inventory/?keyword=${keyword}&from=${from}&to=${to}`, config)
    dispatch({ type: INVENTORY_LIST_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: INVENTORY_LIST_FAIL,
      payload: message,
    });
    setTimeout(() => {
      dispatch({ type: INVENTORY_LIST_RESET });
    }, 3000);
  }
};

//ADMIN PRODUCT SINGLE
export const singleInventory= (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: INVENTORY_DETAILS_REQUEST });
    // userInfo -> userLogin -> getState(){globalState}
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(`/api/inventory/${id}`, config);
    dispatch({ type: INVENTORY_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: INVENTORY_DETAILS_FAIL,
      payload: message,
    });
    setTimeout(() => {
      dispatch({ type: INVENTORY_DETAILS_RESET });
    }, 3000);
  }
};

