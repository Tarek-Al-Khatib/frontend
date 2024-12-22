import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signin from "./pages/Signin/Signin";
import SignUp from "./pages/Signup/Signup";
import Home from "./pages/Home/Home";
import Dashboard from "./pages/Dashboard/Dashboard";
import Communities from "./pages/Communities/Communities";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/signin" element={<Signin />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/learning" element={<div>My learning page</div>}></Route>
        <Route path="/myprofile" element={<div>My profile page</div>}></Route>
        <Route path="/community" element={<Communities />}></Route>
        <Route path="/interview" element={<div>interviews page</div>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
