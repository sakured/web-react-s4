import Header from './sections/Header.jsx'
import Footer from './sections/Footer.jsx'
import Home from './sections/Home.jsx'
import Wishlist from './sections/Wishlist.jsx'
// import "/api/api.js"

import "./styles/global.css"

// const URL = "https://api.deezer.com/artist/27";

async function fetchData() {
    try {
        const response = await fetch("https://api.deezer.com/artist/27");
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
}

export default function App() {
  return (
    <main>
      <Header />
      <button onClick={fetchData}>Fetch Data</button>
      <Home />
      <Footer />
    </main>
  )
}

