async function artistGetting(artists) {
  //console.log(artists);
  const artist = [];
  for (art in artists) {
    artist.push(artists[art].name);
  }
  return artist;
}

async function dataFromTrack(data, type) {
  const artists = await artistGetting(data.artists);
  let albumName, releaseDay, albumCover;

  if (type == "track") {
    albumName = data.album.name;
    releaseDay = data.album["release_date"];
    albumCover = data.album.images[0].url;
  } else {
    albumName = data.name;
    releaseDay = data["release_date"];
    albumCover = data.images[0].url;
  }

  return {
    title: data.name,
    artists,
    albumName,
    releaseDay,
    albumCover
  };
}

module.exports = dataFromTrack;
