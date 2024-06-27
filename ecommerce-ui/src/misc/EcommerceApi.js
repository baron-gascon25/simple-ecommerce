import axios from "axios";

export const ecommerceApi = {
  login,
  register,
  getUser,
  getImages,
  updateUser,
  cartUpdate,
  getProducts,
  getUserCart,
  userCheckout,
  addToUserCart,
  createProduct,
  deleteProduct,
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
    id: null,
    data: authdata,
  };

  try {
    await fetch(`${process.env.REACT_APP_BACKEND_URL}/auth`, {
      credentials: "include",
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
        u_data.id = data.id;
      });
  } catch (error) {}

  if (u_data.id === undefined || u_data.id === null) {
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

  if (query) {
    params.push(`name=${query}`);
  }

  if (filters.type !== "" && filters.type !== undefined) {
    params.push(`type=${filters.type}`);
  }

  if (filters.date) {
    url += "/date";
    params.push(`ascending=${sorting}`);
  } else if (filters.price) {
    url += "/price";
    params.push(`ascending=${sorting}`);
  } else if (filters.amountSold) {
    params.push(`amountSoldAsc=${sorting}`);
  }

  params.push(`page=${page}`);
  if (size) params.push(`size=${size}`);

  const fullUrl = `${url}?${params.join("&")}`;
  const response = await fetch(fullUrl);
  const data = await response.json();
  return data;
}

async function getProductDetails(id) {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/products/${id}`
    );
    const data = await response.json();
    return data;
  } catch (error) {}
}

async function getUserCart(id, isAuthenticated, authdata) {
  if (isAuthenticated) {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/cart?userId=${id}`,
        {
          credentials: "include",
          headers: {
            Authorization: authdata,
          },
          method: "GET",
        }
      );
      const data = await response.json();
      return data;
    } catch (error) {}
  } else {
    return "You are not authorized to view this cart";
  }
}

async function addToUserCart(data, isAuthenticated, authdata) {
  if (isAuthenticated) {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/cart?productId=${data.productId}`,
        {
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Authorization: authdata,
          },
          body: JSON.stringify({
            quantity: data.quantity,
            userId: data.userId,
          }),
          method: "POST",
        }
      );
      const response = await res.json();
      return response;
    } catch (error) {}
  } else {
    return "You are not authorized to make this request";
  }
}

async function userCheckout(id, data, isAuthenticated, authdata) {
  if (isAuthenticated) {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/cart/checkout?userId=${id}`,
        {
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Authorization: authdata,
          },
          body: JSON.stringify(data),
          method: "PUT",
        }
      );
      const response = await res.json();
      return response;
    } catch (error) {}
  } else {
    return "You are not authorized to make this request";
  }
}

async function cartUpdate(itemId, data, isAuthenticated, authdata) {
  if (isAuthenticated) {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/cart?itemId=${itemId}`,
        {
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Authorization: authdata,
          },
          body: JSON.stringify({
            quantity: data.quantity,
            userId: data.userId,
          }),
          method: "PUT",
        }
      );
      const response = await res.json();
      return response;
    } catch (error) {}
  } else {
    return "You are not authorized to make this request";
  }
}

async function getUser(id, isAuthenticated, authdata) {
  if (isAuthenticated) {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/users/${id}`,
        {
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Authorization: authdata,
          },
          method: "GET",
        }
      );
      const response = await res.json();
      return response;
    } catch (error) {}
  } else {
    return "You are not authorized to make this request";
  }
}

async function updateUser(id, data, isAuthenticated, authdata) {
  if (isAuthenticated) {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/users/${id}`,
        {
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Authorization: authdata,
          },
          body: JSON.stringify({
            name: data.name,
            email: data.email,
            password: data.password,
          }),
          method: "PUT",
        }
      );
      const response = await res.json();
      return response;
    } catch (error) {}
  } else {
    return "You are not authorized to make this request";
  }
}

async function deleteProduct(id, isAuthenticated, authdata) {
  if (isAuthenticated) {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/products/${id}`,
        {
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Authorization: authdata,
          },
          method: "DELETE",
        }
      );
      const response = await res.json();
      return response;
    } catch (error) {}
  } else {
    return "You are not authorized to make this request";
  }
}

async function createProduct(formData, isAuthenticated, authdata) {
  if (isAuthenticated) {
    try {
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/products`, {
        credentials: "include",
        headers: {
          Authorization: authdata,
        },
        body: formData,
        method: "POST",
      });
      const response = await res.json();
      return response;
    } catch (error) {}
  } else {
    return "You are not authorized to make this request";
  }
}
