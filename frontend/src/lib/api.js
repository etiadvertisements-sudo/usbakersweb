import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const API = `${BACKEND_URL}/api`;

export const api = axios.create({ baseURL: API });

export const getProducts = (params = {}) => api.get("/products", { params }).then((r) => r.data);
export const getProduct = (slug) => api.get(`/products/${slug}`).then((r) => r.data);
export const getCategories = () => api.get("/categories").then((r) => r.data);
export const getOffers = () => api.get("/offers").then((r) => r.data);
export const validateCoupon = (payload) => api.post("/coupons/validate", payload).then((r) => r.data);
export const createOrder = (payload) => api.post("/orders", payload).then((r) => r.data);
export const createCustomOrder = (payload) => api.post("/custom-orders", payload).then((r) => r.data);

export const formatINR = (n) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);
