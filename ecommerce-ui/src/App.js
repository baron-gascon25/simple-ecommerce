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
import ItemDetails from "./components/ItemDetails";
import Cart from "./components/Cart";
import Profile from "./components/Profile";
import { useState } from "react";
import SideDrawer from "./components/SideDrawer";

const App = () => {
  const [sideDrawer, setSideDrawer] = useState(false);

  return (
    <AuthProvider>
      <Router>
        <div className='bg-white flex flex-col min-h-screen relative'>
          {sideDrawer && <SideDrawer setSideDrawer={setSideDrawer} />}
          <Navbar setSideDrawer={setSideDrawer} />
          <Routes className='flex-grow'>
            <Route path='/login' element={<Login />} />
            <Route path='/home' element={<Home />} />
            <Route path='/search' element={<Search />} />
            <Route path='/user/:id' element={<Profile />} />
            <Route path='/user/:id/cart' element={<Cart />} />
            <Route path='/product/:id' element={<ItemDetails />} />
            <Route path='/search/:category' element={<Search />} />
            <Route path='*' element={<Navigate to='/home' />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
