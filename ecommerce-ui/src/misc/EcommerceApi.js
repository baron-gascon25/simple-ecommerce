import axios from "axios";

export const ecommerceApi = {
  login,
  register,
  getImages,
  getProducts,
  getProductImage,
  getProductsByKeyword,
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

  try {
    await fetch(`${process.env.REACT_APP_BACKEND_URL}/auth`, {
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
        Authorization: authdata,
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
  } catch (error) {}

  if (u_data.user_id === null) {
    return "Invalid Credentials";
  } else {
    return u_data;
  }
}

function register(formData) {
  return axios.post(`${process.env.REACT_APP_BACKEND_URL}/register`, formData, {
    "Content-Type": "application/json",
  });
}

async function getImages(id) {
  const response = await fetch(
    `${process.env.REACT_APP_BACKEND_URL}/products/${id}/image`
  );
  const blob = await response.blob();
  const url = URL.createObjectURL(blob);
  return url;
}

async function getProducts(query, page, size) {
  let products = [];
  if (query === "top") {
    await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/products?amountSoldAsc=false&page=${
        page === null ? 1 : page
      }${size === null ? "" : "&size=" + size}`
    )
      .then((response) => response.json())
      .then((data) => products.push(data));
    return products[0];
  } else if (query === "latest") {
    await fetch(
      `${
        process.env.REACT_APP_BACKEND_URL
      }/products/date?ascending=false&page=${page === null ? 1 : page}${
        size === null ? "" : "&size=" + size
      }`
    )
      .then((response) => response.json())
      .then((data) => products.push(data));
    return products[0];
  } else if (query === "oldest") {
    await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/products/date?ascending=true&page=${
        page === null ? 1 : page
      }${size === null ? "" : "&size=" + size}`
    )
      .then((response) => response.json())
      .then((data) => products.push(data));
    return products[0];
  } else {
    await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/products?type=${query}&page=${
        page === null ? 1 : page
      }${size === null ? "" : "&size=" + size}`
    )
      .then((response) => response.json())
      .then((data) => products.push(data));
    return products[0];
  }
}

async function getProductsByKeyword(query, page, size) {
  let products = [];

  await fetch(
    `${process.env.REACT_APP_BACKEND_URL}/products?name=${query}&page=${
      page === null ? 1 : page
    }${size === null ? "" : "&size=" + size}`
  )
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
