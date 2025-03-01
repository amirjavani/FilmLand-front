import React, { useEffect, useRef, useState } from "react";
import {
  useNavigate,
  Route,
  Routes,
  Outlet,
  useParams,
  Link,
} from "react-router-dom";
import {
  FetchMiniBanner,
  AddMiniBanner,
  RemoveMiniBanner,
  ToggelMiniBanner,
  EditMiniBanner,
  GetMiniBannerItem,
} from "../../Utility/miniBannerAPI";
import { Url } from "../../Utility/URL";

function MiniBannerManagement() {
  const [miniBannersList, setMiniBannersList] = useState([]);
  const navigate = useNavigate();
  const url = Url;

  const fetchData = async () => {
    try {
      const response = await FetchMiniBanner();
      setMiniBannersList(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const Refresh = () => {
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  const statusToggel = async (objID) => {
    await ToggelMiniBanner({ id: objID });
    Refresh();
  };

  const deleting = async (objID) => {
    try {
      await RemoveMiniBanner({ id: objID });
      Refresh();
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  return (
    <div>
      <p className="fs-2"> مینی بنر</p>
      <p className="fs-5"> فقط 4 تای اول نمایش داده میشوند</p>
      <Outlet></Outlet>
      <Routes>
        <Route path=":id" element={<AddObject></AddObject>}></Route>
        <Route path="add" element={<AddObject></AddObject>}></Route>

        <Route
          path=""
          element={
            <div
              className="my-5 relative overflow-x-auto  overflow-y-auto shadow rounded border-1 border-zinc-800"
              style={{ maxHeight: "60vh" }}>
              <table className="w-full text-sm text-left rtl:text-right  ">
                <thead className="text-xs text-gray-900  border-b ">
                  <tr className="sticky top-0 bg-slate-400 border-b ">
                    <th
                      scope="col"
                      className="px-6 py-3 border-l border-neutral-500">
                      ردیف
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 border-l border-neutral-500">
                      عنوان
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 border-l border-neutral-500">
                      ترتیب
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 border-l border-neutral-500">
                      لینک
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 border-l border-neutral-500">
                      عکس
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 border-l border-neutral-500">
                      تاریخ
                    </th>
                    <th scope="col" className="w-10 text-center">
                      <button
                        onClick={() => {
                          navigate("/dashboard/MiniBannerManagement/add");
                        }}
                        className="bi bi-plus btn btn-success">
                        {" "}
                      </button>
                    </th>
                  </tr>
                </thead>
                {miniBannersList && (
                  <tbody>
                    {miniBannersList.map((obj, index) => {
                      if (obj.miniBannerIsDelete === false) {
                        return (
                          <tr
                            key={index}
                            className="bg-white text-black border-b border-black">
                            <th
                              scope="row"
                              className="px-6 py-4 font-bold text-gray-900 whitespace-nowrap border-l border-neutral-500 ">
                              {index + 1}
                            </th>
                            <td className="px-6 py-4 border-l border-neutral-500">
                              {obj.miniBannerName}
                            </td>
                            <td className="px-6 py-4 border-l border-neutral-500">
                              {obj.miniBannerSort}
                            </td>
                            <td className="px-6 py-4 border-l border-neutral-500">
                              {obj.miniBannerUrl}
                            </td>
                            <td className=" py-2 border-l border-neutral-500">
                              <img
                                className="max-h-20 mx-auto"
                                src={`${
                                  url +
                                  obj.filePath +
                                  obj.fileName +
                                  obj.fileExtension
                                }`}
                                alt={`${
                                  url +
                                  obj.filePath +
                                  obj.fileName +
                                  obj.fileExtension
                                }`}></img>
                            </td>
                            <td className="px-6 py-4 border-l border-neutral-500">
                              {obj.miniBannerCreateDate}
                            </td>
                            <td className="flex flex-col p-1 w-20">
                              <button
                                onClick={() => statusToggel(obj.miniBannerId)}
                                className={`btn ${
                                  obj.miniBannerIsStatus
                                    ? "btn-success"
                                    : "btn-danger"
                                } py-1`}>
                                {obj.miniBannerIsStatus ? "فعال" : "غیرفعال"}
                              </button>
                              <Link
                                to={`/dashboard/MiniBannerManagement/${obj.miniBannerId}`}
                                className="bi bi-pencil-square btn btn-secondary py-1 my-1"></Link>
                              <i
                                className="bi bi-trash btn btn-danger py-1 my"
                                onClick={() => deleting(obj.miniBannerId)}></i>
                            </td>
                          </tr>
                        );
                      } else return null;
                    })}
                  </tbody>
                )}
              </table>
            </div>
          }
        />
      </Routes>
    </div>
  );
}

function AddObject(props) {
  const [name, setName] = useState("");
  const [sort, setSort] = useState("");
  const [link, setLink] = useState("");
  const [imageURL, setImageURL] = useState("");
  const { id } = useParams();
  const [file, setFile] = useState("");
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (id) {
      get({ id: id });
    } else {
      console.log("not found");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const get = async (props) => {
    const res = await GetMiniBannerItem({ id: props.id });
    setName(res.data.miniBannerName);
    setLink(res.data.miniBannerUrl);
    setSort(res.data.miniBannerSort);
    setImageURL(Url + res.data.filePath + res.data.fileName + res.data.fileExtension);
  };
 


  const navigate = useNavigate();
  const Submit = async (event) => {
    navigate("/dashboard/MiniBannerManagement");
    event.preventDefault();
    const formData = new FormData();
    formData.append("miniBannerName", name);
    formData.append("miniBannerSort", sort);
    formData.append("miniBannerUrl", link);
    formData.append("File", file);
    event.preventDefault();
    try {
      if (id) {
        await EditMiniBanner({
          id: id,
          formData: formData,
        });
        window.location.reload();
      } else {
        await AddMiniBanner({ formData: formData });
        window.location.reload();
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
        <input
          type="text "
          required
          className="form-control "
          placeholder="عنوان..."
          value={name}
          onChange={(e) => setName(e.target.value)}></input>
        <input
          type="text "
          required
          className="form-control "
          placeholder="ترتیب(عدد)..."
          value={sort}
          onChange={(e) => setSort(e.target.value)}></input>
        <input
          type="text "
          required
          className="form-control  "
          placeholder="لینک..."
          value={link}
          onChange={(e) => setLink(e.target.value)}></input>
        <input
          type="file"
          required
          onChange={handleFileChange}
          ref={fileInputRef}
        />
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

export default MiniBannerManagement;
