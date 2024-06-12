import axios from "axios";

export const ecommerceApi = {
  login,
  register,
  getProducts,
  getProductImage,
};

async function login(email, password) {
  const authdata = `Basic ${window.btoa(email + ":" + password)}`;
  const user = {
    email: email,
    password: password,
  };
  var u_data = {
    email: null,
    name: null,
    role: null,
    user_id: null,
  };

  await fetch(`${process.env.REACT_APP_BACKEND_URL}/auth`, {
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      "Authorization": authdata,
    },
    method: "POST",
    body: JSON.stringify(user),
  })
    .then((response) => response.json())
    .then((data) => {
      u_data.email = data.email;
      u_data.name = data.name;
      u_data.role = data.role;
      u_data.user_id = data.user_id;
    });

  return u_data;
}

function register(formData) {
  return axios.post(`${process.env.REACT_APP_BACKEND_URL}/register`, formData, {
    "Content-Type": "application/json",
  });
}

async function getProducts() {
  let products = [];
  await fetch(`${process.env.REACT_APP_BACKEND_URL}/products`)
    .then((response) => response.json())
    .then((data) => products.push(data));
  return products[0];
}

async function getProductImage(id) {
  let imagedata = null;
  await fetch(`${process.env.REACT_APP_BACKEND_URL}/products/${id}/image`)
    .then((response) => response.blob())
    .then((data) => {
      imagedata = data;
    });

  return imagedata;
}
