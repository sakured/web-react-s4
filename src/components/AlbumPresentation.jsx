import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function AlbumPresentation({album, artist, isFavorite, setIsFavorite, id}) {

  /* CHECK IF THE ALBUMS IS A FAVORITE */
  useEffect(() => {
    const favoriteAlbums = JSON.parse(localStorage.getItem("albums")) || [];
    setIsFavorite(favoriteAlbums.some((fav) => String(fav.id) == String(id)));
  }, [id]);

  /* UPDATE THE LIST OF FAVORITE ALBUMS */
  const handleFavoriteClick = () => {
    let favoriteArtists = JSON.parse(localStorage.getItem("artists")) || [];
    let favoriteAlbums = JSON.parse(localStorage.getItem("albums")) || [];
    let favoriteSongs = JSON.parse(localStorage.getItem("songs")) || [];
    let optionsOfArtists = JSON.parse(localStorage.getItem("optionsOfArtists")) || [];

    if (isFavorite) {
      favoriteAlbums = favoriteAlbums.filter((fav) => String(fav.id) !== String(id));
      setIsFavorite(false);

      // IF THE ARTIST IN NOT IN ANY FAVORITE ALBUMS / SONGS, REMOVE IT FROM THE OPTIONS
      const isArtistReferenced = 
        favoriteArtists.some(a => a.name?.toLowerCase() === artist.name.toLowerCase()) || 
        favoriteAlbums.some(album => album.artist?.toLowerCase() === artist.name.toLowerCase()) ||
        favoriteSongs.some(song => song.artist?.name?.toLowerCase() === artist.name.toLowerCase());
      if (!isArtistReferenced) {
        optionsOfArtists = optionsOfArtists.filter(art => art !== artist.name);
      }
    } else if (album) {
        favoriteAlbums.push(album);
        if (!optionsOfArtists.includes(artist.name)) {
          optionsOfArtists.push(artist.name);
        }
        setIsFavorite(true);
      }
    localStorage.setItem("albums", JSON.stringify(favoriteAlbums));
    localStorage.setItem("optionsOfArtists", JSON.stringify(optionsOfArtists.sort((a, b) => a.localeCompare(b))));
  };

 
  /* DISPLAY ALBUM PRESENTATION */
  return (
    <div id="presentation" className="flex-row">
      <img src={album.cover_big} style={coverStyle} alt={album.title}/>

      <div id="presentation-text" className="flex-column justify-center">
        <h1 style={albumStyle}>{album.title}</h1>
        <div className='flex-row align-center'> 
          <img src={artist?.picture_small} style={artistPictureStyle} alt={artist?.name}/>
          <Link to={`/artist/${artist?.id}`} key={artist?.id}>
            <p>{album.artist}</p>
          </Link>
        </div>
        <div className="flex-row">
          {album.genre.map((genre, index) => (
            <span key={index} style={genreStyle}>{genre}</span>
          ))}
        </div>
        <p>{album.release_date}</p>
        <p style={{marginTop:'0rem'}}>{album.fans} fans</p>
        <img src={isFavorite === true ? "../heart-filled.png" : "../heart-outlined.png"} className='favorite-logo' onClick={() => handleFavoriteClick()}></img>
      </div>
    </div>
  )
}


const albumStyle = {
  fontSize: '3rem',
  margin: '0 0 1rem 0',
  textAlign: 'left',
}

const artistPictureStyle = {
  height: '2.5rem', 
  width: '2.5rem', 
  borderRadius: '50%', 
  marginRight: '1rem'
}

const coverStyle = {
  height: '18rem',
  width: '18rem',
  marginRight: '3rem',
  marginTop: '1rem',
  cursor: 'default'
}

const genreStyle = {
  marginRight: '0.5rem',
  marginTop: '1rem',
  textTransform: 'capitalize'
}