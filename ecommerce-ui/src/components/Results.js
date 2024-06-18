import React from "react";
import Loading from "./Loading";
import { useNavigate } from "react-router-dom";

const Results = ({
  category,
  loading,
  products,
  setCurrentPage,
  setLoading,
  setClicked,
  pageNumbers,
  images,
}) => {
  const navigate = useNavigate();
  const clickHandler = (page) => {
    setClicked(true);
    setLoading(true);
    setCurrentPage(page);
  };

  if (
    (loading && category !== undefined) ||
    (loading && category === undefined && products.length !== 0)
  ) {
    return (
      <div className='p-10 mx-auto my-auto'>
        <Loading />
      </div>
    );
  } else {
    return (
      <React.Fragment>
        <h6 className='text-2xl font-bold m-5'>{`Results: ${products.length}`}</h6>
        <div className='flex flex-row flex-wrap flex-grow md:justify-start justify-center'>
          {Array.isArray(products) && products.length > 0 ? (
            products.map((product) => (
              <div
                className='cursor-pointer rounded-xl p-5 h-[350px] w-[300px] flex flex-col transition-all duration-300 hover:scale-110'
                key={product.id}
                onClick={() => navigate(`/product/${product.id}`)}
              >
                <img
                  className='rounded-md h-[200px] w-auto mx-auto my-2'
                  src={images[product.id]}
                  alt={product.name}
                />
                <p className='text-black flex-1'>{product.name}</p>
                <p className='text-black font-bold'>${product.price}</p>
                <p className='text-black'>{`${product.amountSold} sold`}</p>
              </div>
            ))
          ) : (
            <p className='mx-5'>No products to display...</p>
          )}
        </div>
        <div className='my-5'>
          <ul className='justify-center flex flex-row '>
            {pageNumbers.map((page) => (
              <li key={page} className='mx-5'>
                <button onClick={() => clickHandler(page)}>{page}</button>
              </li>
            ))}
          </ul>
        </div>
      </React.Fragment>
    );
  }
};

export default Results;
