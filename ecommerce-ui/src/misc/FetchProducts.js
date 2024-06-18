import { ecommerceApi } from "./EcommerceApi";

export const fetchProducts = async ({
  query = "",
  filters = { type: "", date: false, price: false, amountSold: false },
  sorting = null,
  page = 1,
  size = 10,
}) => {
  const res = await ecommerceApi.getProducts({
    query,
    filters,
    sorting,
    page,
    size,
  });
  // Ensure the response structure is correct
  if (!Array.isArray(res.content) || typeof res.page !== "object") {
    throw new Error("Invalid response structure");
  }

  const products = res.content;

  const images = {};
  for (const product of products) {
    const imageUrl = await ecommerceApi.getImages(product.id);
    images[product.id] = imageUrl;
  }

  return { products, images, pages: res.page };
};
