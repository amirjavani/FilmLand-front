import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import $ from "jquery";

import CustomInput from "../GeneralComponents/CustomInput";
import "./EpisodesStyle.css";
import { useParams } from "react-router-dom";

const EpisodeManager = ({ movieID }) => {
  const [seasons, setSeasons] = useState([]);
  const [activSeason, setActiveSeason] = useState(1);
  const [episodes, setEpisodes] = useState([
    {
      movieFileId: "ef0eb2f5-c855-45f3-9935-cbdb4c980ca0",
      movieFileChapter: "2",
      movieFileEpisode: "3",
      movieFileDubbing: "dubbed",
      movieFileIsCensored: false,
      movieFileSubtitleURL: null,
      movieFile_MovieURL: [
        "https://doostihaa.upera.tv/2965100-0-720.mp4?ref=3m8",
        "https://doostihaa.upera.tv/2965100-0-480.mp4?ref=3m8",
        "https://doostihaa.upera.tv/2965100-0-1080.mp4?ref=3m8",
      ],
      movieFileQuality: [720, 480, 1080],
    },
    {
      movieFileId: "ef0eb2f5-c855-45f3-9935-cbdb4c980ca0",
      movieFileChapter: "1",
      movieFileEpisode: "2",
      movieFileDubbing: "dubbed",
      movieFileIsCensored: false,
      movieFileSubtitleURL: null,
      movieFile_MovieURL: [
        "https://doostihaa.upera.tv/2965100-0-720.mp4?ref=3m8",
        "https://doostihaa.upera.tv/2965100-0-480.mp4?ref=3m8",
        "https://doostihaa.upera.tv/2965100-0-1080.mp4?ref=3m8",
      ],
      movieFileQuality: [720, 480, 1080],
    },
    {
      movieFileId: "ef0eb2f5-c855-45f3-9935-cbdb4c980ca0",
      movieFileChapter: "1",
      movieFileEpisode: "3",
      movieFileDubbing: "farsi",
      movieFileIsCensored: false,
      movieFileSubtitleURL: null,
      movieFile_MovieURL: [
        "https://doostihaa.upera.tv/2965100-0-720.mp4?ref=3m8",
        "https://doostihaa.upera.tv/2965100-0-480.mp4?ref=3m8",
        "https://doostihaa.upera.tv/2965100-0-1080.mp4?ref=3m8",
      ],
      movieFileQuality: [720, 480, 1080],
    },
    {
      movieFileId: "ef0eb2f5-c855-45f3-9935-cbdb4c980ca0",
      movieFileChapter: "1",
      movieFileEpisode: "3",
      movieFileDubbing: "farsi",
      movieFileIsCensored: false,
      movieFileSubtitleURL: null,
      movieFile_MovieURL: [],
      movieFileQuality: [],
    },
  ]);
  const [episodeNum, setEpisodeNum] = useState("");
  const [episodeSubtitleUrl, setEpisodeSubtitleUrl] = useState("");
  const [episodeIsCensored, setepIsodeIsCensored] = useState(false);
  const [episodeDubbe, setEpisodeDubbe] = useState("");
  const { id } = useParams();

  const [addEpisodeShow, setAddEpisodeShow] = useState(false);
  const [removNotifShow, setRemovNotifShow] = useState(false);
  const [editEpisodeShow, setEditEpisodeShow] = useState(false);

  const handleAddEpisodeClose = () => setAddEpisodeShow(false);
  const handleAddEpisodeShow = () => {
    setEpisodeSubtitleUrl("");
    setEpisodeDubbe("");
    setepIsodeIsCensored(false);
    setEpisodeNum("");
    setAddEpisodeShow(true);
  };
  const newEpisodeSubmitt = () => {
    // episodes.push({
    //   movieFileSubtitleURL: episodeSubtitleUrl,
    //   movieEpisode: episodeNum,
    //   movieFileChapter: activSeason,
      
    //   dubbe: episodeDubbe,
    // });
    // setEpisodes(episodes);

    setAddEpisodeShow(false);
  };

  const handleRemoveNotifClose = () => setRemovNotifShow(false);
  const handleRemoveNotifShow = () => setRemovNotifShow(true);

  const handleEditEpisodeClose = () => setEditEpisodeShow(false);
  const handleEditEpisodeShow = () => setEditEpisodeShow(true);

  const addSeasen = () => {
    setSeasons(seasons.concat(seasons.length + 1));
  };
  // $('.episode-slide').hide()

  const episodeSlideToggle = (index) => {
    $("#episode-slide" + index).fadeToggle("fast");
  };

  const fetchData = () => {
    console.log(id);

    if (episodes.length > 0) {
      const maxSeason = episodes.reduce(
        (max, episode) =>
          parseInt(episode.movieFileChapter) > max
            ? parseInt(episode.movieFileChapter)
            : max,
        episodes[0].movieFileChapter
      );

      let s = [];
      for (let index = 1; index <= maxSeason; index++) {
        s.push(index);
      }
      setSeasons(s);
    }
  };

  useEffect(() => {
    fetchData();

    return () => {};
  }, []);

  return (
    <div className="border  border-black bg-white h-full rounded p-4 text-left my-10">
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
      <hr />
      <div className="overflow-auto max-h-[440px] ">
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
                        <td className="text-[13px]">
                          <button
                            className="btn btn-secondary text-[13px]"
                            onClick={() => episodeSlideToggle(index)}>
                            آدرس‌ها
                          </button>
                          <button
                            className="btn btn-pripery text-[13px]"
                            onClick={() => {}}>
                            ویرایش
                          </button>
                          <i className="btn text-danger bi bi-trash3"></i>
                        </td>
                      </tr>
                      <tr
                        id={`episode-slide${index}`}
                        className="episode-slide">
                        <td colSpan="10">
                          <div className="flex flex-column gap-1">
                            {episode.movieFile_MovieURL.length > 0 &&
                              episode.movieFileQuality.length > 0 &&
                              episode.movieFile_MovieURL.map((url, index) => {
                                return (
                                  <React.Fragment>
                                    <div className="flex felx-row justify-between">
                                      <div className="flex felx-row gap-3 ">
                                        <strong>آدرس:</strong>
                                        <span>{url}</span>
                                        <strong>کیفیت:</strong>
                                        <span>
                                          {episode.movieFileQuality[index]}
                                        </span>
                                      </div>
                                      <div>
                                        <button className="btn btn-danger">
                                          حذف
                                        </button>
                                      </div>
                                    </div>
                                    <hr></hr>
                                  </React.Fragment>
                                );
                              })}
                          </div>

                          <div className="flex felx-row justify-between items-center mt-1">
                            <div className="flex felx-row gap-3 ">
                              <label className="my-auto font-IYbold" htmlFor="episode-url">آدرس:</label>
                              <input className="p-1 col-5 col-md-7 col-xl-10  rounded" id="episode-url rounded"></input>
                              <label className="my-auto font-IYbold" htmlFor="episode-quality">کیفیت:</label>
                              <input className="p-1 col-2 rounded" type="number" id="episode-quality"></input>
                            </div>
                            <div className="">
                              <button className=" btn btn-success">ثبت </button>
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
            <input id="isCensored" type="checkbox" value={episodeIsCensored} onChange={(e) => setepIsodeIsCensored(e.target.value)}></input>
            
            <label htmlFor="dubbe">دوبله:</label>
            <select
              id="dubbe"
              className="text-sm  col-3 outline-none bg-slate-100 text-center"
              value={episodeDubbe}
              onChange={(e) => setEpisodeDubbe(e.target.value)}>
              <option className="text-sm col-2 outline-none bg-slate-200 text-center hover:bg-slate-300" value="">--</option>
              <option className="text-sm col-2 outline-none bg-slate-200 text-center" value="dubbed">دوبله فارسی</option>
              <option className="text-sm  col-2 outline-none bg-slate-200 text-center" value="original">زبان اصلی</option>
            </select>
          </div>

          <CustomInput
            value={episodeSubtitleUrl}
            setValue={episodeSubtitleUrl}
            type={"text"}
            className={"col-12 my-3"}
            title={"آدرس‌ زیرنویس"}></CustomInput>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-danger" onClick={handleAddEpisodeClose}>
            لغو
          </Button>
          <Button variant="success" onClick={() => newEpisodeSubmitt()}>
            ثبت
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default EpisodeManager;
