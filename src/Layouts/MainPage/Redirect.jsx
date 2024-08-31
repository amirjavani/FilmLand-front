import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./redirect.css";

function Redirect() {

    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate("/"); // Change this path to the desired route
        }, 5000);

        return () => clearTimeout(timer); // Cleanup the timer if the component unmounts
    }, [navigate]);
    return (
        <div className="redirect-main">
            <div className="redirect-center">
                <p className="redirect-title">خرید شما با موفقیت انجام شد</p>
                <p className="redirect-text">چند ثانیه دیگر به صفحه اصلی منقل میشوید...</p>
            </div>
        </div>
    )
};

export default Redirect;