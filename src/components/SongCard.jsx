export default function SongCard({songTitle, songAlbum, songArtist, songDuration}) {
  return (
    <div id="songs" className="flex-row" >
      <p style={durationStyle}>{Math.floor(songDuration/60)}:{(songDuration % 60).toString().padStart(2, '0')}</p>
      <div className="flex-row space-between" style={divInfosStyle}>
        <p className='left song-title' style={songAttributeStyle}>{songTitle}</p>
        <p className='center nonable' style={songAttributeStyle}>{songAlbum}</p>
        <p className='right nonable' style={songAttributeStyle}>{songArtist}</p>
      </div>
    </div>
    )
}

const divInfosStyle = {
  width: '100%'
}

const durationStyle = {
  marginRight: '2rem'
}

const songAttributeStyle = {
  textOverflow: 'ellipsis', 
  overflow: 'hidden', 
  whiteSpace: 'nowrap', 
  width:'30%', 
  maxWidth: '18rem', 
  textAlign: 'left'
}