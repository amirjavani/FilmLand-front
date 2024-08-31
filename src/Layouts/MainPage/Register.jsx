import React, { useState } from "react";
import "./register.css";
import { json, useNavigate } from "react-router-dom";
import { RegisterPost } from "../../Utility/UserAPI";
import Cookies from 'js-cookie';

const Register = (props) => {
  const [usernameDir, setUsernameDir] = useState("rtl");
  const [emailDir, setEmailDir] = useState("rtl");
  const [passwordDir, setPasswordDir] = useState("rtl");
  const [username, setUsername] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const handleDirection = (value, setDir) => {
    if (value.length > 0) {
      const firstChar = value[0];
      if (firstChar.match(/[a-zA-Z0-9]/)) {
        setDir("ltr");
      } else {
        setDir("rtl");
      }
    } else {
      setDir("rtl");
    }
  };

  const handleChange = (e, setValue, setDir) => {
    const value = e.target.value;
    setValue(value); // Update the corresponding state
    handleDirection(value, setDir); // Update the text direction
  };

  const navigate = useNavigate();
  const Submit = async (event) => {
    // navigate("/");
    event.preventDefault();
    var jsonData = new json();
    jsonData = {
      "Username": username,
      "UserEmail": userEmail,
      "UserPassword": userPassword
    }
    event.preventDefault();
    try {
      const response = await RegisterPost({ formData: jsonData });
      const expirationMinutes = 10; 
      const expirationTimeInDays = expirationMinutes / (24 * 60);
      Cookies.set('id', response.data , { expires: expirationTimeInDays, sameSite: 'strict' });
      navigate("/"); // Navigate after successful submission
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };
  return (
    <div className="register-main">
      <div className="register-container">
        <div className="register-title-container">
          <p className="register-title">عضویت</p>
        </div>
        <div className="register-body-container">
          <i class="fa-solid fa-user register-username-icon"></i>
          <i class="fa-regular fa-envelope register-email-icon"></i>
          <i class="fa fa-key register-password-icon" aria-hidden="true"></i>
          <input
            type="text"
            className="register-username-input"
            placeholder=" "
            value={username}
            setValue={setUsername}
            dir={usernameDir}
            onChange={(e) => {handleChange(e, setUsername, setUsernameDir)}}
          />
          <label htmlFor="" className="register-username-label">نام کاربری</label>

          <input
            type="email"
            className="register-email-input"
            placeholder=" "
            value={userEmail}
            dir={emailDir}
            onChange={(e) => {handleChange(e, setUserEmail, setEmailDir)}}
          />
          <label htmlFor="" className="register-email-label">ایمیل</label>

          <input
            type="password"
            className="register-password-input"
            placeholder=" "
            value={userPassword}
            dir={passwordDir}
            onChange={(e) => {handleChange(e, setUserPassword, setPasswordDir)}}
          />
          <label htmlFor="" className="register-password-label">رمز عبور</label>
          <div className="register-checkbox">
            <input type="checkbox" />
            <label htmlFor="">قوانین را مطالعه کرده ام و می پذیرم.</label>
          </div>
          <button className="register-button" onClick={Submit}>ثبت نام</button>
          <div className="register-already-account-container">
            <p>آیا قبلا یک اکانت داشته اید؟&nbsp;</p>
            <a href="/login">ورود</a>
          </div>
        </div>
      </div>
    </div>
  )
};

export default Register;