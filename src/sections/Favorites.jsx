import ArtistCard from './../components/ArtistCard.jsx'
import AlbumCard from './../components/AlbumCard.jsx'
import SongCard from './../components/SongCard.jsx'
import SongCardTitle from './../components/SongCardTitle.jsx'
import FavoritesFilterBanner from './../components/FavoritesFilterBanner.jsx'
import { useState, useMemo } from 'react';

export default function Favorites() {
  const [search, setSearch] = useState('');
  const [genre, setGenre] = useState('all');
  const [selected_artist, setArtist] = useState('all');

  const artists_data = [
    {"id":34535,"name":"Taylor Swift","link":"https://www.deezer.com/artist/12246","share":"https://www.deezer.com/artist/12246?utm_source=deezer&utm_content=artist-12246&utm_term=0_1737994641&utm_medium=web","picture":"https://api.deezer.com/artist/12246/image","picture_small":"https://cdn-images.dzcdn.net/images/artist/d37ef92e54376529cc956a270827dd49/56x56-000000-80-0-0.jpg","picture_medium":"https://cdn-images.dzcdn.net/images/artist/d37ef92e54376529cc956a270827dd49/250x250-000000-80-0-0.jpg","picture_big":"https://cdn-images.dzcdn.net/images/artist/d37ef92e54376529cc956a270827dd49/500x500-000000-80-0-0.jpg","picture_xl":"https://cdn-images.dzcdn.net/images/artist/d37ef92e54376529cc956a270827dd49/1000x1000-000000-80-0-0.jpg","nb_album":107,"nb_fan":11588391,"radio":true,"tracklist":"https://api.deezer.com/artist/12246/top?limit=50","type":"artist","genre":["pop","folk","rock","country"]},
    {"id":12246,"name":"Bis Taylor Swift","link":"https://www.deezer.com/artist/12246","share":"https://www.deezer.com/artist/12246?utm_source=deezer&utm_content=artist-12246&utm_term=0_1737994641&utm_medium=web","picture":"https://api.deezer.com/artist/12246/image","picture_small":"https://cdn-images.dzcdn.net/images/artist/d37ef92e54376529cc956a270827dd49/56x56-000000-80-0-0.jpg","picture_medium":"https://cdn-images.dzcdn.net/images/artist/d37ef92e54376529cc956a270827dd49/250x250-000000-80-0-0.jpg","picture_big":"https://cdn-images.dzcdn.net/images/artist/d37ef92e54376529cc956a270827dd49/500x500-000000-80-0-0.jpg","picture_xl":"https://cdn-images.dzcdn.net/images/artist/d37ef92e54376529cc956a270827dd49/1000x1000-000000-80-0-0.jpg","nb_album":107,"nb_fan":11588391,"radio":true,"tracklist":"https://api.deezer.com/artist/12246/top?limit=50","type":"artist","genre":["pop","folk","rock","country"]}
    ]
    const albums_data = [
      {"id":335135384,"title":"reputation","link":"https://www.deezer.com/album/52612062","cover":"https://api.deezer.com/album/52612062/image","cover_small":"https://cdn-images.dzcdn.net/images/cover/e6f3afd8a5c3d8ea797f458694166e47/56x56-000000-80-0-0.jpg","cover_medium":"https://cdn-images.dzcdn.net/images/cover/e6f3afd8a5c3d8ea797f458694166e47/250x250-000000-80-0-0.jpg","cover_big":"https://cdn-images.dzcdn.net/images/cover/e6f3afd8a5c3d8ea797f458694166e47/500x500-000000-80-0-0.jpg","cover_xl":"https://cdn-images.dzcdn.net/images/cover/e6f3afd8a5c3d8ea797f458694166e47/1000x1000-000000-80-0-0.jpg","md5_image":"e6f3afd8a5c3d8ea797f458694166e47","genre_id":132,"fans":223743,"release_date":"2017-11-17","record_type":"album","tracklist":"https://api.deezer.com/album/52612062/tracks","explicit_lyrics":false,"type":"album","artist":"Taylor Swift","genre":["pop","rock","electro"]},
      {"id":52612062,"title":"bis reputation","link":"https://www.deezer.com/album/52612062","cover":"https://api.deezer.com/album/52612062/image","cover_small":"https://cdn-images.dzcdn.net/images/cover/e6f3afd8a5c3d8ea797f458694166e47/56x56-000000-80-0-0.jpg","cover_medium":"https://cdn-images.dzcdn.net/images/cover/e6f3afd8a5c3d8ea797f458694166e47/250x250-000000-80-0-0.jpg","cover_big":"https://cdn-images.dzcdn.net/images/cover/e6f3afd8a5c3d8ea797f458694166e47/500x500-000000-80-0-0.jpg","cover_xl":"https://cdn-images.dzcdn.net/images/cover/e6f3afd8a5c3d8ea797f458694166e47/1000x1000-000000-80-0-0.jpg","md5_image":"e6f3afd8a5c3d8ea797f458694166e47","genre_id":132,"fans":223743,"release_date":"2017-11-17","record_type":"album","tracklist":"https://api.deezer.com/album/52612062/tracks","explicit_lyrics":false,"type":"album","artist":"Taylor Swift","genre":["pop","rock","electro"]},
    ]
    const songs_data = [
      {"id":534668686,"readable":true,"title":"Guilty Pleasure","title_short":"Guilty Pleasure","title_version":"","isrc":"USUG12305913","link":"https://www.deezer.com/track/2454854875","duration":224,"track_position":14,"disk_number":1,"rank":656863,"explicit_lyrics":false,"explicit_content_lyrics":0,"explicit_content_cover":0,"preview":"https://cdnt-preview.dzcdn.net/api/1/1/2/b/d/0/2bd9e69c01ee013ce897f6481b872d9f.mp3?hdnea=exp=1739467576~acl=/api/1/1/2/b/d/0/2bd9e69c01ee013ce897f6481b872d9f.mp3*~data=user_id=0,application_id=42~hmac=2431575a45802eb74f08b7ee7a610932605aeac8e548254c2f19587bf2ec1b73","md5_image":"71486ce8b24f612c4887efa0f79a9f66","artist":{"id":12945219,"name":"Chappell Roan","tracklist":"https://api.deezer.com/artist/12945219/top?limit=50","type":"artist"},"type":"track","album":"The Rise and Fall of a Midwest Princess","genre":["pop"]},
      {"id":3041617331,"readable":true,"title":"L'envol","title_short":"L'envol","title_version":"","isrc":"FR6F32301850","link":"https://www.deezer.com/track/3041617331","duration":102,"track_position":1,"disk_number":1,"rank":300215,"explicit_lyrics":false,"explicit_content_lyrics":0,"explicit_content_cover":2,"preview":"https://cdnt-preview.dzcdn.net/api/1/1/6/7/7/0/6771b16dea334b650a589db645a33e55.mp3?hdnea=exp=1739467586~acl=/api/1/1/6/7/7/0/6771b16dea334b650a589db645a33e55.mp3*~data=user_id=0,application_id=42~hmac=853fe042cca407279e89cf4d0a4c462bea554f210269d479c701380f98e1e2a0","md5_image":"bd28d73879f21167a09b8eedfa07a4ee","artist":{"id":91212482,"name":"Nuit Incolore","tracklist":"https://api.deezer.com/artist/91212482/top?limit=50","type":"artist"},"type":"track","album":"La loi du papillon : La note noire","genre":["french variety"]}
    ]

    localStorage.setItem('artists', JSON.stringify(artists_data))
    localStorage.setItem('albums', JSON.stringify(albums_data))
    localStorage.setItem('songs', JSON.stringify(songs_data))
    localStorage.setItem('options_of_artists', JSON.stringify(['Nuit Incolore', 'Chappell Roan', 'Taylor Swift', 'Bis Taylor Swift']))

    // Récupération des favoris dans le local storage
    let artists = JSON.parse(localStorage.getItem('artists'))
    let albums = JSON.parse(localStorage.getItem('albums'))
    let songs = JSON.parse(localStorage.getItem('songs'))
    let options_of_artists = JSON.parse(localStorage.getItem('options_of_artists'))

    // Filtrage des artistes
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
    
    // Filtrage des albums
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

    // Filtrage des chansons
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


    // Affichage des favoris
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
                <ArtistCard key={artist.id} artistImg={artist.picture_big} artistName={artist.name} />
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
                <AlbumCard key={album.id} albumImg={album.cover_medium} albumName={album.title} artistName={album.artist} />
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

  
  