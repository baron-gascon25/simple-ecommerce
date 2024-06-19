import React, { useEffect, useState } from "react";
import { ecommerceApi } from "../misc/EcommerceApi";
import { useParams } from "react-router-dom";
import Loading from "./Loading";
import { useAuth } from "../context/AuthContext";

const ItemDetails = () => {
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [alert, setAlert] = useState({ type: null, msg: "" });
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

  const handleAddToCart = async () => {
    if (Auth.isAuthenticated) {
      const data = {
        productId: parseInt(id),
        userId: Auth.user.id,
        quantity: quantity,
      };
      try {
        const res = await ecommerceApi.addToUserCart(
          data,
          Auth.isAuthenticated,
          Auth.user.data
        );
        console.log(res);
        setAlert({ type: "success", msg: res.statusMsg });
        setTimeout(() => setAlert({ type: null, msg: "" }), 2000);
      } catch (error) {}
    } else {
      setAlert({ type: "error", msg: "User must be logged in to add to cart" });
      setTimeout(() => setAlert({ type: null, msg: "" }), 2000);
    }
  };

  const handleSubtractQuantityChange = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    } else {
      setQuantity(quantity);
    }
  };

  const handleAddQuantityChange = () => {
    if (quantity < 100) {
      setQuantity(quantity + 1);
    } else {
      setQuantity(quantity);
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
            className='md:h-[350px] md:w-fit h-auto w-auto md:m-5 md:p-5 my-10'
            alt='product_image'
          />
          <div className='flex flex-col mx-5 md:w-2/5 w-auto'>
            <div
              className={`rounded-md border-[1px] ${
                alert.type === "error"
                  ? "border-red-600 container"
                  : "border-green-600"
              } mx-auto p-2 my-5 w-full ${
                alert.msg !== "" && alert.msg !== undefined ? "block" : "hidden"
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
            <h6 className='text-2xl font-bold text-wrap md:my-5'>
              {product.name}
            </h6>
            <p className='text-lg md:my-5 my-5'>{`Listed on: ${
              product.createdAt !== undefined && product.createdAt.split("T")[0]
            }`}</p>
            <p className='text-lg md:my-5'>{`Type: ${product.type}`}</p>
            <p className='text-lg my-5'>{`Amount sold: ${product.amountSold}`}</p>
            <h6 className='text-3xl font-bold my-5'>{`$${product.price}`}</h6>
            <h6 className='text-lg my-2'>Quantity:</h6>
            <span className='flex flex-row my-2 justify-between'>
              <button onClick={handleSubtractQuantityChange}>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='size-5 my-auto'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M5 12h14'
                  />
                </svg>
              </button>
              <p className='text-lg font-bold'>{quantity}</p>
              <button onClick={handleAddQuantityChange}>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='size-5 my-auto'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M12 4.5v15m7.5-7.5h-15'
                  />
                </svg>
              </button>
            </span>

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
