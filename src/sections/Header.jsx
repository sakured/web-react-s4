import { Link, useLocation } from 'react-router-dom';

export default function Header() {  
  return (
    <header className="flex-row wrap space-between align-center header">
      <Link to="/">
        <img src="../logo.png" alt="Logo Vibubble"></img>
      </Link>

      <div id="menu" className="flex-row" alt="Logo Vibubble">
        <Link to="/">
          <p className={useLocation().pathname === "/" ? "turquoise" : ""}>Home</p>
        </Link>

        <Link to="/favorites">
          <p className={useLocation().pathname === "/favorites" ? "turquoise" : ""}>Favorites</p>
        </Link>
      </div>
    </header>
  )
}
  
  