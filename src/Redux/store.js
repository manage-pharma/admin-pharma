import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { userLoginReducer, userListReducer } from "./Reducers/UserReducers";
import { productAllReducer, productCategoriesDrugReducer, productCategoriesReducer, productCreateReducer, productDeleteReducer, productImportReducer, productListReducer, productSingleReducer, productUpdateReducer } from "./Reducers/ProductReducers";
import { orderDeliveredReducer, orderDetailReducer, orderListReducer } from "./Reducers/OrderReducers";
import { categoryCreateReducer, categoryDeleteReducer, categoryListReducer, categoryUpdateReducer } from './Reducers/CategoryReducer';
import { categoryDrugCreateReducer, categoryDrugDeleteReducer, categoryDrugListReducer, categoryDrugUpdateReducer } from './Reducers/CategoryDrugReducer';
import { themeReducer } from './Reducers/ThemeReducer';

const reducer = combineReducers({
  theme: themeReducer,
  userLogin: userLoginReducer,
  userList: userListReducer,
  productList: productListReducer,
  productAll: productAllReducer,
  productDelete: productDeleteReducer,
  productCreate: productCreateReducer,
  productSingle: productSingleReducer,
  productCategories: productCategoriesReducer,
  productCategoriesDrug: productCategoriesDrugReducer,
  productUpdate: productUpdateReducer,
  productImport: productImportReducer,
  orderList: orderListReducer,
  orderDetail: orderDetailReducer,
  orderDelivered: orderDeliveredReducer,
  categoryList: categoryListReducer,
  categoryCreate: categoryCreateReducer,
  categoryUpdate: categoryUpdateReducer,
  categoryDelete: categoryDeleteReducer,
  categoryDrugList: categoryDrugListReducer,
  categoryDrugCreate: categoryDrugCreateReducer,
  categoryDrugUpdate: categoryDrugUpdateReducer,
  categoryDrugDelete: categoryDrugDeleteReducer,
});


const initialState = {
  userLogin:{
    userInfo: localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null
  }
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
