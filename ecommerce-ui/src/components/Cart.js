import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ecommerceApi } from "../misc/EcommerceApi";

const Cart = () => {
  const [items, setItems] = useState([]);
  const [images, setImages] = useState({});
  const [quantity, setQuantity] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const { id } = useParams();
  const Auth = useAuth();

  const getItems = useCallback(async () => {
    try {
      if (!Auth.user) {
        console.error("User is not authenticated");
        return;
      }

      const res = await ecommerceApi.getUserCart(
        id,
        Auth.isAuthenticated,
        Auth.user.data
      );
      setItems(res.items);

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

      const quantities = res.items.map((item) => ({
        id: item.id,
        quantity: item.quantity,
      }));

      setQuantity(quantities);
    } catch (error) {
      console.error("Failed to fetch cart items or images:", error);
    }
  }, [id, Auth.isAuthenticated, Auth.user]);

  useEffect(() => {
    getItems();
  }, [getItems]);

  const getQuantity = (itemId) => {
    const item = quantity.find((q) => q.id === itemId);
    return item ? item.quantity : 0;
  };

  const updateQuantity = (itemId, newQuantity) => {
    setQuantity((prevQuantities) =>
      prevQuantities.map((q) =>
        q.id === itemId ? { ...q, quantity: newQuantity } : q
      )
    );
  };

  const updateItem = async (itemId, quantity) => {
    if (Auth.isAuthenticated) {
      const data = {
        quantity: quantity,
        userId: id,
      };
      try {
        await ecommerceApi.cartUpdate(
          itemId,
          data,
          Auth.isAuthenticated,
          Auth.user.data
        );
        getItems(); //triggers the component to reload after deletion or updating quantity
      } catch (error) {}
    } else {
      console.log("not authorized to make this request");
    }
  };

  const handleCheckboxChange = (itemId) => {
    setSelectedItems((prevSelectedItems) => {
      if (prevSelectedItems.includes(itemId)) {
        return prevSelectedItems.filter((id) => id !== itemId);
      } else {
        return [...prevSelectedItems, itemId];
      }
    });
  };

  const checkOutItems = async () => {
    if (Auth.isAuthenticated) {
      const data = {
        ids: selectedItems,
      };

      try {
        await ecommerceApi.userCheckout(
          id,
          data,
          Auth.isAuthenticated,
          Auth.user.data
        );
        getItems();
      } catch (error) {}
    } else {
      console.log("not authorized to make this request");
    }
  };

  return (
    <div className='container mx-auto flex-grow'>
      <div className='flex flex-col my-5'>
        <h6 className='text-3xl font-bold mx-5'>Cart</h6>
        {items.length > 0 ? (
          items.map((item) => (
            <div
              key={item.id}
              className='flex flex-row flex-wrap mx-5 border-b-[1px] border-t-[1px] border-gray-400'
            >
              <input
                type='checkbox'
                checked={selectedItems.includes(item.id)}
                onChange={() => handleCheckboxChange(item.id)}
              />
              <img
                src={images[item.product.id]}
                className='h-auto w-[250px] p-5'
                alt='item_image'
              />
              <div className='flex-1 md:text-right text-left flex flex-col justify-center'>
                <h6 className='text-xl my-2'>{item.product.name}</h6>
                <p className='text-lg font-bold my-2'>{`$${item.product.price}`}</p>
                <span className='flex flex-row my-2 md:justify-end justify-start'>
                  <h6 className='text-lg'>Quantity:</h6>
                  <button
                    onClick={() =>
                      updateQuantity(
                        item.id,
                        getQuantity(item.id) > 1
                          ? getQuantity(item.id) - 1
                          : getQuantity(item.id)
                      )
                    }
                  >
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
                  <p className='text-lg'>{getQuantity(item.id)}</p>
                  <button
                    onClick={() =>
                      updateQuantity(
                        item.id,
                        getQuantity(item.id) < 101
                          ? getQuantity(item.id) + 1
                          : getQuantity(item.id)
                      )
                    }
                  >
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
                <div>
                  <button
                    className='my-2'
                    onClick={() => updateItem(item.id, 0)}
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth={1.5}
                      stroke='currentColor'
                      className='size-6'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0'
                      />
                    </svg>
                  </button>
                </div>
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
              <h6 className='text-xl font-bold'>{`$${items.reduce(
                (acc, item) => acc + item.product.price * getQuantity(item.id),
                0
              )}`}</h6>
            </span>
            <span className='flex flex-row flex-wrap my-5 items-center'>
              <h6 className='text-xl md:flex-1'>Confirm Checkout:</h6>
              <button
                className='rounded-lg p-2 md:w-48 w-full text-xl font-bold text-white bg-black md:flex-grow-0 flex-grow md:my-0 my-5'
                onClick={checkOutItems}
              >
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
