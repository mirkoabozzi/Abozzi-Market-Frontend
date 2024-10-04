import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MyNav from "./components/Navbar/MyNav";
import TopBar from "./components/TopBar/TopBar";
import Category from "./components/Category/Category";

function App() {
  return (
    <BrowserRouter>
      <TopBar />
      <MyNav />
      <Category />
      <Routes></Routes>
    </BrowserRouter>
  );
}

export default App;
