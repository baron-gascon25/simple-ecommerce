import React, { useEffect, useState } from "react";
import { ecommerceApi } from "../misc/EcommerceApi";
import { useParams } from "react-router-dom";
import Loading from "./Loading";
import { useAuth } from "../context/AuthContext";

const ItemDetails = () => {
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState();
  const [image, setImage] = useState();
  const Auth = useAuth();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const delay = setTimeout(() => {
        getProductData(id);
      }, 150);

      return () => clearTimeout(delay);
    }
  }, [id]);

  const getProductData = async (id) => {
    try {
      setLoading(true);
      const res = await ecommerceApi.getProductDetails(id);
      setProduct(res);

      const image = await ecommerceApi.getImages(id);
      setLoading(false);
      setImage(image);
    } catch (error) {
      console.error("Failed to fetch product data:", error);
    }
  };

  const handleAddToCart = () => {
    if (Auth.isAuthenticated) {
    } else {
      setAlert("User must be logged in to add to cart");
      setTimeout(() => setAlert(""), 1000);
    }
  };

  if (loading && product.length === undefined) {
    return <Loading />;
  } else {
    return (
      <div className='container mx-auto flex flex-col flex-grow '>
        <div className='mx-5 flex flex-row flex-wrap flex-1 items-center justify-evenly'>
          <img
            src={image}
            className='h-[350px] w-fit m-5 p-5'
            alt='product_image'
          />
          <div className='flex flex-col mx-5 w-2/5'>
            <div
              className={`rounded-md border-[1px] border-red-600 container mx-auto p-2 my-5 ${
                alert !== "" && alert !== undefined ? "block" : "hidden"
              }`}
            >
              <p className='text-red-600 text-xl text-center'>{alert}</p>
            </div>
            <h6 className='text-2xl font-bold text-wrap'>{product.name}</h6>
            <p className='text-lg my-5'>{`Listed on: ${
              product.createdAt.split("T")[0]
            }`}</p>
            <p className='text-lg'>{`Type: ${product.type}`}</p>
            <p className='text-lg my-5'>{`Amount sold: ${product.amountSold}`}</p>
            <h6 className='text-xl font-bold'>{`$${product.price}`}</h6>
            <button
              className='rounded-md text-xl font-bold my-5 p-4  hover:bg-gray-400 bg-black text-white'
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    );
  }
};

export default ItemDetails;
