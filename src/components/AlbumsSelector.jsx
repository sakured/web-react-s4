export default function AlbumsSelector({filter, setFilter}) {
  return (
    <div style={albumsStyle} className='flex-row space-between align-center'>
      <h2>Albums</h2>
      <div className="line" style={lineStyle}></div>
      <select onChange={(e) => setFilter(e.target.value)} value={filter} style={selectStyle}>
        <option value="date">Release date</option>
        <option value="az">A - Z</option>
        <option value="mostlistened">Most listened</option>
      </select>
    </div>
  )
}

const lineStyle = {
  marginLeft: '1rem'
};

const selectStyle = {
  width: '13rem',
};

const albumsStyle = {
  marginTop: '3rem',
  marginBottom: '3rem'
};

