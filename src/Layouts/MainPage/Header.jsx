import React, { useEffect, useState } from "react";
import "../../index.css";
import "./Header.css";
import { Link } from "react-router-dom";
import { FetchListMenu } from "../../Utility/MainMenuAPi";
import logo from "../../Assets/Header/logo.png";

function Header() {
  const [MenuList, setMenuList] = useState([]);
  const [searchShow, setSearchShow] = useState(false);

  const fetchData = async () => {
    const res = await FetchListMenu();
    setMenuList(res.data);
  };

  useEffect(() => {
    fetchData();
    return () => {};
  }, []);
  return (
    <header className="header">
      <div className="nav-items">
        <input type="checkbox" id="check" />
        <label htmlFor="" className="icons ml-2">
          <i className="bx bx-menu" id="menu-icon" />
          <i className="bx bx-x" id="close-icon" />
        </label>
        <img src={logo} className="h-10" alt="" />
        <nav className="navbar">
          {MenuList && (
            <div>
              {MenuList.map((obj, index) => {
                return <Link to={obj.siteMenuUrl}>{obj.siteMenuName} </Link>;
              })}
            </div>
          )}
        </nav>
      </div>
      <div className="nav-left">
        <Link className="subscription py-1"  to="/">
          <h4>خرید اشتراک</h4>
          <i className="bi bi-cart" aria-hidden="true" />
        </Link>
        <Link className="login py-1" to="/dashboard">
          <h4>ورود</h4>
          <i className="bi bi-box-arrow-in-right" aria-hidden="true" />
        </Link>
        <div className="my-auto pr-5 transition-all">
           <input type="text" className={`${searchShow?'w-60 opacity-100':'w-0 invisible opacity-0'} bg-transparent border-1  border-slate-300 rounded-lg p-1 text-white `} style={{transition:'.4s',}} placeholder="جست و جو..."></input>
          <i
            className="bi bi-search p-1 m-1 search-icon fs-4"
            onClick={() => setSearchShow(!searchShow)}
          />
        </div>
      </div>
    </header>
  );
}

export default Header;
