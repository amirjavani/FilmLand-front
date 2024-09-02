import axios from "axios";
import { Url } from "./URL";

const FetchCategory = async () => {
  const response = await axios.get(`${Url}/Category`, {
    headers: {},
  });
  return response;
};

const FetchGenre = async () => {
  const response = await axios.get(`${Url}/Genre`, {
    headers: {},
  });
  return response;
};

const FetchMoviesList = async () => {
  const response = await axios.get(`${Url}/MovieManagement`, {
    headers: {},
  });
  return response;
};

const GetOneMovie = async (props) => {
  const response = await axios.get(`${Url}/MovieManagement/${props.id}`, {
    headers: {},
  });
  return response;
};

const AddingMovie = async ({ formData }) => {
  const response = await axios.post(`${Url}/MovieManagement/Add`, formData, {
    headers: {},
  });
  return response;
};

const RemoveMovie = async (props) => {
  console.log(props.id);
  const response = await axios.delete(`${Url}/MovieManagement/${props.id}`, {
    headers: {},
  });
  return response;
};

const ToggelMovie = async (props) => {
  const response = await axios.get(
    `${Url}/MovieManagement/ChangeStatus/${props.id}`,
    {
      headers: {},
    }
  );
  return response;
};

const EditMovie = async (props) => {
  const response = await axios.put(
    `${Url}/MovieManagement/Edit/${props.id}`,
    {
      siteMenuName: props.name,
      siteMenuUrl: props.link,
      siteMenuSort: parseInt(props.sort),
    },
    {
      headers: {},
    }
  );
  return response;
};

const AddingMovieFile = async ({
  movieFileChapter,
  movieFileEpisode,
  movieFileDubbing,
  movieFileIsCensored,
  movieFileSubtitleURL,
  id,
}) => {
  const formData = new FormData();
  formData.append("MovieFileIsCensored", movieFileIsCensored);
    formData.append("MovieFileSubtitleURL", movieFileSubtitleURL);
    formData.append("MovieFileEpisode", movieFileEpisode);
    formData.append("MovieFileChapter", movieFileChapter);
    formData.append("MovieRef", id);
    formData.append("MovieFileDubbing", movieFileDubbing);
  const response = await axios.post(
    `${Url}/MovieFile/Add`,
    formData
    ,
    {
      headers: {'Content-Type': 'multipart/form-data',},
    }
  );
  return response;
};
const EditingMovieFile = async ({
  movieFileChapter,
  movieFileEpisode,
  movieFileDubbing,
  movieFileIsCensored,
  movieFileSubtitleURL,
  id,
}) => {
  // const formData = new FormData();
  // formData.append("MovieFileIsCensored", movieFileIsCensored);
  //   formData.append("MovieFileSubtitleURL", movieFileSubtitleURL);
  //   formData.append("MovieFileEpisode", movieFileEpisode);
  //   formData.append("MovieFileChapter", movieFileChapter);
  //   formData.append("MovieRef", id);
  //   formData.append("MovieFileDubbing", movieFileDubbing);
  const response = await axios.put(
    `${Url}/MovieFile/Edit/${id}`,
    JSON.stringify(
      
      {
        "movieFileChapter": movieFileChapter,
        "movieFileEpisode": movieFileEpisode,
        "movieFileDubbing": movieFileDubbing,
        "movieFileIsCensored": movieFileIsCensored,
        "movieFileSubtitleURL": movieFileSubtitleURL,
        "movieRef": null
      }
    )
    ,
    {
      headers: {'Content-Type':'application/json, text/plain, */*'},
    }
  );
  return response;
};


const RemoveMovieFile = async (props) => {
  
  const response = await axios.delete(`${Url}/MovieFile/${props.id}`, {
    headers: {},
  });
  return response;
};


const AddingMovieFileDetail = async ({
  
  movieFileQuality,
  movieFile_MovieURL,
  id,
}) => {
  const formData = new FormData();
    formData.append("MovieFileQuality", movieFileQuality);
    formData.append("MovieFile_MovieURL", movieFile_MovieURL);
    formData.append("MovieFileRef", id);
   
  const response = await axios.post(
    `${Url}/MovieFileDetail/Add`,
    formData
    ,
    {
      headers: {'Content-Type': 'multipart/form-data',},
    }
  );
  return response;
};



export {
  FetchCategory,
  FetchGenre,
  FetchMoviesList,
  AddingMovie,
  RemoveMovie,
  ToggelMovie,
  EditMovie,
  GetOneMovie,
  AddingMovieFile,
  AddingMovieFileDetail,
  RemoveMovieFile,
  EditingMovieFile,
};
