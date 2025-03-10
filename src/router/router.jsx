import { createBrowserRouter } from "react-router-dom";
import Layout from "../sections/Layout.jsx";
import Home from "../sections/Home.jsx";
import Favorites from "../sections/Favorites.jsx";
import Artist from "../sections/Artist.jsx";
import Album from "../sections/Album.jsx";

export default createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
        { path: "", element: <Home /> },
        { path: "favorites", element: <Favorites /> },
        { path: "artist/:id", element: <Artist /> },
        { path: "album/:id", element: <Album /> },
    ],
  },
]);