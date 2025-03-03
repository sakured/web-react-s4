import Home from './sections/Home.jsx'
import Artist from './sections/Artist.jsx'
import Album from './sections/Album.jsx'
import Favorites from './sections/Favorites.jsx'

import "./styles/global.css"

const tay = JSON.stringify(
  {
    "id": 12246,
    "name": "Taylor Swift",
    "link": "https://www.deezer.com/artist/12246",
    "share": "https://www.deezer.com/artist/12246?utm_source=deezer&utm_content=artist-12246&utm_term=0_1737994641&utm_medium=web",
    "picture": "https://api.deezer.com/artist/12246/image",
    "picture_small": "https://cdn-images.dzcdn.net/images/artist/d37ef92e54376529cc956a270827dd49/56x56-000000-80-0-0.jpg",
    "picture_medium": "https://cdn-images.dzcdn.net/images/artist/d37ef92e54376529cc956a270827dd49/250x250-000000-80-0-0.jpg",
    "picture_big": "https://cdn-images.dzcdn.net/images/artist/d37ef92e54376529cc956a270827dd49/500x500-000000-80-0-0.jpg",
    "picture_xl": "https://cdn-images.dzcdn.net/images/artist/d37ef92e54376529cc956a270827dd49/1000x1000-000000-80-0-0.jpg",
    "nb_album": 107,
    "nb_fan": 11588391,
    "radio": true,
    "tracklist": "https://api.deezer.com/artist/12246/top?limit=50",
    "type": "artist",
    "genre": ["pop", "folk", "rock", "country"]
  })

const rep = JSON.stringify(
  {
    "id": 52612062,
    "title": "reputation",
    "link": "https://www.deezer.com/album/52612062",
    "cover": "https://api.deezer.com/album/52612062/image",
    "cover_small": "https://cdn-images.dzcdn.net/images/cover/e6f3afd8a5c3d8ea797f458694166e47/56x56-000000-80-0-0.jpg",
    "cover_medium": "https://cdn-images.dzcdn.net/images/cover/e6f3afd8a5c3d8ea797f458694166e47/250x250-000000-80-0-0.jpg",
    "cover_big": "https://cdn-images.dzcdn.net/images/cover/e6f3afd8a5c3d8ea797f458694166e47/500x500-000000-80-0-0.jpg",
    "cover_xl": "https://cdn-images.dzcdn.net/images/cover/e6f3afd8a5c3d8ea797f458694166e47/1000x1000-000000-80-0-0.jpg",
    "md5_image": "e6f3afd8a5c3d8ea797f458694166e47",
    "genre_id": 132,
    "fans": 223743,
    "release_date": "2017-11-17",
    "record_type": "album",
    "tracklist": "https://api.deezer.com/album/52612062/tracks",
    "explicit_lyrics": false,
    "type": "album",
    "artist": "Taylor Swift",
    "genre": [
        "pop",
        "rock",
        "electro"
    ]
})

export default function App() {
  return (
    <main>
      {/* <Artist artist={tay}/>
      <Album album={rep} artist={tay}/>
      <Home /> */}
      <Favorites />
    </main>
  )
}

