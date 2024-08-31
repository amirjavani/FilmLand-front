import React, { useState, useRef, useEffect } from "react";
import "./FilterNav.css";
import { useNavigate } from "react-router-dom";
import { FetchCategory, FetchGenre } from "../../../Utility/MovieAPI";
import { useLocation } from 'react-router-dom';

const FilterNav = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const tabMenuRef = useRef(null);
  const dropdownRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeOption, setActiveOption] = useState("all");
  const navigate = useNavigate();
  const [Categories, setCategories] = useState([]);
  const [Genres, setGenres] = useState([]);
  const location = useLocation();

  const handleClick = (value) => {
    setActiveFilter(value);
  };

  const fetch = async () => {
    const cat = await FetchCategory();
    setCategories(cat.data);
    const genre = await FetchGenre();
    setGenres(genre.data);
  };

  const toggleMenu = () => {
    setMenuOpen(prevMenuOpen => !prevMenuOpen);
  };

  const handleOptionClick = (value) => {
    setActiveOption(value);
    toggleMenu(); 
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

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setMenuOpen(false);
    }
  };

  const Send = () => {
    navigate(`/search?category=${activeFilter}&genre=${activeOption}`);
    window.location.reload();
  };

  useEffect(() => {
    
    fetch();
    const queryParams = new URLSearchParams(location.search);
    const category = queryParams.get('category');
    setActiveFilter(category);
    const genre = queryParams.get('genre');
    setActiveOption(genre);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [location.search]);

  return (
    <div className="filter-nav-container">
      <div className="filter-nav-filters">
        <div ref={tabMenuRef} className="filter-nav-buttons-container">
          <i onClick={scrollRight} className="uil uil-angle-right right-btn2"></i>

          <div className="filter-nav-buttons">
            {Categories.map((category) => (
              <button
                key={category.categoryParameter}
                className={`filter-nav-button ${activeFilter === category.categoryParameter ? "active" : ""}`}
                onClick={() => handleClick(category.categoryParameter)}
              >
                <p>{category.categoryTitle}</p>
              </button>
            ))}
          </div>

          <i onClick={scrollLeft} className="uil uil-angle-left left-btn2"></i>
        </div>
        <div ref={dropdownRef} className="filter-nav-dropdown">
          <div
            className={`filter-nav-select ${menuOpen ? "filter-nav-select-clicked" : ""}`}
            onClick={toggleMenu}
          >
            {Genres.map((genre) => (
              <span key={genre.genreParameter}>{genre.genreParameter === activeOption ? genre.genreTitle : null}</span>
            ))}
            <div className={`filter-nav-caret ${menuOpen ? "filter-nav-caret-rotate" : ""}`}></div>
          </div>
          <ul className={`filter-nav-menu ${menuOpen ? "filter-nav-menu-open" : ""}`}>
            {Genres.map((genre) => (
              <li
                key={genre.genreParameter}
                className={genre.genreParameter === activeOption ? "filter-nav-active" : ""}
                onClick={() => handleOptionClick(genre.genreParameter)}
              >
                {genre.genreTitle}
              </li>
            ))}
          </ul>
        </div>
      </div>
      
      <div className="filter-nav-search">
        <button onClick={Send}>جستجو</button>
        {/* <i className="bi bi-search block md:hidden"></i> */}
      </div>
    </div>
  );
};

export default FilterNav;
