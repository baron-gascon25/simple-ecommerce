import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ecommerceApi } from "../misc/EcommerceApi";

const Search = () => {
  const [sortOrder, setSortOrder] = useState("ascending");
  const [products, setProducts] = useState();
  const [images, setImages] = useState({});
  const [pages, setPages] = useState({ totalPages: 0 });
  const [page, setPage] = useState(1);
  const pageNumbers = [];
  const { category } = useParams();

  useEffect(() => {
    const getProduct = async (query, page) => {
      if (query === "recent") {
        query = "latest";
      }
      const res = await ecommerceApi.getProducts(query, page, 6);
      setProducts(res.content);
      setPages(res.page);

      res.content.forEach(async (product) => {
        const imageUrl = await ecommerceApi.getImages(product.id);
        setImages((prevImages) => ({
          ...prevImages,
          [product.id]: imageUrl,
        }));
      });
    };

    if (category !== undefined) {
      getProduct(category, 1);
    }
  }, [category]);

  useEffect(() => {
    if (pages.totalPages > 0) {
      for (let i = 1; i <= pages.totalPages; i++) {
        pageNumbers.push(i);
      }
    }
  }, [pages]);

  const handleChange = (event) => {
    const newSortOrder = event.target.value;
    setSortOrder(newSortOrder);
  };

  return (
    <div className='flex flex-row md:flex-nowrap flex-wrap flex-grow container mx-auto'>
      <div className='flex flex-col my-5 mx-5 md:pr-5 md:border-r-2 md:border-gray-200 md:flex-grow-0 flex-grow'>
        <div className='flex items-center border border-gray-300 rounded-lg overflow-hidden h-12 my-5'>
          <input
            type='text'
            className='px-4 py-2 flex-grow outline-none'
            placeholder='Search...'
          />
          <button className='p-2'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-6 w-6 text-gray-500'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M21 21l-4.35-4.35m1.69-5.32a7.5 7.5 0 11-15 0 7.5 7.5 0 0115 0z'
              />
            </svg>
          </button>
        </div>
        <h6 className='text-xl font-bold'>Filter</h6>
        <hr className='my-5' />
        <h6 className='text-md font-bold my-3'>Sorting Order</h6>
        <div className='flex flex-col'>
          <label className='flex items-center'>
            <input
              type='radio'
              value='ascending'
              checked={sortOrder === "ascending"}
              onChange={handleChange}
              className='mr-2'
            />
            Ascending
          </label>
          <label className='flex items-center'>
            <input
              type='radio'
              value='descending'
              checked={sortOrder === "descending"}
              onChange={handleChange}
              className='mr-2'
            />
            Descending
          </label>
        </div>
        <h6 className='text-md font-bold my-3'>Type</h6>
      </div>
      <div className='m-5 flex flex-col flex-1 flex-wrap'>
        <h6 className='text-2xl font-bold m-5'>Results</h6>
        <div className='flex flex-row flex-wrap justify-start'>
          {Array.isArray(products) && products.length > 0 ? (
            products.map((product) => (
              <div
                className='rounded-xl p-5 h-[350px] w-[300px] flex flex-col'
                key={product.id}
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
                <button onClick={() => setPage(page)}>{page}</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Search;
