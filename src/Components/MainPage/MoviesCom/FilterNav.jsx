import React, { useState } from "react";
import "./FilterNav.css";

const FilterNav = () => {
  const [activeFilter, setActiveFilter] = useState("همه");

  const filters = [
    { label: "همه", value: "all" },
    { label: "فیلم", value: "movie" },
    { label: "سریال", value: "series" },
    { label: "انیمیشن", value: "animation" },
  ];

  return (
    <div className="filter-nav m-3 flex-col sm:flex-row gap-4">
      <div className="filter-nav-buttons flex-auto  rounded-3xl  p-2 ">
        {filters.map((filter) => (
          <button
            key={filter.value}
            className={`filter-button  ${
              activeFilter === filter.label ? "active" : ""
            }`}
            onClick={() => setActiveFilter(filter.label)}>
            {filter.label}
          </button>
        ))}
      </div>
      <div className="filter-options flex-auto">
        <div className="filter-more-options">
          <span>فیلتر های بیشتر</span>
          <div className="filter-more-toggle"></div>
        </div>
        <div className="filter-toggles">
          <div className="filter-dropdown">
            <span>ژانر: </span>
            <select>
              <option value="drama">درام</option>
              <option value="comedy">کمدی</option>
              <option value="action">اکشن</option>
              {/* Add more genres as needed */}
            </select>
          </div>
        </div>
        <div className="filter-search  my-auto transition-all">
          <button className=" hidden md:block">جستجو</button>
          <i className="bi bi-search block md:hidden"></i>
        </div>
      </div>
    </div>
  );
};

export default FilterNav;
