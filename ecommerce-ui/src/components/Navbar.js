import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const Auth = useAuth();

  const handleDropdownToggle = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleOptionClick = (option) => {
    if (option === "Profile") {
      navigate(`/user/${Auth.user.id}`);
    } else if (option === "Cart") {
      navigate(`/user/${Auth.user.id}/cart`);
    } else if (option === "Logout") {
      Auth.userLogout();
      navigate("/login");
    }
    setDropdownOpen(false);
  };

  return (
    <nav className='bg-white shadow-lg drop-shadow-lg z-50'>
      <div className='container mx-auto flex flex-row items-center justify-between'>
        <div className='flex flex-row flex-1 items-center'>
          <button className='mx-5 sm:hidden block'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='size-6'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5'
              />
            </svg>
          </button>
          <h6 className='text-black text-2xl font-bold sm:mx-5 py-5'>
            GameShop
          </h6>
          <ul className='md:flex hidden flex-row items-center'>
            <li className='rounded-sm font-medium cursor-pointer hover:text-white hover:bg-black transition duration-500 p-2 border-2 border-transparent'>
              <a href='/search/headset'>Headset</a>
            </li>
            <li className='rounded-sm font-medium mx-5 cursor-pointer hover:text-white hover:bg-black transition duration-500 p-2 border-2 border-transparent'>
              <a href='/search/keyboard'>Keyboard</a>
            </li>
            <li className='rounded-sm font-medium cursor-pointer hover:text-white hover:bg-black transition duration-500 p-2 border-2 border-transparent'>
              <a href='/search/mouse'>Mouse</a>
            </li>
          </ul>
        </div>
        <ul className='flex flex-row items-center'>
          <li className='sm:block hidden'>
            <a
              className='rounded-sm font-medium mx-5 cursor-pointer hover:text-white hover:bg-black transition duration-500 p-2 border-2 border-transparent'
              href='/home'
            >
              Home
            </a>
          </li>
          <li className='sm:block hidden'>
            <a
              className='rounded-sm font-medium cursor-pointer hover:text-white hover:bg-black transition duration-500 p-2 border-2 border-transparent'
              href='/search'
            >
              Search
            </a>
          </li>
          <li>
            {!Auth.isAuthenticated ? (
              <p
                className='rounded-sm font-medium cursor-pointer hover:text-white hover:bg-black transition duration-500 p-2 border-2 border-transparent w-24 mx-5 text-center overflow-hidden'
                onClick={() => navigate("/login")}
              >
                Login
              </p>
            ) : (
              <div className='relative'>
                <button
                  className='rounded-sm font-medium cursor-pointer hover:text-white hover:bg-black transition duration-500 p-2 border-2 border-transparent w-24 mx-5 text-center overflow-hidden'
                  onClick={handleDropdownToggle}
                >
                  {Auth.user.name}
                </button>
                {dropdownOpen && (
                  <ul className='absolute right-0 mt-2 mx-5 w-24 bg-white border border-gray-200 rounded-sm shadow-lg z-50 text-center'>
                    <li
                      className='cursor-pointer p-4 rounded-sm hover:bg-black hover:text-white transition duration-300'
                      onClick={() => handleOptionClick("Profile")}
                    >
                      Profile
                    </li>
                    <li
                      className='cursor-pointer p-4 rounded-sm hover:bg-black hover:text-white transition duration-300'
                      onClick={() => handleOptionClick("Cart")}
                    >
                      Cart
                    </li>
                    <li
                      className='cursor-pointer p-4 rounded-sm hover:bg-black hover:text-white transition duration-300'
                      onClick={() => handleOptionClick("Logout")}
                    >
                      Logout
                    </li>
                  </ul>
                )}
              </div>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
