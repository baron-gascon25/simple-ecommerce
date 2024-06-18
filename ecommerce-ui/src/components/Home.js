import React from "react";
import NewItems from "./NewItems";
import Category from "./Category";
import TopItems from "./TopItems";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className='relative z-0 flex-grow'>
      <div className='hero-image flex flex-col justify-center'>
        <div className='md:w-2/4 w-3/4 mx-auto text-center text-white '>
          <h1 className='md:text-6xl text-5xl font-bold'>Level Up Your Game</h1>
          <p className='text-xl my-10'>New Collections Available</p>
          <button
            className='w-48 h-12 rounded-md bg-none border-2 border-white  hover:bg-white hover:text-black transition duration-500'
            onClick={() => navigate("/search/recent")}
          >
            Shop New Arrivals
          </button>
        </div>
      </div>
      <section className='flex flex-col flex-wrap container mx-auto my-5'>
        <Category />
        <p className='mx-5 text-3xl text-black font-semibold'>Top Sellers</p>
        <TopItems />
        <p className='mx-5 text-3xl text-black font-semibold'>
          Latest Products
        </p>
        <NewItems />
      </section>
    </div>
  );
};

export default Home;
