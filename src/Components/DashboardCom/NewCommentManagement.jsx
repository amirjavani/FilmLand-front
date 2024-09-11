import React, { useEffect, useRef, useState } from "react";
import {
  useNavigate,
  Route,
  Routes,
  Outlet,
  useParams,
  Link,
  json,
} from "react-router-dom";
import { Url } from "../../Utility/URL";
import { AddComment, DeleteComment, GetAllComment } from "../../Utility/CommentAPI";
import { Button, Modal } from "react-bootstrap";
import CustomInput from "../GeneralComponents/CustomInput";

function NewCommentManagement() {
  const [commentList, setCommentList] = useState([]);
  const [awnserInput, setAwnserInput] = useState("");
  const [awnserComment, setAwnserComment] = useState();
  const [filter, setFilter] = useState("day");
  const navigate = useNavigate();

  const [awnserModalShow, setAwnserModalShow] = useState(false);

  const handleAwnserModalClose = () => setAwnserModalShow(false);
  const handleAwnserModalShow = (comment) => {
    setAwnserInput('')
    setAwnserModalShow(true);
    setAwnserComment(comment)
  };
  const submitAwnserModal = async () => {
    if(awnserInput===''){
      console.log('empty comment')
      return;}
    else{
      var formData = new json();
      formData = {
        "commentWriter": "Admin",
        "commentText": awnserInput,
        "movieRef": awnserComment.movieRef,
        "replyTo": awnserComment.commentId,
        "isProfanity": null,
        "feeling": null,
        "isAnswered": null
      }
      await AddComment(formData)

    }
  };



  const fetchData = async () => {
    try {
      const response = await GetAllComment(filter);
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
  }, [filter]);

  return (
    <div>
      <p className="fs-2">کامنت‌های اخیر</p>
      <div className="flex justify-end items-center  ">
        <div className="border p-2 rounded">
          <label className="text-[18px] mx-1">فیلتر :</label>
          <select
            className="w-20 bg-slate-400 rounded p-2"
            onChange={(e) => {
              setFilter(e.target.value);
            }}>
            <option value="day">روز</option>
            <option value="week">هفته</option>
            <option value="month">ماه</option>
          </select>
        </div>
      </div>

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
                      className="w-10 px-3 py-3 border-l border-neutral-500">
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
                      className=" px-6 py-2 border-l border-neutral-500">
                      {" "}
                      حس
                    </th>

                    <th
                      scope="col"
                      className=" px-6 py-2 border-l border-neutral-500">
                      {" "}
                      تاریخ ایجاد
                    </th>

                    <th
                      scope="col"
                      className=" px-6 py-3 border-l border-neutral-500">
                      فیلم
                    </th>

                    <th scope="col" className="col-2 w-10 text-center"></th>
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
                            <td
                              className={`col-1 px-6 py-3 border-l border-neutral-500 ${
                                obj.feeling === "0"
                                  ? "text-danger"
                                  : obj.feeling === "1"
                                  ? ""
                                  : "text-success"
                              } font-bold`}>
                              {obj.feeling === "0"
                                ? "منفی"
                                : obj.feeling === "1"
                                ? "خنثی"
                                : "مثبت"}
                            </td>

                            <td className="px-2 text-nowrap py-3 border-l border-neutral-500">
                              {obj.commentCreateDate}
                            </td>

                            <td className="col-1 px-6 py-3 border-l border-neutral-500">
                              <button
                                className="btn btn-primary text-nowrap"
                                onClick={() =>
                                  navigate("/movie/" + obj.movieRef)
                                }>
                                صفحه فیلم
                              </button>
                            </td>
                            <td className="text-nowrap py-3  px-2">
                              <button
                                className="mx-1 btn btn-secondary"
                                onClick={async () => {
                                  handleAwnserModalShow(obj.commentId);
                                }}>
                                پاسخ دادن
                              </button>
                              <button
                                className="btn btn-danger"
                                onClick={async () => {
                                  await DeleteComment(obj.commentId);
                                  Refresh();
                                }}>
                                حذف
                              </button>
                            </td>
                          </tr>
                        );
                      } else return null;
                    })}
                  </tbody>
                )}
              </table>
              <Modal show={awnserModalShow} onHide={handleAwnserModalClose}>
                <Modal.Header>
                  <Modal.Title className="text-black">پاسخ</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <textarea
                  maxLength={10}
                  placeholder="پاسخ"
                  className="p-2 rounded w-full outline-none border bg-slate-200 text-black"
                    rows='3'
                    onChange={(e)=>setAwnserInput(e.target.value)}
                    value={awnserInput}
                   ></textarea>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="danger" onClick={handleAwnserModalClose}>
                    لغو
                  </Button>
                  <Button variant="success" onClick={()=>submitAwnserModal()}>
                    ثبت
                  </Button>
                </Modal.Footer>
              </Modal>
            </div>
          }
        />
      </Routes>
    </div>
  );
}

export default NewCommentManagement;
