require("dotenv").config();
var Spotify = require("node-spotify-api");
const app = require("express")();
const dataFormatter = require("./dataFromTrack");

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
      last = await dataFormatter(data.tracks.items[0]);
    } else {
      last = await dataFormatter(data.albums.items[0]);
    }
    res.json(last);
  } else {
    res.status(200).sendFile(__dirname + "/Phoenix.mp3");
  }
});

app.listen(process.env.PORT || 5000, () => {
  console.log("Hope it work");
});
