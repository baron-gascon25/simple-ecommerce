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
import Footer from "./components/Footer";
import Search from "./components/Search";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className='bg-white flex flex-col min-h-screen relative'>
          <Navbar />
          <Routes className='flex-grow'>
            <Route path='/login' element={<Login />} />
            <Route path='/home' element={<Home />} />
            <Route path='/search' element={<Search />} />
            <Route path='/search/:category' element={<Search />} />
            <Route path='*' element={<Navigate to='/home' />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
