import axios from "axios";
import { logout } from "./UserActions";
import {
  INVENTORY_LIST_REQUEST,
  INVENTORY_LIST_RESET,
  INVENTORY_LIST_SUCCESS,
  INVENTORY_TO_CHECK_LIST_REQUEST,
  INVENTORY_TO_CHECK_LIST_RESET,
  INVENTORY_TO_CHECK_LIST_SUCCESS,
  INVENTORY_TO_CHECK_LIST_FAIL,
  INVENTORY_TAG_FAIL,
  INVENTORY_TAG_REQUEST,
  INVENTORY_TAG_RESET,
  INVENTORY_TAG_SUCCESS,
  INVENTORY_LIST_FAIL,
  CHART_IMPORT_EXPORT_REQUEST,
  CHART_IMPORT_EXPORT_SUCCESS,
  CHART_IMPORT_EXPORT_FAIL,
  CHART_IMPORT_EXPORT_RESET,
} from "./../Constants/InventoryConstants";
import moment from "moment";

export const listInventory =
  (keyword = "", oh = "", exp = "", from = " ", to = " ") =>
  async (dispatch, getState) => {
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

      const { data } = await axios.get(
        `/api/inventory/?keyword=${keyword}&oh=${oh}&exp=${exp}&from=${from}&to=${to}`,
        config,
      );
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
// all inventory to check
export const listInventoryToCheck =
  (keyword = "", from = " ", to = " ") =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: INVENTORY_TO_CHECK_LIST_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.get(
        `/api/inventory/check?keyword=${keyword}&from=${from}&to=${to}`,
        config,
      );
      dispatch({ type: INVENTORY_TO_CHECK_LIST_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        dispatch(logout());
      }
      dispatch({
        type: INVENTORY_TO_CHECK_LIST_FAIL,
        payload: message,
      });
      setTimeout(() => {
        dispatch({ type: INVENTORY_TO_CHECK_LIST_RESET });
      }, 3000);
    }
  };

//ADMIN TAG INVENTORY
export const tagInventory =
  (keyword = "", from = " ", to = " ") =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: INVENTORY_TAG_REQUEST });
      // userInfo -> userLogin -> getState(){globalState}
      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.get(
        `/api/inventory/tag/?keyword=${keyword}&from=${from}&to=${to}`,
        config,
      );
      dispatch({ type: INVENTORY_TAG_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        dispatch(logout());
      }
      dispatch({
        type: INVENTORY_TAG_FAIL,
        payload: message,
      });
      setTimeout(() => {
        dispatch({ type: INVENTORY_TAG_RESET });
      }, 3000);
    }
  };

//ADMIN CHART IMPORT EXPORT
export const chartImportExport =
  (keyword = "", from = " ", to = " ", type = "") =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: CHART_IMPORT_EXPORT_REQUEST });
      // userInfo -> userLogin -> getState(){globalState}
      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const fromConvert = moment(from).format("YYYY-MM-DD");
      const toConvert = moment(to).format("YYYY-MM-DD");

      const { data } = await axios.get(
        `api/inventory/report/nhapxuat?keyword=${keyword}&from=${fromConvert}&to=${toConvert}&type=${type}`,
        config,
      );
      dispatch({ type: CHART_IMPORT_EXPORT_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        dispatch(logout());
      }
      dispatch({
        type: CHART_IMPORT_EXPORT_FAIL,
        payload: message,
      });
      setTimeout(() => {
        dispatch({ type: CHART_IMPORT_EXPORT_RESET });
      }, 3000);
    }
  };
