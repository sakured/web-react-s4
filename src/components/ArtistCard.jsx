export default function ArtistCard({artistImg, artistName}) {
    return (
      <div class="flex-column justify-center align-center" style={artistCardStyle}>
        <div class="img-container">
          <img src={artistImg} alt={artistName} style={pictureStyle}/>
        </div>
        <p>{artistName}</p>
      </div>
    )
  }
  
  const artistCardStyle = {
    margin: '0rem 0.5rem 2rem 0.5rem',
  };

  const pictureStyle = {
    borderRadius: '10rem',
    width: '15rem',
    height: '15rem'
  };
  