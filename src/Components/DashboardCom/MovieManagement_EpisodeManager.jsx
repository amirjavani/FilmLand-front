import React, { useEffect, useState } from "react";

const EpisodeManager = ({ isShow, closeCom }) => {
  const [seasons, setSeasons] = useState([1]);
  const [activSeason, setAvtiveSeason] = useState(1);
  const [episodes, setEpisodes] = useState([
    { url: "https:/...", number: 1, season: 2, quality: 480, dubbe: "farsi" },
    { url: "https:/...", number: 1, season: 2, quality: 720, dubbe: "farsi" },
    { url: "https:/...", number: 1, season: 2, quality: 1080, dubbe: "farsi" },
    { url: "https:/...", number: 1, season: 2, quality: 720, dubbe: "farsi" },
    { url: "https:/...", number: 1, season: 2, quality: 720, dubbe: "farsi" },
  ]);

  const addSeasen = () => {
    setSeasons(seasons.concat(seasons.length + 1));
  };

  useEffect(() => {
    return () => {};
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
        <div className="border  border-black bg-white h-full rounded p-4">
          <div className="flex flex-row gap-2 mb-2">
            {seasons &&
              seasons.map((s, index) => {
                return (
                  <div
                    onClick={() => setAvtiveSeason(s)}
                    className={`duration-200 border-2 border-slate-500 rounded-xl p-1 cursor-pointer hover:text-white hover:bg-slate-500 ${
                      s == activSeason ? "text-white bg-slate-500" : ""
                    }`}>
                    فصل {s}
                  </div>
                );
              })}
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
              className={`px-2 duration-200 border-2 border-red-500 rounded-xl p-1  cursor-pointer hover:text-white hover:bg-red-500 `}>
              -{" "}
            </div>
            <div
              onClick={() => setSeasons(seasons.concat(seasons.length + 1))}
              className={`duration-200 border-2 border-slate-500 rounded-xl p-1 cursor-pointer hover:text-white hover:bg-slate-500 `}>
              +{" "}
            </div>
          </div>
          <hr />
          <div className="flex flex-col mt-2 gap-3">
            {episodes &&
              episodes.map((episode, index) => {
                if (episode.season === activSeason)
                  return (
                    <div className="flex flex-row ">
                      <input type="text" className="col-2 rounded-lg p-1" placeholder=""></input>
                    </div>
                  );
                else return <></>;
              })}
            <div className="flex flex-row">
              <input type="text" className="col-2" value={'1'}></input>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EpisodeManager;
