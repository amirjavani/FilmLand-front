import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Url } from "../../Utility/URL";
import CustomInput from "../GeneralComponents/CustomInput";
import {
  FetchCategory,
  AddingMovie,
  FetchGenre,
  GetOneMovie,
} from "../../Utility/MovieAPI";

function AddMovie({ refresh }) {
  const [englishName, setEnglishName] = useState("");
  const [persianName, setPersianName] = useState("");
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [status, setStatus] = useState("");
  const [country, setCountry] = useState("");
  const [ageCategoty, setAgeCategory] = useState("");
  const [Category, setCategory] = useState("");
  const [Categories, setCategories] = useState([]);
  const [movieGenre, setMovieGenre] = useState([]);
  const [Genres, setGenres] = useState([]);
  const [language, setLanguage] = useState("");
  const [IMDB, setIMDB] = useState("");
  const [movieAuthor, setMovieAuthor] = useState("");
  const [actorIds, setActorIds] = useState([
    "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  ]);
  const [director, setDirector] = useState("");
  const [duration, setDuration] = useState("");
  const [summary, setSummary] = useState("");
  const [about, setAbout] = useState("");
  const [budget, setBudget] = useState("");
  const [cartPic, setCartPic] = useState("");
  const [galleryPics, setGalleryPics] = useState([]);

  const [link, setLink] = useState("");
  const [imageURL, setImageURL] = useState("");
  const { id } = useParams();
  const [file, setFile] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch();

    if (id) {
      get({ id: id });
    } else {
      console.log("not found");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetch = async () => {
    const cat = await FetchCategory();
    setCategories(cat.data);
    const genre = await FetchGenre();
    setGenres(genre.data);
  };

  const genreFunction = ({ value }) => {
    value && setMovieGenre([...movieGenre, value]);
    console.log(movieGenre);
  };

  const get = async (props) => {
    const res = await GetOneMovie({ id: props.id });
    console.log(res.data.movieId);
    setPersianName(res.data.moviePersionName);
    setEnglishName(res.data.movieEnglishName);
    setTitle(res.data.movieTitle);
    setYear(res.data.movieReleaseDate);
    setStatus(res.data.movieStatus);
    setCountry(res.data.movieCountryProduct);
    setLanguage(res.data.movieOriginalLanguage);
    setIMDB(res.data.movieIMDBScore);
    setDirector(res.data.movieDirector);
    setDuration(res.data.movieDuration);
    setSummary(res.data.movieSummary);
    setAbout(res.data.movieAbout);
    setBudget(res.data.movieBudget);
    setCategory(res.data.categoryId);
    setMovieGenre(res.data.genreIds);
    setAgeCategory(res.data.movieAgeCategory);
    setMovieAuthor(res.data.movieAuthor)
    setActorIds(['asdasdasd']);
    //   fetchImage(res);
  };

  const fetchImage = async (res) => {
    try {
      const response = await fetch(
        Url + res.data.filePath + res.data.fileName + res.data.fileExtension,
        { method: "GET" }
      );

      const blob = response.blob();
      console.log(response.ok);
      const imagefile = new File(
        [blob],
        res.data.fileName + res.data.fileExtension,
        { type: getMimeType(res.data.fileExtension) }
      );

      setImageURL(URL.createObjectURL(imagefile));
      console.log(imagefile);
    } catch (error) {}
  };

  const getMimeType = (extension) => {
    const mimeTypes = {
      ".jpg": "image/jpeg",
      ".jpeg": "image/jpeg",
      ".png": "image/png",
      ".gif": "image/gif",
      ".pdf": "application/pdf",
    };
    return mimeTypes[extension.toLowerCase()] || "application/octet-stream";
  };

  const Submit = async (event) => {
    navigate("/dashboard/MovieManagement");
    console.log(JSON.stringify(movieGenre));
    console.log(galleryPics);
    event.preventDefault();
    const formData = new FormData();
    formData.append("MoviePersionName", persianName);
    formData.append("MovieEnglishName", englishName);
    formData.append("MovieTitle", title);
    formData.append("MovieReleaseDate", year);
    formData.append("MovieStatus", status);
    formData.append("MovieCountryProduct", country);
    formData.append("CategoryId", Category);
    movieGenre.forEach((genreId) => {
      formData.append("GenreIds", genreId);
    });
    formData.append("MovieAgeCategory", ageCategoty);
    formData.append("MovieOriginalLanguage", language);
    formData.append("MovieIMDBScore", IMDB);
    formData.append("MovieAuthor", movieAuthor);
    formData.append("MovieDirector", director);
    formData.append("MovieDuration", duration);
    formData.append("MovieSummary", summary);
    formData.append("MovieAbout", about);
    formData.append("MovieBudget", budget);
    formData.append("CartPicture", cartPic);
    // formData.append("GalleryPictures", galleryPics);
    for (let i = 0; i < galleryPics.length; i++) {
      formData.append("GalleryPictures", galleryPics[i]);
    }
    actorIds.forEach((actorId) => {
      formData.append("ActorIds", actorId);
    });

    try {
      if (id) {
        //   await EditSlide({
        //     id: id,
        //     formData: formData,
        //   });
      } else {
        const res = await AddingMovie({ formData: formData });
        console.log(res.status);
      }
    } catch (error) {
      console.error("Error adding menu item:", error);
    }
  };

  const handleFileChange = (event) => {
    const f = event.target.files[0];
    console.log(f);
    setFile(f);
  };

  return (
    <div className="flex justify-center m-12">
      <form
        className=" border-1 border-gray-700 rounded w-100 justify-center items-center flex flex-col gap-2 p-3 m-10"
        onSubmit={Submit}>
        <label className="fs-3">{!id ? "افزودن" : "ویرایش"}</label>
        <div className="flex w-100 flex-row ">
          <CustomInput
            className={"col-2 "}
            value={title}
            setValue={setTitle}
            title={"title"}
            type={"text"}></CustomInput>
          <CustomInput
            className={"col-3 "}
            value={persianName}
            setValue={setPersianName}
            title={"اسم فارسی"}
            type={"text"}></CustomInput>

          <CustomInput
            className={"col-3 "}
            value={englishName}
            setValue={setEnglishName}
            title={"اسم انگلیسی"}
            type={"text"}></CustomInput>
          <CustomInput
            className={"col-2"}
            value={country}
            setValue={setCountry}
            title={"کشور سازنده"}
            type={"text"}></CustomInput>
          <CustomInput
            className={"col-1"}
            value={year}
            setValue={setYear}
            title={"سال تولید"}
            type={"number"}></CustomInput>
          <CustomInput
            className={"col-1"}
            value={IMDB}
            setValue={setIMDB}
            title={"IMDB"}
            type={"number"}></CustomInput>
        </div>
        <div className="flex flex-row w-full gap-2">
          <div className="col-2 ">
            <label className="mb-2 text-lg font-medium text-gray-900 ">
              دسته بندی
            </label>
            <select
              value={Category}
              onChange={(e) => setCategory(e.target.value)}
              className="font-bold w-full p-2 mb-6 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 ">
              <option selected value="">
                --
              </option>
              {Categories &&
                Categories.map((cat) => {
                  return (
                    <option className="font-bold" value={cat.categoryId}>
                      {cat.categoryTitle}
                    </option>
                  );
                })}
            </select>
          </div>
          <div className="col-2">
            <label className=" mb-2 text-lg font-medium text-gray-900 ">
              وضعیت
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              id="small"
              className="font-bold w-full p-2 mb-6 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 ">
              <option selected value="">
                --
              </option>
              <option className="font-bold" value="درحال بخش">
                درحال بخش
              </option>
              <option className="font-bold" value="تمام شده">
                تمام شده{" "}
              </option>
              <option className="font-bold" value="کنسل شده">
                کنسل شده
              </option>
            </select>
          </div>
          <div className="col-1 ">
            <label className=" mb-2 text-lg font-medium text-gray-900 ">
              زبان{" "}
            </label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              id="small"
              className="font-bold w-full p-2 mb-6 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 ">
              <option selected value="">
                --
              </option>
              <option className="font-bold" value="فارسی">
                فارسی
              </option>
              <option className="font-bold" value="آلمانی">
                آلمانی{" "}
              </option>
              <option className="font-bold" value="انگلیسی">
                انگلیسی
              </option>
            </select>
          </div>
          <div className="col-1 ">
            <label className=" mb-2 text-lg font-medium text-gray-900 ">
              رده سنی{" "}
            </label>
            <select
              value={ageCategoty}
              onChange={(e) => setAgeCategory(e.target.value)}
              id="small"
              className="font-bold w-full p-2 mb-6 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 ">
              <option selected value="">
                --
              </option>
              <option className="font-bold" value="NC-17">
                NC-17
              </option>
              <option className="font-bold" value="G">
                G{" "}
              </option>
              <option className="font-bold" value="PG">
                PG{" "}
              </option>
              <option className="font-bold" value="PG-13">
                PG-13{" "}
              </option>
              <option className="font-bold" value="R">
                R{" "}
              </option>
            </select>
          </div>
          <div className="flex flex-row pt-8 flex-auto">
            <CustomInput
              className={"col-4 "}
              value={director}
              setValue={setDirector}
              title={"کارگردان"}
              type={"text"}></CustomInput>
            <CustomInput
              className={"col-4 "}
              value={duration}
              setValue={setDuration}
              title={"زمان (دقیقه)"}
              type={"number"}></CustomInput>
            <CustomInput
              className={"col-4 "}
              value={budget}
              setValue={setBudget}
              title={"بودجه (میلون دلار)"}
              type={"number"}></CustomInput>
          </div>
        </div>
        <CustomInput
          className={"col-2 ml-auto"}
          value={movieAuthor}
          setValue={setMovieAuthor}
          title={"نویسنده"}
          type={"text"}></CustomInput>
        <div className="flex flex-row ml-auto w-full">
          <div className="col-1">
            <label className="mb-2 text-lg font-medium text-gray-900 ">
              ژانر{" "}
            </label>
            <select
              value="--"
              onChange={(e) => genreFunction({ value: e.target.value })}
              className="font-bold w-full p-2 mb-6 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 ">
              <option selected value="">
                --
              </option>
              {Genres &&
                Genres.map((genre) => {
                  return (
                    !movieGenre.includes(genre.genreId) && (
                      <option className="font-bold" value={genre.genreId}>
                        {genre.genreTitle}
                      </option>
                    )
                  );
                })}
            </select>
          </div>
          <div className="overflow-auto flex flex-row col-11">
            {movieGenre &&
              Genres.map((genre) => {
                return (
                  movieGenre.includes(genre.genreId) && (
                    <div
                      className="border rounded border-slate-700 p-2 my-auto mx-1 duration-300 hover:bg-slate-700 hover:cursor-pointer hover:text-white"
                      onClick={() =>
                        setMovieGenre(
                          movieGenre.filter((e) => e !== genre.genreId)
                        )
                      }>
                      {genre.genreTitle}
                    </div>
                  )
                );
              })}
          </div>
        </div>
        <div className="w-full">
          <label
            for="message"
            class="block mb-2 text-lg font-medium text-gray-900">
            درباره
          </label>
          <textarea
            id="message"
            rows="2"
            class="block p-2.5 w-full text-lg text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
            placeholder="..."
            value={about}
            onChange={(e) => setAbout(e.target.value)}></textarea>
        </div>
        <div className="w-full">
          <label
            for="message"
            class="block mb-2 text-lg font-medium text-gray-900">
            خلاصه
          </label>
          <textarea
            id="message"
            rows="2"
            class="block p-2.5 w-full text-lg text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
            placeholder="..."
            value={summary}
            onChange={(e) => setSummary(e.target.value)}></textarea>
        </div>
        <div className="flex flex-row border-none">
          <input
            className="border-none"
            type="file"
            onChange={(f) => setCartPic(f.target.files[0])}
          />
          {cartPic && (
            <img
              className="w-[120px]"
              src={URL.createObjectURL(cartPic)}
              alt="cartpic"
            />
          )}
        </div>
        <div className="flex flex-row border-none">
          <input
            className="border-none"
            multiple
            type="file"
            onChange={(f) => setGalleryPics(f.target.files)}
          />
          {galleryPics &&
            Array.from(galleryPics).map((pic) => {
              return (
                <img
                  className="w-[120px]"
                  src={URL.createObjectURL(pic)}
                  alt="gallery"
                />
              );
            })}
        </div>

        <div className=" flex gap-5 m-2  justify-center w-100">
          <button className="btn btn-success flex-auto" type="submit">
            تایید
          </button>
          <button className="btn btn-danger" onClick={() => navigate(-1)}>
            برگشت
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddMovie;
