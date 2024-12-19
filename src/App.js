import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signin from "./pages/Signin/Signin";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<div>Homepage</div>}></Route>
        <Route path="/signin" element={<Signin />}></Route>
        <Route path="/signup" element={<div>Sign up page</div>}></Route>
        <Route path="/learning" element={<div>My learning page</div>}></Route>
        <Route path="/myprofile" element={<div>My profile page</div>}></Route>
        <Route path="/community" element={<div>communities page</div>}></Route>
        <Route path="/interview" element={<div>interviews page</div>}></Route>
        <Route path="/dashboard" element={<div>Homepage</div>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
