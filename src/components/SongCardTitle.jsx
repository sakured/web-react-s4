export default function SongCard() {
    return (
        <div>
            <div id="songs" className="flex-row" >
                <img src="./clock.png" style={tableLogoStyle}></img>
                <div className="flex-row space-between" style={divInfosStyle}>
                    <p style={{width: '30%', textAlign: 'left'}}>TITLE</p>
                    <p className='nonable' style={{width: '30%', textAlign: 'center'}}>ALBUM</p>
                    <p className='nonable' style={{width: '30%', textAlign: 'right'}}>DURATION</p>
                </div>
            </div>
            <div className="line" style={{marginTop:'0.8rem', marginBottom:'1rem'}}></div>
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