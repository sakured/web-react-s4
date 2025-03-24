import AlbumCard from './../components/AlbumCard.jsx';
import AlbumsSelector from './../components/AlbumsSelector.jsx';
import ArtistPresentation from './../components/ArtistPresentation.jsx';
import { getAlbumsOfArtist, getArtistById } from './../utils/utils.js';
import { useEffect, useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";

export default function Artist() {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [artist, setArtist] = useState(null);
  const [albums, setAlbums] = useState([]);
  const [filter, setFilter] = useState('releasedate');
  const [isFavorite, setIsFavorite] = useState(false);

  /* LOAD ARTIST INFORMATION */
  useEffect(() => {
    setIsLoading(true);
    getArtistById(id)
      .then((data) => setArtist(data))
      .finally(() => setIsLoading(false));
  }, [id]);

  /* LOAD ALL ALBUMS OF THE ARTIST */
  useEffect(() => {
    if (!artist) return; 
    getAlbumsOfArtist(artist)
    .then((data) => setAlbums(data.sort((a, b) => new Date(b.release_date) - new Date(a.release_date))));
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
      <ArtistPresentation artist={artist} isFavorite={isFavorite} setIsFavorite={setIsFavorite} id={id}/>

      <AlbumsSelector filter={filter} setFilter={setFilter}/>

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