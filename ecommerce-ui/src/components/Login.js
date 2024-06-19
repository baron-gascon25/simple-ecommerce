import React, { useState } from "react";
import { ecommerceApi } from "../misc/EcommerceApi";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [login, setLogin] = useState(true);
  const [alert, setAlert] = useState();
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
        if (res === "Invalid Credentials") {
          setAlert(res);
          setTimeout(() => setAlert(""), 3000);
        } else {
          Auth.userLogin(res);
          navigate("/home");
        }
      } else {
        const formData = new FormData();
        formData.append("name", user.name);
        formData.append("email", user.email);
        formData.append("password", user.password);
        formData.append("role", "user");
        const res = await ecommerceApi.register(formData);
        console.log(res);
      }
    } catch (error) {}
  };

  return (
    <div className='flex-grow'>
      <div
        className={`rounded-md border-[1px] border-red-600 container mx-auto w-96 p-2 my-5 ${
          alert !== "" && alert !== undefined ? "block" : "hidden"
        }`}
      >
        <p className='text-red-600 text-xl text-center'>{alert}</p>
      </div>
      <div
        className={`rounded-xl container ${
          alert !== "" && alert !== undefined ? "my-0" : "my-10"
        } mx-auto py-10 sm:w-96 w-80 justify-center bg-gra border-[1px] border-black shadow-lg drop-shadow-lg`}
      >
        <h6 className='text-center text-3xl text-black text font-bold'>
          {!login ? "Register" : "Login"}
        </h6>
        <br />
        <form onSubmit={onSubmit} className='flex flex-col justify-center'>
          {login ? (
            <div className='mx-auto'>
              <p className='text-lg text-black'>Email:</p>
              <input
                className='rounded-md p-1.5 w-64 my-2 border-gray border-[1px]'
                type='email'
                name='email'
                value={user.email || ""}
                required={true}
                onChange={onChange}
              />
              <p className='text-lg text-black'>Password:</p>
              <input
                className='rounded-md p-1.5 w-64 my-2 border-gray border-[1px]'
                type='password'
                name='password'
                value={user.password || ""}
                required={true}
                onChange={onChange}
              />
            </div>
          ) : (
            <div className='mx-auto'>
              <p className='text-lg text-black'>Name:</p>
              <input
                className='rounded-md p-1.5 w-64 my-2 border-gray border-[1px]'
                type='name'
                name='name'
                value={user.name || ""}
                required={true}
                onChange={onChange}
              />
              <p className='text-lg text-black'>Email:</p>
              <input
                className='rounded-md p-1.5 w-64 my-2 border-gray border-[1px]'
                type='email'
                name='email'
                value={user.email || ""}
                required={true}
                onChange={onChange}
              />
              <p className='text-lg text-black'>Password:</p>
              <input
                className='rounded-md p-1.5 w-64 my-2 border-gray border-[1px]'
                type='password'
                name='password'
                value={user.password || ""}
                required={true}
                onChange={onChange}
              />
            </div>
          )}
          <br />
          <p
            className='rounded-lg border-[1.5px] border-neutral-200 hover:bg-neutral-500 cursor-pointer p-1.5 text-black hover:text-white text-center text-lg w-64 mx-auto'
            onClick={() => setLogin(login ? false : true)}
          >
            Switch to {!login ? "login" : "register"}
          </p>
          <br />
          <input
            className='rounded-lg cursor-pointer text-lg border-[1.5px] border-neutral-300 hover:bg-neutral-500 p-1.5 bg-neutral-700 text-white w-64 mx-auto'
            type='submit'
            value={!login ? "Register" : "Login"}
          />
        </form>
      </div>
    </div>
  );
};

export default Login;
