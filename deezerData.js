const axios = require("axios");

async function deezerData(title) {
  console.log("Daz l deezerData");
  const res = await axios.get(`https://api.deezer.com/search?q=${title}`);
  const data = res.data.data[0];
  console.log("data kayna");
  let albumCover;
  if (!data.album.hasOwnProperty("picture")) {
    if (data.album.hasOwnProperty("cover_xl")) {
      albumCover = data.album["cover_xl"];
    } else {
      albumCover = data.album["cover_big"]; // dfntly exsists (thts bad)
    }
  }

  return {
    title: data.title,
    artists: [data.artist.name],
    albumName: data.album.title,
    albumCover,
    releaseDay: new Date().toJSON().slice(0, 10)
  };
}

module.exports = deezerData;
