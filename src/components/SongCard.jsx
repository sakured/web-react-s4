export default function SongCard({songTitle, songAlbum, songArtist}) {
    return (
      <div className="flex-row space-between align-center">
        <p>{songTitle}</p>
        <p>{songAlbum}</p>
        <p>{songArtist}</p>
      </div>
    )
  }
