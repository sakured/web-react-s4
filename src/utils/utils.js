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