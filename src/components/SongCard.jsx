export default function SongCard({songTitle, songAlbum, songArtist, songDuration}) {
  return (
    <div id="songs" className="flex-row" >
      <p style={{marginRight: '2rem'}}>{Math.floor(songDuration/60)}:{(songDuration % 60).toString().padStart(2, '0')}</p>
      <div className="flex-row space-between" style={divInfosStyle}>
        <p style={{textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap', width: '30%', textAlign: 'left'}}>{songTitle}</p>
        <p className='nonable' style={{textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap', width: '30%', textAlign: 'center'}}>{songAlbum}</p>
        <p className='nonable' style={{textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap', width: '30%', textAlign: 'right'}}>{songArtist}</p>
      </div>
    </div>
    )
}

const divInfosStyle = {
  width: '100%'
}