import "./App.css";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Home from "./Views/Home";
import Contact from "./Views/Contact";
import ReadingView from "./Views/ReadingView";

function App() {
  return (
    <div className="App">
      <header>This is the header</header>

      <BrowserRouter>
        <div>
          <Link to="/">Home</Link>
          <Link to="contact">Contact</Link>
          <Link to="reading">Reading</Link>
        </div>
        <Routes>
          <Route path="/contact" element={<Contact />} />
          <Route path="/reading" element={<ReadingView />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
