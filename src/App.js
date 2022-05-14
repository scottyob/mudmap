// https://jsfiddle.net/jonobr1/Lbu6795r/87/

import './App.css';
import MapRenderer from "./MapRenderer.js"
import { useEffect, useState } from 'react'
import { ProcessMap } from "./MapParser.js";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useParams
} from "react-router-dom";
const axios = require('axios');

function App() {

  const [map, setMap] = useState(null);
  const [players, setPlayers] = useState({});
  const [mapData, setMapData] = useState("R {   1} {0} {} {Unloaded} {☠} {} {} {} {} {} {1.000} {}");

  useEffect(() => {
    // Re-render the map when either the map data has changed, or we have new players
    setMap(ProcessMap(mapData, players));
  }, [mapData, players])

  useEffect(() => {
    // Sets up polling for new players and maps
    const pollMap = async () => {
      const pst = await axios.post('http://localhost:3001/map');
      setMapData(pst.data);
    }
    pollMap();

    // Adds a listener for map events
    const es = new EventSource("http://localhost:3001/");
    es.addEventListener('users', ev => {
      setPlayers(JSON.parse(ev.data));
    });
    es.addEventListener('map', () => {pollMap();});
  }, []);
    
  if(!map) {
    return (<div>Loading...</div>);
  }

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/map/:room" element={<RoomRenderer mapData={map} players={players} />} />
          <Route path="/player/:player" element={<PlayerRenderer mapData={map} players={players} />} />
          <Route path="/" element={<Navigate replace to="/map/1" />} />
        </Routes>
      </Router>
    </div>
  );
}

function RoomRenderer(props) {
  // Renders a given room
  let { room } = useParams();
  return (<MapRenderer id={room} map={props.mapData.map} players={props.players} playerLocations={props.mapData.players} />);
}

function PlayerRenderer(props) {
  // Renders a given room
  let { player } = useParams();
  return (<MapRenderer player={player} map={props.mapData.map} players={props.players} playerLocations={props.mapData.players}/>);
}


export default App;
