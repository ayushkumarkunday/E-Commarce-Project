import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";

const app = express();

// CORS simple aur fully open setup React app ke liye
app.use(cors({
  origin: "http://localhost:5173", 
  credentials: true,               
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());
app.use(cookieParser());

// Local dynamic database storage
let users = [];
let products = [
  { _id: "1", name: "Sample Laptop", description: "High performance coding laptop", price: 59999, stock: 10, category: "Electronics" },
  { _id: "2", name: "Wireless Mouse", description: "Ergonomic design wireless mouse", price: 999, stock: 25, category: "Accessories" }
];

// ================= SYNCED AUTH ENDPOINTS =================

// 1. REGISTER ROUTE
app.post("/auth/register", (req, res) => {
  const { name, email, password } = req.body;
  
  const newUser = { 
    id: Date.now().toString(), 
    name: name || "User", 
    email: email, 
    password: password 
  };
  
  users.push(newUser);
  res.status(201).json({ message: "Registration successful", user: { name: newUser.name, email } });
});

// 2. LOGIN ROUTE
app.post("/auth/login", (req, res) => {
  const { email, password } = req.body;
  
  let user = users.find(u => u.email === email);
  
  // Agar registration step bypass karna chahein toh automatic dummy profile bana dega
  if (!user) {
    user = { name: "Ayush Kumar", email: email || "test@gmail.com", password: password };
    users.push(user);
  }

  const accessToken = jwt.sign({ name: user.name, email: user.email }, "supersecretkey", { expiresIn: "1h" });
  
  // Frontend App.jsx exact is pattern (data.accessToken aur data.user) ko accept karta hai
  res.json({ 
    accessToken: accessToken, 
    user: { name: user.name, email: user.email },
    message: "Login successful" 
  });
});

// 3. LOGOUT ROUTE
app.post("/auth/logout", (req, res) => {
  res.json({ message: "Logged out" });
});

// ================= SYNCED PRODUCT CRUD ENDPOINTS =================

// Public products path mapping for frontend data.products format
app.get("/products", (req, res) => {
  res.json({ products: products });
});

// Add new product
app.post("/products", (req, res) => {
  const { name, description, price, stock, category } = req.body;
  const newProduct = {
    _id: Date.now().toString(),
    name,
    description,
    price: Number(price) || 0,
    stock: Number(stock) || 0,
    category: category || "General"
  };
  products.push(newProduct);
  res.status(201).json({ message: "Product created", product: newProduct });
});

// Delete product 
app.delete("/products/:id", (req, res) => {
  const { id } = req.params;
  products = products.filter(p => p._id !== id);
  res.json({ message: "Product deleted" });
});

export default app;
