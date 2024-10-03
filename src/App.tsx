import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MyNav from "./components/Navbar/MyNav";
import TopBar from "./components/TopBar/TopBar";

function App() {
  return (
    <BrowserRouter>
      <TopBar />
      <MyNav />
      <Routes>{/* <Route path="/" element={<Home />} /> */}</Routes>
    </BrowserRouter>
  );
}

export default App;
