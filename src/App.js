import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signin from "./pages/Signin/Signin";
import SignUp from "./pages/Signup/Signup";
import Home from "./pages/Home/Home";
import Dashboard from "./pages/Dashboard/Dashboard";
import Communities from "./pages/Communities/Communities";
import Learning from "./pages/Learning/Learning";
import AppProviders from "./contexts/AppProviders";
import Profile from "./pages/Profile/Profile";
import ProtectionRoute from "./components/ProtectionRoute/ProtectionRoute";

function App() {
  return (
    <AppProviders>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/signin" element={<Signin />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>
          <Route path="/" element={<ProtectionRoute />}>
            <Route path="/dashboard" element={<Dashboard />}></Route>
            <Route path="/learning" element={<Learning />}></Route>
            <Route path="/myprofile" element={<Profile />}></Route>
            <Route path="/community" element={<Communities />}></Route>
            <Route
              path="/interview"
              element={<div>interviews page</div>}
            ></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AppProviders>
  );
}

export default App;
