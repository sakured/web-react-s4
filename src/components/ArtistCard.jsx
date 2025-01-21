export default function ArtistCard() {
    return (
      <div style={artistCardStyle}>
        <p>Artist Name</p>
        <p>Name</p>
        <p>Artist</p>
      </div>
    )
  }
  
  const artistCardStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0rem 1rem 2rem 0rem',
    padding: '1rem',
    border: '#00FFFF solid 2px',
    borderRadius: '20px',
    width: '13rem',
    height: '13rem'
  };
  