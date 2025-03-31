import { useState, useEffect } from "react";
import "./App.css";
import cartridgeImage from "./assets/cartridge.webp";

function App() {
  const [games, setGames] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("https://nes-revival-server.onrender.com/games")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => setGames(data))
      .catch((error) => console.error("Error fetching games:", error));
  }, []);

  const filteredGames = games.filter((game) =>
    game.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <nav>
        <h4>NES</h4>
        <h6>Revival</h6>
      </nav>
      <div id="main">
        <h1>PICK A GAME!</h1>
        <br />
        <input
          type="text"
          placeholder="Search for a game..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <br />
        <br />
        <div id="cards">
          {filteredGames.map((game, index) => (
            <a key={index} href={`/NES-Revival/game?title=${game.name}`}>
              <div className="cardParent">
                <div className="card">
                  <img
                    src={
                      game.image_url
                        ? `https:${game.image_url}`
                        : cartridgeImage
                    }
                    alt={game.name}
                  />
                </div>
                <h4>{game.name}</h4>
                <br />
                <div className="genres nes-badge">
                  <span className="is-dark">{game.genres[0]}</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
