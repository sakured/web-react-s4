import ArtistCard from './../components/ArtistCard.jsx'
import AlbumCard from './../components/AlbumCard.jsx'
import SongCard from './../components/SongCard.jsx'
import SongCardTitle from './../components/SongCardTitle.jsx'
import FavoritesFilterBanner from './../components/FavoritesFilterBanner.jsx'
import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';

export default function Favorites() {
  const [search, setSearch] = useState('');
  const [genre, setGenre] = useState('all');
  const [selectedArtist, setArtist] = useState('all');

  /* GET THE FAVORITES IN THE LOCAL STORAGE */
  let artists = JSON.parse(localStorage.getItem('artists')) || []
  let albums = JSON.parse(localStorage.getItem('albums')) || []
  let songs = JSON.parse(localStorage.getItem('songs')) || []
  let optionsOfArtists = JSON.parse(localStorage.getItem('optionsOfArtists')) || []

  /* FILTER THE ARTISTS */
  const filteredArtists = useMemo(() => {
    return artists
    .filter(artist => 
        artist.name?.toLowerCase().includes(search.toLowerCase()) &&
        (genre === 'all' || artist.genre.includes(genre)) &&
        (selectedArtist === 'all' || artist.name.includes(selectedArtist))
      )
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [search, genre, selectedArtist]);
  
  /* FILTER THE ALBUMS */
  const filteredAlbums = useMemo(() => {
    return albums
      .filter(album => 
        album.title.toLowerCase().includes(search.toLowerCase()) ||
        album.artist.toLowerCase().includes(search.toLowerCase())
      )
      .filter(album => genre === 'all' || album.genre.includes(genre))
      .filter(album => selectedArtist === 'all' || album.artist.includes(selectedArtist))
      .sort((a, b) => a.title.localeCompare(b.title));
  }, [search, genre, selectedArtist]);

  /* FILTER THE SONGS */
  const filteredSongs = useMemo(() => {
    return songs
      .filter(song => 
        song.title.toLowerCase().includes(search.toLowerCase()) ||
        song.artist.name.toLowerCase().includes(search.toLowerCase()) ||
        song.album.toLowerCase().includes(search.toLowerCase())
      )
      .filter(song => genre === 'all' || song.genre.includes(genre))
      .filter(song => selectedArtist === 'all' || song.artist.name.includes(selectedArtist))
      .sort((a, b) => a.album.localeCompare(b.album));
  }, [search, genre, selectedArtist]);


  /* DISPLAY FAVORITES */
  return (
    <div className="content" style={{marginBottom: '3rem'}}>
      <h1 className="center">MY FAVORITES</h1>  
      <FavoritesFilterBanner setSearch={setSearch} setGenre={setGenre} setArtist={setArtist} artists={optionsOfArtists}/>

      <div className='flex-row space-between align-center'>
        <h2>Artists</h2>
        <div className="line" style={{marginLeft: '1rem'}}></div>
      </div>

      <div className="wrap" id="artists" style={{marginTop: '2rem'}}>
          {filteredArtists.length === 0 ? (
            <p style={{marginTop:'0', marginBottom:'2rem'}}>No artist</p>
          ) : (
            filteredArtists.map(artist => (
              <Link to={`/artist/${artist.id}`} key={artist.id}>
                <ArtistCard key={artist.id} artistImg={artist.picture_big} artistName={artist.name} />
              </Link>
            ))
          )}
      </div>


      <div className='flex-row space-between align-center'>
        <h2>Albums</h2>
        <div className="line" style={{marginLeft: '1rem'}}></div>
      </div>

      <div className="wrap" id="albums" style={{marginTop: '2rem'}}>
          {filteredAlbums.length === 0 ? (
            <p style={{marginTop:'0', marginBottom:'2rem'}}>No album</p>
          ) : (
            filteredAlbums.map(album => (
              <Link to={`/album/${album.id}`} key={album.id}>
                <AlbumCard key={album.id} albumImg={album.cover_medium} albumName={album.title} artistName={album.artist} />
              </Link>
            ))
          )}
      </div>
      

      <div className='flex-row space-between align-center' style={{marginBottom: '2rem'}}>
        <h2>Songs</h2>
        <div className="line" style={{marginLeft: '1rem'}} ></div>
      </div>

      <SongCardTitle />
      <div className="flex-column" id="songs">
          {filteredSongs.length === 0 ? (
            <p style={{marginTop:'0', marginBottom:'2rem'}}>No song</p>
          ) : (
            filteredSongs.map(song => (
              <SongCard key={song.id} songTitle={song.title} songAlbum={song.album} songArtist={song.artist.name} songDuration={song.duration} />
            ))
          )}
      </div>
    </div>
  )
}


