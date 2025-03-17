export default function SongCardTitle() {
    return (
        <div>
            <div id="songs" className="flex-row" >
                <img src="./clock.png" style={tableLogoStyle}></img>
                <div className="flex-row space-between" style={divInfosStyle}>
                    <p className='left' style={attributeTitleStyle}>TITLE</p>
                    <p className='center nonable' style={attributeTitleStyle}>ALBUM</p>
                    <p className='right nonable' style={attributeTitleStyle}>DURATION</p>
                </div>
            </div>
            <div className="line" style={lineStyle}></div>
        </div>
    )
}
  
const divInfosStyle = {
  fontSize: '17px',
  fontWeight: 'bold',
  textTransform: 'uppercase',
  marginBottom: '0.3rem',
  textAlign: 'center',
  width: '100%'
}

const tableLogoStyle = {
  height: '1.8rem',
  width: '1.8rem',
  marginRight: '2rem',
  cursor: 'default'
}

const attributeTitleStyle = {
    width: '30%'
}

const lineStyle = {
    marginTop:'0.8rem', 
    marginBottom:'1rem'
}