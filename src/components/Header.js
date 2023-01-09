import React, { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import {logout} from '../Redux/Actions/UserActions';
const Header = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    document.querySelector("button[data-trigger]").addEventListener("click",function (e) {
      e.preventDefault();
      e.stopPropagation();
      var offcanvas_id = this.getAttribute("data-trigger");
      document.querySelector(offcanvas_id).classList.toggle("show");
    });

    document.querySelector(".btn-aside-minimize").addEventListener("click", function(){
      document.querySelector("body").classList.toggle("aside-mini");
    })
  }, []);
  const handleLogout = (e) =>{
    e.preventDefault();
    dispatch(logout())
    history.push('/login');
  }
  return (
    <header className="main-header navbar">
      <div className="col-search">
        <form className="searchform">
          <div className="input-group">
            <input
              list="search_terms"
              type="text"
              className="form-control"
              placeholder="Search term"
            />
            <button className="btn btn-light bg" type="button">
              <i className="far fa-search"></i>
            </button>
          </div>
          <datalist id="search_terms">
            <option value="Products" />
            <option value="New orders" />
            <option value="Apple iphone" />
            <option value="Ahmed Hassan" />
          </datalist>
        </form>
      </div>
      <div className="col-nav">
        <button
          className="btn btn-icon btn-mobile me-auto"
          data-trigger="#offcanvas_aside"
        >
          <i className="md-28 fas fa-bars"></i>
        </button>
        <ul className="nav">
          <li className="nav-item">
            <Link className={`nav-link btn-icon `} title="Dark mode" to="#">
              <i className="fas fa-moon"></i>
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link btn-icon" to="#">
              <i className="fas fa-bell"></i>
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="#">
              English
            </Link>
          </li>
          <li className="dropdown nav-item">
            <Link className="dropdown-toggle" data-bs-toggle="dropdown" to="#">
              <img
                className="img-xs rounded-circle"
                src="/images/favicon.png"
                alt="User"
              />
            </Link>
            <div className="dropdown-menu dropdown-menu-end">
              <Link className="dropdown-item" to="/">
                My profile
              </Link>
              <Link className="dropdown-item" to="#">
                Settings
              </Link>
              <Link className="dropdown-item text-danger" to='#' onClick={handleLogout}>
                Logout
              </Link>
            </div>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
