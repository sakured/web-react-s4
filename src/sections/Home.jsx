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
import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  const [search, setSearch] = useState('');
  const [genre, setGenre] = useState('all');

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
    return ArtistsAfterFilter.sort((a, b) => a.name.localeCompare(b.name));
  }, [search, genre]);

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
    return AlbumsAfterFilter.sort((a, b) => a.artist.localeCompare(b.artist));
  }, [search, genre]);

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
    return SongsAfterFilter.sort((a, b) => a.artist.name.localeCompare(b.artist.name));
  }, [search, genre]);
  

  return (
    <div className="content" id="home">
      <FilterBanner setSearch={setSearch} setGenre={setGenre}/>

      <div className="wrap justify-center" id="artists">
        {filteredArtists.length === 0 ? (
          <p>No artist found</p>
        ) : (
          filteredArtists.map(artist => (
            <Link to={`/artist/${artist.id}`} key={artist.id}>
              <ArtistCard key={artist.id} artistImg={artist.picture_big} artistName={artist.name} />
            </Link>
          ))
        )}
      </div>


      <div className="wrap justify-center" id="albums">
        {filteredAlbums.length === 0 ? (
          <p>No album found</p>
        ) : ( (search.length === 0 && genre === 'all') ? (
            <TopAlbums/>
          ) : ( filteredAlbums.map(album => (
            <Link to={`/album/${album.id}`} key={album.id}>
              <AlbumCard key={album.id} albumImg={album.cover_medium} albumName={album.title} artistName={album.artist} />
            </Link>
          )))
        )}
      </div>

      {filteredSongs.length === 0 ? (
          <SongCardTitle />
        ) : ( (search.length != 0 || genre != 'all') ? (
            <SongCardTitle />
          ) : <p></p>
        )}

      <div className="flex-column" id="songs">
        {filteredSongs.length === 0 ? (
          <p className='center'>No song found</p>
        ) : ( (search.length === 0 && genre === 'all') ? (
              <TopSongs/>
          ) : ( filteredSongs.map(song => (
            <SongCard key={song.id} songTitle={song.title} songAlbum={song.album} songArtist={song.artist.name} songDuration={song.duration} />
          )))
        )}
      </div>
    </div>
  )
}