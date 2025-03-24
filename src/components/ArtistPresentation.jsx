import { useEffect } from "react";

export default function ArtistPresentation({artist, isFavorite, setIsFavorite, id}) {

  /* CHECK IF THE ARTIST IS A FAVORITE */
  useEffect(() => {
    const favoriteArtists = JSON.parse(localStorage.getItem("artists")) || [];
    setIsFavorite(favoriteArtists.some((fav) => String(fav.id) == String(id)));
  }, [id]);

  /* UPDATE THE LIST OF FAVORITE ARTISTS */
  const handleFavoriteClick = () => {
    let favoriteArtists = JSON.parse(localStorage.getItem("artists")) || [];
    let favoriteAlbums = JSON.parse(localStorage.getItem("albums")) || [];
    let favoriteSongs = JSON.parse(localStorage.getItem("songs")) || [];
    let optionsOfArtists = JSON.parse(localStorage.getItem("optionsOfArtists")) || [];

    if (isFavorite) {
      favoriteArtists = favoriteArtists.filter((fav) => String(fav.id) !== String(id));
      setIsFavorite(false);

      // IF THE ARTIST IN NOT IN ANY FAVORITE ALBUMS / SONGS, REMOVE IT FROM THE OPTIONS
      const isArtistReferenced = 
        favoriteArtists.some(a => a.name?.toLowerCase() === artist.name.toLowerCase()) || 
        favoriteAlbums.some(album => album.artist?.toLowerCase() === artist.name.toLowerCase()) ||
        favoriteSongs.some(song => song.artist?.name?.toLowerCase() === artist.name.toLowerCase());
      if (!isArtistReferenced) {
        optionsOfArtists = optionsOfArtists.filter(art => art !== artist.name);
      }
    } else if (artist) {
      favoriteArtists.push(artist);
      if (!optionsOfArtists.includes(artist.name)) {
        optionsOfArtists.push(artist.name);
      }
      setIsFavorite(true);
    }
    localStorage.setItem("artists", JSON.stringify(favoriteArtists));
    localStorage.setItem("optionsOfArtists", JSON.stringify(optionsOfArtists.sort((a, b) => a.localeCompare(b))));
  };


  return (
    <div id="presentation" className="flex-row">
      <img src={artist.picture_big} style={pictureStyle} alt={artist.name} />

      <div id="presentation-text" className="flex-column justify-center">
        <h1 style={artistStyle}>{artist.name}</h1>
        <div className="flex-row">
          {artist.genre.map((genre, index) => (
            <span key={index} style={genreStyle}>{genre}</span>
          ))}
        </div>
        <p>{artist.nb_fan} fans</p>
        <img src={isFavorite === true ? "../heart-filled.png" : "../heart-outlined.png"} className='favorite-logo' alt="favorite" onClick={() => handleFavoriteClick()} />
      </div>
    </div>
  )
}

const artistStyle = {
  fontSize: '3rem',
  margin: '0 0 1rem 0'
};

const pictureStyle = {
  height: '18rem',
  width: '18rem',
  marginRight: '3rem',
  marginTop: '1rem',
  borderRadius: '100%',
  cursor: 'default'
};

const genreStyle = {
  marginRight: '0.5rem',
  textTransform: 'capitalize'
};