import React, { useEffect, useState } from "react";
import { ecommerceApi } from "../misc/EcommerceApi";
import home from "../images/home-image.jpg";
import NewItems from "./NewItems";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [images, setImages] = useState({});

  useEffect(() => {
    const getProduct = async () => {
      const res = await ecommerceApi.getProducts();
      setProducts(res);

      res.forEach(async (product) => {
        const imageUrl = await ecommerceApi.getImages(product.id);
        setImages((prevImages) => ({
          ...prevImages,
          [product.id]: imageUrl,
        }));
      });
    };

    getProduct();
  }, []);

  return (
    <React.Fragment>
      <div className='hero-image border-b-2 border-lime-800'>
        <div className='hero-text'>
          <h1 className='text-4xl my-10'>Level Up Your Game</h1>
          <button className='w-48 h-12 rounded-md bg-lime-900 hover:bg-lime-700'>
            Shop Now
          </button>
        </div>
      </div>
      <div className='container mx-auto flex flex-row'>
        <NewItems products={products} images={images} />
      </div>
    </React.Fragment>
  );
};

export default Home;
