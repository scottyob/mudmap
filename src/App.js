// https://jsfiddle.net/jonobr1/Lbu6795r/87/

import './App.css';
import MapRenderer from "./MapRenderer.js"
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useParams
} from "react-router-dom";

function App() {

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/map/:room" element={<RoomRenderer />} />
          <Route path="/" element={<Navigate replace to="/map/1" />} />
        </Routes>
      </Router>
    </div>
  );
}

function RoomRenderer() {
  // Renders a given room
  let { room } = useParams();
  return (<MapRenderer id={room} />);
}


export default App;
