import AlbumPresentation from './../components/AlbumPresentation.jsx';
import { getAlbumById, getArtistByName, getSongsFromAlbumTitle } from './../utils/utils.js';
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Album() {
  const { id } = useParams();
  const [artist, setArtist] = useState(null);
  const [album, setAlbum] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [songs, setSongs] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [favoriteSongs, setFavoriteSongs] = useState([]);

  /* CHECK IF THE SONGS ARE FAVORITES */
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("songs")) || [];
    setFavoriteSongs(storedFavorites);
  }, []);  

  /* UPDATE THE LIST OF FAVORITE SONGS */
  const handleFavoriteSongsClick = (song) => {
    let updatedFavoriteSongs = [...favoriteSongs];
    let favoriteArtists = JSON.parse(localStorage.getItem("artists")) || [];
    let favoriteAlbums = JSON.parse(localStorage.getItem("albums")) || [];
    let optionsOfArtists = JSON.parse(localStorage.getItem("optionsOfArtists")) || [];
  
    if (favoriteSongs.some(fav => fav.id === song.id)) {
      updatedFavoriteSongs = updatedFavoriteSongs.filter(fav => fav.id !== song.id);

      // IF THE ARTIST IN NOT IN ANY FAVORITE ALBUMS / SONGS, REMOVE IT FROM THE OPTIONS
      const isArtistReferenced = 
        favoriteArtists.some(a => a.name?.toLowerCase() === artist.name.toLowerCase()) || 
        favoriteAlbums.some(album => album.artist?.toLowerCase() === artist.name.toLowerCase()) ||
        updatedFavoriteSongs.some(song => song.artist?.name?.toLowerCase() === artist.name.toLowerCase());
      if (!isArtistReferenced) {
        optionsOfArtists = optionsOfArtists.filter(art => art !== artist.name);
      }
    } else {
      updatedFavoriteSongs.push(song);
      if (!optionsOfArtists.includes(artist.name)) {
        optionsOfArtists.push(artist.name);
      }
    }
    setFavoriteSongs(updatedFavoriteSongs);
    localStorage.setItem("songs", JSON.stringify(updatedFavoriteSongs));
    localStorage.setItem("optionsOfArtists", JSON.stringify(optionsOfArtists.sort((a, b) => a.localeCompare(b))));
  };

  /* LOAD ALBUM INFORMATION */
  useEffect(() => {
    setIsLoading(true);
      getAlbumById(id)
      .then((data) => setAlbum(data))
      .finally(() => setIsLoading(false));
  }, [id]);

  /* LOAD ARTIST INFORMATION */
  useEffect(() => {
    if (!album) return; 
    setIsLoading(true);
    getArtistByName(album.artist)
      .then((data) => setArtist(data))
      .finally(() => setIsLoading(false));
  }, [album]); 

  /* GET THE SONGS OF THE ALBUM */
  useEffect(() => {
    if (!album) return;
    getSongsFromAlbumTitle(album.title)
      .then((data) => setSongs(data.sort((a, b) => new Date(b.release_date) - new Date(a.release_date))))
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
      <AlbumPresentation album={album} artist={artist} isFavorite={isFavorite} setIsFavorite={setIsFavorite} id={id}/>

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