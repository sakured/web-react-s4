export default function FilterBanner({setSearch, setGenre}) {
  
    return (
      <div class="flex-row center space-between align-center" style={FilterBannerStyle}>
        <div class="flex-row align-center">
          <input type="search" placeholder="Search for artists, songs..." onChange={(e) => setSearch(e.target.value)}></input>

          <select onChange={(e) => setGenre(e.target.value)}>
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

          <img src="./heart-outlined.png" style={FavoriteButtonStyle}></img>
        </div>

        <div class="flex-row space-between">
          <p style={FilterTypeStyle} class="filter-type turquoise">Artist</p>
          <p style={FilterTypeStyle} class="filter-type">Album</p>
          <p style={FilterTypeStyle} class="filter-type">Song</p>
        </div>
      </div>
    )
  }

  const FilterBannerStyle = {
    padding: '1rem',
    marginBottom: '4rem',
    marginRight: '1rem',
    border: '#FF00FF solid 2px',
    height: '3rem'
  };

  const FilterTypeStyle = {
    margin: '0rem 1rem',
    cursor: 'pointer'
  }
  
  const FavoriteButtonStyle = {
    height: '2rem',
    width: '2rem',
    paddingLeft: '1rem'
  }