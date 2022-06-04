import { BrowserRouter, Routes, Route} from "react-router-dom";
import '../styles/Home.css';
import Login from "./Login";

const Home = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<h1>Page principale</h1>} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div> 
  );
}

export default Home;
