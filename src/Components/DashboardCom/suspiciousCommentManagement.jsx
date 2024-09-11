import React, { useEffect, useRef, useState } from "react";
import {
  useNavigate,
  Route,
  Routes,
  Outlet,
  useParams,
  Link,
} from "react-router-dom";
import { Url } from "../../Utility/URL";
import { GetAllComment } from "../../Utility/CommentAPI";

function SuspiciousCommentsManagement() {
  const [commentList, setCommentList] = useState([]);
  const navigate = useNavigate();
  const url = Url;

  const fetchData = async () => {
    try {
      const response = await GetAllComment();
      setCommentList(response.data);
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
      <p className="fs-2">کامنت‌های مشکوک</p>
      <Outlet></Outlet>
      <Routes>

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

                      className="col-1 px-6 py-3 border-l border-neutral-500">
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
                        //   navigate("/dashboard/actorManagement/add");
                        }}
                        className="bi bi-plus btn btn-success">
                        {" "}
                      </button>
                    </th>
                  </tr>
                </thead>
                {commentList && (
                  <tbody>
                    {commentList.map((obj, index) => {
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
                              <button
                                onClick={() => statusToggel(obj.actorId)}
                                className={`btn ${
                                  obj.actorIsStatus
                                    ? "btn-success"
                                    : "btn-danger"
                                } py-1`}>
                                {obj.actorIsStatus ? "فعال" : "غیرفعال"}
                              </button>
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

export default SuspiciousCommentsManagement;
