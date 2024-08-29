import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Quiz from "./quiz";
import Home from "./Home";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/quiz' element={<Quiz />}></Route>
      </Routes>
    </Router>
  );
};

export default App;