import React, { useState, useRef, useEffect } from "react";
import "./FilterNav.css";
import { useNavigate } from "react-router-dom";
import { FetchCategory, FetchGenre } from "../../../Utility/MovieAPI";
import { useLocation } from 'react-router-dom';
import ScrollableMenu from "./ScrollableMenu";
import searchIcon from "../../../Assets/search-solid.svg";

const FilterNav = () => {
  const dropdownRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeOption, setActiveOption] = useState("all");
  const [activeFilter, setActiveFilter] = useState("all");
  const [activeSearch, setActiveSearch] = useState("");
  const navigate = useNavigate();
  const [Categories, setCategories] = useState([]);
  const [Genres, setGenres] = useState([]);
  const location = useLocation();

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

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setMenuOpen(false);
    }
  };

  const Send = () => {
    navigate(`/movies?category=${activeFilter}&genre=${activeOption}&search=${activeSearch}`);
    window.location.reload();
  };

  useEffect(() => {
    fetch();
    const queryParams = new URLSearchParams(location.search);
    const category = queryParams.get('category');
    setActiveFilter(category);
    console.log("aaaaa")
    const genre = queryParams.get('genre');
    setActiveOption(genre);
    const search = queryParams.get('search');
    setActiveSearch(search);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [location.search]);

  return (
    <div className="filter-nav-container">
      <div className="filter-nav-filters">
        <ScrollableMenu Categories={Categories} SendActiveFilter={setActiveFilter} GetActiveFilter={activeFilter} />
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
        <div className="filter-input-container">
          <input
            type="text"
            value={activeSearch}
            onChange={(e) => setActiveSearch(e.target.value)} />
          <img className="search-icon" src={searchIcon}></img>
        </div>
        <div onClick={Send} className="filter-nav-search">
          <button>جستجو</button>
          {/* <i className="bi bi-search block md:hidden"></i> */}
        </div>
      </div>

    </div>
  );
};

export default FilterNav;
