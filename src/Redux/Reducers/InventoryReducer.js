import { INVENTORY_DETAILS_FAIL, INVENTORY_DETAILS_REQUEST, INVENTORY_DETAILS_RESET, INVENTORY_DETAILS_SUCCESS, INVENTORY_LIST_FAIL, INVENTORY_LIST_REQUEST, INVENTORY_LIST_RESET, INVENTORY_LIST_SUCCESS } from './../Constants/InventoryConstants';
  // INVENTORY LIST
  export const inventoryListReducer = (state = {inventories:[]}, action) => {
    switch (action.type) {
      case INVENTORY_LIST_REQUEST:
        return { loading: true, inventories: [] };
      case INVENTORY_LIST_SUCCESS:
        return { loading: false, inventories: action.payload}
      case INVENTORY_LIST_FAIL:
        return { loading: false, error: action.payload };
      case INVENTORY_LIST_RESET:
        return {}
      default:
        return state;
    }
  };
  
  //INVENTORY DETAIL
  export const inventoryDetailReducer = (state = {}, action) =>{
  switch(action.type){
    case INVENTORY_DETAILS_REQUEST:
      return { ...state, loading: true};
    case INVENTORY_DETAILS_SUCCESS:
      return { loading: false, success: true, inventoryItem: action.payload}
    case INVENTORY_DETAILS_FAIL:
      return { loading: false, error: action.payload}
    case INVENTORY_DETAILS_RESET:
      return {}
    default: 
      return state;
  }
}  