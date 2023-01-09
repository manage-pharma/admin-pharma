import React, { useEffect } from "react";
import "./App.css";
import "./responsive.css";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/productScreen";
import CategoriesScreen from "./screens/CategoriesScreen";
import OrderScreen from "./screens/OrderScreen";
import OrderDetailScreen from "./screens/OrderDetailScreen";
import AddProduct from "./screens/AddProduct";
import Login from "./screens/LoginScreen";
import UsersScreen from "./screens/UsersScreen";
import ProductEditScreen from "./screens/ProductEditScreen";
import NotFound from "./screens/NotFound";
import PrivateRouter from "./PrivateRouter";
import CategoriesDetail from "./screens/CategoriesDetail";
import ProductExcelCSV from "./screens/ProductExcelCSV";
import { useDispatch, useSelector } from "react-redux";
import { listProduct } from "./Redux/Actions/ProductActions";
import { listOrder } from "./Redux/Actions/OrderActions";

function App() {
  const dispatch = useDispatch();
  const userLogin = useSelector(state => state.userLogin)
  const {userInfo} = userLogin;
  useEffect(() =>{
    if(userInfo && userInfo.isAdmin) {
      dispatch(listProduct());
      dispatch(listOrder())
    }
  }, [dispatch, userInfo])

  

  return (
    <>
      <Router>
        <Switch>
          <PrivateRouter path="/" component={HomeScreen} exact /> 
          <PrivateRouter path="/products" component={ProductScreen} exact/>
          <PrivateRouter path="/products/excel&CSV" component={ProductExcelCSV} exact/>
          {/* <PrivateRouter path="/products/search/:keyword" component={ProductScreen} exact /> */}
          {/* <PrivateRouter path="/products/page/:pageNumber" component={ProductScreen} exact /> */}
          {/* <PrivateRouter path="/products/search/:keyword/page/:pageNumber" component={ProductScreen} exact /> */}
          <PrivateRouter path="/categories" component={CategoriesScreen} />
          <PrivateRouter path="/category/:id" component={CategoriesDetail} />
          <PrivateRouter path="/orders" component={OrderScreen} />
          <PrivateRouter path="/order/:id" component={OrderDetailScreen} />
          <PrivateRouter path="/addproduct" component={AddProduct} />
          <PrivateRouter path="/users" component={UsersScreen} />
          <PrivateRouter path="/product/:id/edit" component={ProductEditScreen} />
          <Route path="/login" component={Login} />
          <Route path="*" component={NotFound} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
