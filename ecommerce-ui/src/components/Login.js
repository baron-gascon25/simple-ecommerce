import React, { useState } from "react";
import { ecommerceApi } from "../misc/EcommerceApi";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [login, setLogin] = useState(true);
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const Auth = useAuth();
  const navigate = useNavigate();

  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      if (login) {
        const res = await ecommerceApi.login(user.email, user.password);
        Auth.userLogin(res);
        navigate("/home");
      } else {
        const formData = new FormData();
        formData.append("name", user.name);
        formData.append("email", user.email);
        formData.append("password", user.password);
        formData.append("role", "user");
        const res = await ecommerceApi.register(formData);
        console.log(res.data.statusMsg);
      }
    } catch (error) {
      console.log(error.response.data.statusMsg);
    }
  };

  return (
    <div className='rounded-xl container my-10 mx-auto py-10 sm:w-96 w-80 justify-center bg-neutral-800 border-2 border-lime-900 shadow-lg drop-shadow-lg'>
      <h6 className='text-center text-3xl text-white text'>
        {!login ? "Register" : "Login"}
      </h6>
      <br />
      <form onSubmit={onSubmit} className='flex flex-col justify-center'>
        {login ? (
          <div className='mx-auto'>
            <p className='text-lg text-white'>Email:</p>
            <input
              className='rounded-md p-1.5 w-64 my-2'
              type='email'
              name='email'
              value={user.email || ""}
              onChange={onChange}
            />
            <p className='text-lg text-white'>Password:</p>
            <input
              className='rounded-md p-1.5 w-64 my-2'
              type='password'
              name='password'
              value={user.password || ""}
              onChange={onChange}
            />
          </div>
        ) : (
          <div className='mx-auto'>
            <p className='text-lg text-white'>Name:</p>
            <input
              className='rounded-md p-1.5 w-64 my-2'
              type='name'
              name='name'
              value={user.name || ""}
              onChange={onChange}
            />
            <p className='text-lg text-white'>Email:</p>
            <input
              className='rounded-md p-1.5 w-64 my-2'
              type='email'
              name='email'
              value={user.email || ""}
              onChange={onChange}
            />
            <p className='text-lg text-white'>Password:</p>
            <input
              className='rounded-md p-1.5 w-64 my-2'
              type='password'
              name='password'
              value={user.password || ""}
              onChange={onChange}
            />
          </div>
        )}
        <br />
        <p
          className='rounded-lg border-[1.5px] border-neutral-200 hover:bg-neutral-500 cursor-pointer p-1.5 text-white text-center text-lg w-64 mx-auto'
          onClick={() => setLogin(login ? false : true)}
        >
          Switch to {!login ? "login" : "register"}
        </p>
        <br />
        <input
          className='rounded-lg cursor-pointer text-lg border-[1.5px] border-neutral-300 hover:bg-neutral-500 p-1.5 bg-neutral-700 text-gray-50 w-64 mx-auto'
          type='submit'
          value={!login ? "Register" : "Login"}
        />
      </form>
    </div>
  );
};

export default Login;
