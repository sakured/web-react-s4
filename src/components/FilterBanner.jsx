import { useState } from "react";

export default function FilterBanner({setSearch, genre, setGenre, setType, isFavorites, setFavorites}) {
  const [selectedType, setSelectedType] = useState("artists");

  /* CHANGE THE STATE OF THE TYPE */
  const handleTypeChange = (type) => {
    setSelectedType(type);
    setType(type);
  };

  return (
    <div id="filter-banner" className="flex-row center space-between align-center wrap" style={FilterBannerStyle}>
      <div id="select-filter" className="flex-row align-center">
        <input type="search" placeholder="Search for artists, songs..." onChange={(e) => setSearch(e.target.value)}></input>

        <select onChange={(e) => setGenre(e.target.value)} value={genre}>
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

        <img src={isFavorites === true ? "../heart-filled.png" : "../heart-outlined.png"} style={FavoriteButtonStyle} onClick={() => setFavorites(prev => !prev)}></img>
      </div>

      <div id="element-type-filter" className="flex-row space-between">
        <p style={FilterTypeStyle} className={`filter-type ${selectedType === "artists" ? "turquoise" : ""}`} onClick={() => handleTypeChange('artists')}>Artist</p>
        <p style={FilterTypeStyle} className={`filter-type ${selectedType === "albums" ? "turquoise" : ""}`} onClick={() => handleTypeChange('albums')}>Album</p>
        <p style={FilterTypeStyle} className={`filter-type ${selectedType === "songs" ? "turquoise" : ""}`} onClick={() => handleTypeChange('songs')}>Song</p>
      </div>
    </div>
  )
}

const FilterBannerStyle = {
  padding: '1rem',
  marginBottom: '4rem',
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