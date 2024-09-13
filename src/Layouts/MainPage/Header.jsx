import React, { useEffect, useState } from "react";
import "../../index.css";
import "./Header.css";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { FetchListMenuHeader } from "../../Utility/MainMenuAPi";
import { FetchSubscription } from "../../Utility/SubscriptionAPI"
import { addMonths, differenceInDays } from 'date-fns';
import logo from "../../Assets/Header/logo.png";
import Cookies from 'js-cookie';

function Header() {
  const [MenuList, setMenuList] = useState([]);
  const [searchShow, setSearchShow] = useState(false);
  const [subscriptiontitle, setSubscriptionTitle] = useState("خرید اشتراک");
  const navigate = useNavigate();
  const id = Cookies.get('id');

  const fetchData = async () => {
    const res = await FetchListMenuHeader();
    // console.log(res.data);
    setMenuList(res.data);
    if (id != null) {
      const subscription = await FetchSubscription({id});
      if (subscription.status == 200) {
        console.log(subscription)
        const initialDate = subscription.data.subscriptionDate;
        const currentDate = new Date();
        const x = subscription.data.subscriptionMonthNumber;
        const newDate = addMonths(initialDate, x);
        const difference = differenceInDays(newDate, currentDate);
        setSubscriptionTitle(convertToPersianNumber(difference) +" روز")
      }
    }

  };

  const subscription = async () => {

    if (id != null) {
      navigate("/subscription");
    }
    else {
      // Cookies.set('IsLoginSubscription', "true" , { sameSite: 'strict' });
      // navigate("/login");
      navigate('/login?msg=fromSubscription');
    }
  }

  const exit = async () => {
    Cookies.remove('id');
    window.location.reload();
  }

  const convertToPersianNumber = (number) => {
    const persianDigits = "۰۱۲۳۴۵۶۷۸۹";
    return number.toString().replace(/\d/g, (digit) => persianDigits[digit]);
  };


  const aaa = async () => {
    console.log(MenuList)
  }

  useEffect(() => {
    const id = Cookies.get('id');

    if (id != null) {
      const headerLogin = document.getElementById('header-login');
      const headerUserAccount = document.getElementById('header-user-account');

      headerLogin.style.display = 'none';
      headerUserAccount.style.display = 'block';
    }
    fetchData();
    return () => { };
  }, []);
  return (
    <header className="header">
      <div className="nav-items">
        <input type="checkbox" id="check" />
        <label htmlFor="" className="icons ml-2">
          <i className="bx bx-menu" id="menu-icon" />
          <i className="bx bx-x" id="close-icon" />
        </label>
        <img src={logo} onClick={() => navigate('')} className="h-10 cursor-pointer" alt="" />
        <nav className="navbar">
          {MenuList && (
            <div>
              {MenuList.map((obj, index) => {
                return <Link key={index} to={obj.siteMenuUrl}>{obj.siteMenuName} </Link>;
              })}
            </div>
          )}
        </nav>
      </div>
      <div className="nav-left">
        <Link className="subscription py-1" onClick={subscription}>
          <h4>{subscriptiontitle}</h4>
          <i className="bi bi-cart" aria-hidden="true" />
        </Link>
        <Link id="header-login" className="login py-1" to="/login">
          <h4>ورود</h4>
          <i className="bi bi-box-arrow-in-right" aria-hidden="true" />
        </Link>
        <Link id="header-user-account" className="user-account py-1" onClick={exit}>
          <h4>خروج</h4>
          {/* <i className="bi bi-box-arrow-in-right" aria-hidden="true" /> */}
        </Link>
        <div className="my-auto transition-all">
          <input type="text" className={`${searchShow ? 'w-60 opacity-100' : 'w-0 invisible opacity-0'} bg-transparent border-1  border-slate-300 rounded-lg p-1 text-white `} style={{ transition: '.4s', }} placeholder="جست و جو..."></input>
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
