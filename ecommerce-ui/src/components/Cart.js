import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ecommerceApi } from "../misc/EcommerceApi";

const Cart = () => {
  const [items, setItems] = useState([]);
  const [images, setImages] = useState([]);
  const { id } = useParams();
  const Auth = useAuth();

  useEffect(() => {
    const getItems = async () => {
      try {
        const res = await ecommerceApi.getUserCart(
          id,
          Auth.isAuthenticated,
          Auth.user.data
        );
        setItems(res);

        const imagePromises = res.items.map(async (item) => {
          const imageUrl = await ecommerceApi.getImages(item.product.id);
          return { id: item.product.id, url: imageUrl };
        });

        const imagesArray = await Promise.all(imagePromises);
        const imagesMap = imagesArray.reduce((acc, { id, url }) => {
          acc[id] = url;
          return acc;
        }, {});

        setImages(imagesMap);
      } catch (error) {
        console.error("Failed to fetch cart items or images:", error);
      }
    };
    getItems();
  }, [id, Auth.isAuthenticated]);

  return (
    <div className='container mx-auto flex-grow'>
      <div className='flex flex-col my-5'>
        <h6 className='text-3xl font-bold mx-5'>Cart</h6>
        {Array.isArray(items.items) ? (
          items.items.map((item) => (
            <div
              key={item.id}
              className='flex flex-row flex-wrap m-5 border-b-[1px] border-t-[1px] border-gray-400'
            >
              <img
                src={images[item.product.id]}
                className='h-[200px] w-auto'
                alt='item_image'
              />
              <div className='flex-1 md:text-right text-left flex flex-col justify-center'>
                <h6 className='text-xl my-2'>{item.product.name}</h6>
                <p className='text-xl font-bold my-2'>{`$${item.product.price}`}</p>
                <span className='flex flex-row my-2 md:justify-end justify-start'>
                  <h6 className='text-lg'>Quantity:</h6>
                  <button>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth={1.5}
                      stroke='currentColor'
                      className='size-5 my-auto mx-5'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M5 12h14'
                      />
                    </svg>
                  </button>
                  <p className='text-lg'>{item.quantity}</p>
                  <button>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth={1.5}
                      stroke='currentColor'
                      className='size-5 my-auto ml-5'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M12 4.5v15m7.5-7.5h-15'
                      />
                    </svg>
                  </button>
                </span>
              </div>
            </div>
          ))
        ) : (
          <p className='mx-5'>No products to display...</p>
        )}
        <h6 className='text-2xl font-bold mx-5'>Summary:</h6>
        <div className='flex flex-row m-5'>
          <div className='flex flex-col  flex-grow'>
            <span className='flex flex-row my-5'>
              <h6 className='text-xl flex-1'>Total:</h6>
              <h6 className='text-xl font-bold'>{`$${items.total}`}</h6>
            </span>
            <span className='flex flex-row flex-wrap my-5 items-center'>
              <h6 className='text-xl md:flex-1'>Confirm Checkout:</h6>
              <button className='rounded-lg p-2 md:w-48 w-full text-xl font-bold text-white bg-black md:flex-grow-0 flex-grow md:my-0 my-5'>
                Checkout
              </button>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
