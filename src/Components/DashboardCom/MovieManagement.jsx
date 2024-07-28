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
  FetchMoviesList,
  AddingMovie,
  RemoveMovie,
  ToggelMovie,
  EditMovie,
} from "../../Utility/MovieAPI";
import { Url } from "../../Utility/URL";
import AddMovie from "./MovieManagement_addingMovie";

function MovieManagement() {
  const [moviesList, setMoviesList] = useState([]);
  const navigate = useNavigate();
  const url = Url;

  const fetchData = async () => {
    try {
      const response = await FetchMoviesList();
      setMoviesList(response.data);
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
    await ToggelMovie({ id: objID });
    Refresh();
  };

  const deleting = async (objID) => {
    try {
      await RemoveMovie({ id: objID });
      Refresh();
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  return (
    <div>
      <p className="fs-2"> فیلم ها</p>
      <Outlet></Outlet>
      <Routes>
        <Route path=":id" element={<AddMovie ></AddMovie>}></Route>
        <Route path="add" element={<AddMovie ></AddMovie>}></Route>

        <Route
          path=""
          element={
            <div
              className="my-5 relative overflow-x-auto  overflow-y-auto shadow rounded border-1 border-zinc-800"
              style={{ maxHeight: "70vh" }}>
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
                      تاریخ
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 border-l border-neutral-500">
                      دسته بندی
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 border-l border-neutral-500">
                      ژانر
                    </th>
                    <th scope="col" className="w-10 text-center">
                      <button
                        onClick={() => {
                          navigate("/dashboard/movieManagement/add");
                        }}
                        className="bi bi-plus btn btn-success">
                        {" "}
                      </button>
                    </th>
                  </tr>
                </thead>
                {moviesList && (
                  <tbody>
                    {moviesList.map((obj, index) => {
                      if (true) {
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
                              {obj.movieEnglishName}
                            </td>
                            <td className="px-6 py-4 border-l border-neutral-500">
                              {obj.movieModifiedDate}
                            </td>
                            <td className="px-6 py-4 border-l border-neutral-500">
                              {obj.categoryTitle ? obj.categoryTitle : "خالی"}
                            </td>
                            <td className="px-6 py-4 border-l border-neutral-500">
                              {obj.genreTitles[0] ? obj.genreTitles[0] : "خالی"}
                            </td>
                            <td className="flex flex-col p-1 w-20">
                              <button
                                onClick={() => statusToggel(obj.movieId)}
                                className={`btn ${
                                  obj.movieIsStatus
                                    ? "btn-success"
                                    : "btn-danger"
                                } py-1`}>
                                {obj.movieIsStatus ? "فعال" : "غیرفعال"}
                              </button>
                              <Link
                                to={`/dashboard/movieManagement/${obj.movieId}`}
                                className="bi bi-pencil-square btn btn-secondary py-1 my-1"></Link>
                              <i
                                className="bi bi-trash btn btn-danger py-1 my"
                                onClick={() => deleting(obj.movieId)}></i>
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

export default MovieManagement;
