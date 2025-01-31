import React, { useEffect, useRef, useState } from "react";
import "./MovieStyle.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import { EffectCoverflow } from "swiper/modules";
import "swiper/css/effect-coverflow";
import "swiper/swiper-bundle.css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import {
  FetchSingleMovie,
  FetchMovieFile
} from "../../../Utility/SingleMovieAPI";
import { Url } from "../../../Utility/URL";
import { useParams, useNavigate, json } from 'react-router-dom';
import NotFoundPage from './NotFoundPage';
import "./FilterNav.css";
import { FetchCategory, FetchGenre } from "../../../Utility/MovieAPI";
import { AddComment, GetAllComment, CheckProfanity, CheckFeeling, GetMovieComments } from "../../../Utility/CommentAPI";
import { CheckSubscription } from "../../../Utility/SubscriptionAPI";
import moment from 'moment-jalaali';
import { useLocation } from 'react-router-dom';
import ScrollableMenu from "./ScrollableMenu";
import $ from 'jquery';
import Cookies from 'js-cookie';


function Movie() {
  const { id } = useParams();
  const [error, setError] = useState(false);
  const [singleMovie, setSingleMovie] = useState([]);
  const [MovieFile, setMovieFile] = useState([]);
  const [seasons, setSeasons] = useState([]);


  const [Comments, setCommetns] = useState([]);

  const dropdownRef = useRef(null);
  const dropdownRef2 = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuOpen2, setMenuOpen2] = useState(false);
  const [activeOption, setActiveOption] = useState("dubbed");
  const [checkSub, setCheckSub] = useState(false);

  const [activeOption2, setActiveOption2] = useState(true);
  const [idLogin, setIdLogin] = useState(false);

  const [activeFilter, setActiveFilter] = useState("1");
  const [Categories, setCategories] = useState([]);
  const [Genres, setGenres] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [openIndex, setOpenIndex] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  const dubbing = [
    {
      "english": "dubbed",
      "persian": "دوبله"
    },
    {
      "english": "hard subtitle",
      "persian": "زیرنویس چسبیده"
    },
    {
      "english": "original",
      "persian": "زبان اصلی"
    }
  ];

  const censore = [
    {
      "english": true,
      "persian": "سانسور شده"
    },
    {
      "english": false,
      "persian": "سانسور نشده"
    }
  ]

  const toPersianDigits = (num) => {
    const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    return num.toString().replace(/\d/g, (digit) => persianDigits[digit]);
  };

  const toggleOpen = (index) => {
    if (openIndex === index) {
      setOpenIndex(null); // Close if the same comment is clicked again
    } else {
      setOpenIndex(index); // Open the clicked comment's reply box
    }
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

  const toggleMenu2 = () => {
    setMenuOpen2(prevMenuOpen => !prevMenuOpen);
  };

  const handleOptionClick = (value) => {
    setActiveOption(value);
    toggleMenu();
  };

  const handleOptionClick2 = (value) => {
    setActiveOption2(value);
    toggleMenu2();
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setMenuOpen(false);
    }
    if (dropdownRef2.current && !dropdownRef2.current.contains(event.target)) {
      setMenuOpen2(false);
    }
  };

  const Send = () => {
    navigate(`/movies?category=${activeFilter}&genre=${activeOption}`);
    window.location.reload();
  };

  const fetchData = async () => {
    try {
      const response = await FetchSingleMovie({ id });
      setSingleMovie(response.data);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setError(true); // Set error state to true on 400 error
      } else {
        console.error("Error fetching data:", error);
      }
    }

    try {
      const response = await FetchMovieFile({ id });
      setMovieFile(response.data);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setError(true); // Set error state to true on 400 error
      } else {
        console.error("Error fetching data:", error);
      }
    }

    try {
      const response = await GetMovieComments(id);
      setCommetns(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }


  };



  const SendComment = async (commentId) => {
    try {
      var profanityRes = await CheckProfanity({ "text": commentText });
      // console.log(response.data['profanity_detected'])
      if (profanityRes.data['profanity_detected'] === true) {
        alert("پس از تایید ادمین کامنت شما ثبت میشود")
      }
      else {
        alert("کامنت شما ثبت شد")
      }

    } catch (error) {
      console.error("Error fetching data:", error);
    }
    try {
      var feelingRes = await CheckFeeling({ "text": commentText });
      console.log(feelingRes.data)

    } catch (error) {
      console.error("Error fetching data:", error);
    }



    var formData = new json();
    formData = {
      "commentWriter": "User",
      "commentText": commentText,
      "movieRef": id,
      "replyTo": commentId,
      "isProfanity": profanityRes.data['profanity_detected'],
      "feeling": String(feelingRes.data['sentiment']),
      "isAnswered": false
    }
    console.log(formData)
    try {

      const response = await AddComment(formData);
      window.location.reload();

    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  // const SendComment2 = async (commentId) => {
  //   try {
  //     var response = await CheckProfanity({"text": commentText});
  //     // console.log(response.data['profanity_detected'])
  //     if (response.data['profanity_detected'] === true){
  //       alert("پس از تایید ادمین کامنت شما ثبت میشود")
  //     }
  //     else{
  //       alert("کامنت شما ثبت شد")
  //     }

  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }

  //   var formData = new json();
  //   formData = {
  //     "commentWriter": "User",
  //     "commentText": commentText,
  //     "movieRef": id,
  //     "replyTo": commentId,
  //     "isProfanity": response.data['profanity_detected']
  //   }
  //   console.log(formData)
  //   try {

  //     const response = await AddComment(formData);
  //     window.location.reload();

  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // }

  const textareaRef = useRef(null);
  const textareaRef2 = useRef(null);
  const textareaRef3 = useRef(null);

  const CheckSubscription2 = async (idCooky) => {
    try {
      const response = await CheckSubscription(idCooky);
      console.log(response.data)

      setCheckSub(response.data);
      if (response.data == false) {
        let downloads = document.querySelector(".downloads");
        downloads.style.display = "none";
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }

  }

  // useEffect(() => {


  //   // Cleanup event listener on component unmount
  //   return () => {
  //   };
  // }, []);

  useEffect(() => {

    moment.loadPersian({ dialect: 'persian-modern', usePersianDigits: true });

    const textarea = textareaRef.current;
    const idCooky = Cookies.get('id');
    console.log(idCooky)

    if (idCooky != null) {
      setIdLogin(true)
      CheckSubscription2(idCooky)
    }
    else {

      let downloads = document.querySelector(".downloads");
      downloads.style.display = "none";
      let sendCommentContainer = document.querySelector(".send-comment-container");
      sendCommentContainer.style.display = "none";
      const commentSendElements = document.querySelectorAll(".comment-send");

      // اعمال style به تمام المان‌ها
      commentSendElements.forEach(element => {
        element.style.display = "none";
      });
    }

    const resizeTextarea = () => {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    };

    // Initial resize to fit any pre-filled content
    // resizeTextarea();

    // Add event listener for input event
    textarea.addEventListener("input", resizeTextarea);

    if (id) {
      fetchData();
    }
    fetch();

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      textarea.removeEventListener("input", resizeTextarea);

    };
  }, [id]);

  if (MovieFile.filter((episdoe) => { return ((episdoe.movieFileDubbing === activeOption) && (episdoe.movieFileChapter === activeFilter) && (episdoe.movieFileIsCensored === activeOption2)) }).length === 0) {
    $('#epmty-movie-file').show();
  } else $('#epmty-movie-file').hide()

  let moreInfo, downloadContainer, comments;

  const handleMoreInfoClick = (event) => {
    event.preventDefault();
    comments = document.querySelector(".comments");
    moreInfo = document.querySelector(".more-info");
    downloadContainer = document.querySelector(".downloads-container");
    let circle1 = document.getElementById("MoreInfoCircle");
    let circle2 = document.getElementById("DownloadCircle");
    let circle3 = document.getElementById("CommentCircle");
    circle1.hidden = false;
    circle2.hidden = true;
    circle3.hidden = true;
    comments.style.display = "none";
    moreInfo.style.display = "block";
    downloadContainer.style.display = "none";
  };

  const handleDownloadClick = (event) => {
    event.preventDefault();
    comments = document.querySelector(".comments");
    moreInfo = document.querySelector(".more-info");
    downloadContainer = document.querySelector(".downloads-container");
    let circle1 = document.getElementById("MoreInfoCircle");
    let circle2 = document.getElementById("DownloadCircle");
    let circle3 = document.getElementById("CommentCircle");
    circle1.hidden = true;
    circle2.hidden = false;
    circle3.hidden = true;
    comments.style.display = "none";
    moreInfo.style.display = "none";
    downloadContainer.style.display = "flex";
    const isFilm = MovieFile.some(file => file.movieFileChapter === "0");
    let downloadsFilm = document.getElementById("downloads-film");
    let downloadsSerial = document.getElementById("downloads-serial");
    if (isFilm) {
      let filterNavContainer = document.querySelector(".filter-nav-container2");
      filterNavContainer.style.display = "none";
      downloadsSerial.style.display = "none";
      downloadsFilm.style.display = "block";
    } else {
      if (MovieFile.length > 0) {
        const maxSeason = MovieFile.reduce(
          (max, episode) =>
            parseInt(episode.movieFileChapter) > max
              ? parseInt(episode.movieFileChapter)
              : max,
          parseInt(MovieFile[0].movieFileChapter)
        );

        let s = [];
        for (let index = 1; index <= maxSeason; index++) {
          s.push(String(index));
        }
        setSeasons(s);
      } else {
        setSeasons(['1']);
      }
    }
    console.log(MovieFile)
    const element = document.querySelector('.filter-nav-buttons-container2');
    if (element) {
      const width = element.offsetWidth;
      let left = document.getElementById("left");
      let right = document.getElementById("right");
      if (left) {
        left.style.marginRight = width - 35 + 'px';
      }
      if (width > 450) {
        right.style.display = 'none';
      }
      if (width > 450) {
        left.style.display = 'none';
      }
    }
  };

  const handleCommentClick = (event) => {
    event.preventDefault();
    comments = document.querySelector(".comments");
    moreInfo = document.querySelector(".more-info");
    downloadContainer = document.querySelector(".downloads-container");
    let circle1 = document.getElementById("MoreInfoCircle");
    let circle2 = document.getElementById("DownloadCircle");
    let circle3 = document.getElementById("CommentCircle");
    circle1.hidden = true;
    circle2.hidden = true;
    circle3.hidden = false;
    comments.style.display = "flex";
    moreInfo.style.display = "none";
    downloadContainer.style.display = "none";
  };

  const tabMenuRef = useRef(null);

  const handleClick = (value) => {
    setActiveFilter(value);
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

  if (error) {
    return <NotFoundPage />; // Render NotFoundPage component on 400 error
  }
  return (
    <>
      <div
        className="top"
        style={{
          '--bg-image-url': `url(${Url + singleMovie.cartPicPath})`
        }}
      >
        <div className="container2">
          <div className="internal-container">
            <div className="img">
              <img src={Url + singleMovie.cartPicPath} alt="" />
            </div>
            <div className="detail">
              <div className="title">
                <h4 className="fs-5 font-bold">
                  {singleMovie.movieTitle}
                  {/* دانلود انیمیشن پاندای کونگ فو کار 4 Kung Fu Panda 4 2024 دوبله
                  فارسی */}
                </h4>
                <div className="movie2-category">
                  <h1 className="movie2-category-title">
                    {singleMovie.categoryTitle}
                  </h1>
                </div>
              </div>
              <div className="summary">
                <div className="summary-title">
                  <div className="line" />
                  <h3 className="font-bold fs-5">خلاصه :</h3>
                </div>
                <div className="summary-body">
                  <p>
                    {singleMovie.movieSummary} ...
                    {/* پس از اینکه پو برای تبدیل شدن به رهبر معنوی دره صلح انتخاب
                    شد، او باید یک جنگجوی اژدها را بیابد و آموزش دهد، در حالی که
                    یک جادوگر شرور قصد دارد همه شر */}
                  </p>
                  <div className="movie2-genre-container">
                    {singleMovie.genreTitle && Array.isArray(singleMovie.genreTitle) && singleMovie.genreTitle.length > 0 ? (
                      singleMovie.genreTitle.map((genre, index) => (
                        <div className="movie2-genre" key={index}>
                          {genre}
                        </div>
                      ))
                    ) : (
                      <div>No genres available</div> // Optionally handle the case where there are no genres
                    )}
                  </div>
                </div>

              </div>
              <div className="interest">
                <div className="like" title="لایک">
                  <i className="fa fa-thumbs-up" aria-hidden="true" />
                  <span>{singleMovie.movieLike}</span>
                </div>
                <div className="interested" title="اضافه کردن به علاقه مندی ها">
                  <i className="fa fa-star" aria-hidden="true" />
                </div>
                <div className="dislike">
                  <i className="fa fa-thumbs-down" aria-hidden="true" />
                  <span>{singleMovie.movieDislike}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="movie-menu">
        <a className="item" href="" onClick={handleMoreInfoClick}>
          <h6>اطلاعات بیشتر</h6>
          <div className="circle" id="MoreInfoCircle"></div>
        </a>
        <a className="item" href="" onClick={handleDownloadClick}>
          <h6>دانلود</h6>
          <div hidden className="circle" id="DownloadCircle"></div>
        </a>
        <a className="item" href="" onClick={handleCommentClick}>
          <h6>کامنت ها</h6>
          <div hidden className="circle" id="CommentCircle"></div>
        </a>
      </div>
      <div className="body-middle">
        <h1 className="title-movie fs-4 font-bold">
          {singleMovie.movieTitle}
          {/* دانلود انیمیشن پاندای کونگ فو کار 4 Kung Fu Panda 4 2024 دوبله فارسی */}
        </h1>
        {/* {showMoreInfo && ( */}
        <div className="more-info">
          <div className="info">
            <div className="info-head">
              <h2 className="fs-3 ml-8 mr-2 font-bold">اطلاعات</h2>
              <div className="line2"></div>
            </div>
            <div className="info-body">
              <div className="about">
                <div className="summary-title">
                  <div className="line" />
                  <h3 className="font-bold fs-5">درباره :</h3>
                </div>
                <div className="summary-body">
                  <p>
                    {singleMovie.movieAbout} ...
                    {/* پس از اینکه پو برای تبدیل شدن به رهبر معنوی دره صلح انتخاب
                    شد، او باید یک جنگجوی اژدها را بیابد و آموزش دهد، در حالی که
                    یک جادوگر شرور قصد دارد همه شر */}
                  </p>
                </div>
              </div>
              <div className="about-detail">
                <ul>
                  <li>
                    <div className="info-item-head">
                      <i class="fa fa-language" aria-hidden="true"></i>
                      <h2>زبان اصلی</h2>
                    </div>
                    <div className="info-item-body">
                      <h2>{singleMovie.movieOriginalLanguage}</h2>
                    </div>
                  </li>
                  <li>
                    <div className="info-item-head">
                      <i class="fa fa-calendar" aria-hidden="true"></i>
                      <h2>سال انتشار</h2>
                    </div>
                    <div className="info-item-body">
                      <h2>{singleMovie.movieReleaseDate}</h2>
                    </div>
                  </li>
                  <li>
                    <div className="info-item-head">
                      <i class="fa fa-flag" aria-hidden="true"></i>
                      <h2>محصول کشور</h2>
                    </div>
                    <div className="info-item-body">
                      <h2>{singleMovie.movieCountryProduct}</h2>
                    </div>
                  </li>
                  <li>
                    <div className="info-item-head">
                      <i class="fa fa-video-camera" aria-hidden="true"></i>
                      <h2>کارگردان</h2>
                    </div>
                    <div className="info-item-body">
                      <h2>
                        {singleMovie.movieDirector
                          ? singleMovie.movieDirector.split(',').map((director, index) => (
                            <p key={index}>{director.trim()}</p>
                          ))
                          : 'No directors available'}
                      </h2>
                    </div>
                  </li>
                  <li>
                    <div className="info-item-head">
                      <i class="fa fa-pencil" aria-hidden="true"></i>
                      <h2>نویسنده</h2>
                    </div>
                    <div className="info-item-body">
                      <h2>
                        {singleMovie.movieAuthor
                          ? singleMovie.movieAuthor.split(',').map((author, index) => (
                            <p key={index}>{author.trim()}</p>
                          ))
                          : 'No directors available'}
                      </h2>
                    </div>
                  </li>
                  <li>
                    <div className="info-item-head">
                      <i class="fa fa-usd" aria-hidden="true"></i>
                      <h2>بودجه</h2>
                    </div>
                    <div className="info-item-body">
                      <h2>${singleMovie.movieBudget},000,000</h2>
                    </div>
                  </li>
                  <li>
                    <div className="info-item-head">
                      <i class="fa fa-clock" aria-hidden="true"></i>
                      <h2>مدت زمان</h2>
                    </div>
                    <div className="info-item-body">
                      <h2>{singleMovie.movieDuration} دقیقه</h2>
                    </div>
                  </li>
                  <li>
                    <div className="info-item-head">
                      <i class="fa fa-user" aria-hidden="true"></i>
                      <h2>رده سنی</h2>
                    </div>
                    <div className="info-item-body">
                      <h2>{singleMovie.movieAgeCategory}</h2>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="actors-and-pictures">
            <div className="actors">
              <div className="info-head">
                <h2 className="fs-3 ml-8 mr-2 font-bold">بازیگران</h2>
                <div className="line3"></div>
              </div>
              <Swiper
                modules={[Pagination, Navigation, Autoplay]}
                spaceBetween={40}
                slidesPerView={2}
                loop={true}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                centerSlide="true"
                fade="true"
                grabCursor="true"
                breakpoints={{
                  1200: {
                    slidesPerView: 3,
                  },
                }}
                className="slide-actor">
                {singleMovie.actorPicPath && singleMovie.actorPicPath.length > 0 ? (
                  singleMovie.actorPicPath.map((actorPic, index) => (
                    <SwiperSlide key={index} className="actor-cart">
                      <div className="actor-container">
                        <img src={Url + actorPic} />
                        <div className="actor-name">
                          <div className="info-item-head">
                            <h2>{singleMovie.actorName[index]}</h2>
                          </div>
                          {/* <div className="info-item-body mt-2">
                          <h2>Shifu</h2>
                        </div> */}
                        </div>
                      </div>
                    </SwiperSlide>
                  ))
                ) : (
                  <p>No images available</p>
                )}
                {/* {actors.map((actor, index) => (
                  <SwiperSlide key={index} className="actor-cart">
                    <div className="actor-container">
                      <img src={actor} alt={actor.split(".")[0]} />
                      <div className="actor-name">
                        <div className="info-item-head">
                          <h2>Dustin Hoffman</h2>
                        </div>
                        <div className="info-item-body mt-2">
                          <h2>Shifu</h2>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))} */}
              </Swiper>
            </div>
            <div className="pictures">
              <div className="info-head">
                <h2 className="fs-3 ml-8 mr-2 font-bold">عکس ها</h2>
                <div className="line3"></div>
              </div>
              <Swiper
                effect={"coverflow"}
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={"auto"}
                initialSlide={2}
                coverflowEffect={{
                  rotate: 0,
                  stretch: 0,
                  depth: 300,
                  modifier: 1,
                  slideShadows: true,
                }}
                modules={[EffectCoverflow, Pagination]}
                className="mySwiper">
                {singleMovie.galleryPicPath && singleMovie.galleryPicPath.length > 0 ? (
                  singleMovie.galleryPicPath.map((pic, index) => (
                    <SwiperSlide key={index} className="pic-swiper-slide">
                      <img
                        src={Url + pic}
                      />
                    </SwiperSlide>
                  ))
                ) : (
                  <p>No images available</p>
                )}
              </Swiper>
            </div>
          </div>
        </div>
        {/* )} */}
        {/* {showDownload && ( */}
        <div className="downloads-container">
          <div className="info-head">
            <h2 className="fs-3 ml-8 mr-4 font-bold">دانلود</h2>
            <div className="line2"></div>
          </div>
          {checkSub == false && (
            <div className="movie-download-without-sub">
              <h2>برای دانلود باید اشتراک خریداری کرده باشید</h2>
            </div>
          )}
          <div className="downloads">
            {/* <div className="filter-download">
              <section class="main-container">
                <div class="tab-nav-bar">
                  <div class="tab-navigation">

                    <ul
                      ref={tabMenuRef}
                      onMouseMove={MouseMoveTabMenu}
                      onMouseUp={MouseUpTabMenu}
                      onMouseDown={MouseDownTabMenu}
                      class="tab-menu">
                      <i
                        ref={btnRightRef}
                        onClick={handleLeftClick}
                        class="bi bi-chevron-compact-right  top-3 absolute hover:text-black duration-300" style={{ fontSize: '30px' }}></i>
                      <i
                        ref={btnLeftRef}
                        onClick={handleRightClick}
                        class="bi bi-chevron-compact-left left-0 top-3  absolute hover:text-black duration-300" style={{ fontSize: '30px' }}></i>
                      <li class="tab-btn active">فصل 1</li>
                      <li class="tab-btn">فصل 2</li>
                      <li class="tab-btn">فصل 3</li>
                      <li class="tab-btn">فصل 4</li>
                      <li class="tab-btn">فصل 5</li>
                      <li class="tab-btn">فصل 6</li>
                      <li class="tab-btn">فصل 7</li>
                      <li class="tab-btn">فصل 8</li>
                      <li class="tab-btn">فصل 9</li>
                      <li class="tab-btn">فصل 10</li>
                      <li class="tab-btn">فصل 11</li>
                      <li class="tab-btn">فصل 12</li>
                    </ul>
                  </div>
                </div>
              </section>
              <div className="filter-movie">
                <div className="dropdown">
                  <div
                    className={`select ${menuOpen ? "select-clicked" : ""}`}
                    onClick={toggleMenu}>
                    <span className="selected">{selectedOption}</span>
                    <div
                      className={`caret ${menuOpen ? "caret-rotate" : ""
                        }`}></div>
                  </div>
                  <ul className={`menu ${menuOpen ? "menu-open" : ""}`}>
                    {options.map((option) => (
                      <li
                        key={option}
                        className={option === activeOption ? "active2" : ""}
                        onClick={() => handleOptionClick(option)}>
                        {option}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="dropdown">
                  <div
                    className={`select ${menuOpen2 ? "select-clicked" : ""}`}
                    onClick={toggleMenu2}>
                    <span className="selected">{selectedOption2}</span>
                    <div
                      className={`caret ${menuOpen2 ? "caret-rotate" : ""
                        }`}></div>
                  </div>
                  <ul className={`menu ${menuOpen2 ? "menu-open" : ""}`}>
                    {options2.map((option2) => (
                      <li
                        key={option2}
                        className={option2 === activeOption2 ? "active2" : ""}
                        onClick={() => handleOptionClick2(option2)}>
                        {option2}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div> */}
            {/* <p>{IsFilm.toString()}</p> */}



            <div className="filter-nav-container2">
              <div className="filter-nav-filters2">
                <div ref={tabMenuRef} className="filter-nav-buttons-container2">

                  {/* <i id="left" onClick={scrollLeft} className="uil uil-angle-left left-btn2"></i> */}
                  <div className="filter-nav-buttons2">
                    {seasons.map((season, index) => (
                      <button
                        key={index}
                        className={`filter-nav-button2 ${activeFilter === season ? "active" : ""}`}
                        onClick={() => handleClick(season)}
                      >
                        <p>فصل {season}</p>
                      </button>
                    ))}
                  </div>
                  {/* <i id="right" onClick={scrollRight} className="uil uil-angle-right right-btn2"></i> */}
                </div>
                <div className="filter-nav-option2">
                  <div ref={dropdownRef} className="filter-nav-dropdown2">
                    <div
                      className={`filter-nav-select ${menuOpen ? "filter-nav-select-clicked" : ""}`}
                      onClick={toggleMenu}
                    >
                      {dubbing.map((d) => (
                        (d.english === activeOption) && (
                          <p key={d.persian}>{d.persian}</p>
                        )
                      ))}
                      <div className={`filter-nav-caret ${menuOpen ? "filter-nav-caret-rotate" : ""}`}></div>
                    </div>
                    <ul className={`filter-nav-menu2 ${menuOpen ? "filter-nav-menu-open2" : ""}`}>
                      {dubbing.map((d) => (
                        <li
                          key={d.persian}
                          className={d.english === activeOption ? "filter-nav-active" : ""}
                          onClick={() => handleOptionClick(d.english)}
                        >
                          {d.persian}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div ref={dropdownRef2} className="filter-nav-dropdown2">
                    <div
                      className={`filter-nav-select ${menuOpen2 ? "filter-nav-select-clicked" : ""}`}
                      onClick={toggleMenu2}
                    >
                      {censore.map((c) => (
                        (c.english === activeOption2) && (
                          <p key={c.persian}>{c.persian}</p>
                        )
                      ))}
                      <div className={`filter-nav-caret ${menuOpen2 ? "filter-nav-caret-rotate" : ""}`}></div>
                    </div>
                    <ul className={`filter-nav-menu2 ${menuOpen2 ? "filter-nav-menu-open2" : ""}`}>
                      {censore.map((c) => (
                        <li
                          key={c.persian}
                          className={c.english === activeOption2 ? "filter-nav-active" : ""}
                          onClick={() => handleOptionClick2(c.english)}
                        >
                          {c.persian}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

              </div>

            </div>


            <div id="downloads-film" style={{ display: "none" }}>
              {MovieFile.length ? MovieFile.map((file, index) => (
                <div key={index} className="download-container">
                  <div className="part-movie">
                    <h2 className="text-lg font-semibold">
                      {file.movieFileDubbing === "dubbed" ? "دوبله" : file.movieFileDubbing === "hard subtitle" ? "زیرنویس چسبیده" : "زبان اصلی"} - {file.movieFileIsCensored === false ? "سانسور نشده" : "سانسور شده"}
                    </h2>
                  </div>
                  <div className="download-div">
                    {file.movieFileSubtitleURL && (
                      <a href={file.movieFileSubtitleURL} className="subtitle">
                        <i className="fa fa-download" aria-hidden="true"></i>
                        <p className="text-sm mr-1">زیرنویس</p>
                      </a>
                    )}
                    {file.movieFile_MovieURL
                      .map((movieURL, index) => ({
                        movieURL,
                        quality: file.movieFileQuality[index],
                      }))
                      .sort((a, b) => a.quality - b.quality) // Sorting in increasing order of quality
                      .map((fileObj, index2) => (
                        <a href={fileObj.movieURL} key={index2} className="download">
                          {/* <div className="download"> */}
                          <i className="fa fa-download" aria-hidden="true"></i>
                          <p className="text-sm mr-1">دانلود {fileObj.quality}</p>
                          {/* </div> */}
                        </a>
                      ))}
                  </div>
                </div>
              )) : <div className="download-container">قسمتی وجود ندارد.</div>}
            </div>
            <div id="downloads-serial">
              <div id="epmty-movie-file" className="download-container">
                <strong className="mx-auto my-auto text-[18px]">قسمتی وجود ندارد.</strong>
              </div>
              {MovieFile.map((file, index) => (
                (file.movieFileDubbing === activeOption) && (file.movieFileChapter === activeFilter) && (file.movieFileIsCensored === activeOption2) && (
                  <div key={index} className="download-container">
                    <div className="part-movie">
                      <h2 className="text-lg font-semibold">
                        قسمت {file.movieFileEpisode}
                      </h2>
                    </div>
                    <div className="download-div">
                      {file.movieFileSubtitleURL && (
                        <a href={file.movieFileSubtitleURL} className="subtitle">
                        <i className="fa fa-download" aria-hidden="true"></i>
                        <p className="text-sm mr-1">زیرنویس</p>
                      </a>
                      )}
                      {file.movieFile_MovieURL
                        .map((movieURL, index) => ({
                          movieURL,
                          quality: file.movieFileQuality[index],
                        }))
                        .sort((a, b) => a.quality - b.quality) // Sorting in increasing order of quality
                        .map((fileObj, index2) => (
                          <a href={fileObj.movieURL} key={index2} className="download">
                            {/* <div className="download"> */}
                            <i className="fa fa-download" aria-hidden="true"></i>
                            <p className="text-sm mr-1">دانلود {fileObj.quality}</p>
                            {/* </div> */}
                          </a>
                        ))}
                    </div>
                  </div>
                )

              ))}

            </div>
          </div>
        </div>

        <div className="comments">

          <div className="info-head">
            <h2 className="fs-3 ml-8 mr-2 font-bold">کامنت ها</h2>
            <div className="line2"></div>
          </div>
          {!idLogin && (
            <div className="movie-download-without-sub">
              <h2>برای ارسال دیدگاه باید وارد شوید</h2>
            </div>
          )}
          <div className="send-comment-container">
            <div className="comment-name">
              <h2>User</h2>
            </div>
            <textarea
              id="auto-resizing-textarea"
              ref={textareaRef}
              placeholder="کامنت شما"
              onChange={(e) => setCommentText(e.target.value)}>
            </textarea>
            <div className="comment-send" onClick={() => SendComment(null)}>
              <h2>ارسال</h2>
            </div>
          </div>
          {Comments.map((comment, index) => (
            (comment.replyTo == "00000000-0000-0000-0000-000000000000" && (
              <div className="comments-bottom">
                <div style={{backgroundColor:comment.feeling === '0' ? 'rgb(155 4 4 / 44%)' : comment.feeling === '1' ? 'rgb(99 99 120 / 37%)' : 'rgb(6 90 4 / 52%)'}} className={`comment-container  bg-opacity-40`}>
                  <div className="header-comment">
                    <div className="comment-name">
                      <h2>{comment.commentWriter}</h2>
                    </div>
                    <div className="comment-date">
                      <h2>{moment(comment.commentCreateDate).format('jD jMMMM jYYYY HH:mm')}</h2>
                    </div>
                  </div>
                  <div className="comment">
                    <p>
                      {comment.commentText}
                    </p>
                  </div>
                  <div className="footer-comment">
                    <div className="comment-reactions">
                      <i class="fa-regular fa-thumbs-up"></i>
                      <p>{toPersianDigits(comment.commentLike)}</p>
                      <i class="fa-regular fa-thumbs-down"></i>
                      <p>{toPersianDigits(comment.commentDisLike)}</p>
                    </div>
                    {idLogin && (
                      <div className="comment-send" onClick={() => toggleOpen(index)}>
                        <h2>پاسخ</h2>
                      </div>
                    )}

                  </div>
                </div>
                <div className={`send-comment-container2 ${openIndex === index ? 'open' : ''}`}
                  style={{ maxHeight: openIndex === index ? '500px' : '0px' }}>
                  <div className="comment-name2">
                    <h2>{comment.commentWriter}</h2>
                  </div>
                  <textarea
                    id="auto-resizing-textarea"
                    ref={textareaRef2}
                    placeholder="کامنت شما"
                    onChange={(e) => setCommentText(e.target.value)}></textarea>
                  <div className="comment-send2" onClick={() => SendComment(comment.commentId)}>
                    <h2>ارسال</h2>
                  </div>
                </div>
                {Comments.map((comment2, index) => (
                  (comment2.replyTo === comment.commentId && (
                    <div style={{backgroundColor:comment.feeling === '0' ? 'rgb(155 4 4 / 44%)' : comment.feeling === '1' ? 'rgb(99 99 120 / 37%)' : 'rgb(6 90 4 / 52%)'}} className={`reply-container   bg-opacity-40`}>
                      <div className="header-comment">
                        <div className="comment-name">
                          <h2>{comment2.commentWriter}</h2>
                        </div>
                        <div className="comment-date">
                          <h2>{moment(comment2.commentCreateDate).format('jD jMMMM jYYYY HH:mm')}</h2>
                        </div>
                      </div>
                      <div className="comment">
                        <p>
                          {comment2.commentText}
                        </p>
                      </div>
                      <div className="footer-comment">
                        <div className="comment-reactions">
                          <i class="fa-regular fa-thumbs-up"></i>
                          <p>{toPersianDigits(comment2.commentLike)}</p>
                          <i class="fa-regular fa-thumbs-down"></i>
                          <p>{toPersianDigits(comment2.commentDisLike)}</p>
                        </div>
                      </div>
                    </div>
                  ))
                ))}
              </div>
            ))
          ))}
        </div>
      </div>
    </>
  );
}

export default Movie;
