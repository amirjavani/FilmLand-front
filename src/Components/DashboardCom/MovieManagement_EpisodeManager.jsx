import React from "react";

const EpisodeManager = ({ isShow, closeCom }) => {
  if (!isShow) return null;
  return (
    <div className="fixed w-full h-full top-0 right-0  bg-slate-500 bg-opacity-40  z-10" onClick={() => closeCom()}>
      <div onClick={(e)=>e.stopPropagation()} className=" opacity-100 fixed top-40 right-60 z-30  h-2/3 w-2/3 bg-slate-300 text-slate-600 rounded p-12   shadow ">
        <p
          onClick={() => closeCom()}
          className=" absolute top-2 right-2 z-20 btn">
          X{" "}
        </p>
        <div className="border  border-slate-600 h-full rounded">
sdasd
        </div>
      </div>
    </div>
  );
};

export default EpisodeManager;
