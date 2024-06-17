import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchProducts } from "../misc/FetchProducts";

const Search = () => {
  const [sortOrder, setSortOrder] = useState("ascending");
  const [products, setProducts] = useState();
  const [images, setImages] = useState({});
  const [pages, setPages] = useState({ totalPages: 0 });
  const [currentPage, setCurrentPage] = useState(1);
  const [pageNumbers, setPageNumbers] = useState([]);
  const [filters, setFilters] = useState({
    type: "",
    date: false,
    price: false,
    amountSold: false,
    sorting: null,
  });
  const { category } = useParams();

  useEffect(() => {
    const setCategory = async () => {
      try {
        if (category === "recent") {
          setFilters({ date: true, sorting: false });
        } else {
          setFilters({ type: category });
        }
      } catch (error) {
        console.error("Error setting category:", error);
      }
    };

    setCategory();
  }, [category]);

  useEffect(() => {
    const delay = setTimeout(() => {
      getProductsData(currentPage);
    }, 500); // Adjust the delay time as per your needs (e.g., 500 milliseconds)

    return () => clearTimeout(delay); // Cleanup function to clear timeout on unmount or dependencies change
  }, [
    filters.type,
    filters.date,
    filters.price,
    filters.amountSold,
    filters.sorting,
    currentPage,
  ]);

  useEffect(() => {
    if (pages.totalPages > 0) {
      const numbers = Array.from({ length: pages.totalPages }, (_, i) => i + 1);
      setPageNumbers(numbers);
    }
  }, [pages]);

  const getProductsData = async (page) => {
    try {
      const res = await fetchProducts({
        query: "",
        filters: {
          type: filters.type,
          date: filters.date,
          price: filters.price,
          amountSold: filters.amountSold,
        },
        sorting: filters.sorting,
        page: page,
        size: 8,
      });
      setProducts(res.products);
      setPages(res.pages);
      setImages(res.images);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

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
      <div className='my-5 flex flex-col flex-1 flex-wrap'>
        <h6 className='text-2xl font-bold m-5'>Results</h6>
        <div className='flex flex-row flex-wrap flex-grow justify-start'>
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
                <button onClick={() => setCurrentPage(page)}>{page}</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Search;
