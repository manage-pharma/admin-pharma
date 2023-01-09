import {
  PRODUCT_ALL_FAIL,
  PRODUCT_ALL_REQUEST,
  PRODUCT_ALL_SUCCESS,
  PRODUCT_CATEGORY_FAIL,
  PRODUCT_CATEGORY_REQUEST,
  PRODUCT_CATEGORY_SUCCESS,
  PRODUCT_CREATE_FAIL,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_IMPORT_FAIL,
  PRODUCT_IMPORT_REQUEST,
  PRODUCT_IMPORT_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_SINGLE_FAIL,
  PRODUCT_SINGLE_REQUEST,
  PRODUCT_SINGLE_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
} from '../Constants/ProductConstants';
import { logout } from './UserActions';
import axios from 'axios';

// ADMIN PRODUCT LIST
export const listProduct = ( keyword = " ", pageNumber = " ", sort= " ") => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/products/all?keyword=${keyword}&pageNumber=${pageNumber}&sort=${sort}`, config)
    // const { data } = await axios.get(`/api/products/all`, config);
    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: PRODUCT_LIST_FAIL,
      payload: message,
    });
  }
};

// ADMIN PRODUCT LIST
export const allProduct = () => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_ALL_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/products/allproduct`, config)
    dispatch({ type: PRODUCT_ALL_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: PRODUCT_ALL_FAIL,
      payload: message,
    });
  }
};


// ADMIN PRODUCT DELETE
export const deleteProduct = (id) => async(dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_DELETE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`/api/products/${id}`, config);
    dispatch({ type: PRODUCT_DELETE_SUCCESS });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: PRODUCT_DELETE_FAIL,
      payload: message,
    });
  }
};

//ADMIN PRODUCT CREATE
export const createProduct = ({ name, category, price, description, image, countInStock }) => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_CREATE_REQUEST });
    // userInfo -> userLogin -> getState(){globalState}
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(`/api/products/`,
      {
        name, category, price, description, image, countInStock
      }
      , config);
    dispatch({ type: PRODUCT_CREATE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
      dispatch({
        type: PRODUCT_CREATE_FAIL,
        payload: message,
      });
  }
};
//ADMIN PRODUCT CATEGORY
export const categoriesProduct = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_CATEGORY_REQUEST });
    // userInfo -> userLogin -> getState(){globalState}
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(`/api/products/${id}/categories`, config);
    dispatch({ type: PRODUCT_CATEGORY_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: PRODUCT_CATEGORY_FAIL,
      payload: message,
    });
  }
};



//ADMIN PRODUCT SINGLE
export const singleProduct = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_SINGLE_REQUEST });
    // userInfo -> userLogin -> getState(){globalState}
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/products/${id}`, config);
    dispatch({ type: PRODUCT_SINGLE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: PRODUCT_SINGLE_FAIL,
      payload: message,
    });
  }
};

// ADMIN UPDATE PRODUCT

export const updateProduct = ({ name, price, description, image, countInStock, productId }) => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_UPDATE_REQUEST });
    // userInfo -> userLogin -> getState(){globalState}
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(`/api/products/${productId}`,
      {
        name, price, description, image, countInStock
      }
      , config);
    dispatch({ type: PRODUCT_UPDATE_SUCCESS, payload: data });
    dispatch({ type: PRODUCT_SINGLE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: PRODUCT_UPDATE_FAIL,
      payload: message,
    });
  }
};

//ADMIN PRODUCT IMPORT
export const importProduct = (dataImport) => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_IMPORT_REQUEST });
    // userInfo -> userLogin -> getState(){globalState}
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.post(`/api/import/products`, dataImport, config);
    dispatch({ type: PRODUCT_IMPORT_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
      dispatch({
        type: PRODUCT_IMPORT_FAIL,
        payload: message,
      });
  }
};