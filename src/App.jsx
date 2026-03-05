import { Routes, Route, Navigate } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Homepage from "./pages/Home";
import Aboutus from "./pages/Aboutus";
import WeatherDashboard from "./components/WeatherDashboard";
import Tour from "./pages/Tour";
import Chatbot from "./pages/Chat";
import "./index.css";
import { LanguageProvider } from "./context/LanguageContext";

function App() {
  return (
    <LanguageProvider>
      <AuthContextProvider>
        <Routes>
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/homepage" element={<Homepage />} />
          <Route path="/" element={<Navigate to="/homepage" />} />
          <Route path="/aboutus" element={<Aboutus />} />
          <Route path="/weather" element={<WeatherDashboard />} />
          <Route path="/tour" element={<Tour />} />
          <Route path="/chat" element={<Chatbot />} />
        </Routes>
      </AuthContextProvider>
    </LanguageProvider>
  );
}
export default App;