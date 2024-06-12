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
    <div className='container mx-auto p-2'>
      <h6>{!login ? "Register" : "Login"}</h6>
      <br />
      <form onSubmit={onSubmit}>
        {login ? (
          <div>
            <p>Email:</p>
            <input
              className='rounded-md border-2 border-black p-0.5'
              type='email'
              name='email'
              value={user.email || ""}
              onChange={onChange}
            />
            <p>Password</p>
            <input
              className='rounded-md border-2 border-black p-0.5'
              type='password'
              name='password'
              value={user.password || ""}
              onChange={onChange}
            />
          </div>
        ) : (
          <div>
            <p>Name:</p>
            <input
              className='rounded-md border-2 border-black p-0.5'
              type='name'
              name='name'
              value={user.name || ""}
              onChange={onChange}
            />
            <p>Email:</p>
            <input
              className='rounded-md border-2 border-black p-0.5'
              type='email'
              name='email'
              value={user.email || ""}
              onChange={onChange}
            />
            <p>Password</p>
            <input
              className='rounded-md border-2 border-black p-0.5'
              type='password'
              name='password'
              value={user.password || ""}
              onChange={onChange}
            />
          </div>
        )}
        <br />
        <p
          className='cursor-pointer text-cyan-500'
          onClick={() => setLogin(login ? false : true)}
        >
          Switch to {!login ? "login" : "register"}
        </p>
        <br />
        <input
          className='rounded-md border-2 border-black p-1 bg-slate-600 text-gray-50'
          type='submit'
          value={!login ? "Register" : "Login"}
        />
      </form>
    </div>
  );
};

export default Login;
