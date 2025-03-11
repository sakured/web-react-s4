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
  const [selected_artist, setArtist] = useState('all');

  /* GET THE FAVORITES IN THE LOCAL STORAGE */
  let artists = JSON.parse(localStorage.getItem('artists')) || []
  let albums = JSON.parse(localStorage.getItem('albums')) || []
  let songs = JSON.parse(localStorage.getItem('songs')) || []
  let options_of_artists = JSON.parse(localStorage.getItem('options_of_artists')) || []

  /* FILTER THE ARTISTS */
  const filteredArtists = useMemo(() => {
    let ArtistsAfterFilter = artists.filter(artist => {
      return artist.name.toLowerCase().includes(search.toLowerCase());
    })
    if(genre) {
      ArtistsAfterFilter = ArtistsAfterFilter.filter(artist => {
        return artist.genre.includes(genre) || genre === 'all';
      })
    }
    if(selected_artist) {
      ArtistsAfterFilter = ArtistsAfterFilter.filter(artist => {
        return artist.name.includes(selected_artist) || selected_artist === 'all';
      })
    }
    return ArtistsAfterFilter.sort((a, b) => a.name.localeCompare(b.name));
  }, [search, genre, selected_artist]);
  
  /* FILTER THE ALBUMS */
  const filteredAlbums = useMemo(() => {
    let AlbumsAfterFilter = albums.filter(album => {
      return album.title.toLowerCase().includes(search.toLowerCase()) || album.artist.toLowerCase().includes(search.toLowerCase());
    })
    if(genre) {
      AlbumsAfterFilter = AlbumsAfterFilter.filter(album => {
        return album.genre.includes(genre) || genre === 'all';
      })
    }
    if(selected_artist) {
      AlbumsAfterFilter = AlbumsAfterFilter.filter(album => {
        return album.artist.includes(selected_artist) || selected_artist === 'all';
      })
    }
    return AlbumsAfterFilter.sort((a, b) => a.title.localeCompare(b.title));
  }, [search, genre, selected_artist]);

  /* FILTER THE SONGS */
  const filteredSongs = useMemo(() => {
    let SongsAfterFilter = songs.filter(song => {
      return song.title.toLowerCase().includes(search.toLowerCase()) || song.artist.name.toLowerCase().includes(search.toLowerCase()) || song.album.toLowerCase().includes(search.toLowerCase());
    })
    if(genre) {
      SongsAfterFilter = SongsAfterFilter.filter(song => {
        return song.genre.includes(genre) || genre === 'all';
      })
    }
    if(selected_artist) {
      SongsAfterFilter = SongsAfterFilter.filter(song => {
        return song.artist.name.includes(selected_artist) || selected_artist === 'all';
      })
    }
    return SongsAfterFilter.sort((a, b) => a.title.localeCompare(b.title));
  }, [search, genre, selected_artist]);


  /* DISPLAY FAVORITES */
  return (
    <div className="content" style={{marginBottom: '3rem'}}>
      <h1 className="center">MY FAVORITES</h1>  
      <FavoritesFilterBanner setSearch={setSearch} setGenre={setGenre} setArtist={setArtist} artists={options_of_artists}/>

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


