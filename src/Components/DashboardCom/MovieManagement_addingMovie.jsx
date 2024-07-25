import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Url } from "../../Utility/URL";
import CustomInput from "../GeneralComponents/CustomInput";
import { FetchCategory, AddingMovie, FetchGenre } from "../../Utility/MovieAPI";

function AddMovie(props) {
  const [englishName, setEnglishName] = useState("");
  const [persianName, setPersianName] = useState("");
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [status, setStatus] = useState("");
  const [country, setCountry] = useState("");
  const [Category, setCategory] = useState("");
  const [Categories, setCategories] = useState([]);
  const [Genre, setGenre] = useState("");
  const [Genres, setGenres] = useState([]);
  const [language, setLanguage] = useState("");
  const [IMDB, setIMDB] = useState("");
  const [autorsList, setAutorsList] = useState([]);
  const [director, setDirector] = useState("");
  const [duration, setDuration] = useState("");
  const [summary, setSummary] = useState("");
  const [about, setAbout] = useState("");
  const [budget, setBudget] = useState("");

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

  const get = async (props) => {
    //   const res = await GetSliderItem({ id: props.id });
    //   setName(res.data.sliderName);
    //   setLink(res.data.sliderUrl);
    //   setSort(res.data.sliderSort);
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
    navigate("/dashboard/sliderManagement");
    event.preventDefault();
    //   const formData = new FormData();
    //   formData.append("SliderName", name);
    //   formData.append("SliderSort", sort);
    //   formData.append("SliderUrl", link);
    //   formData.append("File", file);
    event.preventDefault();
    try {
      if (id) {
        //   await EditSlide({
        //     id: id,
        //     formData: formData,
        //   });
      } else {
        //    await AddSlide({ formData: formData });
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
                    <option className="font-bold" value={cat.categoryTitle}>
                      {cat.categoryTitle}
                    </option>
                  );
                })}
            </select>
          </div>
          <div className="col-2 ">
            <label className="mb-2 text-lg font-medium text-gray-900 ">
              ژانر{" "}
            </label>
            <select
              value={Genre}
              onChange={(e) => setGenre(e.target.value)}
              className="font-bold w-full p-2 mb-6 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 ">
              <option selected value="">
                --
              </option>
              {Genres &&
                Genres.map((genre) => {
                  return (
                    <option className="font-bold" value={genre.genreTitle}>
                      {genre.genreTitle}
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
              <option className="font-bold" value="US">
                درحال بخش
              </option>
              <option className="font-bold" value="CA">
                تمام شده{" "}
              </option>
              <option className="font-bold" value="FR">
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
              <option className="font-bold" value="US">
                فارسی
              </option>
              <option className="font-bold" value="CA">
                آلمانی{" "}
              </option>
              <option className="font-bold" value="FR">
                انگلیسی
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

        {file ? (
          <img
            alt={URL.createObjectURL(file)}
            src={URL.createObjectURL(file)}></img>
        ) : (
          imageURL && <img alt="pic2" src={imageURL}></img>
        )}
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
