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
import Interview from "./pages/Interviews/Interviews";
import VideoInterview from "./pages/Interviews/VideoInterview/VideoInterview";
import UI from "./pages/Interviews/AI/UI/UIScreen.jsx";

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
            <Route path="/interview" element={<Interview />}></Route>
            <Route path="/meeting" element={<VideoInterview />}></Route>
            <Route path="/meeting-ai" element={<UI />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AppProviders>
  );
}

export default App;
