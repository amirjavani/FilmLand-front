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
      const response = await GetAllComment('1689c946-6552-4aa5-923f-182900a05395');
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
                      className=" px-6 py-3 border-l border-neutral-500">
                      متن
                    </th>
                    <th
                      scope="col"
                      className="col-2 px-6 py-3 border-l border-neutral-500">
                      کاربر
                    </th>
                    
                    
                    <th
                      scope="col"
                      className=" px-6 py-2 border-l border-neutral-500"> تاریخ ایجاد
                    </th>
                    {/* <th
                      scope="col"
                      className=" px-6 py-3 border-l border-neutral-500">
                      فیلم
                    </th> */}

                    <th scope="col" className="col-2 w-10 text-center">
                      
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
                              className="px-6 py-3 font-bold text-gray-900 whitespace-nowrap border-l border-neutral-500 ">
                              {index + 1}
                            </th>
                            <td className="text-wrap px-4 py-3 min-w-52 border-l border-neutral-500">
                              {obj.commentText}
                            </td>
                            <td className="px-6 py-4 border-l border-neutral-500">
                              {obj.commentWriter}
                            </td>
                            
                            <td className="px-2 text-nowrap py-3 border-l border-neutral-500">
                              {obj.commentCreateDate}
                            </td>
                            {/* <td className="col-1 px-6 py-3 border-l border-neutral-500">
                                <button className="btn btn-primary text-nowrap" onClick={()=>navigate('/movie/'+obj.movieRef)} >صفحه فیلم</button>
                            </td> */}
                            <td className="text-nowrap py-3  px-2">
                              <button className="mx-1 btn btn-success"> 
                                تایید                               
                              </button>
                              <button className="btn btn-danger"> 
                                رد                               
                              </button>
                              
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
