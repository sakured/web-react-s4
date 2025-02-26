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
        <div className="flex-row">
          <img src={album.cover_big} style={coverStyle} alt={album.title}/>

          <div className="flex-column justify-center">
            <h1 style={albumStyle}>{album.title}</h1>
            <a href=""><div className='flex-row align-center'> 
              <img src={artist.picture_small} style={{height: '2.5rem', width: '2.5rem', borderRadius: '50%', marginRight: '1rem'}} alt={artist.name}/>
              <p>{album.artist}</p>
            </div></a>
            <div className="flex-row">
              {album.genre.map((genre, index) => (
                <span key={index} style={genreStyle}>{genre}</span>
              ))}
            </div>
            <p>{album.release_date}</p>
            <p style={{marginTop:'0rem'}}>{album.fans} fans</p>
            <img src="./heart-outlined.png" style={favoriteStyle}></img>
          </div>
        </div>

        <div style={songsStyle} className='flex-row space-between align-center'>
          <p style={titlesTabStyle}>Song</p>
          <p style={titlesTabStyle}>Duration</p>
          <p style={titlesTabStyle}>Favorite</p>
        </div>
        <div className="line" style={{marginBottom:'1rem'}}></div>

        <div id="songs" className='flex-column space-between' style={{marginBottom:'3rem'}}>
          {songs.map(song => (
            // <SongCard key={song.id} songTitle={song.title} songAlbum={song.album} songArtist={song.artist.name} />
            <div id="songs" className="flex-row space-between align-center">
              <p>{song.title}</p>
              {/* <video controls autoplay name="media"><source src={song.preview} type="audio/mpeg"/></video> */}
              <p>{song.duration}</p>
              <img src="./heart-outlined.png" style={favoriteStyle}></img>
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

  const coverStyle = {
    height: '18rem',
    width: '18rem',
    marginRight: '3rem',
    marginTop: '1rem'
  }

  const genreStyle = {
    marginRight: '0.5rem',
    marginTop: '1rem',
    textTransform: 'capitalize'
  }

  const titlesTabStyle = {
    fontSize: '17px',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginBottom: '0.3rem'
  }

  const favoriteStyle = {
    height: '2rem',
    width: '2rem'
  }

  const songsStyle = {
    marginTop: '3rem',
    marginBottom: '1rem'
  }