import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

export default function Album() {
  const { id } = useParams();
  const [artist, setArtist] = useState(null);
  const [album, setAlbum] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [songs, setsongs] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [favoriteSongs, setFavoriteSongs] = useState([]);

  /* CHECK IF THE ALBUMS IS A FAVORITE */
  useEffect(() => {
    const favoriteAlbums = JSON.parse(localStorage.getItem("albums")) || [];
    setIsFavorite(favoriteAlbums.some((fav) => String(fav.id) == String(id)));
  }, [id]);

  /* CHECK IF THE SONGS ARE FAVORITES */
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("songs")) || [];
    setFavoriteSongs(storedFavorites);
  }, []);  

  /* UPDATE THE LIST OF FAVORITE ALBUMS */
  const handleFavoriteClick = () => {
    let favoriteAlbums = JSON.parse(localStorage.getItem("albums")) || [];
    let options_of_artists = JSON.parse(localStorage.getItem("options_of_artists")) || [];

    if (isFavorite) {
      favoriteAlbums = favoriteAlbums.filter((fav) => String(fav.id) !== String(id));
      options_of_artists = options_of_artists.filter((art) => art !== artist.name);
      setIsFavorite(false);
    } else {
      if (album) {
        favoriteAlbums.push(album);
        if (!options_of_artists.includes(artist.name)) {
          options_of_artists.push(artist.name);
        }
        setIsFavorite(true);
      }
    }
    localStorage.setItem("albums", JSON.stringify(favoriteAlbums));
    localStorage.setItem("options_of_artists", JSON.stringify(options_of_artists));
  };

  /* UPDATE THE LIST OF FAVORITE SONGS */
  const handleFavoriteSongsClick = (song) => {
    let updatedFavoriteSongs = [...favoriteSongs];
    let options_of_artists = JSON.parse(localStorage.getItem("options_of_artists")) || [];
  
    if (favoriteSongs.some(fav => fav.id === song.id)) {
      updatedFavoriteSongs = updatedFavoriteSongs.filter(fav => fav.id !== song.id);
      options_of_artists = options_of_artists.filter((art) => art !== artist.name);
    } else {
      updatedFavoriteSongs.push(song);
      if (!options_of_artists.includes(artist.name)) {
        options_of_artists.push(artist.name);
      }
    }
    setFavoriteSongs(updatedFavoriteSongs);
    localStorage.setItem("songs", JSON.stringify(updatedFavoriteSongs));
    localStorage.setItem("options_of_artists", JSON.stringify(options_of_artists));
  };

  /* LOAD ALBUM INFORMATION */
  useEffect(() => {
    setIsLoading(true);
    fetch("/database/albums.json")
      .then((response) => response.json())
      .then((data) => {
        const foundAlbum = data.find((album) => String(album.id) === String(id));
        setAlbum(foundAlbum);
      })
      .catch((error) => console.error("LOADING ERROR:", error))
      .finally(() => setIsLoading(false));
  }, [id]);

  /* LOAD ARTIST INFORMATION */
  useEffect(() => {
    if (!album) return; 
  
    setIsLoading(true);
    fetch("/database/artists.json")
      .then((response) => response.json())
      .then((data) => {
        const foundArtist = data.find((artist) => String(artist.name) === String(album.artist));
        setArtist(foundArtist);
      })
      .catch((error) => console.error("LOADING ERROR:", error))
      .finally(() => setIsLoading(false));
  }, [album]); 
  

  /* GET THE SONGS OF THE ALBUM WHEN ALBUM IS DEFINED */
  useEffect(() => {
    if (!album) return;
    fetch("/database/tracks.json") 
      .then((response) => response.json())
      .then((data) => {
        const filtered_data = data.filter((song) => String(song.album) === String(album.title));
        setsongs(filtered_data.sort((a, b) => new Date(b.release_date) - new Date(a.release_date)));
      })
      .catch((error) => console.error("Erreur de chargement :", error));
  }, [album]);

  /* HANDLE LOADING STATE */
  if (isLoading) {
    return <p className="content center">Loading...</p>;
  }

  /* HANDLE ALBUM NOT FOUND */
  if (!album) {
    return <p className="content center">Album not found.</p>;
  }

  /* DISPLAY ALBUM INFORMATION */
  return (
    <div className="content">
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

      <div style={songsStyle} className='flex-row space-between align-center'>
        <p style={titlesTabStyle}>Song</p>
        <div className='flex-row space-between' style={tableStyle}>
          <img src="../clock.png" style={tableLogoStyle}></img>
          <img src="../heart-outlined-white.png" style={tableLogoStyle}></img>
        </div>
      </div>
      <div className="line" style={{marginBottom:'1rem'}}></div>

      <div id="songs" className='flex-column space-between' style={{marginBottom:'3rem'}}>
        {songs.map(song => (
          <div key={song.id} className="flex-row space-between align-center">
            <p style={songTitleStyle}>{song.track_position}. {song.title}</p>
            <div className='flex-row space-between align-center' style={tableStyle}>
              <p>{Math.floor(song.duration/60)}:{(song.duration % 60).toString().padStart(2, '0')}</p>
              <img src={favoriteSongs.some(fav => fav.id === song.id) ? "../heart-filled.png" : "../heart-outlined.png"} className='favorite-logo' onClick={() => handleFavoriteSongsClick(song)}style={favoriteStyle}></img>
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}

/* STYLING */

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

const songsStyle = {
  marginTop: '3rem',
  marginBottom: '1rem'
}

const titlesTabStyle = {
  fontSize: '17px',
  fontWeight: 'bold',
  textTransform: 'uppercase',
  marginBottom: '0.3rem',
  textAlign: 'center'
}

const tableLogoStyle = {
  height: '1.8rem',
  width: '1.8rem',
  cursor: 'default'
}

const songTitleStyle = {
  textOverflow: 'ellipsis',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  display: 'block', 
  width: '100% !important',
  paddingRight: '1rem'
};

const tableStyle = {
  width: '12%',
  minWidth: '5em',
  maxWidth: '20rem'
}

const favoriteStyle = {
  height: '1.8rem',
  width: '1.8rem'
}