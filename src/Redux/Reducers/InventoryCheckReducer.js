import {
  INVENTORY_CHECK_CREATE_FAIL,
  INVENTORY_CHECK_CREATE_REQUEST,
  INVENTORY_CHECK_CREATE_RESET,
  INVENTORY_CHECK_CREATE_SUCCESS,
  INVENTORY_CHECK_DETAILS_REQUEST,
  INVENTORY_CHECK_DETAILS_SUCCESS,
  INVENTORY_CHECK_DETAILS_FAIL,
  INVENTORY_CHECK_LIST_REQUEST,
  INVENTORY_CHECK_LIST_SUCCESS,
  INVENTORY_CHECK_LIST_FAIL,
  INVENTORY_CHECK_UPDATE_REQUEST,
  INVENTORY_CHECK_UPDATE_SUCCESS,
  INVENTORY_CHECK_UPDATE_RESET,
  INVENTORY_CHECK_UPDATE_FAIL,
  INVENTORY_CHECK_STATUS_REQUEST,
  INVENTORY_CHECK_STATUS_SUCCESS,
  INVENTORY_CHECK_STATUS_RESET,
  INVENTORY_CHECK_STATUS_FAIL,
} from "../Constants/InventoryCheckConstant";
// IMPORT_STOCK LIST
export const inventoryCheckListReducer = (
  state = { stockImported: [] },
  action
) => {
  switch (action.type) {
    case INVENTORY_CHECK_LIST_REQUEST:
      return { loading: true, inventoryCheck: [] };
    case INVENTORY_CHECK_LIST_SUCCESS:
      return {
        loading: false,
        totalPage: action.payload.totalPage,
        currentPage: action.payload.currentPage,
        inventoryCheck: action.payload,
      };
    case INVENTORY_CHECK_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// IMPORT_STOCK DETAIL
export const inventoryCheckDetailReducer = (state = {}, action) => {
  switch (action.type) {
    case INVENTORY_CHECK_DETAILS_REQUEST:
      return { ...state, loading: true };
    case INVENTORY_CHECK_DETAILS_SUCCESS:
      return {
        loading: false,
        success: true,
        inventoryCheckItem: action.payload,
      };
    case INVENTORY_CHECK_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
// CREATE IMPORT_STOCK
export const inventoryCheckCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case INVENTORY_CHECK_CREATE_REQUEST:
      return { loading: true };
    case INVENTORY_CHECK_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        inventoryCheckCreated: action.payload,
      };
    case INVENTORY_CHECK_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case INVENTORY_CHECK_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

// STATUS IMPORT_STOCK
export const inventoryCheckStatusReducer = (state = {}, action) => {
  switch (action.type) {
    case INVENTORY_CHECK_STATUS_REQUEST:
      return { loading: true };
    case INVENTORY_CHECK_STATUS_SUCCESS:
      return {
        loading: false,
        success: true,
        inventoryCheckStatus: action.payload,
      };
    case INVENTORY_CHECK_STATUS_FAIL:
      return { loading: false, error: action.payload };
    case INVENTORY_CHECK_STATUS_RESET:
      return {};
    default:
      return state;
  }
};

// UPDATE IMPORT STOCK
export const inventoryCheckUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case INVENTORY_CHECK_UPDATE_REQUEST:
      return { loading: true };
    case INVENTORY_CHECK_UPDATE_SUCCESS:
      return {
        loading: false,
        success: true,
        inventoryCheckUpdated: action.payload,
      };
    case INVENTORY_CHECK_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case INVENTORY_CHECK_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};
