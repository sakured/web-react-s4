import SongCard from './../components/SongCard.jsx'
import { useEffect, useState } from "react";

export default function Album({album, artist}) {
    album = JSON.parse(album)
    artist = JSON.parse(artist)
    const [songs, setsongs] = useState([]);

   /* GET THE SONGS OF THE Album */
    useEffect(() => {
      fetch("/database/tracks.json") 
        .then((response) => response.json())
        .then((data) => {
          const filtered = data.filter((song) => song.album === album.title);
          setsongs(filtered.sort((a, b) => new Date(b.release_date) - new Date(a.release_date)));
        })
        .catch((error) => console.error("Erreur de chargement :", error));
    }, []);

    /* DISPLAY ELEMENTS OF THE ALBUM */
    return (
      <div className="content">
        <div id="presentation" className="flex-row">
          <img src={album.cover_big} style={coverStyle} alt={album.title}/>

          <div id="presentation-text" className="flex-column justify-center">
            <h1 style={albumStyle}>{album.title}</h1>
            <a href=""><div className='flex-row align-center'> 
              <img src={artist.picture_small} style={artistPictureStyle} alt={artist.name}/>
              <p>{album.artist}</p>
            </div></a>
            <div className="flex-row">
              {album.genre.map((genre, index) => (
                <span key={index} style={genreStyle}>{genre}</span>
              ))}
            </div>
            <p>{album.release_date}</p>
            <p style={{marginTop:'0rem'}}>{album.fans} fans</p>
            <img src="./heart-outlined.png" className='favorite-logo'></img>
          </div>
        </div>

        <div style={songsStyle} className='flex-row space-between align-center'>
          <p style={titlesTabStyle}>Song</p>
          <div className='flex-row space-between' style={tableStyle}>
            <img src="./clock.png" style={tableLogoStyle}></img>
            <img src="./heart-outlined-white.png" style={tableLogoStyle}></img>
          </div>
        </div>
        <div className="line" style={{marginBottom:'1rem'}}></div>

        <div id="songs" className='flex-column space-between' style={{marginBottom:'3rem'}}>
          {songs.map(song => (
            <div id="songs" className="flex-row space-between align-center" >
              <p style={songTitleStyle}>{song.track_position}. {song.title}</p>
              <div className='flex-row space-between align-center' style={tableStyle}>
                <p>{Math.floor(song.duration/60)}:{(song.duration % 60).toString().padStart(2, '0')}</p>
                <img src="./heart-outlined.png" style={favoriteStyle}></img>
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
    margin: '0 0 1rem 0'
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