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
  AddActor,
  FetchActorsList
} from "../../Utility/ActorApi";
import { Url } from "../../Utility/URL";

function ActorManagement() {
  const [actorList, setActorList] = useState([]);
  const navigate = useNavigate();
  const url = Url;

  const fetchData = async () => {
    try {
      const response = await FetchActorsList();
      setActorList(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };



  useEffect(() => {
    fetchData();
  }, []);

  const statusToggel = async (objID) => {
    // await ToggelSlide({ id: objID });
    // Refresh();
  };

  const deleting = async (objID) => {
    // try {
    //   await RemoveSlide({ id: objID });
    //   Refresh();
    // } catch (error) {
    //   console.error("Error deleting item:", error);
    // }
  };

  return (
    <div>
      <p className="fs-2"> بازیگران</p>
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

                      className="col-2 px-6 py-3 border-l border-neutral-500">
                      ردیف
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 border-l border-neutral-500">
                      نام
                    </th>

                    <th scope="col" className="w-10 text-center">
                      <button
                        onClick={() => {
                          navigate("/dashboard/actorManagement/add");
                        }}
                        className="bi bi-plus btn btn-success">
                        {" "}
                      </button>
                    </th>
                  </tr>
                </thead>
                {actorList && (
                  <tbody>
                    {actorList.map((obj, index) => {
                      if (!obj.actorIsDelete) {
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
                              {obj.actorName}
                            </td>
                            
                            
                            
                            <td className="flex flex-col p-1 w-20">
                              
                              <Link
                                to={`/dashboard/actorManagement/${obj.actorId}`}
                                className="bi bi-pencil-square btn btn-secondary py-1 my-1"></Link>
                              <i
                                className="bi bi-trash btn btn-danger py-1 my"
                                onClick={() => deleting(obj.actorId)}></i>
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
  const [actorName, setActorName] = useState("");
  const [actorBirthDay, setActorBirthDay] = useState("");
  const [actorProfession, setActorProfession] = useState("");
  const [actorBio, setActorBio] = useState("");
  const [actorPicture, setActorPicture] = useState("");
  const [imageURL, setImageURL] = useState("");
  const { id } = useParams();
  const [file, setFile] = useState("");
  const fileInputRef = useRef(null);
  const navigate = useNavigate();


  useEffect(() => {
    if (id) {
      //get({ id: id });
    } else {
      console.log("not found");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const get = async (props) => {
    // const res = await GetActorItem({ id: props.id });
    // setName(res.data.actorName);
    // setLink(res.data.actorUrl);
    // setSort(res.data.actorSort);
    // fetchImage(res);
  };
  const fetchImage = async (res) => {
    try {
      const response = await fetch(
        Url + res.data.filePath + res.data.fileName + res.data.fileExtension,
        { method: "GET"}
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
    
    event.preventDefault();
    const formData = new FormData();
    formData.append("ActorName", actorName);
    formData.append("ActorBirthDay", actorBirthDay);
    formData.append("ActorProfession", actorProfession);
    formData.append("ActorBio", actorBio);
    formData.append("ActorPicture", actorPicture);
    event.preventDefault();
    try {
      if (id) {
        // await EditSlide({
        //   id: id,
        //   formData: formData,
        // });
      } else {
         await AddActor({ formData: formData });
         //window.location.reload()
         //navigate("/dashboard/actorManagement");
      }
    } catch (error) {
      console.error("Error adding menu item:", error);
    }
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
          placeholder="نام بازیگر..."
          value={actorName}
          onChange={(e) => setActorName(e.target.value)}></input>
        <input
          type="date"
          required
          className="form-control "
          placeholder="تاریخ تولد..."
          value={actorBirthDay}
          onChange={(e) => setActorBirthDay(e.target.value)}></input>
        <input
          type="text "
          required
          className="form-control  "
          placeholder="حرفه..."
          value={actorProfession}
          onChange={(e) => setActorProfession(e.target.value)}></input>
        <textarea
          type="text "
          required
          className="form-control  "
          placeholder="درباره..."
          value={actorBio}
          onChange={(e) => setActorBio(e.target.value)}></textarea>
        <span className="ml-auto my-3">عکس بازیگر:</span>
        <input
          type="file"
          required
          onChange={(event)=>{setActorPicture(event.target.files[0])}}
          ref={fileInputRef}
        />
        {actorPicture ? (
          <img className="rounded-full h-[100px]"
            alt={URL.createObjectURL(actorPicture)}
            src={URL.createObjectURL(actorPicture)}></img>
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

export default ActorManagement;
