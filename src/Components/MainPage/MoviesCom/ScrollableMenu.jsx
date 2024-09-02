import React, { useEffect, useRef, useState } from "react";
import "./ScrollableMenu.css";

const ScrollableMenu = ({ Categories, SendActiveFilter, GetActiveFilter }) => {
    const tabMenuRef = useRef(null);

    const handleClick = (value) => {
        SendActiveFilter(value);
    };

    const scrollRight = () => {
        if (tabMenuRef.current) {
            tabMenuRef.current.scrollLeft += 150;
        }
    };

    const scrollLeft = () => {
        if (tabMenuRef.current) {
            tabMenuRef.current.scrollLeft -= 150;
        }
    };

    useEffect(() => {

    }, [SendActiveFilter]);

    return (
        <div>
            <div ref={tabMenuRef} className="filter-nav-buttons-container">
                <i onClick={scrollLeft} className="uil uil-angle-left left-btn2"></i>
                <div className="filter-nav-buttons">
                    {Categories.map((category) => (
                        <button
                            key={category.categoryParameter}
                            className={`filter-nav-button ${GetActiveFilter === category.categoryParameter ? "active" : ""}`}
                            onClick={() => handleClick(category.categoryParameter)}
                        >
                            <p>{category.categoryTitle}</p>
                        </button>
                    ))}
                </div>
                <i onClick={scrollRight} className="uil uil-angle-right right-btn2"></i>
            </div>
        </div>
    );
};

export default ScrollableMenu;
