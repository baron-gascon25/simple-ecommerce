import React, { useState, useEffect } from "react";
import { ecommerceApi } from "../misc/EcommerceApi";

const TopItems = () => {
  const [products, setProducts] = useState([]);
  const [images, setImages] = useState({});
  const [pages, setPages] = useState(0);

  useEffect(() => {
    const getProduct = async (page, size) => {
      if (size === undefined) {
        size = null;
      }
      const res = await ecommerceApi.getProducts("top", page, size);
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

    getProduct(1, 4);
  }, []);

  console.log(pages);

  return (
    <div className='m-5'>
      <p className='text-3xl text-black font-semibold'>Top Sellers</p>
      <div className='flex flex-wrap justify-between'>
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
          <p>No products to display...</p>
        )}
      </div>
    </div>
  );
};

export default TopItems;
