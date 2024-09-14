import React, { useState } from "react";
import "./login.css";
import { json, useNavigate } from "react-router-dom";
import { LoginPost, LoginAdminPost } from "../../Utility/UserAPI";
import Cookies from 'js-cookie';
import { useLocation } from 'react-router-dom';


const Login = () => {
  const [usernameDir, setUsernameDir] = useState("rtl");
  const [passwordDir, setPasswordDir] = useState("rtl");
  const [username, setUsername] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const location = useLocation();


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

  const [isAdmin, setIsAdmin] = useState(false);

  // تابع برای مدیریت تغییر وضعیت چک‌باکس
  const handleCheckboxChange = (event) => {
    setIsAdmin(event.target.checked);
  };

  const navigate = useNavigate();
  const Submit = async (event) => {
    console.log(isAdmin)
    event.preventDefault();
    var jsonData = new json();
    jsonData = {
      "Username": username,
      "UserPassword": userPassword
    }
    event.preventDefault();
    if (isAdmin) {
      jsonData = {
        "Adminname": username,
        "AdminPassword": userPassword
      }
      try {
        const response = await LoginAdminPost({ formData: jsonData });
        console.log(response.status);
        if (response.status === 200) {
          const expirationMinutes = 10;
          const expirationTimeInDays = expirationMinutes / (24 * 60);
          Cookies.set('idAdmin', response.data, { expires: expirationTimeInDays, sameSite: 'strict' });
          navigate("/dashboard");
        } else if (response.status === 204) {
          const loginUsernameLabel = document.querySelector('.login-username-label');
          const loginPasswordLabel = document.querySelector('.login-password-label');
          const loginUsernameIcon = document.querySelector('.login-username-icon');
          const loginPasswordIcon = document.querySelector('.login-password-icon');
          const loginError = document.querySelector('.login-error');
  
          loginError.style.display = "block";
          loginUsernameLabel.style.bottom = '292px';
          loginPasswordLabel.style.bottom = '218px';
          loginUsernameIcon.style.top = '25px';
          loginPasswordIcon.style.top = '100px';
  
        } else {
          console.error("Registration failed:", response.statusText);
        }
      } catch (error) {
        console.error("Error during registration:", error);
      }
    }
    else {
      try {
        const response = await LoginPost({ formData: jsonData });
        console.log(response.status);
        if (response.status === 200) {
          const expirationMinutes = 10;
          const expirationTimeInDays = expirationMinutes / (24 * 60);
          Cookies.set('id', response.data, { expires: expirationTimeInDays, sameSite: 'strict' });
          // const isLoginSubscription = Cookies.get('IsLoginSubscription');
  
          // Extract the query parameter
          const queryParams = new URLSearchParams(location.search);
          const message = queryParams.get('msg');
  
          if (message === "fromSubscription") {
            // Cookies.remove('IsLoginSubscription');
            navigate("/subscription");
          }
          else {
            navigate("/");
          }
        } else if (response.status === 204) {
          const loginUsernameLabel = document.querySelector('.login-username-label');
          const loginPasswordLabel = document.querySelector('.login-password-label');
          const loginUsernameIcon = document.querySelector('.login-username-icon');
          const loginPasswordIcon = document.querySelector('.login-password-icon');
          const loginError = document.querySelector('.login-error');
  
          loginError.style.display = "block";
          loginUsernameLabel.style.bottom = '292px';
          loginPasswordLabel.style.bottom = '218px';
          loginUsernameIcon.style.top = '25px';
          loginPasswordIcon.style.top = '100px';
  
        } else {
          console.error("Registration failed:", response.statusText);
        }
      } catch (error) {
        console.error("Error during registration:", error);
      }
    }
    
  };
  return (
    <div className="login-main">
      <div className="login-container">
        <div className="login-title-container">
          <p className="login-title">ورود</p>
        </div>
        <div className="login-body-container">
          <i class="fa-solid fa-user login-username-icon"></i>
          {/* <i class="fa-regular fa-envelope login-email-icon"></i> */}
          <i class="fa fa-key login-password-icon" aria-hidden="true"></i>
          <input
            type="text"
            className="login-username-input"
            placeholder=" "
            dir={usernameDir}
            onChange={(e) => handleChange(e, setUsername, setUsernameDir)}
          />
          <label htmlFor="" className="login-username-label">نام کاربری</label>

          {/* <input
            type="text"
            className="login-email-input"
            placeholder=" "
            dir={emailDir}
            onChange={(e) => handleDirection(e, setEmailDir)}
          />
          <label htmlFor="" className="login-email-label">ایمیل</label> */}

          <input
            type="password"
            className="login-password-input"
            placeholder=" "
            dir={passwordDir}
            onChange={(e) => handleChange(e, setUserPassword, setPasswordDir)}
          />
          <label htmlFor="" className="login-password-label">رمز عبور</label>
          <div className="login-checkbox">
            <input type="checkbox"
              id="adminCheckbox"
              checked={isAdmin}
              onChange={handleCheckboxChange} />
            <label htmlFor="">ادمین هستم</label>
            {/* <a href="">فراموشی رمز عبور</a> */}
          </div>
          <p className="login-error">رمز عبور اشتباه است</p>
          <button className="login-button" onClick={Submit}>ورود</button>
          <div className="login-already-account-container">
            <p>آیا شما اکانت ندارید؟&nbsp;</p>
            <a href="/register">ثبت نام</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
