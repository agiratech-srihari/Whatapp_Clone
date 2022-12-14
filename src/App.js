import "./App.css";
import Sidebar from "./Sidebar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Chat from "./Chat";
import Home from "./Home";
import { useStatevalue } from "./StateProvider";

function App() {
  const [{ user }, dispatch] = useStatevalue();
  return (
    <div className="app">
      {!user ? (
        <Login />
      ) : (
        <div className="app__body">
          <Router>
            <Sidebar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/rooms/:roomId" element={<Chat />} />
            </Routes>
          </Router>
        </div>
      )}
    </div>
  );
}

export default App;
