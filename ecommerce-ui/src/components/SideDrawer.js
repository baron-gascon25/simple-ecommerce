import React from "react";
import Backdrop from "./Backdrop";

const SideDrawer = (props) => {
  return (
    <React.Fragment>
      <section className='z-[100] delay-200 text-3xl fixed top-0 left-0 h-screen w-2/3 bg-white md:hidden'>
        <nav className='mx-5'>
          <button
            className='appearance-none mt-8 mb-5'
            onClick={() => props.setSideDrawer(false)}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={2}
              stroke='currentColor'
              className='size-6'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M6 18 18 6M6 6l12 12'
              />
            </svg>
          </button>
          <ul className='flex flex-col mt-5'>
            <li className='my-5'>
              <a className='text-lg font-semibold' href='/search/headset'>
                Headset
              </a>
            </li>
            <li className='my-5'>
              <a className='text-lg font-semibold' href='/search/keyboard'>
                Keyboard
              </a>
            </li>
            <li className='my-5'>
              <a className='text-lg font-semibold' href='/search/mouse'>
                Mouse
              </a>
            </li>
            <li className='my-5'>
              <a className='text-lg font-semibold' href='/home'>
                Home
              </a>
            </li>
            <li className='my-5'>
              <a className='text-lg font-semibold' href='/search'>
                Search
              </a>
            </li>
          </ul>
        </nav>
      </section>
      <Backdrop onClick={() => props.setSideDrawer(false)} />
    </React.Fragment>
  );
};

export default SideDrawer;
