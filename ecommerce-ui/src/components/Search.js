import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchProducts } from "../misc/FetchProducts";
import Results from "./Results";

const Search = () => {
  const [sortOrder, setSortOrder] = useState("ascending");
  const [products, setProducts] = useState([]);
  const [images, setImages] = useState({});
  const [pages, setPages] = useState({ totalPages: 0 });
  const [currentPage, setCurrentPage] = useState(1);
  const [pageNumbers, setPageNumbers] = useState([]);
  const [filters, setFilters] = useState({
    name: "",
    type: "",
    date: false,
    price: false,
    amountSold: false,
    sorting: null,
  });
  const [type, setType] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [query, setQuery] = useState("");
  const { category } = useParams();
  const [clicked, setClicked] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const setCategory = async () => {
      try {
        if (category === "recent") {
          setFilters((prevFilters) => ({
            ...prevFilters,
            type: "",
            date: true,
            sorting: false,
          }));
          setType("");
        } else {
          setFilters((prevFilters) => ({
            ...prevFilters,
            type: category,
            date: false,
          }));

          setType(category);
        }
      } catch (error) {
        console.error("Error setting category:", error);
      }
    };
    setLoading(true);
    setCategory();
  }, [category]);

  useEffect(() => {
    if (pages.totalPages > 0) {
      const numbers = Array.from({ length: pages.totalPages }, (_, i) => i + 1);
      setPageNumbers(numbers);
    }
  }, [pages.totalPages]);

  useEffect(() => {
    const delay = setTimeout(() => {
      if (clicked || category !== undefined) {
        getProductsData(currentPage);
        setClicked(false);
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(delay);
    // eslint-disable-next-line
  }, [currentPage, filters, clicked]);

  const getProductsData = async (page) => {
    try {
      setLoading(true);
      const res = await fetchProducts({
        query: filters.name,
        filters: {
          type: type === "none" ? "" : type,
          date: sortBy === "date",
          price: sortBy === "price",
          amountSold: sortBy === "amountSold",
        },
        sorting: sortOrder === "ascending",
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
    setSortOrder(event.target.value);
  };

  const handleQueryChange = (event) => {
    setQuery(event.target.value);
  };

  const handleTypeChange = (event) => {
    setType(event.target.value);
  };

  const handleSortByChange = (event) => {
    setSortBy(event.target.value);
    setSortOrder("ascending");
  };

  const handleSearchClick = () => {
    setLoading(true);
    setClicked(true);
    setCurrentPage(1);
    const updatedFilters = {
      ...filters,
      name: query,
      type: type === "none" ? "" : type,
      date: sortBy === "date",
      price: sortBy === "price",
      amountSold: sortBy === "amountSold",
      sorting: sortOrder === "ascending",
    };

    setFilters(updatedFilters);
    getProductsData(currentPage);
  };

  console.log(filters);

  return (
    <div className='flex flex-row md:flex-nowrap flex-wrap flex-grow container mx-auto'>
      <div className='flex flex-col my-5 mx-5 md:pr-5 md:border-r-2 md:border-gray-200 md:flex-grow-0 flex-grow'>
        <div className='flex items-center border border-gray-300 rounded-lg overflow-hidden h-12 my-5'>
          <input
            type='text'
            className='px-4 py-2 flex-grow outline-none'
            placeholder='Search...'
            onChange={handleQueryChange}
          />
          <button className='p-2' onClick={handleSearchClick}>
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
        <select
          className='border rounded p-2'
          value={type}
          onChange={handleTypeChange}
        >
          <option value='none'>None</option>
          <option value='keyboard'>Keyboard</option>
          <option value='mouse'>Mouse</option>
          <option value='headset'>Headset</option>
        </select>
        <h6 className='text-md font-bold my-3'>Sort By</h6>
        <select
          className='border rounded p-2'
          value={sortBy}
          onChange={handleSortByChange}
        >
          <option value='none'>None</option>
          <option value='price'>Price</option>
          <option value='amountSold'>Amount Sold</option>
          <option value='date'>Date</option>
        </select>
      </div>
      <div className='my-5 flex flex-col flex-1 flex-wrap'>
        <Results
          currentPage={currentPage}
          category={category}
          loading={loading}
          images={images}
          products={products}
          pageNumbers={pageNumbers}
          setCurrentPage={setCurrentPage}
          setClicked={setClicked}
          setLoading={setLoading}
        />
      </div>
    </div>
  );
};

export default Search;
