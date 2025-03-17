import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="flex-row space-around footer">
      <Link to="/">
        <a href="">Vibubble</a>
      </Link>
      <a href="https://developers.deezer.com/api" target="_blank">API Deezer</a>
      <a href="https://annesarah.fr" target="_blank">Anne Passelègue</a>
    </footer>
  )
}
  
  