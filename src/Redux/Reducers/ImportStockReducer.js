import { IMPORT_STOCK_CREATE_FAIL, IMPORT_STOCK_CREATE_REQUEST, IMPORT_STOCK_CREATE_RESET, IMPORT_STOCK_CREATE_SUCCESS, IMPORT_STOCK_DETAILS_FAIL, IMPORT_STOCK_DETAILS_REQUEST, IMPORT_STOCK_DETAILS_SUCCESS, IMPORT_STOCK_LIST_FAIL, IMPORT_STOCK_LIST_REQUEST, IMPORT_STOCK_LIST_SUCCESS } from './../Constants/ImportStockConstant'; 
  // IMPORT_STOCK LIST
export const importStockListReducer = (state = {importStock:[]}, action) => {
  switch (action.type) {
    case IMPORT_STOCK_LIST_REQUEST:
      return { loading: true };
    case IMPORT_STOCK_LIST_SUCCESS:
      return { loading: false, importStock: action.payload };
    case IMPORT_STOCK_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

//IMPORT_STOCK DETAIL
export const importStockDetailReducer  = (state = {loading : true, importStockItem: []}, action) =>{
switch(action.type){
  case IMPORT_STOCK_DETAILS_REQUEST:
    return { ...state, loading: true};
  case IMPORT_STOCK_DETAILS_SUCCESS:
    return { loading: false, importStockItem: action.payload}
  case IMPORT_STOCK_DETAILS_FAIL:
    return { loading: false, error: action.payload}
  default: 
    return state;
}
}
  // CREATE IMPORT_STOCK
  export const importStockCreateReducer = (state = {}, action) => {
    switch (action.type) {
      case IMPORT_STOCK_CREATE_REQUEST:
        return { loading: true };
      case IMPORT_STOCK_CREATE_SUCCESS:
        return { loading: false, success: true, importStockCreated: action.payload };
      case IMPORT_STOCK_CREATE_FAIL:
        return { loading: false, error: action.payload };
      case IMPORT_STOCK_CREATE_RESET:
        return {};
      default:
        return state;
    }
  };