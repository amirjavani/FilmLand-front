import React, { useEffect, useState } from "react";
import { useHistory,useNavigate, Route, Routes, Outlet, useParams } from "react-router-dom";
import { AddMenuItem, FetchListMenu } from "../../Utility/api";

function MenuManagement(props) {
  const navigate = useNavigate();
  const [listMenu, setListMenu] = useState([]);

  const fetchData = async () => {
    try {
      const response = await FetchListMenu();
      setListMenu(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  function statusToggel(objID) {
    setListMenu((pre) => {
      const newlist = listMenu.map((obj) => {
        if (obj.id === objID) {
          return { ...obj, isStatus: !obj.isStatus };
        }
        return obj;
      });
      return newlist;
    });
  }

  function deleting(objID) {
    setListMenu((pre) => {
      const newlist = listMenu.map((obj) => {
        if (obj.id === objID) {
          return { ...obj, isDelete: !obj.isDelete };
        }
        return obj;
      });
      return newlist;
    });
  }

  return (
    <div>
      <p className="fs-4">فهرست سایت</p>
      <Outlet></Outlet>
      <Routes>
        <Route path="add" element={<AddObject></AddObject>}></Route>
        <Route path=":id" element={<AddObject></AddObject>}></Route>
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
                      تاریخ
                    </th>
                    <th scope="col" className="w-10 text-center">
                      <button
                        onClick={() => {
                          navigate("/dashboard/menuManagement/add");
                        }}
                        className="bi bi-plus btn btn-success">
                        {" "}
                      </button>
                    </th>
                  </tr>
                </thead>
                {listMenu && (
                  <tbody>
                    {listMenu.map((obj, index) => {
                      if (obj.isDelete === false) {
                        return (
                          <tr
                            key={index}
                            className="bg-white text-black border-b border-black">
                            <th
                              scope="row"
                              className="px-6 py-4 font-bold text-gray-900 whitespace-nowrap border-l border-neutral-500 ">
                              {obj.id}
                            </th>
                            <td className="px-6 py-4 border-l border-neutral-500">
                              {obj.name}
                            </td>
                            <td className="px-6 py-4 border-l border-neutral-500">
                              {obj.sort}
                            </td>
                            <td className="px-6 py-4 border-l border-neutral-500">
                              {obj.url}
                            </td>
                            <td className="px-6 py-4 border-l border-neutral-500">
                              {obj.createDate}
                            </td>
                            <td className="flex flex-col p-1 w-20">
                              <button
                                onClick={() => statusToggel(obj.id)}
                                className={`btn ${
                                  obj.isStatus ? "btn-success" : "btn-danger"
                                } py-1`}>
                                {obj.isStatus ? "فعال" : "غیرفعال"}
                              </button>
                              <i className="bi bi-pencil-square btn btn-secondary py-1 my-1"></i>
                              <i
                                className="bi bi-trash btn btn-danger py-1 my"
                                onClick={() => deleting(obj.id)}></i>
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
  const { id }= useParams()
  useEffect(() => {
    if (id){
      console.log(id)
    }else{
      console.log('not found')
    }
  }, []);
  const navigate = useNavigate();
  const Submit =async () => {
    try {
      navigate("/dashboard/menuManagement");
      const res = await AddMenuItem({ name: name, sort: sort, link: link });
      
    } catch (error) {
      console.error("Error adding menu item:", error);
    }finally {
      alert(`${name} added`);
      
      
      
    }
  };

  

  return (
    <div className="flex justify-center m-12">
    {id}
      <form
        className=" border-1 border-gray-700 rounded w-50 justify-center items-center flex flex-col gap-2 p-3"
        onSubmit={Submit}>
        <label className="fs-3"> افزودن</label>
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
        <div className=" flex gap-5 m-2  justify-center w-100">
          <button className="btn btn-success flex-auto" type="submit">
            تایید
          </button>
          <button
            className="btn btn-danger"
            onClick={() => navigate("/dashboard/menuManagement")}>
            برگشت
          </button>
        </div>
      </form>
    </div>
  );
}

export default MenuManagement;
