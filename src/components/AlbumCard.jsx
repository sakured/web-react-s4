export default function AlbumCard({albumImg, albumName, artistName}) {
  return (
    <div className="flex-column justify-center align-center" style={albumCardStyle}>
      <div className="img-container">
        <img src={albumImg} alt={albumName} style={pictureStyle}/>
      </div>
      <p style={albumText}><strong>{albumName}</strong></p>
      <p style={albumText}>{artistName}</p>
    </div>
  )
}

const albumCardStyle = {
  margin: '0rem 0.5rem 2rem 0.5rem',
  width: '12rem',
  flexWrap: 'no-wrap'
};

const albumText = {
  textOverflow: 'ellipsis',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  display: 'block', 
  width: '100%',
};

const pictureStyle = {
  width: '12rem',
  height: '12rem'
};
