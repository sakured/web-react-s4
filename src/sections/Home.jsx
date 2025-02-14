import ArtistCard from './../components/ArtistCard.jsx'
import AlbumCard from './../components/AlbumCard.jsx'
import SongCard from './../components/SongCard.jsx'
import FilterBanner from './../components/FilterBanner.jsx'
import ArtistData from './../../database/artist.json'
import AlbumData from './../../database/albums.json'
import SongData from './../../database/tracks.json'
import { useState, useMemo } from 'react';

export default function Home() {
  const [search, setSearch] = useState('');
  const [genre, setGenre] = useState('');

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
    <div className="content">
      <FilterBanner setSearch={setSearch} setGenre={setGenre}/>

      <div className="wrap justify-center" id="artists">
        {filteredArtists.length === 0 ? (
          <p>No artist found</p>
        ) : (
          filteredArtists.map(artist => (
            <ArtistCard key={artist.id} artistImg={artist.picture_big} artistName={artist.name} />
          ))
        )}
      </div>


      <div className="wrap justify-center" id="albums">
        {filteredAlbums.length === 0 ? (
          <p>No album found</p>
        ) : (
          filteredAlbums.map(album => (
            <AlbumCard key={album.id} albumImg={album.cover_medium} albumName={album.title} artistName={album.artist} />
          ))
        )}
      </div>


      <div className="wrap justify-center flex-column" id="songs">
        {filteredSongs.length === 0 ? (
          <p>No song found</p>
        ) : (
          filteredSongs.map(song => (
            <SongCard key={song.id} songTitle={song.title} songAlbum={song.album} songArtist={song.artist.name} />
          ))
        )}
      </div>
    </div>
  )
}
  
  