import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ecommerceApi } from "../misc/EcommerceApi";
import { useAuth } from "../context/AuthContext";

const Profile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [initialData, setInitialData] = useState({
    name: null,
    email: null,
  });
  const [alert, setAlert] = useState({
    type: null,
    msg: "",
  });
  const Auth = useAuth();
  const { id } = useParams();

  const getUserDetails = async () => {
    try {
      const res = await ecommerceApi.getUser(
        id,
        Auth.isAuthenticated,
        Auth.user.data
      );
      setName(res.name);
      setEmail(res.email);
      setInitialData({ name: res.name, email: res.email, role: res.role });
    } catch (error) {}
  };

  useEffect(() => {
    if (id) {
      getUserDetails();
    }
    // eslint-disable-next-line
  }, [id, Auth.isAuthenticated, Auth.user]);

  const nameChangeHandler = (e) => {
    setName(e.target.value);
  };
  const emailChangeHandler = (e) => {
    setEmail(e.target.value);
  };
  const passwordChangeHandler = (e) => {
    setPassword(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (Auth.isAuthenticated) {
      let data = {
        name: name !== initialData.name ? name : null,
        email: email !== initialData.email ? email : null,
        password: password === "" ? null : password,
      };

      try {
        const res = await ecommerceApi.updateUser(
          id,
          data,
          Auth.isAuthenticated,
          Auth.user.data
        );
        setAlert({
          type: `${res.statusCode === 400 ? "error" : "success"}`,
          msg: `${res.statusMsg}`,
        });
        setTimeout(() => setAlert({ type: null, msg: "" }), 2000);
      } catch (error) {
        console.error(error);
        setAlert({ type: "error", msg: `${error}` });
        setTimeout(() => setAlert({ type: null, msg: "" }), 2000);
      }
    } else {
      setAlert({ type: "error", msg: "Not authorized to make this request" });
      setTimeout(() => setAlert({ type: null, msg: "" }), 2000);
    }
  };

  return (
    <div className='container mx-auto flex-grow w-96'>
      <h6 className='font-bold text-3xl m-5 my-5'>Profile</h6>
      <p className='m-5'>{`Name: ${initialData.name}`}</p>
      <p className='m-5'>{`Email: ${initialData.email}`}</p>
      <p className='m-5'>{`Role: ${initialData.role}`}</p>
      <form onSubmit={onSubmit}>
        <div className='m-5 flex flex-col text-xl'>
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
          <h6 className='font-bold text-2xl my-5'>Update Profile</h6>
          <p>Name:</p>
          <input
            type='name'
            name='name'
            value={name}
            className='rounded-lg border-[1px] border-gray-400 my-5 p-2 text-lg'
            onChange={nameChangeHandler}
          />
          <p>Email:</p>
          <input
            type='email'
            name='email'
            value={email}
            className='rounded-lg border-[1px] border-gray-400 my-5 p-2 text-lg'
            onChange={emailChangeHandler}
          />
          <p>Password</p>
          <input
            type='password'
            name='password'
            value={password}
            className='rounded-lg border-[1px] border-gray-400 my-5 p-2 text-lg'
            onChange={passwordChangeHandler}
          />
          <input
            type='submit'
            value={"Update"}
            className='w-full border-[1px] rounded-lg p-2 my-5 bg-black text-white hover:bg-slate-600 cursor-pointer'
          />
        </div>
      </form>
    </div>
  );
};

export default Profile;
