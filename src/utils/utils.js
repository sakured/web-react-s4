/* RETURNS THE ALBUMS OF A SPECIFIC ARTIST */
export function getAlbumsOfArtist(artist) {
    return fetch("/database/albums.json")
      .then((response) => response.json())
      .then((data) => {
        return data.filter((album) => album.artist === artist.name);
      })
      .catch((error) => {
        console.error("LOADING ERROR:", error);
        return [];
      });
}

/* RETURNS THE ARTIST BY ID */
export function getArtistById(id) {
    return fetch("/database/artists.json")
      .then((response) => response.json())
      .then((data) => {
        return data.find((artist) => String(artist.id) === String(id));
      })
      .catch((error) => console.error("LOADING ERROR:", error))
}

/* RETURNS THE ARTIST BY NAME */
export function getArtistByName(name) {
    return fetch("/database/artists.json")
      .then((response) => response.json())
      .then((data) => {
        return data.find((artist) => String(artist.name) === String(name));
      })
      .catch((error) => console.error("LOADING ERROR:", error))
}

/* RETURNS THE ALBUM BY ID */
export function getAlbumById(id) {
    return fetch("/database/albums.json")
        .then((response) => response.json())
        .then((data) => {
            return data.find((album) => String(album.id) === String(id));
        })
        .catch((error) => console.error("LOADING ERROR:", error))
}

/* RETURNS ALL THE SONGS OF AN ALBUM */
export function getSongsFromAlbumTitle(album) {
    return fetch("/database/tracks.json") 
        .then((response) => response.json())
        .then((data) => {
            return data.filter((song) => String(song.album) === String(album));
        })
        .catch((error) => console.error("Erreur de chargement :", error));
}