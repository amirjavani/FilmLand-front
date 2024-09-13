import React, { useEffect } from "react";
import "./about.css";
import logo from "../../Assets/Header/logo.png";


function About() {

    useEffect(() => {

    }, []);

    return (
        <div className="about-container">
            <div className="about-inner-container">
                <img src={logo} alt="" />
                <p>ما، مهدی محمدیها و امیر جوانی، با افتخار یک سایت پیشرفته فیلم و سریال را طراحی کرده‌ایم که بر اساس تحلیل کامنت‌ها و استفاده از هوش مصنوعی برای بهبود تجربه کاربری ساخته شده است. هدف ما ارائه محتوای باکیفیت، مدیریت حرفه‌ای نظرات کاربران، و ایجاد فضایی است که علاقه‌مندان به فیلم و سریال بتوانند به راحتی اطلاعات مورد نیاز خود را پیدا کنند و نظرات خود را با دیگران به اشتراک بگذارند. این پروژه ترکیبی از نوآوری‌های تکنولوژیک در زمینه تحلیل زبان طبیعی و هوش مصنوعی است که تجربه کاربری را به سطح بالاتری می‌برد.</p>
                <div className="about-email-container">
                    <div className="about-email-inner-container">
                        <p>مهدی محمدیها</p>
                        <p>09109935732</p>
                        <p>m.mohamadiha81@gmail.com</p>

                    </div>
                    <div className="about-email-inner-container">
                        <p>امیر مهدی جوانی</p>
                        <p>09108511227</p>
                        <p>amir.1380123.amj@gmail.com</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default About;
