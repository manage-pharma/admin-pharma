import React, { useEffect } from "react";
import "./App.css";
import "./responsive.css";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/productScreen";
import CategoriesScreen from "./screens/CategoriesScreen";
import CategoriesDrugScreen from "./screens/CategoriesDrugScreen";
import OrderScreen from "./screens/OrderScreen";
import OrderDetailScreen from "./screens/OrderDetailScreen";
import AddProduct from "./screens/AddProduct";
import AddImport from "./screens/AddImport";
import EditImport from "./screens/EditImport";
import Login from "./screens/LoginScreen";
import UsersScreen from "./screens/UsersScreen";
import ProductEditScreen from "./screens/ProductEditScreen";
import NotFound from "./screens/NotFound";
import PrivateRouter from "./PrivateRouter";
import CategoriesDetail from "./screens/CategoriesDetail";
import CategoriesDrugDetail from "./screens/CategoriesDrugDetail";
import ProductExcelCSV from "./screens/ProductExcelCSV";
import { useDispatch, useSelector } from "react-redux";
import { listProduct } from "./Redux/Actions/ProductActions";
import { listOrder } from "./Redux/Actions/OrderActions";
import ProviderScreen from './screens/ProviderScreen';
import ImportStockScreen from "./screens/ImportStockScreen"
function App() {
  const data = useSelector((state)=> state.theme)
  if(data.theme === "dark"){
    document.body.classList.remove("bg-light")
    document.body.classList.add("bg-dark")
  }
  else{
    document.body.classList.remove("bg-dark")
    document.body.classList.add("bg-light")
  }
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
          <PrivateRouter path="/product/add" component={AddProduct} />
          <PrivateRouter path="/product/excel" component={ProductExcelCSV} exact/>
          <PrivateRouter path="/product/:id" component={ProductEditScreen} exact/>

          <PrivateRouter path="/categories" component={CategoriesScreen} />
          <PrivateRouter path="/category/:id" component={CategoriesDetail} />

          <PrivateRouter path="/categories-drug" component={CategoriesDrugScreen} />
          <PrivateRouter path="/category-drug/:id" component={CategoriesDrugDetail} />

          <PrivateRouter path="/orders" component={OrderScreen} />
          <PrivateRouter path="/order/:id" component={OrderDetailScreen} />

          <PrivateRouter path="/import-stock" component={ImportStockScreen} exact/>
          <PrivateRouter path="/import-stock/add" component={AddImport} />
          <PrivateRouter path="/import-stock/:id" component={EditImport} />

          <PrivateRouter path="/providers" component={ProviderScreen} exact/>
          <PrivateRouter path="/users" component={UsersScreen} />

          <Route path="/login" component={Login} />
          <Route path="*" component={NotFound} />
        </Switch>
      </Router>
    </>
  );
}

export default App;