import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const Auth = useAuth();

  return (
    <nav className='bg-slate-600 text-slate-300 mb-10'>
      <div className='container mx-auto flex flex-row items-center justify-between h-16'>
        <div className='flex flex-row flex-1 text-2xl mx-1'>
          <h6>Simple Ecommerce</h6>
        </div>
        <ul className='flex flex-row flex-wrap justify-evenly'>
          <li className='mx-5'>
            <p className='cursor-pointer' onClick={() => navigate("/home")}>
              Home
            </p>
          </li>
          <li className='mx-5'>
            <p
              className='cursor-pointer'
              onClick={() =>
                !Auth.isAuthenticated ? navigate("/login") : Auth.userLogout()
              }
            >
              {!Auth.isAuthenticated ? "Login" : "Logout"}
            </p>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
