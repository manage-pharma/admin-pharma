import { 
  CUSTOMER_SINGLE_SUCCESS,
  CUSTOMER_UPDATE_RESET,
  CUSTOMER_UPDATE_SUCCESS,
  CUSTOMER_UPDATE_REQUEST,
  CUSTOMER_UPDATE_FAIL,
  CUSTOMER_SINGLE_REQUEST,
  CUSTOMER_CREATE_FAIL,
  CUSTOMER_CREATE_REQUEST,
  CUSTOMER_CREATE_RESET,
  CUSTOMER_CREATE_SUCCESS,
  CUSTOMER_LIST_FAIL,
  CUSTOMER_LIST_REQUEST,
  CUSTOMER_LIST_RESET,
  CUSTOMER_LIST_SUCCESS,
  CUSTOMER_LOGIN_FAIL,
  CUSTOMER_LOGIN_REQUEST,
  CUSTOMER_LOGIN_SUCCESS,
  CUSTOMER_LOGOUT,
  CUSTOMER_SINGLE_RESET,
  CUSTOMER_SINGLE_FAIL,
} from "../Constants/CustomerConstants";

// LOGIN
export const customerLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case CUSTOMER_LOGIN_REQUEST:
      return { loading: true };
    case CUSTOMER_LOGIN_SUCCESS:
      return { loading: false, cusInfo: action.payload };
    case CUSTOMER_LOGIN_FAIL:
      return { loading: false, error: action.payload };
    case CUSTOMER_LOGOUT:
      return {};
    default:
      return state;
  }
};

// ALL CUSTOMER
export const customerListReducer = (state = { customers: [] }, action) => {
  switch (action.type) {
    case CUSTOMER_LIST_REQUEST:
      return { loading: true };
    case CUSTOMER_LIST_SUCCESS:
      return { loading: false, customers: action.payload };
    case CUSTOMER_LIST_FAIL:
      return { loading: false, error: action.payload };
    case CUSTOMER_LIST_RESET:
      return { customers: [] };
    default:
      return state;
  }
};
//CREATE
export const customerCreateReducer = (state= {}, action) =>{
  switch (action.type) {
      case CUSTOMER_CREATE_REQUEST:
          return {loading: true};
      case CUSTOMER_CREATE_SUCCESS:
          return {loading: false, success: true, customer: action.payload}
      case CUSTOMER_CREATE_FAIL:
          return {loading: false, error: action.payload}
      case CUSTOMER_CREATE_RESET:
          return {};  
      default:
          return state;
  }
};
//UPDATE
export const customerUpdateReducer = (state = {customer:{}}, action) =>{
  switch (action.type) {
      case CUSTOMER_UPDATE_REQUEST:
          return {loading: true};
      case CUSTOMER_UPDATE_SUCCESS:
          return {loading: false, success: true, customer: action.payload}
      case CUSTOMER_UPDATE_FAIL:
          return {loading: false, error: action.payload};
      case CUSTOMER_UPDATE_RESET:
          return {CUSTOMER: {}}
      default:
          return state
  }
}

// SINGLE CUSTOMER
export const customerSingleReducer = (state = {customer:{}}, action) => {
switch (action.type) {
  case CUSTOMER_SINGLE_REQUEST:
    return {...state, loading: true };
  case CUSTOMER_SINGLE_SUCCESS:
    return { loading: false, success: true, customer: action.payload };
  case CUSTOMER_SINGLE_FAIL:
    return { loading: false, error: action.payload };
  case CUSTOMER_SINGLE_RESET:
    return {customer:{}};
  default:
    return state;
}
};