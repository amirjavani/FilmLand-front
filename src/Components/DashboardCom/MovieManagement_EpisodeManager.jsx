import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";

import CustomInput from "../GeneralComponents/CustomInput";
import "./EpisodesStyle.css";

const EpisodeManager = ({ isShow, closeCom }) => {
  const [seasons, setSeasons] = useState([1]);
  const [activSeason, setActiveSeason] = useState(1);
  const [episodes, setEpisodes] = useState([
    { url: "https:/...", number: 1, season: 2, quality: 480, dubbe: "farsi" },
    { url: "https:/...", number: 1, season: 2, quality: 720, dubbe: "farsi" },
    { url: "https:/...", number: 1, season: 2, quality: 1080, dubbe: "farsi" },
    { url: "https:/...", number: 1, season: 2, quality: 720, dubbe: "farsi" },
    { url: "https:/...", number: 1, season: 3, quality: 720, dubbe: "farsi" },
  ]);
  const [episodeNum, setEpisodeNum] = useState("");
  const [episodeUrl, setEpisodeUrl] = useState("");
  const [episodeQuality, setEpisodeQuality] = useState("");
  const [episodeDubbe, setEpisodeDubbe] = useState("");

  const [addEpisodeShow, setAddEpisodeShow] = useState(false);
  const [removNotifShow, setRemovNotifShow] = useState(false);
  const [editEpisodeShow, setEditEpisodeShow] = useState(false);

  const handleAddEpisodeClose = () => setAddEpisodeShow(false);
  const handleAddEpisodeShow = () => {
    setEpisodeUrl('')
    setEpisodeDubbe('')
    setEpisodeQuality('')
    setEpisodeNum('')
    setAddEpisodeShow(true);
  }
  const newEpisodeSubmitt = () => {
    episodes.push({
      url: episodeUrl,
      number: episodeNum,
      season: activSeason,
      quality: episodeQuality,
      dubbe: episodeDubbe,
    });
    setEpisodes(episodes);

    setAddEpisodeShow(false);
  };

  const handleRemoveNotifClose = () => setRemovNotifShow(false);
  const handleRemoveNotifShow = () => setRemovNotifShow(true);

  const handleEditEpisodeClose = () => setEditEpisodeShow(false);
  const handleEditEpisodeShow = () => setEditEpisodeShow(true);

  const addSeasen = () => {
    setSeasons(seasons.concat(seasons.length + 1));
  };

  const fetchData = () => {
    
    if (episodes) {
      const maxSeason = episodes.reduce(
        (max, episode) => (episode.season > max ? episode.season : max),
        episodes[0].season
      );
      for (let index = 2; index <= maxSeason; index++) {
        seasons.push(index);
      }
      setSeasons(seasons);
    }
  };

  useEffect(() => {
    fetchData();
    return () => {
      setSeasons([1]);
      setActiveSeason(1); 
    };
  }, []);

  if (!isShow) return null;
  return (
    <div
      className="fixed w-full h-full top-0 right-0  bg-slate-500 bg-opacity-40  z-10"
      onClick={() => closeCom()}>
      <div
        onClick={(e) => e.stopPropagation()}
        className=" opacity-100 fixed top-40 right-60 z-30  h-2/3 w-2/3 bg-slate-300 text-slate-600 rounded p-12   shadow ">
        <p
          onClick={() => closeCom()}
          className=" absolute top-2 right-2 z-20 btn">
          X{" "}
        </p>
        <div className="border  border-black bg-white h-full rounded p-4 text-left">
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
          <div className="overflow-auto max-h-[240px] ">
            <table id="episode-table" className="w-full ">
              <thead class="font-IYbold ">
                <tr>
                  <th className="col-1"> قسمت</th>
                  <th>آدرس</th>
                  <th className="col-1">دوبله</th>
                  <th className="col-1">کیفیت</th>
                  <th className="col-2"></th>
                </tr>
              </thead>
              <tbody class="font-IYnum ">
                {episodes &&
                  episodes.map((episode, index) => {
                    if (episode.season === activSeason)
                      return (
                        <tr>
                          <td>{episode.number}</td>
                          <td>{episode.url}</td>
                          <td>{episode.dubbe}</td>
                          <td>{episode.quality}</td>
                          <td>
                            <i className="btn bi bi-trash3"></i>
                            <i className="btn bi bi-trash3"></i>
                          </td>
                        </tr>
                      );
                  })}
              </tbody>
            </table>
          </div>

          <Button
            className="btn btn-success m-2"
            onClick={handleAddEpisodeShow}>
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
              <div className="flex flex-row gap-3 items-center">
                <CustomInput
                  value={episodeNum}
                  setValue={setEpisodeNum}
                  type={"number"}
                  className={"col-2 my-2"}
                  title={"قسمت"}></CustomInput>
                <label htmlFor="quality">کیفیت:</label>
                <select
                  id="quality"
                  className="col-2 outline-none bg-slate-100 text-center"
                  value={episodeQuality}
                  onChange={(e) => setEpisodeQuality(e.target.value)}>
                  <option value="">--</option>
                  <option value="1080">1080</option>
                  <option value="720">720</option>
                  <option value="480">480</option>
                </select>
                <label htmlFor="dubbe">دوبله:</label>
                <select
                  id="dubbe"
                  className="col-2 outline-none bg-slate-100 text-center"
                  value={episodeDubbe}
                  onChange={(e) => setEpisodeDubbe(e.target.value)}>
                  <option value="">--</option>
                  <option value="فارسی">فارسی</option>
                  <option value="انگلیسی">انگلیسی</option>
                </select>
              </div>

              <CustomInput
                value={episodeUrl}
                setValue={setEpisodeUrl}
                type={"text"}
                className={"col-12 my-3"}
                title={"آدرس"}></CustomInput>
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
      </div>
    </div>
  );
};

export default EpisodeManager;
