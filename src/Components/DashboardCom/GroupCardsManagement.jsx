import React, { useEffect, useState } from "react";
import { useNavigate, Route, Routes, Outlet } from "react-router-dom";
import {
  AddCardGroup,
  AddCardToGroup,
  DeleteGroupCard,
  DeleteGroupCardMovie,
  GetGroupCardMovies,
  GetGroupCardsAll,
  GetGroupCardTitles,
} from "../../Utility/GroupCardAPI";
import { Button, Modal } from "react-bootstrap";
import CustomInput from "../GeneralComponents/CustomInput";
import AutoComplateInput from "../GeneralComponents/AutoComplateinput";
import { Url } from "../../Utility/URL";

function GroupCardsManagement() {
  const url = Url;
  const [groupList, setGroupList] = useState([]);

  const [groupTitleFilter, setGroupTitleFilter] = useState("");
  const [groupTitles, setGroupTitles] = useState([]);
  const navigate = useNavigate();

  const [newGroupModalShow, setNewGroupModalShow] = useState(false);
  const [addNewGroupInput, setAddNewGroupInput] = useState("");

  // const [searchMovieInput, setSearchMovieInput] = useState("");
  const [foundedMovieList, setFoundedMovieList] = useState([]);

  const handleNewGroupModalClose = () => setNewGroupModalShow(false);
  const handleNewGroupModalShow = () => {
    setAddNewGroupInput("");
    setNewGroupModalShow(true);
  };
  const submitAddNewGroup = async () => {
    if (addNewGroupInput === "") {
      console.log("empty title");
      return;
    } else {
      await AddCardGroup({
        cartTitle: addNewGroupInput,
      });

      window.location.reload();
      setNewGroupModalShow(false);
    }
  };

  const handelSearchInput = async (text) => {
    try {
      const response = await GetGroupCardMovies(text);
      let filteredMovie = [];
      response.data.forEach((movie) => {
        filteredMovie.push({
          text: movie.movieEnglishName,
          id: movie.movieId,
        });
      });
      setFoundedMovieList(filteredMovie);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const onSelectMovie = async ({ id, text }) => {
    try {
      const response = await AddCardToGroup({
        cartMovie_MovieRef: id,
        cartMovie_CartRef: groupTitleFilter,
      });
      Refresh()
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchTitles = async () => {
    try {
      const response = await GetGroupCardTitles();
      setGroupTitles(response.data);
      groupTitleFilter === ""
        ? setGroupTitleFilter(response.data[0].cartId)
        : setGroupTitleFilter(groupTitleFilter);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const fetchData = async () => {
    try {
      const response = await GetGroupCardsAll();
      setGroupList(response.data);
      //setCardList([{movieName:'kong fo panda',id:'1',}]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const Refresh = () => {
    fetchTitles();
    fetchData();
  };

  useEffect(() => {
    fetchTitles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetchData();
  }, [groupTitleFilter]);

  return (
    <div>
      <p className="fs-2">دسته کارت</p>
      <div className="text-nowrap flex justify-between  sm:flex-row gep-2 flex-col items-center border p-1 ">
        <button
          className="btn btn-success mx-2"
          onClick={handleNewGroupModalShow}>
          افزودن دسته
        </button>

        <AutoComplateInput
          className={'min-w-60 '}
          id={"movieFilter"}
          inputTitle="فیلم"
          suggestions={foundedMovieList}
          onChangeInput={handelSearchInput}
          onSelectValue={onSelectMovie}></AutoComplateInput>
        <div className="border p-2 rounded">
          <label className="text-[15px] md:text-[18px] mx-1">نام دسته :</label>
          <select
            className="text-[15px] md:text-[18px] w-20 bg-slate-400 rounded p-2"
            onChange={(e) => {
              setGroupTitleFilter(e.target.value);
            }}>
            {groupTitles &&
              groupTitles.map((title) => {
                return <option value={title.cartId}>{title.cartTitle}</option>;
              })}
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
                  <tr className="text-nowrap sticky top-0 bg-slate-400 border-b ">
                    <th
                      scope="col"
                      className="w-10 px-3 py-3 border-l border-neutral-500">
                      ردیف
                    </th>
                    <th
                      scope="col"
                      className=" px-6 py-3 border-l border-neutral-500">
                      نام فارسی
                    </th>
                    <th
                      scope="col"
                      className=" px-6 py-3 border-l border-neutral-500">
                      نام انگلیسی
                    </th>
                    <th
                      scope="col"
                      className=" px-6 py-3 border-l border-neutral-500">
                      تصویر
                    </th>
                    <th
                      scope="col"
                      className=" px-6 py-3 border-l border-neutral-500">
                      فیلم
                    </th>
                    <th scope="col" className="p-1 col-2 w-10 text-center">
                    <button className=" btn btn-danger" onClick={async () => {
                                    await DeleteGroupCard(groupTitleFilter);
                                    window.location.reload();
                                  }}>همه <i className="bi bi-trash"></i></button>

                    </th>
                  </tr>
                </thead>
                {groupList && (
                  <tbody>
                    {groupList
                      .filter((group) => group.cartId === groupTitleFilter) // Filter the relevant group
                      .map(
                        (group, index) =>
                          group.singleCartList &&
                          group.singleCartList.map((movieCard, index) => (
                            <tr
                              key={index}
                              className="bg-white text-black border-b border-black">
                              <th
                                scope="row"
                                className="px-6 py-3 font-bold text-gray-900 whitespace-nowrap border-l border-neutral-500">
                                {index + 1}
                              </th>
                              <td className="text-wrap px-4 py-3 min-w-52 border-l border-neutral-500">
                                {movieCard.moviePersionName}
                              </td>
                              <td className="px-6 py-4 border-l border-neutral-500">
                                {movieCard.movieEnglishName}
                              </td>
                              <td className="px-1 py-1 border-l border-neutral-500">
                                <img className="max-h-20 w-auto mx-auto" alt="" src={url+movieCard.uploadFilePath}></img> 
                              </td>

                              <td className="col-1 px-6 py-3 border-l border-neutral-500">
                                <button
                                  className="btn btn-primary text-nowrap"
                                  onClick={() =>
                                    navigate("/movie/" + movieCard.movieRef)
                                  }>
                                  صفحه فیلم
                                </button>
                              </td>
                              <td className=" text-nowrap py-3 ">
                                <button
                                  className="btn btn-danger mx-auto"
                                  onClick={async () => {
                                    await DeleteGroupCardMovie(movieCard.cartMovieId);
                                    Refresh();
                                  }}>
                                  حذف
                                </button>
                              </td>
                            </tr>
                          ))
                      )}
                  </tbody>
                )}
              </table>
              <Modal show={newGroupModalShow} onHide={handleNewGroupModalClose}>
                <Modal.Header>
                  <Modal.Title className="text-black">افزودن دسته</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <CustomInput
                    className={"col-6 mx-auto"}
                    title="نام دسته"
                    setValue={setAddNewGroupInput}
                    value={addNewGroupInput}></CustomInput>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="danger" onClick={handleNewGroupModalClose}>
                    لغو
                  </Button>
                  <Button variant="success" onClick={() => submitAddNewGroup()}>
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
