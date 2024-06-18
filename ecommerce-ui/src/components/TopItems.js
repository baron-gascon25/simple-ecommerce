import React, { useState, useEffect } from "react";
import { fetchProducts } from "../misc/FetchProducts";
import Loading from "./Loading";
import { useNavigate } from "react-router-dom";

const TopItems = () => {
  const [products, setProducts] = useState([]);
  const [images, setImages] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    const getProductsData = async () => {
      const res = await fetchProducts({
        query: "",
        filters: { amountSold: true },
        sorting: false,
        page: 1,
        size: 4,
      });
      setProducts(res.products);
      setImages(res.images);
    };
    setLoading(false);
    getProductsData();
  }, []);

  if (loading) {
    return (
      <div className='p-10 mx-auto my-auto'>
        <Loading />
      </div>
    );
  } else {
    return (
      <div className='m-5'>
        <div className='flex flex-wrap justify-between'>
          {Array.isArray(products) && products.length > 0 ? (
            products.map((product) => (
              <div
                className='cursor-pointer rounded-xl p-5 h-[350px] w-[300px] flex flex-col flex-shrink transition-all duration-300 hover:scale-110'
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
            <p>No products to display...</p>
          )}
        </div>
      </div>
    );
  }
};

export default TopItems;
