import SongCard from './../components/SongCard.jsx'

export default function TopSongs() {
    return (
      <div className="flex-column space-between align-center">
        <h1>TOP SONGS AT THE MOMENT</h1>
        <div  className="flex-column align-center">
          <SongCard songTitle={'Cruel Summer'} songAlbum={'Lover'} songArtist={'Taylor Swift'} />
          <SongCard songTitle={'Beautifull Things'} songAlbum={'Fireworks & Rollerblades'} songArtist={'Benson Boone'} />
          <SongCard songTitle={'APT'} songAlbum={'Rosie'} songArtist={'Rosé'} />
          <SongCard songTitle={'Midnight Memories'} songAlbum={'Midnight Memories (Deluxe)'} songArtist={'One Direction'} />
          <SongCard songTitle={'Dépassé'} songAlbum={'La Loi du Papillon'} songArtist={'Nuit Incolore'} />
        </div>
        <p>Search for more songs !</p>
      </div>
    )
  }
