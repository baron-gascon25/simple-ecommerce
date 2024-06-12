import { AuthProvider } from "./context/AuthContext";
import Login from "./components/Login";
import Home from "./components/Home";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import "./App.css";
import Navbar from "./components/Navbar";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/home' element={<Home />} />
          <Route path='*' element={<Navigate to='/home' />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
