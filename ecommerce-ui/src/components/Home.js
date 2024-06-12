import React, { useEffect, useState } from "react";
import { ecommerceApi } from "../misc/EcommerceApi";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [images, setImages] = useState({});

  useEffect(() => {
    const getProduct = async () => {
      const res = await ecommerceApi.getProducts();
      setProducts(res);

      res.forEach((product) => {
        getImages(product.product_id);
      });
    };

    const getImages = async (id) => {
      await fetch(`${process.env.REACT_APP_BACKEND_URL}/products/${id}/image`)
        .then((response) => response.blob())
        .then((data) => {
          const url = URL.createObjectURL(data);
          setImages((prevImages) => ({ ...prevImages, [id]: url }));
        });
    };

    getProduct();
  }, []);

  return (
    <div className='container mx-auto'>
      <p className='m-2 text-2xl'>Recently Added</p>
      <div className=' flex flex-wrap justify-between'>
        {Array.isArray(products) && products.length > 0 ? (
          products.map((product) => (
            <div className='m-1' key={product.product_id}>
              <img
                className='border-2 border-slate-950'
                style={{ width: "200px", height: "200px" }}
                src={images[product.product_id]}
                alt={product.name}
              />
              <p>{product.name}</p>
              <p>${product.price}</p>
            </div>
          ))
        ) : (
          <p>No products to display...</p>
        )}
      </div>
    </div>
  );
};

export default Home;
