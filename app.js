require("dotenv").config();
const path = require("path");
const fs = require("fs");
const Spotify = require("node-spotify-api");
const app = require("express")();
const dataFormatter = require("./dataFromTrack");
const CORS = require("cors");
const deezerGetter = require("./deezerData");
// const axios = require("axios");

app.use(CORS());

var spotify = new Spotify({
  id: process.env.CLIENT_ID,
  secret: process.env.CLIENT_SECRET,
});

app.get("/", async (req, res) => {
  const type = req.query.type;
  const title = req.query.title;
  let data;

  if (type != null && title != null) {
    try {
      data = await spotify.search({
        type: type,
        query: title,
      });
    } catch (e) {
      res.status(404).json({ error: "Walo a bb gir reje3e fin konti" });
    }
    try {
      let last;
      if (type == "track") {
        last = await dataFormatter(data.tracks.items[0], type);
      } else {
        last = await dataFormatter(data.albums.items[0], type);
      }
      res.status(200).json(last);
    } catch {
      try {
        console.log("deezer bda");
        const data = await deezerGetter(title);
        console.log("daz hna");
        res.status(200).json(data); //
      } catch {
        console.log("se5eta");
        res.status(404).json({ error: "Walo a bb gir reje3e fin konti" });
      }
    }
  } else {
    const directoryPath = path.join(__dirname + "/songs");
    const songs = fs.readdirSync(directoryPath);
    res
      .status(200)
      .sendFile(
        __dirname + `/songs/${songs[Math.floor(Math.random() * songs.length)]}`
      );
  }
});

app.listen(process.env.PORT || 5000, () => {
  console.log("Hope it work");
});
