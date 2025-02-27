import SongCard from './../components/SongCard.jsx'
import SongCardTitle from './../components/SongCardTitle.jsx'

export default function TopSongs() {
    return (
      <div className="flex-column">
        <h1>TOP SONGS AT THE MOMENT</h1>
        <SongCardTitle />
        <div  className="flex-column">
          <SongCard songTitle={'Cruel Summer'} songAlbum={'Lover'} songArtist={'Taylor Swift'} songDuration={178} />
          <SongCard songTitle={'Beautifull Things'} songAlbum={'Fireworks & Rollerblades'} songArtist={'Benson Boone'} songDuration={170} />
          <SongCard songTitle={'APT'} songAlbum={'Rosie'} songArtist={'Rosé'} songDuration={169} />
          <SongCard songTitle={'Midnight Memories'} songAlbum={'Midnight Memories (Deluxe)'} songArtist={'One Direction'} songDuration={175} />
          <SongCard songTitle={'Dépassé'} songAlbum={'La Loi du Papillon'} songArtist={'Nuit Incolore'} songDuration={173} />
        </div>
        <p style={{alignSelf: 'center', marginTop: '3rem', textAlign: 'center'}}>Search for more songs !</p>
      </div>
    )
  }