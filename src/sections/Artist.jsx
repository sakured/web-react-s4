import AlbumCard from './../components/AlbumCard.jsx';
import { useEffect, useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";

export default function Artist() {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [artist, setArtist] = useState(null);
  const [albums, setAlbums] = useState([]);
  const [filter, setFilter] = useState('releasedate');
  const [isFavorite, setIsFavorite] = useState(false);
  
  /* CHECK IF THE ARTIST IS A FAVORITE */
  useEffect(() => {
    const favoriteArtists = JSON.parse(localStorage.getItem("artists")) || [];
    setIsFavorite(favoriteArtists.some((fav) => String(fav.id) == String(id)));
  }, [id]);

  /* UPDATE THE LIST OF FAVORITE ARTISTS */
  const handleFavoriteClick = () => {
    let favoriteArtists = JSON.parse(localStorage.getItem("artists")) || [];
    let favoriteAlbums = JSON.parse(localStorage.getItem("albums")) || [];
    let favoriteSongs = JSON.parse(localStorage.getItem("songs")) || [];
    let optionsOfArtists = JSON.parse(localStorage.getItem("optionsOfArtists")) || [];

    if (isFavorite) {
      favoriteArtists = favoriteArtists.filter((fav) => String(fav.id) !== String(id));
      setIsFavorite(false);

      // IF THE ARTIST IN NOT IN ANY FAVORITE ALBUMS / SONGS, REMOVE IT FROM THE OPTIONS
      const isArtistReferenced = 
        favoriteArtists.some(a => a.name?.toLowerCase() === artist.name.toLowerCase()) || 
        favoriteAlbums.some(album => album.artist?.toLowerCase() === artist.name.toLowerCase()) ||
        favoriteSongs.some(song => song.artist?.name?.toLowerCase() === artist.name.toLowerCase());
      if (!isArtistReferenced) {
        optionsOfArtists = optionsOfArtists.filter(art => art !== artist.name);
      }
    } else if (artist) {
      favoriteArtists.push(artist);
      if (!optionsOfArtists.includes(artist.name)) {
        optionsOfArtists.push(artist.name);
      }
      setIsFavorite(true);
    }
    localStorage.setItem("artists", JSON.stringify(favoriteArtists));
    localStorage.setItem("optionsOfArtists", JSON.stringify(optionsOfArtists.sort((a, b) => a.localeCompare(b))));
  };

  /* LOAD ARTIST INFORMATION */
  useEffect(() => {
    setIsLoading(true);
    fetch("/database/artists.json")
      .then((response) => response.json())
      .then((data) => {
        const foundArtist = data.find((artist) => String(artist.id) === String(id));
        setArtist(foundArtist);
      })
      .catch((error) => console.error("LOADING ERROR:", error))
      .finally(() => setIsLoading(false));
  }, [id]);

  /* LOAD ALBUMS WHEN ARTIST IS DEFINED */
  useEffect(() => {
    if (!artist) return; 
    fetch("/database/albums.json")
      .then((response) => response.json())
      .then((data) => {
        const filteredData = data.filter((album) => album.artist === artist.name);
        setAlbums(filteredData.sort((a, b) => new Date(b.release_date) - new Date(a.release_date)));
      })
      .catch((error) => console.error("LOADING ERROR:", error));
  }, [artist]); 

  /* SORT ALBUMS */
  const albumsAfterFilter = useMemo(() => {
    if (filter === 'date') {
      return [...albums].sort((a, b) => new Date(b.release_date) - new Date(a.release_date));
    } else if (filter === 'az') {
      return [...albums].sort((a, b) => a.title.localeCompare(b.title));
    } else if (filter === 'mostlistened') {
      return [...albums].sort((a, b) => b.fans - a.fans);
    }
    return albums;
  }, [albums, filter]);

  /* HANDLE LOADING STATE */
  if (isLoading) {
    return <p className="content center">Loading...</p>;
  }

  /* HANDLE ARTIST NOT FOUND */
  if (!artist) {
    return <p className="content center">Artist not found.</p>;
  }

  /* DISPLAY ARTIST INFORMATION */
  return (
    <div className="content">
      <div id="presentation" className="flex-row">
        <img src={artist.picture_big} style={pictureStyle} alt={artist.name} />

        <div id="presentation-text" className="flex-column justify-center">
          <h1 style={artistStyle}>{artist.name}</h1>
          <div className="flex-row">
            {artist.genre.map((genre, index) => (
              <span key={index} style={genreStyle}>{genre}</span>
            ))}
          </div>
          <p>{artist.nb_fan} fans</p>
          <img src={isFavorite === true ? "../heart-filled.png" : "../heart-outlined.png"} className='favorite-logo' alt="favorite" onClick={() => handleFavoriteClick()} />
        </div>
      </div>

      <div style={albumsStyle} className='flex-row space-between align-center'>
        <h2>Albums</h2>
        <div className="line" style={lineStyle}></div>
        <select onChange={(e) => setFilter(e.target.value)} style={selectStyle}>
          <option value="date">Release date</option>
          <option value="az">A - Z</option>
          <option value="mostlistened">Most listened</option>
        </select>
      </div>

      <div id="albums" className='flex-row wrap space-between'>
        {albumsAfterFilter.map(album => (
          <Link to={`/album/${album.id}`} key={album.id}>
            <AlbumCard key={album.id} albumImg={album.cover_medium} albumName={album.title} artistName={album.artist} />
          </Link>
        ))}
      </div>
    </div>
  );
}

/* STYLING */
const artistStyle = {
  fontSize: '3rem',
  margin: '0 0 1rem 0'
};

const pictureStyle = {
  height: '18rem',
  width: '18rem',
  marginRight: '3rem',
  marginTop: '1rem',
  borderRadius: '100%',
  cursor: 'default'
};

const genreStyle = {
  marginRight: '0.5rem',
  textTransform: 'capitalize'
};

const lineStyle = {
  marginLeft: '1rem'
};

const selectStyle = {
  width: '13rem',
};

const albumsStyle = {
  marginTop: '3rem',
  marginBottom: '3rem'
};
