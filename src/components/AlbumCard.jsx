export default function AlbumCard({albumImg, albumName, artistName}) {
    return (
      <div className="flex-column justify-center align-center" style={albumCardStyle}>
        <div className="img-container">
          <img src={albumImg} alt={albumName} style={pictureStyle}/>
        </div>
        <p><strong>{albumName}</strong></p>
        <p>{artistName}</p>
      </div>
    )
  }
  
  const albumCardStyle = {
    margin: '0rem 0.5rem 2rem 0.5rem',
    width: '12rem',
    flexWrap: 'no-wrap',
    textOverflow: 'hidden'
  };

  const pictureStyle = {
    width: '12rem',
    height: '12rem'
  };
