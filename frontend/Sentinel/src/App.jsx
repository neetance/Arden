// import "./App.css";

// import Registration from "./components/Registration";
// import Background from "./components/Background";

// function App() {
//   return <Registration />;
// }

// export default App;
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Registration from "./components/Registration";
import Documentation from "./components/Documentation";
import Background from "./components/Background";

function App() {
  return (
    <Router>
      <Background />
      <Routes>
        <Route path="/" element={<Registration />} />
        <Route path="/documentation" element={<Documentation />} />
      </Routes>
    </Router>
  );
}

export default App;
