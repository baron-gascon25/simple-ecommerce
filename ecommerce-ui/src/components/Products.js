import React, { useCallback, useEffect, useRef, useState } from "react";
import { ecommerceApi } from "../misc/EcommerceApi";
import { fetchProducts } from "../misc/FetchProducts";
import { useAuth } from "../context/AuthContext";

const Products = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: 0,
    type: "",
    image: null,
  });
  const [alert, setAlert] = useState({ type: null, msg: "" });

  const filePickerRef = useRef();
  const Auth = useAuth();

  const getProductsData = useCallback(async () => {
    const res = await fetchProducts({
      query: "",
      filters: {},
      sorting: true,
      page: currentPage,
      size: 10,
    });

    setData(res.products);
    setTotalPage(res.pages.totalPages);
    setTotalItems(res.pages.totalElements);
  }, [currentPage]);

  useEffect(() => {
    getProductsData();
  }, [getProductsData]);

  if (data.length === 0) {
    return <div>Loading...</div>;
  } else if (Auth.user.role !== "admin") {
    return (
      <div className='flex-grow container mx-auto'>
        <p className='text-3xl font-bold my-5 mx-5'>Not Authorized</p>
      </div>
    );
  }

  const headers = data.length > 0 ? Object.keys(data[0]) : "";

  const onChange = (e) =>
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });

  const onChangePrice = (e) => {
    const price = parseInt(e.target.value, 10);
    setNewProduct({ ...newProduct, price: isNaN(price) ? 0 : price });
  };

  const pickedHandler = (event) => {
    let pickedFile;
    if (event.target.files && event.target.files.length === 1) {
      pickedFile = event.target.files[0];
      setNewProduct({ ...newProduct, image: pickedFile });
    }
  };

  const deleteProduct = async (id) => {
    if (Auth.user.role === "admin") {
      try {
        await ecommerceApi.deleteProduct(
          id,
          Auth.isAuthenticated,
          Auth.user.data
        );
      } catch (error) {
        console.error(error);
      }
    }
  };

  const addProduct = async (e) => {
    e.preventDefault();
    if (Auth.user.role === "admin") {
      const formData = new FormData();
      formData.append("name", newProduct.name);
      formData.append("price", newProduct.price);
      formData.append("type", newProduct.type);
      formData.append("file", newProduct.image);
      try {
        const res = await ecommerceApi.createProduct(
          formData,
          Auth.isAuthenticated,
          Auth.user.data
        );
        setAlert({
          type: res.statusCode !== 400 ? "success" : "error",
          msg: res.statusMsg,
        });
        setTimeout(() => {
          setAlert({ type: null, msg: "" });
          getProductsData();
        }, 3000);
      } catch (error) {
        setAlert({ type: "error", msg: error.message });
        setTimeout(() => setAlert({ type: null, msg: "" }), 3000);
      }
    }
  };

  return (
    <div className='flex-grow container mx-auto overflow-x-auto'>
      <div className='my-5 md:w-96 w-full'>
        <form className='mx-5 flex flex-col' onSubmit={addProduct}>
          <div
            className={`rounded-md border-[1px] ${
              alert.type === "error" ? "border-red-600" : "border-green-600"
            } container mx-auto w-96 p-2 my-5 ${
              alert.msg !== "" ? "block" : "hidden"
            }`}
          >
            <p
              className={`${
                alert.type === "error" ? "text-red-600" : "text-green-600"
              } text-xl text-center`}
            >
              {alert.msg}
            </p>
          </div>
          <h6 className='text-xl'>Create Product</h6>
          <p className='text-lg my-2'>Name:</p>
          <input
            type='name'
            name='name'
            value={newProduct.name}
            onChange={onChange}
            required={true}
            className='border-[1px] rounded-md p-1'
          />
          <p className='text-lg my-2'>Price:</p>
          <input
            type='number'
            name='price'
            value={newProduct.price}
            onChange={onChangePrice}
            required={true}
            className='border-[1px] rounded-md p-1'
          />
          <p className='text-lg my-2'>Type:</p>
          <input
            type='text'
            name='type'
            value={newProduct.type}
            onChange={onChange}
            required={true}
            className='border-[1px] rounded-md p-1'
          />
          <p className='text-lg my-2'>Image:</p>
          <input
            type='file'
            name='image'
            ref={filePickerRef}
            accept='.jpg,.png,.jpeg'
            onChange={pickedHandler}
            required={true}
          />
          <input
            type='submit'
            className='rounded-md bg-black text-white p-1 my-4'
          />
        </form>
      </div>
      <span className='my-5 flex flex-row items-center mx-5'>
        <h6 className='text-xl flex-1'>{`Total Items: ${totalItems}`}</h6>
        <h6 className='text-xl mx-5'>Page:</h6>
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage > 1 && currentPage - 1)}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='size-5'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M15.75 19.5 8.25 12l7.5-7.5'
            />
          </svg>
        </button>

        <h6 className='text-xl mx-5'>{currentPage}</h6>
        <button
          disabled={currentPage === totalPage}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='size-5'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='m8.25 4.5 7.5 7.5-7.5 7.5'
            />
          </svg>
        </button>
      </span>
      <table className='min-w-full bg-white md:mx-5 my-5'>
        <thead className='bg-gray-800 text-white'>
          <tr>
            <th className='py-2 px-4 text-center'>Delete</th>
            {headers.map((header, index) => (
              <th key={index} className='py-2 px-4 text-left'>
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className='even:bg-gray-100 odd:bg-white'>
              <td className='py-2 px-4 border-b'>
                <button
                  onClick={() => deleteProduct(row.id)}
                  className='flex items-center justify-center w-full h-full'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='w-6 h-6'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0'
                    />
                  </svg>
                </button>
              </td>
              {headers.map((header, colIndex) => (
                <td key={colIndex} className='py-2 px-4 border-b'>
                  {row[header]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Products;
