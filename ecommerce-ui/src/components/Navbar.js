import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const Auth = useAuth();

  return (
    <nav className='bg-neutral-800 text-slate-300 shadow-lg drop-shadow-lg border-b-2 border-b-lime-900'>
      <div className='container mx-auto flex flex-row items-center justify-between h-16'>
        <div className='flex flex-row flex-1 text-2xl mx-1'>
          <h6 className='text-white'>Simple Ecommerce</h6>
        </div>
        <ul className='flex flex-row'>
          <li>
            <p
              className='text-white cursor-pointer h-[4.25rem] py-5 mx-5 hover:border-b-2 hover:border-lime-100'
              onClick={() => navigate("/home")}
            >
              Home
            </p>
          </li>
          <li>
            <p
              className='text-white cursor-pointer h-[4.25rem] py-5 mx-5 hover:border-b-2 hover:border-lime-100'
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
