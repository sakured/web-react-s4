export default function AlbumCard({albumImg, albumName, artistName}) {
    return (
      <div class="flex-column justify-center align-center" style={albumCardStyle}>
        <div class="img-container">
          <img src={albumImg} alt={albumName} style={pictureStyle}/>
        </div>
        <p><strong>{albumName}</strong></p>
        <p>{artistName}</p>
      </div>
    )
  }
  
  const albumCardStyle = {
    margin: '0rem 0.5rem 2rem 0.5rem',
  };

  const pictureStyle = {
    width: '10rem',
    height: '10rem'
  };
  