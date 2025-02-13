import ArtistCard from './../components/ArtistCard.jsx'
import FilterBanner from './../components/FilterBanner.jsx'
import ArtistData from './../../database/artist.json'
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
  

  return (
    <div className="content">
      <FilterBanner setSearch={setSearch} setGenre={setGenre}/>
      
      <div className="wrap justify-center">

        {filteredArtists.length === 0 ? (
          <p>No artist found</p>
        ) : (
          filteredArtists.map(artist => (
            <ArtistCard key={artist.id} artistImg={artist.picture_big} artistName={artist.name} />
          ))
        )}

      </div>
    </div>
  )
}
  
  