import React from "react";

const NewItems = ({ products, images }) => {
  return (
    <div className='flex flex-col my-5'>
      <p className='m-2 text-2xl text-white'>Recently Added</p>
      <div className='flex flex-wrap justify-between'>
        {Array.isArray(products) && products.length > 0 ? (
          products.map((product) => (
            <div
              className='mx-1 my-5 h-[300px] w-[200px] flex flex-col'
              key={product.id}
            >
              <img
                className='rounded-md h-[175px] w-[200px]'
                src={images[product.id]}
                alt={product.name}
              />
              <p className='text-white flex-1 my-2'>{product.name}</p>
              <p className='text-white text-lg'>${product.price}</p>
            </div>
          ))
        ) : (
          <p>No products to display...</p>
        )}
      </div>
    </div>
  );
};

export default NewItems;
