export default function Artist({artist}) {
    artist = JSON.parse(artist)
    return (
      <div className="content">
        <div className="flex-row">
          <img src={artist.picture_big} style={pictureStyle} alt={artist.name}/>

          <div className="flex-column justify-center">
            <h1 style={artistStyle}>{artist.name}</h1>
            <div className="flex-row">
              {artist.genre.map((genre, index) => (
                <span key={index} style={genreStyle}>{genre}</span>
              ))}
            </div>
            <p>{artist.nb_fan} fans</p>
            <img src="./heart-outlined.png" style={favoriteStyle}></img>
          </div>
        </div>

        <div>
        </div>

      </div>
    )
  }

  const artistStyle = {
    fontSize: '3rem',
    margin: '0 0 1rem 0'
  }

  const pictureStyle = {
    height: '18rem',
    width: '18rem',
    marginRight: '3rem',
    marginTop: '1rem',
    borderRadius: '100%'
  }

  const genreStyle = {
    marginRight: '0.5rem',
    textTransform: 'capitalize'
  }

  const favoriteStyle = {
    height: '2rem',
    width: '2rem'
  }