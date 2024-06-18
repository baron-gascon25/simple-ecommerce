import axios from "axios";

export const ecommerceApi = {
  login,
  register,
  getImages,
  getProducts,
  getProductDetails,
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

async function getProducts({
  query = "",
  filters = {},
  sorting = null,
  page = 1,
  size = 10,
}) {
  let url = `${process.env.REACT_APP_BACKEND_URL}/products`;
  let params = [];

  // Handle name query
  if (query) {
    params.push(`name=${query}`);
  }

  // Handle type filter
  if (filters.type !== "" && filters.type !== undefined) {
    params.push(`type=${filters.type}`);
  }

  // Determine which filter to use: date, price, or amountSold
  if (filters.date) {
    url += "/date";
    params.push(`ascending=${sorting}`);
  } else if (filters.price) {
    url += "/price";
    params.push(`ascending=${sorting}`);
  } else if (filters.amountSold) {
    params.push(`amountSoldAsc=${sorting}`);
  }

  // Add pagination parameters
  params.push(`page=${page}`);
  if (size) params.push(`size=${size}`);

  const fullUrl = `${url}?${params.join("&")}`;
  const response = await fetch(fullUrl);
  const data = await response.json();
  return data;
}

async function getProductDetails(id) {
  const response = await fetch(
    `${process.env.REACT_APP_BACKEND_URL}/products/${id}`
  );
  const data = await response.json();
  return data;
}
