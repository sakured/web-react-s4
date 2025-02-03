import ArtistCard from './../components/ArtistCard.jsx'
import FilterBanner from './../components/FilterBanner.jsx'
import ArtistData from './../../database/artist.json'

export default function Home() {
    return (
      <div className="content">
        <FilterBanner />
        <div className="wrap space-between">
          {ArtistData.map(artist => {
            return <ArtistCard artistImg={artist.picture_big} artistName={artist.name} />
          })}
        </div>
      </div>
    )
  }
  
  