export default function SongCard({songTitle, songAlbum, songArtist}) {
    return (
      <div class="flex-row space-between align-center">
        <p>{songTitle}</p>
        <p>{songAlbum}</p>
        <p>{songArtist}</p>
      </div>
    )
  }
