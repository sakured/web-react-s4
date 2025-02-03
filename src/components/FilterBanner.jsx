export default function FilterBanner() {
    return (
      <div class="flex-row center space-between align-center" style={FilterBannerStyle}>
        <div class="flex-row align-center">
          <input type="search" placeholder="Search an artist, a song..."></input>
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