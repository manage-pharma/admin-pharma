import axios from 'axios';
import { CATEGORY_LIST_REQUEST, CATEGORY_LIST_SUCCESS, CATEGORY_LIST_FAIL, CATEGORY_CREATE_SUCCESS, CATEGORY_CREATE_FAIL, CATEGORY_CREATE_REQUEST, CATEGORY_UPDATE_REQUEST, CATEGORY_UPDATE_SUCCESS, CATEGORY_UPDATE_FAIL, CATEGORY_DELETE_REQUEST, CATEGORY_DELETE_SUCCESS, CATEGORY_DELETE_FAIL } from './../Constants/CategoryConstants';
import { logout } from "./UserActions";
export const listCategory = () => async(dispatch, getState) =>{
    try {
        dispatch({type: CATEGORY_LIST_REQUEST});
        const { userLogin: {userInfo}} = getState();
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const {data} = await axios.get(`/api/category/`, config)
        dispatch({type: CATEGORY_LIST_SUCCESS, payload: data})
    } catch (error) {
        const message = error.response && error.response.data.message 
            ? error.response.data.message
            : error.message
        if(message === "Not authorized, token failed"){
            dispatch(logout());
        }
        dispatch({type: CATEGORY_LIST_FAIL, payload: message});
    }
}

//ADMIN CATEGORY CREATE
export const createCategory = ({ name, description, image }) => async (dispatch, getState) => {
    try {
      dispatch({ type: CATEGORY_CREATE_REQUEST });
      // userInfo -> userLogin -> getState(){globalState}
      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
  
      const { data } = await axios.post(`/api/category/`,
        {
          name, description, image
        }
        , config);
      dispatch({ type: CATEGORY_CREATE_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        dispatch(logout());
      }
        dispatch({
          type: CATEGORY_CREATE_FAIL,
          payload: message,
        });
    }
  };

//ADMIN UPDATE CATEGORY
export const updateCategory = ({name, description, image, isActive, categoryId}) => async(dispatch, getState)=>{
  try {
    dispatch({type: CATEGORY_UPDATE_REQUEST});
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.put(`/api/category/${categoryId}`, {
      name, description, image, isActive
    }, config)
    dispatch({type: CATEGORY_UPDATE_SUCCESS, payload: data});
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: CATEGORY_UPDATE_FAIL,
      payload: message,
    });
  }
}

// ADMIN CATEGORY DELETE
export const deleteCategory = (id) => async(dispatch, getState) => {
  try {
    dispatch({ type: CATEGORY_DELETE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`/api/category/${id}`, config);
    dispatch({ type: CATEGORY_DELETE_SUCCESS });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: CATEGORY_DELETE_FAIL,
      payload: message,
    });
  }
};