import AlbumCard from './../components/AlbumCard.jsx'
import { useEffect, useState, useMemo } from "react";

export default function Artist({artist}) {
    artist = JSON.parse(artist)
    const [albums, setAlbums] = useState([]);
    const [filter, setFilter] = useState('releasedate');

   /* GET THE ALBUMS OF THE ARTIST */
    useEffect(() => {
      fetch("/database/albums.json") 
        .then((response) => response.json())
        .then((data) => {
          const filtered = data.filter((album) => album.artist === artist.name);
          setAlbums(filtered.sort((a, b) => new Date(b.release_date) - new Date(a.release_date)));
        })
        .catch((error) => console.error("Erreur de chargement :", error));
    }, []);

    /* ALBUMS AFTER FILTER */
    const albumsAfterFilter = useMemo(() => {
      if (filter === 'date') {
        setAlbums(albums.sort((a, b) => new Date(b.release_date) - new Date(a.release_date)));
      } else if (filter === 'az') {
        setAlbums(albums.sort((a, b) => a.title.localeCompare(b.title)));
      } else if (filter === 'mostlistened') {
        setAlbums(albums.sort((a, b) => b.fans - a.fans));
      }
    }, [albums, filter]);

    /* DISPLAY ELEMENTS OF THE ARTIST */
    return (
      <div className="content">
        <div id="presentation" className="flex-row">
          <img src={artist.picture_big} style={pictureStyle} alt={artist.name}/>

          <div id="presentation-text" className="flex-column justify-center">
            <h1 style={artistStyle}>{artist.name}</h1>
            <div className="flex-row">
              {artist.genre.map((genre, index) => (
                <span key={index} style={genreStyle}>{genre}</span>
              ))}
            </div>
            <p>{artist.nb_fan} fans</p>
            <img src="./heart-outlined.png" className='favorite-logo'></img>
          </div>
        </div>

        <div style={albumsStyle} className='flex-row space-between align-center'>
          <h2>Albums</h2>
          <div className="line" style={{marginLeft: '1rem'}}></div>
          <select onChange={(e) => setFilter(e.target.value)} style={selectStyle}>
            <option value="date">Release date</option>
            <option value="az">A - Z</option>
            <option value="mostlistened">Most listened</option>
          </select>
        </div>

        <div id="albums" className='flex-row wrap space-between'>
          {albums.map(album => (
            <AlbumCard key={album.id} albumImg={album.cover_medium} albumName={album.title} artistName={album.artist} />
          ))}
        </div>

      </div>
    )
  }

  /* STYLING */

  const artistStyle = {
    fontSize: '3rem',
    margin: '0 0 1rem 0'
  }

  const pictureStyle = {
    height: '18rem',
    width: '18rem',
    marginRight: '3rem',
    marginTop: '1rem',
    borderRadius: '100%',
    cursor: 'default'
  }

  const genreStyle = {
    marginRight: '0.5rem',
    textTransform: 'capitalize'
  }

  const selectStyle = {
    width: '13rem',
  }

  const albumsStyle = {
    marginTop: '3rem',
    marginBottom: '3rem'
  }