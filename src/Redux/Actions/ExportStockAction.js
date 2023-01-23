import { EXPORT_STOCK_CREATE_FAIL, EXPORT_STOCK_CREATE_REQUEST, EXPORT_STOCK_CREATE_SUCCESS, EXPORT_STOCK_DETAILS_FAIL, EXPORT_STOCK_DETAILS_REQUEST, EXPORT_STOCK_DETAILS_SUCCESS, EXPORT_STOCK_LIST_FAIL, EXPORT_STOCK_LIST_REQUEST, EXPORT_STOCK_LIST_SUCCESS, EXPORT_STOCK_STATUS_FAIL, EXPORT_STOCK_STATUS_REQUEST, EXPORT_STOCK_STATUS_SUCCESS, EXPORT_STOCK_UPDATE_FAIL, EXPORT_STOCK_UPDATE_REQUEST, EXPORT_STOCK_UPDATE_SUCCESS } from '../Constants/ExportStockConstant';
import axios from 'axios';
import { logout } from "./UserActions";

export const listExportStock = ( keyword = " ", pageNumber = " ", from=' ', to = ' ') => async(dispatch, getState) =>{
  try {
      dispatch({type: EXPORT_STOCK_LIST_REQUEST});
      const { userLogin: {userInfo}} = getState();
      const config = {
          headers: {
              Authorization: `Bearer ${userInfo.token}`
          }
      } 
      const {data} = await axios.get(`/api/export-stock/?keyword=${keyword}&pageNumber=${pageNumber}&from=${from}&to=${to}`, config)
      dispatch({type: EXPORT_STOCK_LIST_SUCCESS, payload: data})

  } catch (error) {
      const message = error.response && error.response.data.message 
          ? error.response.data.message
          : error.message
      if(message === "Not authorized, token failed"){
          dispatch(logout());
      }
      dispatch({type: EXPORT_STOCK_LIST_FAIL, payload: message});
  }
}

//ADMIN EXPORT STOCK SINGLE
export const singleExportStock = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: EXPORT_STOCK_DETAILS_REQUEST });
    // userInfo -> userLogin -> getState(){globalState}
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(`/api/export-stock/${id}`, config);
    dispatch({ type: EXPORT_STOCK_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: EXPORT_STOCK_DETAILS_FAIL,
      payload: message,
    });
  }
};

//ADMIN EXPORT CREATE
export const createExportStock = ({ customer, phone, address, note, user, exportItems, totalPrice, exportedAt }) => async (dispatch, getState) => {
    try {
      dispatch({ type: EXPORT_STOCK_CREATE_REQUEST });
      // userInfo -> userLogin -> getState(){globalState}
      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.post(`/api/export-stock/`,
        {
          customer, phone, address, note, user, exportItems, totalPrice, exportedAt
        }

        , config);
      dispatch({ type: EXPORT_STOCK_CREATE_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        dispatch(logout());
      }
        dispatch({
          type: EXPORT_STOCK_CREATE_FAIL,
          payload: message,
        });
    }
  };

  //ADMIN EXPORT STATUS
export const statusExportStock = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: EXPORT_STOCK_STATUS_REQUEST });
    // userInfo -> userLogin -> getState(){globalState}
    const { userLogin: {userInfo}} = getState();
    const config = {
        headers: {
            Authorization: `Bearer ${userInfo.token}`
        }
    }
    const { data } = await axios.put(`/api/export-stock/${id}/status`,{}, config);
    dispatch({ type: EXPORT_STOCK_STATUS_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
      dispatch({
        type: EXPORT_STOCK_STATUS_FAIL,
        payload: message,
      });
  }
};

  //ADMIN UPDATE EXPORT
  export const updateExportStock = ({ customer, phone, address, note,  user, exportItems, totalPrice, exportedAt, exportId }) => async (dispatch, getState) => {
    try {
      dispatch({ type: EXPORT_STOCK_UPDATE_REQUEST });
      // userInfo -> userLogin -> getState(){globalState}
      const { userLogin: {userInfo}} = getState();
      const config = {
          headers: {
              Authorization: `Bearer ${userInfo.token}`
          }
      }
      const { data } = await axios.put(`/api/export-stock/${exportId}`,
      { customer, phone, address, note, user, exportItems, totalPrice, exportedAt, },
      config);
      dispatch({ type: EXPORT_STOCK_UPDATE_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        dispatch(logout());
      }
        dispatch({
          type: EXPORT_STOCK_UPDATE_FAIL,
          payload: message,
        });
    }
  };
