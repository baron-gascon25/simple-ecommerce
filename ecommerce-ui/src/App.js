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
        <div className='bg-gradient-to-t from-lime-900 from-2% to-neutral-800 to-20% min-h-screen flex flex-col'>
          <Navbar />
          <Routes className='flex-grow'>
            <Route path='/login' element={<Login />} />
            <Route path='/home' element={<Home />} />
            <Route path='*' element={<Navigate to='/home' />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
