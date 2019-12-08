require("dotenv").config();
const path = require("path");
const fs = require("fs");
const Spotify = require("node-spotify-api");
const app = require("express")();
const dataFormatter = require("./dataFromTrack");
const CORS = require("cors");

app.use(CORS());

var spotify = new Spotify({
  id: process.env.CLIENT_ID,
  secret: process.env.CLIENT_SECRET
});

app.get("/", async (req, res) => {
  const type = req.query.type;
  const title = req.query.title;

  if (type != null && title != null) {
    const data = await spotify.search({
      type: type,
      query: title
    });
    let last;
    if (type == "track") {
      last = await dataFormatter(data.tracks.items[0], type);
    } else if (type == "album") {
      last = await dataFormatter(data.albums.items[0], type);
    } else {
      last = data.artists.items[0];
    }
    res.json(last);
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
