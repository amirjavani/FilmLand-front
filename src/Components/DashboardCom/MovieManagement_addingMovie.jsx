import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Url } from "../../Utility/URL";
import CustomInput from "../GeneralComponents/CustomInput";

function AddMovie(props) {
  const [englishName, setEnglishName] = useState("");
  const [persianName, setPersianName] = useState("");
  const [year, setYear] = useState("");
  const [country, setCountry] = useState("");
  const [language, setLanguage] = useState("");
  const [IMDB, setIMDB] = useState("");
  const [category, setCategory] = useState("");
  const [director, setDirector] = useState("");
  const [autorsList, setAutorsList] = useState([]);
  const [summary, setSummary] = useState("");
  const [about, setAbout] = useState("");
  const [budget, setBudget] = useState("");


  const [link, setLink] = useState("");
  const [imageURL, setImageURL] = useState("");
  const { id } = useParams();
  const [file, setFile] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      get({ id: id });
    } else {
      console.log("not found");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        className=" border-1 border-gray-700 rounded w-50 justify-center items-center flex flex-col gap-2 p-3"
        onSubmit={Submit}>
        <label className="fs-3">{!id ? "افزودن" : "ویرایش"}</label>
        <div className="flex w-100 flex-row gap-3">
          <input
            type="text"
            required
            className="form-control flex-auto"
            placeholder="اسم فارسی..."
            value={persianName}
            onChange={(e) => setPersianName(e.target.value)}></input>
          <input
            type="text"
            required
            className="form-control "
            placeholder="اسم انگلیسی..."
            value={englishName}
            onChange={(e) => setEnglishName(e.target.value)}></input>
          <input
            type="number"
            required
            className="form-control "
            placeholder="IMDB..."
            value={IMDB}
            onChange={(e) => setIMDB(e.target.value)}></input>
            <CustomInput value={IMDB} setValue={setIMDB} title={'IMDB'} type={'number'}></CustomInput>
        </div>
        {/* <input
          type="text "
          required
          className="form-control "
          placeholder="ترتیب(عدد)..."
          value={}
          onChange={(e) => setSort(e.target.value)}></input> */}
        <input
          type="text "
          required
          className="form-control  "
          placeholder="لینک..."
          value={link}
          onChange={(e) => setLink(e.target.value)}></input>
        <input type="file" required onChange={handleFileChange} />
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
