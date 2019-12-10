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
    albumCover = data.album.images[0].url;
  } else {
    albumName = data.name;
    albumCover = data.images[0].url;
  }

  return {
    title: data.name,
    artists,
    albumName,
    albumCover
  };
}

module.exports = dataFromTrack;
