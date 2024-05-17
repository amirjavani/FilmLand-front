import React, { useEffect, useState } from "react";
import {
  useNavigate,
  Route,
  Routes,
  Outlet,
  useParams,
  Link,
} from "react-router-dom";
import {
  AddMenuItem,
  EditMenuItem,
  FetchListMenu,
  GetListMenuItem,
  RemoveMenuItem,
  ToggelMenuItem,
} from "../../Utility/MainMenuAPi";

function MenuManagement(props) {
  const navigate = useNavigate();
  const [listMenu, setListMenu] = useState([]);

  const fetchData = async () => {
    try {
      const response = await FetchListMenu();
      console.log(response.data);
      setListMenu(response.data);
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
    await ToggelMenuItem({ id: objID });
    Refresh();

  };

  const deleting = async (objID) => {
    try {
      await RemoveMenuItem({ id: objID });
      Refresh();
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  return (
    <div>
      <p className="fs-4">فهرست سایت</p>
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
                      if (obj.siteMenuIsDelete === false) {
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
                              {obj.siteMenuName}
                            </td>
                            <td className="px-6 py-4 border-l border-neutral-500">
                              {obj.siteMenuSort}
                            </td>
                            <td className="px-6 py-4 border-l border-neutral-500">
                              {obj.siteMenuUrl}
                            </td>
                            <td className="px-6 py-4 border-l border-neutral-500">
                              {obj.siteMenuCreateDate}
                            </td>
                            <td className="flex flex-col p-1 w-20">
                              <button
                                onClick={() => statusToggel(obj.siteMenuId)}
                                className={`btn ${
                                  obj.siteMenuIsStatus
                                    ? "btn-success"
                                    : "btn-danger"
                                } py-1`}>
                                {obj.siteMenuIsStatus ? "فعال" : "غیرفعال"}
                              </button>
                              <Link
                                to={`/dashboard/menuManagement/${obj.siteMenuId}`}
                                className="bi bi-pencil-square btn btn-secondary py-1 my-1"></Link>
                              <i
                                className="bi bi-trash btn btn-danger py-1 my"
                                onClick={() => deleting(obj.siteMenuId)}></i>
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
  const { id } = useParams();
  useEffect(() => {
    if (id) {
      get({ id: id });
    } else {
      console.log("not found");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const get = async (props) => {
    const res = await GetListMenuItem({ id: props.id });
    setName(res.data.siteMenuName);
    setLink(res.data.siteMenuUrl);
    setSort(res.data.siteMenuSort);
  };

  const navigate = useNavigate();
  const Submit = async () => {
    navigate("/dashboard/menuManagement");
    var res;
    try {
      if (id) {
        alert(`${name} edited`);
        res = await EditMenuItem({
          id: id,
          name: name,
          sort: sort,
          link: link,
        });
      } else {
        res = await AddMenuItem({ name: name, sort: sort, link: link });
      }
      
    } catch (error) {
      console.error("Error adding menu item:", error);
    } finally {
      if (res.status === 200 || res.status === 201) {
        alert(`Success`);
      } else {
        alert(`Failed`);
      }
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
