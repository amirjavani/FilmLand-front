import React, { useState } from 'react';
import './FilterNav.css'; 

const FilterNav = () => {
  const [activeFilter, setActiveFilter] = useState('همه');

  const filters = [
    { label: 'همه', value: 'all' },
    { label: 'فیلم', value: 'movie' },
    { label: 'سریال', value: 'series' },
    { label: 'انیمیشن', value: 'animation' },
    { label: 'انیمیشن سریالی', value: 'animationSeries' }
  ];

  return (
    <div className="filter-nav">
      <div className="filter-nav-buttons">
        {filters.map((filter) => (
          <button
            key={filter.value}
            className={`filter-button ${activeFilter === filter.label ? 'active' : ''}`}
            onClick={() => setActiveFilter(filter.label)}
          >
            {filter.label}
          </button>
        ))}
      </div>
      <div className="filter-options">
        <button className="filter-search">جستجو</button>
        <div className="filter-more-options">
          <span>فیلتر های بیشتر</span>
          <div className="filter-more-toggle"></div>
        </div>
        <div className="filter-toggles">
          <div className="filter-toggle">
            <span>پخش آنلاین</span>
            <input type="checkbox" />
          </div>
          <div className="filter-toggle">
            <span>زیرنویس فارسی</span>
            <input type="checkbox" />
          </div>
          <div className="filter-toggle">
            <span>دوبله فارسی</span>
            <input type="checkbox" />
          </div>
          <div className="filter-dropdown">
            <span>ژانر: درام</span>
            <select>
              <option value="drama">درام</option>
              <option value="comedy">کمدی</option>
              <option value="action">اکشن</option>
              {/* Add more genres as needed */}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterNav;
