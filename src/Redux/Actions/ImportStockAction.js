import { IMPORT_STOCK_CREATE_FAIL, IMPORT_STOCK_CREATE_REQUEST, IMPORT_STOCK_CREATE_SUCCESS, IMPORT_STOCK_DETAILS_FAIL, IMPORT_STOCK_DETAILS_REQUEST, IMPORT_STOCK_DETAILS_SUCCESS, IMPORT_STOCK_LIST_FAIL, IMPORT_STOCK_LIST_REQUEST, IMPORT_STOCK_LIST_SUCCESS, IMPORT_STOCK_STATUS_FAIL, IMPORT_STOCK_STATUS_REQUEST, IMPORT_STOCK_STATUS_SUCCESS } from './../Constants/ImportStockConstant';
import axios from 'axios';
import { logout } from "./UserActions";

export const listImportStock = () => async(dispatch, getState) =>{
  try {
      dispatch({type: IMPORT_STOCK_LIST_REQUEST});
      const { userLogin: {userInfo}} = getState();
      const config = {
          headers: {
              Authorization: `Bearer ${userInfo.token}`
          }
      }
      const {data} = await axios.get(`/api/import-stock/`, config)
      dispatch({type: IMPORT_STOCK_LIST_SUCCESS, payload: data})
  } catch (error) {
      const message = error.response && error.response.data.message 
          ? error.response.data.message
          : error.message
      if(message === "Not authorized, token failed"){
          dispatch(logout());
      }
      dispatch({type: IMPORT_STOCK_LIST_FAIL, payload: message});
  }
}

//ADMIN PRODUCT SINGLE
export const singleProvider = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: IMPORT_STOCK_DETAILS_REQUEST });
    // userInfo -> userLogin -> getState(){globalState}
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(`/api/import-stock/${id}`, config);
    dispatch({ type: IMPORT_STOCK_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: IMPORT_STOCK_DETAILS_FAIL,
      payload: message,
    });
  }
};

//ADMIN IMPORT CREATE
export const createImportStock = ({ provider, user, importItems, status, totalPrice, importedAt }) => async (dispatch, getState) => {
    try {
      dispatch({ type: IMPORT_STOCK_CREATE_REQUEST });
      // userInfo -> userLogin -> getState(){globalState}
      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.post(`/api/import-stock/`,
        {
          provider, user, importItems, status, totalPrice, importedAt
        }

        , config);
      dispatch({ type: IMPORT_STOCK_CREATE_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        dispatch(logout());
      }
        dispatch({
          type: IMPORT_STOCK_CREATE_FAIL,
          payload: message,
        });
    }
  };

  //ADMIN IMPORT STATUS
export const statusImportStock = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: IMPORT_STOCK_STATUS_REQUEST });
    // userInfo -> userLogin -> getState(){globalState}
    const { userLogin: {userInfo}} = getState();
    const config = {
        headers: {
            Authorization: `Bearer ${userInfo.token}`
        }
    }
    const { data } = await axios.put(`/api/import-stock/${id}`,{}, config);
    dispatch({ type: IMPORT_STOCK_STATUS_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
      dispatch({
        type: IMPORT_STOCK_STATUS_FAIL,
        payload: message,
      });
  }
};