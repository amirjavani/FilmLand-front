import React from "react";
import "./login.css";

const Login = () => {
    return (
        <div className="loginaa">
            <div className="login-container">
                <div className="login-title-container">
                    <p className="login-title">عضویت</p>
                </div>
                <div className="login-body-container">
                    <input
                        type="text"
                        className="login-username-input"
                        placeholder=" "  // Keep placeholder space to trigger animation
                    />
                    <label htmlFor="" className="login-username-label">نام کاربری</label>
                    <input
                        type="text"
                        className="login-email-input"
                        placeholder=" "  // Keep placeholder space to trigger animation
                    />
                    <label htmlFor="" className="login-email-label">ایمیل</label>
                    <input
                        type="text"
                        className="login-password-input"
                        placeholder=" "  // Keep placeholder space to trigger animation
                    />
                    <label htmlFor="" className="login-password-label">پسورد</label>
                    <div className="login-checkbox">
                        <input type="checkbox" />
                        <label htmlFor="">قوانین را مطالعه کرده ام و می پذیرم.</label>
                    </div>
                    <button className="login-button"></button>
                </div>
            </div>
        </div>
    );
};

export default Login;
