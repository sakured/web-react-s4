import AlbumCard from './../components/AlbumCard.jsx'

export default function TopAlbums() {
    return (
      <div className="flex-column space-between justify-center">
        <h1>TOP ALBUMS AT THE MOMENT</h1>
        <div id="top-albums-container" className="flex-row wrap justify-center">
          <AlbumCard key={52612062} albumImg={'https://cdn-images.dzcdn.net/images/cover/e6f3afd8a5c3d8ea797f458694166e47/250x250-000000-80-0-0.jpg'} albumName={'reputation'} artistName={'Taylor Swift'} />
          <AlbumCard key={560451292} albumImg={'https://cdn-images.dzcdn.net/images/cover/71ca8c4c88fdb45381c4291bd4233ff6/250x250-000000-80-0-0.jpg'} albumName={'Fireworks & Rollerblades'} artistName={'Benson Boon'} />
          <AlbumCard key={679082901} albumImg={'https://cdn-images.dzcdn.net/images/cover/dec22b334250c73370828bf8aa7ce82d/250x250-000000-80-0-0.jpg'} albumName={'Rosie'} artistName={'Rosé'} />
          <AlbumCard key={7132577} albumImg={'https://cdn-images.dzcdn.net/images/cover/620bcd9a3310b1bfaba639b060b54abf/250x250-000000-80-0-0.jpg'} albumName={'Midnight Memories (Deluxe)'} artistName={'One Direction'} />
        </div>
        <p>Search for more albums !</p>
      </div>
    )
  }
