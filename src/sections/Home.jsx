import ArtistCard from './../components/ArtistCard.jsx'
import AlbumCard from './../components/AlbumCard.jsx'
import SongCard from './../components/SongCard.jsx'
import SongCardTitle from './../components/SongCardTitle.jsx'
import TopAlbums from './../components/TopAlbums.jsx'
import TopSongs from './../components/TopSongs.jsx'
import FilterBanner from './../components/FilterBanner.jsx'
import ArtistData from './../../database/artists.json'
import AlbumData from './../../database/albums.json'
import SongData from './../../database/tracks.json'
import { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  const [search, setSearch] = useState('');
  const [genre, setGenre] = useState('all');
  const [favorites, setFavorites] = useState(false);
  const [type, setType] = useState('artists');

  /* GET THE FAVORITES IN THE LOCAL STORAGE */
  const [favoriteArtists, setFavoriteArtists] = useState([]);
  const [favoriteAlbums, setFavoriteAlbums] = useState([]);
  const [favoriteSongs, setFavoriteSongs] = useState([]);

  useEffect(() => {
    setFavoriteArtists(JSON.parse(localStorage.getItem('artists')) || []);
    setFavoriteAlbums(JSON.parse(localStorage.getItem('albums')) || []);
    setFavoriteSongs(JSON.parse(localStorage.getItem('songs')) || []);
  }, []);

  /* FILTERED ARTISTS */
  const filteredArtists = useMemo(() => {
    let ArtistsAfterFilter = ArtistData.filter(artist => {
      return artist.name.toLowerCase().includes(search.toLowerCase());
    })
    if(genre) {
      ArtistsAfterFilter = ArtistsAfterFilter.filter(artist => {
        return artist.genre.includes(genre) || genre === 'all';
      })
    }
    if(favorites) {
      const artistIds = new Set(favoriteArtists.map(artist => artist.id));
      ArtistsAfterFilter = ArtistsAfterFilter.filter(artist => artistIds.has(artist.id));
    }
    return ArtistsAfterFilter.sort((a, b) => a.name.localeCompare(b.name));
  }, [search, genre, favorites]);

  /* FILTERED ALBUMS */
  const filteredAlbums = useMemo(() => {
    let AlbumsAfterFilter = AlbumData.filter(album => {
      return (album.title.toLowerCase().includes(search.toLowerCase()) || album.artist.toLowerCase().includes(search.toLowerCase()));
    })
    if(genre) {
      AlbumsAfterFilter = AlbumsAfterFilter.filter(album => {
        return album.genre.includes(genre) || genre === 'all';
      })
    }
    if(favorites) {
      const albumIds = new Set(favoriteAlbums.map(album => album.id));
      AlbumsAfterFilter = AlbumsAfterFilter.filter(album => albumIds.has(album.id));
    }
    return AlbumsAfterFilter.sort((a, b) => a.artist.localeCompare(b.artist));
  }, [search, genre, favorites]);

  /* FILTERED SONGS */
  const filteredSongs = useMemo(() => {
    let SongsAfterFilter = SongData.filter(song => {
      return (song.title.toLowerCase().includes(search.toLowerCase()) || song.album.toLowerCase().includes(search.toLowerCase()) || song.artist.name.toLowerCase().includes(search.toLowerCase()));
    })
    if(genre) {
      SongsAfterFilter = SongsAfterFilter.filter(song => {
        return song.genre.includes(genre) || genre === 'all';
      })
    }
    if(favorites) {
      const songIds = new Set(favoriteSongs.map(song => song.id));
      SongsAfterFilter = SongsAfterFilter.filter(song => songIds.has(song.id));
    }
    return SongsAfterFilter.sort((a, b) => a.artist.name.localeCompare(b.artist.name));
  }, [search, genre, favorites]);
  
  /* DISPLAY ARTISTS */
  if (type === 'artists') {
    return (
      <div className="content" id="home">
        <FilterBanner setSearch={setSearch} setGenre={setGenre} setType={setType} isFavorites={favorites} setFavorites={setFavorites}/>

        <div className="wrap justify-center" id="artists">
          {filteredArtists.length === 0 ? (
            <p style={{margin: '0.1rem'}}>No artist found</p>
          ) : (
            filteredArtists.map(artist => (
              <Link to={`/artist/${artist.id}`} key={artist.id}>
                <ArtistCard key={artist.id} artistImg={artist.picture_big} artistName={artist.name} />
              </Link>
            ))
          )}
        </div>
      </div>
    )

  /* DISPLAY ALBUMS */
  } else if (type === 'albums') {
    return (
      <div className="content" id="home">
          <FilterBanner setSearch={setSearch} setGenre={setGenre} setType={setType} isFavorites={favorites} setFavorites={setFavorites}/>

        <div className="wrap justify-center" id="albums">
          {filteredAlbums.length === 0 ? (
            <p>No album found</p>
          ) : ( (search.length === 0 && genre === 'all' && !favorites) ? (
              <TopAlbums/>
            ) : ( filteredAlbums.map(album => (
              <Link to={`/album/${album.id}`} key={album.id}>
                <AlbumCard key={album.id} albumImg={album.cover_medium} albumName={album.title} artistName={album.artist} />
              </Link>
            )))
          )}
        </div>
      </div>
    )

  /* DISPLAY SONGS */
  } else if (type === 'songs') {
    return (
      <div className="content" id="home">
        <FilterBanner setSearch={setSearch} setGenre={setGenre} setType={setType}  isFavorites={favorites} setFavorites={setFavorites}/>

        {filteredSongs.length === 0 ? (
            <SongCardTitle />
          ) : ( (search.length != 0 || genre != 'all') ? (
              <SongCardTitle />
            ) : <p></p>
          )}

        <div className="flex-column" id="songs">
          {filteredSongs.length === 0 ? (
            <p className='center'>No song found</p>
          ) : ( (search.length === 0 && genre === 'all' && !favorites) ? (
                <TopSongs/>
            ) : ( filteredSongs.map(song => (
              <SongCard key={song.id} songTitle={song.title} songAlbum={song.album} songArtist={song.artist.name} songDuration={song.duration} />
            )))
          )}
        </div>
      </div>
    )
  }
}