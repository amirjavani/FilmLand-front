import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import $ from "jquery";

import CustomInput from "../GeneralComponents/CustomInput";
import "./EpisodesStyle.css";
import { useParams } from "react-router-dom";
import { FetchMovieFile } from "../../Utility/SingleMovieAPI";
import { AddingMovieFile, AddingMovieFileDetail, EditingMovieFile, RemoveMovieFile } from "../../Utility/MovieAPI";

const EpisodeManager = ({ movieName }) => {
  const [seasons, setSeasons] = useState([]);
  const [mood, setMood] = useState("");
  const [activSeason, setActiveSeason] = useState(1);
  const [name, setmovieName] = useState(movieName);
  const [episodes, setEpisodes] = useState([]);
  const [episodeNum, setEpisodeNum] = useState("");
  const [episodeSubtitleUrl, setEpisodeSubtitleUrl] = useState("");
  const [episodeIsCensored, setepIsodeIsCensored] = useState(false);
  const [episodeDubbe, setEpisodeDubbe] = useState("");
  const [editedEpisodeId, setEditedEpisodeId] = useState();
  const { id } = useParams();

  const [addEpisodeShow, setAddEpisodeShow] = useState(false);
  const [removNotifShow, setRemovNotifShow] = useState(false);
  const [removingEpisode, setRemovingEpisode] = useState();
  const [editEpisodeShow, setEditEpisodeShow] = useState(false);

  const handleAddEpisodeClose = () => setAddEpisodeShow(false);
  const handleAddEpisodeShow = () => {
    setEpisodeSubtitleUrl("");
    setEpisodeDubbe("");
    setepIsodeIsCensored(false);
    setEpisodeNum("");
    setAddEpisodeShow(true);
  };

  const newEpisodeFileSubmitt = async () => {
    await AddingMovieFile({
      movieFileChapter: activSeason.toString(),
      id: id,
      movieFileDubbing: episodeDubbe,
      movieFileEpisode: episodeNum,
      movieFileIsCensored: episodeIsCensored,
      movieFileSubtitleURL: episodeSubtitleUrl,
    });
    await fetchData();
    setAddEpisodeShow(false);
    
  };
  

  const handleRemoveNotifClose = () => setRemovNotifShow(false);
  const handleRemoveNotifShow = (e) => {
    setRemovingEpisode(e);
    setRemovNotifShow(true);
  }
  const removingEpisodeFileSubmitt = async (episodeId)  => {
    await RemoveMovieFile({id:episodeId});
    await fetchData();
    setRemovNotifShow(false);
  };

  const handleEditEpisodeClose = () => setEditEpisodeShow(false);
  const handleEditEpisodeShow =  (e) => {
    setEpisodeSubtitleUrl(e.movieFileSubtitleURL);
    setEpisodeDubbe(e.movieFileDubbing);
    setepIsodeIsCensored(e.movieFileIsCensored);
    setEpisodeNum(e.movieFileEpisode);
    setEditedEpisodeId(e.movieFileId); 
    setEditEpisodeShow(true);
  };

  const editingEpisodeFileSubmitt = async ()  => {
    await EditingMovieFile({
      movieFileChapter: activSeason.toString(),
      id: editedEpisodeId,
      movieFileDubbing: episodeDubbe,
      movieFileEpisode: episodeNum,
      movieFileIsCensored: episodeIsCensored,
      movieFileSubtitleURL: episodeSubtitleUrl,
    });
    await fetchData();
    setEditEpisodeShow(false);
  };

  const episodeSlideToggle = (index) => {
    $("#episode-slide" + index).fadeToggle("fast");
  };

  const fetchData = async () => {
    const response = await FetchMovieFile({ id });
    setEpisodes(response.data);

    console.log(id);
  };

  useEffect(() => {
    setmovieName(movieName);
    fetchData();

    return () => {};
  }, []);

  useEffect(() => {
    if (episodes.length > 0) {
      const maxSeason = episodes.reduce(
        (max, episode) =>
          parseInt(episode.movieFileChapter) > max
            ? parseInt(episode.movieFileChapter)
            : max,
        parseInt(episodes[0].movieFileChapter)
      );

      if (maxSeason === 0) {
        setMood("single");
        setActiveSeason(0);
      } else {
        setMood("series");
      }

      let s = [];
      for (let index = 1; index <= maxSeason; index++) {
        s.push(index);
      }
      setSeasons(s);
    } else {
      setSeasons([1]);
    }
  }, [episodes]);

  return !mood ? (
    <div className="mt-10 text-center">
      لطفا تک قسمتی بودن یا سریالی بودن را مشخص کنید.
      <div className="flex flex-row gap-1 my-5 justify-center">
        <button className="btn btn-secondary" onClick={() => setMood("series")}>
          سریال
        </button>
        <button
          className="btn btn-secondary"
          onClick={() => {
            setMood("single");
            setActiveSeason(0);
          }}>
          تک قسمتی
        </button>
      </div>
    </div>
  ) : (
    <div className="border  border-black bg-white h-full rounded p-4 text-left my-10">
      {name}
      {mood === "series" ? (
        <div className="flex flex-row gap-2 mb-2">
          <div className="flex flex-row gap-2 overflow-auto">
            {seasons &&
              seasons.map((s, index) => {
                return (
                  <div
                    onClick={() => setActiveSeason(s)}
                    className={`whitespace-nowrap duration-200 border-2 border-slate-500 rounded-xl p-1 cursor-pointer hover:text-white hover:bg-slate-500 ${
                      s === activSeason ? "text-white bg-slate-500" : ""
                    }`}>
                    فصل {s}
                  </div>
                );
              })}
          </div>

          <div
            onClick={() =>
              seasons.length <= 1
                ? null
                : setSeasons(
                    seasons.filter((s) => {
                      return s !== seasons.length;
                    })
                  )
            }
            className={` duration-200 border-2 border-red-500 rounded-xl p-2  cursor-pointer hover:text-white hover:bg-red-500 `}>
            -{" "}
          </div>
          <div
            onClick={() => setSeasons(seasons.concat(seasons.length + 1))}
            className={`duration-200 border-2 border-slate-500 rounded-xl  p-2 cursor-pointer hover:text-white hover:bg-slate-500 `}>
            +{" "}
          </div>
        </div>
      ) : (
        <div className="text-center text-[20px] font-IYbold">تک قسمتی </div>
      )}
      <hr />
      <div className="mt-2 overflow-auto max-h-[440px] ">
        <table id="episode-table" className="w-full ">
          <thead class="font-IYbold ">
            <tr>
              <th className="col-1"> قسمت</th>
              <th>آدرس زیرنویس</th>
              <th className="col-1">دوبله</th>
              <th className="col-1"> سانسور</th>
              <th className="col-2"></th>
            </tr>
          </thead>
          <tbody class="font-IYnum ">
            {episodes &&
              episodes.map((episode, index) => {
                let url;
                let quality;
                if (parseInt(episode.movieFileChapter) === activSeason)
                  return (
                    <React.Fragment key={index}>
                      <tr>
                        <td>{episode.movieFileEpisode}</td>
                        <td>{episode.movieFileSubtitleURL}</td>
                        <td>{episode.movieFileDubbing}</td>
                        <td>
                          <i
                            className={`bi ${
                              episode.movieFileIsCensored
                                ? "bi-eye-slash"
                                : "bi-eye"
                            }`}></i>
                        </td>
                        <td className="text-[13px] flex flex-row justify-center gap-1">
                          <button
                            className="btn btn-primary  text-[13px]"
                            onClick={() => episodeSlideToggle(index)}>
                            آدرس‌ها
                          </button>
                          <i
                            className="bi bi-pencil-square btn btn-secondary "
                            onClick={() => handleEditEpisodeShow(episode)}>
                            
                          </i>
                          <i className="btn btn-danger  bi bi-trash3" onClick={()=>handleRemoveNotifShow(episode)}></i>
                        </td>
                      </tr>
                      <tr
                        id={`episode-slide${index}`}
                        className="episode-slide">
                        <td colSpan="10">
                          <div className="flex flex-column gap-1">
                            {episode.movieFile_MovieURL.length > 0 &&
                            episode.movieFileQuality.length > 0 &&
                            episode.movieFile_MovieURL[0] === null ? (
                              <>آدرسی وجود ندارد</>
                            ) : (
                              episode.movieFile_MovieURL.map((url, index) => {
                                return (
                                  <React.Fragment>
                                    <div className="flex felx-row ">
                                      <div className="flex felx-row gap-3 ">
                                        <strong>آدرس:</strong>
                                        <span>{url}</span>
                                        <strong>کیفیت:</strong>
                                        <span>
                                          {episode.movieFileQuality[index]}
                                        </span>
                                      </div>
                                      
                                    </div>
                                    <hr></hr>
                                  </React.Fragment>
                                );
                              })
                            )}
                          </div>

                          <div className="flex felx-row justify-between items-center mt-1">
                            <div className="flex felx-row gap-3 ">
                              <label
                                className="my-auto font-IYbold "
                                htmlFor="episode-url">
                                آدرس:
                              </label>
                              <input
                                value={url}
                                onChange={(e) => {
                                  url = e.target.value;
                                }}
                                className="p-1 col-5 col-md-7 col-xl-10  rounded slide-input"
                                id="episode-url rounded"></input>
                              <label
                                className="my-auto font-IYbold"
                                htmlFor="episode-quality">
                                کیفیت:
                              </label>
                              <input
                                value={quality}
                                onChange={(e) => {
                                  quality = e.target.value;
                                }}
                                className="p-1 col-2 rounded slide-input"
                                type="number"
                                id="episode-quality"></input>
                            </div>
                            <div className="">
                              <button
                                onClick={(e) => {
                                  AddingMovieFileDetail({
                                    id: episode.movieFileId,
                                    movieFile_MovieURL: url,
                                    movieFileQuality: quality,
                                  });
                                  $(".slide-input").val("");
                                  fetchData();
                                }}
                                className=" btn btn-success">
                                ثبت{" "}
                              </button>
                            </div>
                          </div>
                        </td>
                      </tr>
                    </React.Fragment>
                  );
              })}
          </tbody>
        </table>
      </div>

      <Button className="btn btn-success m-2" onClick={handleAddEpisodeShow}>
        افزودن
      </Button>
      
      {/* add modal */}
      <Modal
        className="text-slate-600"
        show={addEpisodeShow}
        onHide={handleAddEpisodeClose}>
        <Modal.Header>
          <Modal.Title>قسمت جدید</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="flex flex-row gap-3 justify-evenly items-center">
            <CustomInput
              value={episodeNum}
              setValue={setEpisodeNum}
              type={"number"}
              className={"col-2 my-2"}
              title={"قسمت"}></CustomInput>
            <label htmlFor="isCensored">سانسور شده:</label>
            <input
              id="isCensored"
              type="checkbox"
              checked={episodeIsCensored}
              onChange={(e) => {
                console.log(episodeIsCensored);
                setepIsodeIsCensored(!episodeIsCensored);
              }}></input>

            <label htmlFor="dubbe">دوبله:</label>
            <select
              id="dubbe"
              className="text-sm  col-3 outline-none bg-slate-100 text-center"
              value={episodeDubbe}
              onChange={(e) => setEpisodeDubbe(e.target.value)}>
              <option
                className="text-sm col-2 outline-none bg-slate-200 text-center hover:bg-slate-300"
                value="">
                --
              </option>
              <option
                className="text-sm col-2 outline-none bg-slate-200 text-center"
                value="dubbed">
                دوبله فارسی
              </option>
              <option
                className="text-sm  col-2 outline-none bg-slate-200 text-center"
                value="original">
                زبان اصلی
              </option>
            </select>
          </div>

          <CustomInput
            value={episodeSubtitleUrl}
            setValue={setEpisodeSubtitleUrl}
            type={"text"}
            className={"col-12 my-3"}
            title={"آدرس‌ زیرنویس"}></CustomInput>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-danger" onClick={handleAddEpisodeClose}>
            لغو
          </Button>
          <Button variant="success" onClick={() => newEpisodeFileSubmitt()}>
            ثبت
          </Button>
        </Modal.Footer>
      </Modal>
      
      
      {/* edit modal */}
      <Modal
        className="text-slate-600"
        show={editEpisodeShow}
        onHide={handleEditEpisodeClose}>
        <Modal.Header>
          <Modal.Title>ویرایش</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="flex flex-row gap-3 justify-evenly items-center">
            <CustomInput
              value={episodeNum}
              setValue={setEpisodeNum}
              type={"number"}
              className={"col-2 my-2"}
              title={"قسمت"}></CustomInput>
            <label htmlFor="isCensored">سانسور شده:</label>
            <input
              id="isCensored"
              type="checkbox"
              checked={episodeIsCensored}
              onChange={(e) => {
                console.log(episodeIsCensored);
                setepIsodeIsCensored(!episodeIsCensored);
              }}></input>

            <label htmlFor="dubbe">دوبله:</label>
            <select
              id="dubbe"
              className="text-sm  col-3 outline-none bg-slate-100 text-center"
              value={episodeDubbe}
              onChange={(e) => setEpisodeDubbe(e.target.value)}>
              <option
                className="text-sm col-2 outline-none bg-slate-200 text-center hover:bg-slate-300"
                value="">
                --
              </option>
              <option
                className="text-sm col-2 outline-none bg-slate-200 text-center"
                value="dubbed">
                دوبله فارسی
              </option>
              <option
                className="text-sm  col-2 outline-none bg-slate-200 text-center"
                value="original">
                زبان اصلی
              </option>
            </select>
          </div>

          <CustomInput
            value={episodeSubtitleUrl}
            setValue={setEpisodeSubtitleUrl}
            type={"text"}
            className={"col-12 my-3"}
            title={"آدرس‌ زیرنویس"}></CustomInput>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-danger" onClick={handleEditEpisodeClose}>
            لغو
          </Button>
          <Button variant="success" onClick={() => {editingEpisodeFileSubmitt()}}>
            ثبت
          </Button>
        </Modal.Footer>
      </Modal>


              
      {/* delete submit modal */}
      <Modal
        className="text-slate-600"
        show={removNotifShow}
        onHide={handleRemoveNotifClose}>
        <Modal.Header>
          <Modal.Title className="text-[20px]">آیا از حذف این قسمت مطمئن هستید؟</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {removingEpisode&&
          (<React.Fragment >
                      <tr className=" flex flex-row gap-1">
                        <strong>قسمت: {removingEpisode.movieFileEpisode}</strong>
                        <span className="vr"></span>
                        <strong>آدرس زیرنویس: {removingEpisode.movieFileSubtitleURL}</strong>
                        <span className="vr"></span>
                        <strong>دوبله: {removingEpisode.movieFileDubbing}</strong>
                        <span className="vr"></span>
                        <strong>
                          {removingEpisode.movieFileIsCensored?<>سانسور شده</>:<>سانسور نشده</>}  
                        </strong>
                      </tr>
                      <hr/>
                      <tr>
                        <td colSpan="10">
                          <div className="flex flex-column gap-1">
                            {removingEpisode.movieFile_MovieURL.length > 0 &&
                              removingEpisode.movieFileQuality.length > 0 &&
                              removingEpisode.movieFile_MovieURL[0] === null ? (
                              <>آدرسی وجود ندارد</>
                            ) : (
                              removingEpisode.movieFile_MovieURL.map((url, index) => {
                                return (
                                  <React.Fragment>
                                    <div className="flex felx-row ">
                                      <div className="flex felx-row gap-3 ">
                                        <strong>آدرس:</strong>
                                        <span>{url}</span>
                                        <strong>کیفیت:</strong>
                                        <span>
                                          {removingEpisode.movieFileQuality[index]}
                                        </span>
                                      </div>
                                      
                                    </div>
                                    <hr></hr>
                                  </React.Fragment>
                                );
                              })
                            )}
                          </div>

                        </td>
                      </tr>
                    </React.Fragment>)
          }

          
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleRemoveNotifClose}>
            خیر
          </Button>
          <Button variant="success" onClick={() => removingEpisodeFileSubmitt(removingEpisode.movieFileId)}>
            بله
          </Button>
        </Modal.Footer>
      </Modal>

    </div>
  );
};

export default EpisodeManager;
