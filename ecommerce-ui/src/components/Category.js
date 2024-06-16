import React from "react";

const Category = () => {
  return (
    <React.Fragment>
      <div className='my-5 flex flex-row flex-wrap h-auto md:h-80 w-full'>
        <div className='rounded-xl image-1 bg-cover bg-no-repeat text-center flex-grow flex-basis-1/3 cursor-pointer m-5 w-full md:w-auto h-32 md:h-auto'>
          <div className='inset-0 bg-white bg-opacity-0 hover:bg-opacity-20 transition duration-500 h-full w-full flex flex-col justify-center'>
            <h6 className='text-3xl text-white hover:opacity-100 transition duration-500'>
              Headset
            </h6>
          </div>
        </div>
        <div className='rounded-xl image-2 bg-cover bg-no-repeat text-center flex-grow flex-basis-1/3 cursor-pointer m-5 w-full md:w-auto h-32 md:h-auto'>
          <div className='inset-0 bg-white bg-opacity-0 hover:bg-opacity-20 transition duration-500 h-full w-full flex flex-col justify-center'>
            <h6 className='text-3xl text-white'>Keyboard</h6>
          </div>
        </div>
        <div className='rounded-xl image-3 bg-cover bg-no-repeat text-center flex-grow flex-basis-1/3 cursor-pointer m-5 w-full md:w-auto h-32 md:h-auto'>
          <div className='inset-0 bg-white bg-opacity-0 hover:bg-opacity-20 transition duration-500 h-full w-full flex flex-col justify-center'>
            <h6 className='text-3xl text-white'>Mouse</h6>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Category;
