import React, { useEffect, useState } from "react";
import {
  useNavigate,
  Route,
  Routes,
  Outlet,

} from "react-router-dom";
import { AddCardGroup,
  GetGroupCardMovies,
  GetGroupCardTitles, } from "../../Utility/GroupCardAPI";
import { Button, Modal } from "react-bootstrap";
import CustomInput from "../GeneralComponents/CustomInput";
import AutoComplateInput from "../GeneralComponents/AutoComplateinput";


function GroupCardsManagement() {
  const [cardList, setCardList] = useState([]);

  const [groupTitleFilter, setGroupTitleFilter] = useState('');
  const [groupTitles, setGroupTitles] = useState([]);
  const navigate = useNavigate();


  const [newGroupModalShow, setNewGroupModalShow] = useState(false);
  const [addNewGroupInput, setAddNewGroupInput] = useState('');


  const handleNewGroupModalClose = () => setNewGroupModalShow(false);
  const handleNewGroupModalShow = () => {
    setAddNewGroupInput('')
    setNewGroupModalShow(true);
    
  };
  const submitAddNewGroup = async () => {
    if(addNewGroupInput===''){
      console.log('empty title')
      return;}
    else{
      
       await AddCardGroup({
        "cartTitle": addNewGroupInput
      })
      
      await Refresh()
      setNewGroupModalShow(false)
    }
  };

  const fetchTitles = async () => {
    try {
      const response = await GetGroupCardTitles();
      setGroupTitles(response.data)
      groupTitleFilter===''?setGroupTitleFilter(response.data[0].cartId):setGroupTitleFilter(groupTitleFilter)
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const fetchData = async () => {
    try {
      const response = await GetGroupCardTitles();
      setGroupTitles(response.data)
      //setCardList([{movieName:'kong fo panda',id:'1',}]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const Refresh = () => {
    fetchTitles();
  };

  useEffect(() => {
    fetchTitles();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    //fetchData();
    console.log(groupTitleFilter)
  }, [groupTitleFilter]);

  return (
    <div>
      <p className="fs-2">دسته کارت</p>
      <div className="flex justify-between items-center border p-1 ">
      <button className="btn btn-success mx-2" onClick={handleNewGroupModalShow} >افزودن دسته</button>

      <AutoComplateInput inputTitle='فیلم'></AutoComplateInput>
        <div className="border p-2 rounded">
          <label className="text-[18px] mx-1">نام دسته :</label>
          <select
            className="w-20 bg-slate-400 rounded p-2"
            onChange={(e) => {
              setGroupTitleFilter(e.target.value);
            }}>
            {groupTitles && (groupTitles.map((title)=>{
              return(<option value={title.cartId}>{title.cartTitle}</option>)
            }))}
          </select>
        </div>

      </div>

      <Outlet></Outlet>
      <Routes>
        <Route
          path=""
          element={
            <div
              className="my-4 relative overflow-x-auto  overflow-y-auto shadow rounded border-1 border-zinc-800"
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
                      پاسخ
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
                {cardList && (
                  <tbody>
                    {cardList.map((obj, index) => {
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
                            <td className="px-2  text-nowrap py-3 border-l border-neutral-500">
                              {obj.isAnswered?'باپاسخ':'بی‌پاسخ'}
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
                                  //await EditProfanity(obj.commentId);
                                  Refresh();
                                }}>
                                 پاسخ دادن
                              </button>
                              <button
                                className="btn btn-danger"
                                onClick={async () => {
                                  // await DeleteComment(obj.commentId);
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
              <Modal show={newGroupModalShow} onHide={handleNewGroupModalClose}>
                <Modal.Header>
                  <Modal.Title className="text-black">افزودن دسته</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <CustomInput
                  className={'col-6 mx-auto'}
                  title="نام دسته"
                    
                    setValue={setAddNewGroupInput}
                    value={addNewGroupInput}
                   ></CustomInput>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="danger" onClick={handleNewGroupModalClose}>
                    لغو
                  </Button>
                  <Button variant="success" onClick={()=>submitAddNewGroup()}>
                    افزودن
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

export default GroupCardsManagement;
