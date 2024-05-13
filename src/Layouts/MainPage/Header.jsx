import React, { useEffect, useState } from "react";
import "../../index.css";
import "./Header.css";
import { Link } from "react-router-dom";
import { FetchListMenu } from "../../Utility/MainMenuAPi";
import logo from "../../Assets/Header/logo.png";

function Header() {
  const [MenuList, setMenuList] = useState([]);

  const fetchData = async () => {
    const res = await FetchListMenu();
    setMenuList(res.data);
  };
  useEffect(() => {
    fetchData()
    return () => {};
  }, []);
  return (
    <header className="header">
      <div className="nav-items">
        <input type="checkbox" id="check" />
        <label htmlFor="" className="icons">
          <i className="bi bi-three-dots" id="menu-icon" />
          <i className="bi bi-three-dots" id="close-icon" />
        </label>
        <img src={logo} className="h-10" alt="" />
        <nav className="navbar">
          {MenuList && (
            <div>
              {MenuList.map((obj, index) => {
                return <Link to={obj.url}>{obj.name}</Link>;
              })}
            </div>
          )}
        </nav>
      </div>
      <div className="nav-left">
        <a className="subscription" href="">
          <h4>خرید اشتراک</h4>
          <i className="fa fa-shopping-cart" aria-hidden="true" />
        </a>
        <a className="login" href="">
          <h4>ورود</h4>
          <i className="fa fa-sign-in" aria-hidden="true" />
        </a>
        <a href="#" className="search-icon">
          <i className="fas fa-search" />
        </a>
      </div>
    </header>
  );
}

export default Header;
