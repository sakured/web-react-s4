export default function FavoriteFilterBanner({setSearch, setGenre, setArtist, artists}) {
  
    return (
      <div id="filter-banner" className="flex-row center justify-center align-center wrap" style={FavoriteFilterBannerStyle}>
          <input type="search" placeholder="Search for artists, songs..." onChange={(e) => setSearch(e.target.value)}></input>

          <select onChange={(e) => setGenre(e.target.value)} style={selectStyle}>
            <option value="all">All genres</option>
            <option value="pop">Pop</option>
            <option value="k-pop">K-pop</option>
            <option value="rock">Rock</option>
            <option value="rap">Rap</option>
            <option value="hip hop">Hip hop</option>
            <option value="dance">Dance</option>
            <option value="electro">Electro</option>
            <option value="folk">Folk</option>
            <option value="country">Country</option>
            <option value="french variety">French variety</option>
          </select>

          <select onChange={(e) => setArtist(e.target.value)} style={selectStyle}>
            <option value="all">All artists</option>
            {artists.map((artist, index) => (
                <option key={index} value={artist}>{artist}</option>
            ))}
          </select>

        </div>
    )
  }

  const FavoriteFilterBannerStyle = {
    padding: '1rem',
    marginBottom: '4rem',
    border: '#FF00FF solid 2px',
    height: '3rem'
  };

  const selectStyle = {
    width: '13.5rem'
  };
