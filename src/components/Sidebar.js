import React from "react";
import { Link, NavLink } from "react-router-dom";
const Sidebar = () => {

  return (
    <div>
      <aside className="navbar-aside" id="offcanvas_aside">
        <div className="aside-top">
          <Link to="/" className="brand-wrap">
            <img
              src="/images/logo.png"
              style={{ height: "46" }}
              className="logo"
              alt="Ecommerce dashboard template"
            />
          </Link>
          <div>
            <button className="btn btn-icon btn-aside-minimize">
              <i className="text-muted fas fa-stream"></i>
            </button>
          </div>
        </div>

        <nav>
          <ul className="menu-aside">
            <li className="menu-item">
              <NavLink
                activeClassName="active"
                className="menu-link"
                to="/"
                exact={true}
              >
                <i className="icon fas fa-home"></i>
                <span className="text">Dashboard</span>
              </NavLink>
            </li>
            <li className="menu-item">
              <NavLink
                activeClassName="active"
                className="menu-link"
                to="/products"
              >
                <i className="icon fas fa-shopping-bag"></i>
                <span className="text">Products</span>
              </NavLink>
            </li>
            <li className="menu-item">
              <NavLink
                activeClassName="active"
                className="menu-link"
                to="/categories"
              >
                <i className="icon fas fa-list"></i>
                <span className="text">Categories</span>
              </NavLink>
            </li>
            <li className="menu-item">
              <NavLink
                activeClassName="active"
                className="menu-link"
                to="/categories-drug"
              >
                <i className="icon fas fa-capsules"></i>
                <span className="text">Categories Drug</span>
              </NavLink>
            </li>
            <li className="menu-item">
              <NavLink
                activeClassName="active"
                className="menu-link"
                to="/orders"
              >
                <i className="icon fas fa-bags-shopping"></i>
                <span className="text">Orders</span>
              </NavLink>
            </li>
            <li className="menu-item">
              <NavLink
                activeClassName="active"
                className="menu-link"
                to="/users"
              >
                <i className="icon fas fa-user"></i>
                <span className="text">Users</span>
              </NavLink>
            </li>
            <li className="menu-item" >
              <NavLink
                activeClassName="active"
                className="menu-link"
                to="/providers"
              >
                <i className="icon fas fa-store-alt"></i>
                <span className="text">Provider</span>
              </NavLink>
            </li>
            <li className="menu-item lv1 arrow down">
              <NavLink
                activeClassName="active"
                className="menu-link"
                to="/import-stock"
              >
                <i className="icon fas fa-usd-circle"></i>
                <span className="text">Transactions</span>

              </NavLink>
                <ul className="menu-aside lv2">
                  <li className="menu-item">
                      <NavLink
                        activeClassName="active"
                        className="menu-link"
                        to="/import-stock"
                      >
                        <i className="icon fas fa-sign-in-alt"></i>
                        <span className="text">Import Stock</span>
                      </NavLink>
                  </li>
                  <li className="menu-item">
                      <NavLink
                        activeClassName="active"
                        className="menu-link"
                        to="/export-stock"
                      >
                        <i className="icon fas fa-sign-out-alt"></i>
                        <span className="text">Export Stock</span>
                      </NavLink>
                  </li>
                </ul>
            </li>

          </ul>
          <br />
          <br />
        </nav>
      </aside>
    </div>
  );
};

export default Sidebar;
