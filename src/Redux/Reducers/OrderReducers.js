import { ORDER_DETAILS_FAIL, ORDER_DETAILS_SUCCESS, ORDER_DETAILS_REQUEST, ORDER_LIST_FAIL, ORDER_LIST_REQUEST, ORDER_LIST_SUCCESS, ORDER_DELIVERED_REQUEST, ORDER_DELIVERED_SUCCESS, ORDER_DELIVERED_RESET } from "../Constants/OrderConstants";


// ORDER LIST
export const orderListReducer = (state = {orders:[]}, action) => {
    switch (action.type) {
      case ORDER_LIST_REQUEST:
        return { loading: true };
      case ORDER_LIST_SUCCESS:
        return { loading: false, orders: action.payload };
      case ORDER_LIST_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };

//ORDER DETAIL
export const orderDetailReducer  = (state = {loading : true, orderItems: [], shippingAddress: {}}, action) =>{
  switch(action.type){
    case ORDER_DETAILS_REQUEST:
      return { ...state, loading: true};
    case ORDER_DETAILS_SUCCESS:
      return { loading: false, orderItems: action.payload}
    case ORDER_DETAILS_FAIL:
      return { loading: false, error: action.payload}
    default: 
      return state;
  }
}

//ORDER DELIVERED
export const orderDeliveredReducer  = (state= {}, action) =>{
  switch(action.type){
    case ORDER_DELIVERED_REQUEST:
      return { loading: true};
    case ORDER_DELIVERED_SUCCESS:
      return { loading: false, success: true}
    case ORDER_DETAILS_FAIL:
      return { loading: false, error: action.payload}
    case ORDER_DELIVERED_RESET:
      return {}
    default: 
      return state;
  }
}