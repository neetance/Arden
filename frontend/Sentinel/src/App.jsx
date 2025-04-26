import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Registration from "./components/Registration";
import Documentation from "./components/Documentation";
import Background from "./components/Background";

// Import your new pages
import Home from "./components/Home";
import Register from "./components/Register";
import Claims from "./components/Claims";
import Button1 from "./components/Button1";
import Button2 from "./components/Button2";

function App() {
  return (
    <Router>
      <Background />
      {/* <Home/> */}
      <Routes>
        {/* Existing routes */}
        <Route path="/" element={<Registration />} />
        <Route path="/documentation" element={<Documentation />} />

        {/* New routes */}
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/claims" element={<Claims />} />
        <Route path="/button1" element={<Button1 />} />
        <Route path="/button2" element={<Button2 />} />
      </Routes>
    </Router>
  );
}

export default App;
