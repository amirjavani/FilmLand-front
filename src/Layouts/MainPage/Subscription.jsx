import React, { useState, useEffect } from "react";
import "./subscription.css";
import logo from "../../Assets/subscription/logo.png";
import { FetchAllSubscription, BuySubscription } from "../../Utility/SubscriptionAPI";
import { json, useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';

function Register() {
  const [subscriptionList, setSubscriptionList] = useState([]);
  const navigate = useNavigate()

  const SendSubscription = async (event, subId) => {
    const id = Cookies.get('id');
    console.log(id)
    event.preventDefault();
    var jsonData = new json();
    jsonData = {
      "subscriptionId": subId,
      "userId": id
    }
    event.preventDefault();
    try {
      await BuySubscription({ formData: jsonData });
      navigate("/redirect"); 
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  const fetchData = async () => {
    try {
      const res = await FetchAllSubscription();
      setSubscriptionList(res.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const convertToPersianNumber = (number) => {
    const persianDigits = "۰۱۲۳۴۵۶۷۸۹";
    return number.toString().replace(/\d/g, (digit) => persianDigits[digit]);
  };

  useEffect(() => {
    fetchData();
    return () => { };
  }, []);
  return (
    <div className="subscription-main">
      <div className="subscription-container">
        <div className="subscription-title-container">
          <p className="subscription-title">خرید اشتراک</p>
          <p className="subscription-email">m.mohamadiha81@gmail.com</p>
        </div>
        <div className="subscription-body-container">
          {subscriptionList.map((subscription, index) => (
            <div className="subscription-buy">
              <div className="subscription-buy-title-container">
                <img src={logo} alt="" className="subscription-logo" />
                <p className="subscription-buy-title">{subscription.subscriptionTitle}</p>
              </div>
              <div className="subscription-buy-price-container">
                <s className="subscription-buy-discount">
                  {convertToPersianNumber(subscription.subscriptionDiscount)} تومان
                </s>
                <a onClick={(event) => SendSubscription(event, subscription.subscriptionId)} className="subscription-buy-price">
                  {convertToPersianNumber(subscription.subscriptionPrice)} تومان
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
};

export default Register;