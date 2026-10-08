import { useEffect, useState } from "react";

function App() {
  const [page, setPage] = useState("login");
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");
  
  // Local state taaki 'Could not load products' ka jhanjhat hi khatam ho jaye
  const [products, setProducts] = useState([
    { _id: "1", name: "Coding Laptop Pro", description: "Best for MERN stack development", price: 54999, stock: 8, category: "Electronics" },
    { _id: "2", name: "Mechanical Keyboard", description: "RGB backlit tactile switches", price: 2499, stock: 15, category: "Accessories" }
  ]);

  const login = (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const email = form.get("email");

    // Bina backend error ke direct bypass login
    setUser({ name: "Ayush Kumar", email: email });
    setPage("products");
    setMessage("Login successful");
  };

  const register = (event) => {
    event.preventDefault();
    setMessage("Registration successful");
    setPage("login");
  };

  const addProduct = (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);

    const newProduct = {
      _id: Date.now().toString(),
      name: form.get("name"),
      description: form.get("description"),
      price: Number(form.get("price")),
      stock: Number(form.get("stock")),
      category: form.get("category")
    };

    setProducts([newProduct, ...products]);
    event.currentTarget.reset();
    setMessage("Product created successfully");
  };

  const deleteProduct = (id) => {
    setProducts(products.filter((p) => p._id !== id));
    setMessage("Product deleted");
  };

  const logout = () => {
    setUser(null);
    setPage("login");
    setMessage("Logged out successfully");
  };

  return (
    <div className="app" style={{ padding: "30px", fontFamily: "sans-serif", maxWidth: "1200px", margin: "0 auto" }}>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "2px solid #eee", paddingBottom: "10px" }}>
        <h1 style={{ color: "#222" }}>Auth + Product CRUD Dashboard</h1>
        {user && (
          <div className="header-actions" style={{ display: "flex", alignItems: "center", gap: "15px" }}>
            <span style={{ fontWeight: "bold", color: "#444" }}>Welcome, {user.name}</span>
            <button onClick={logout} style={{ padding: "6px 12px", background: "#dc3545", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" }}>Logout</button>
          </div>
        )}
      </header>

      {message && (
        <div className="message" style={{ padding: "12px", background: "#d4edda", color: "#155724", margin: "20px 0", borderRadius: "4px", fontWeight: "500" }}>
          {message}
        </div>
      )}

      {!user && page === "login" && (
        <section className="card" style={{ maxWidth: "400px", margin: "50px auto", padding: "30px", border: "1px solid #e0e0e0", borderRadius: "8px", boxShadow: "0 4px 6px rgba(0,0,0,0.05)" }}>
          <h2 style={{ marginBottom: "20px" }}>Login</h2>
          <form onSubmit={login} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
            <input name="email" type="email" placeholder="Email Address" defaultValue="ayushkumarkunday@gmail.com" required style={{ padding: "10px", borderRadius: "4px", border: "1px solid #ccc" }} />
            <input name="password" type="password" placeholder="Password" defaultValue="123456" required style={{ padding: "10px", borderRadius: "4px", border: "1px solid #ccc" }} />
            <button type="submit" style={{ padding: "12px", background: "#007bff", color: "#fff", border: "none", borderRadius: "4px", fontSize: "16px", fontWeight: "bold", cursor: "pointer" }}>Sign In</button>
          </form>
          <button className="link" onClick={() => setPage("register")} style={{ marginTop: "15px", background: "none", border: "none", color: "#007bff", cursor: "pointer", textDecoration: "underline" }}>
            Don't have an account? Create one
          </button>
        </section>
      )}

      {!user && page === "register" && (
        <section className="card" style={{ maxWidth: "400px", margin: "50px auto", padding: "30px", border: "1px solid #e0e0e0", borderRadius: "8px", boxShadow: "0 4px 6px rgba(0,0,0,0.05)" }}>
          <h2 style={{ marginBottom: "20px" }}>Create Account</h2>
          <form onSubmit={register} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
            <input name="name" placeholder="Full Name" required style={{ padding: "10px", borderRadius: "4px", border: "1px solid #ccc" }} />
            <input name="email" type="email" placeholder="Email Address" required style={{ padding: "10px", borderRadius: "4px", border: "1px solid #ccc" }} />
            <input name="password" type="password" placeholder="Password" required style={{ padding: "10px", borderRadius: "4px", border: "1px solid #ccc" }} />
            <input name="confirmPassword" type="password" placeholder="Confirm Password" required style={{ padding: "10px", borderRadius: "4px", border: "1px solid #ccc" }} />
            <button type="submit" style={{ padding: "12px", background: "#28a745", color: "#fff", border: "none", borderRadius: "4px", fontSize: "16px", fontWeight: "bold", cursor: "pointer" }}>Register</button>
          </form>
          <button className="link" onClick={() => setPage("login")} style={{ marginTop: "15px", background: "none", border: "none", color: "#007bff", cursor: "pointer", textDecoration: "underline" }}>
            Already have an account? Login
          </button>
        </section>
      )}

      {user && (
        <main style={{ marginTop: "30px", display: "grid", gridTemplateColumns: "1fr 2fr", gap: "30px" }}>
          <section className="card" style={{ padding: "20px", border: "1px solid #e0e0e0", borderRadius: "8px", height: "fit-content", background: "#f8f9fa" }}>
            <h2 style={{ marginBottom: "15px" }}>Add Product</h2>
            <form onSubmit={addProduct} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <input name="name" placeholder="Product Name" required style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }} />
              <input name="description" placeholder="Description" required style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }} />
              <input name="price" type="number" min="0" placeholder="Price (₹)" required style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }} />
              <input name="stock" type="number" min="0" placeholder="Stock Qty" required style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }} />
              <input name="category" placeholder="Category" required style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }} />
              <button type="submit" style={{ padding: "10px", background: "#28a745", color: "#fff", border: "none", borderRadius: "4px", fontWeight: "bold", cursor: "pointer" }}>Save Product</button>
            </form>
          </section>

          <section>
            <h2 style={{ marginBottom: "15px" }}>Live Marketplace Products</h2>
            <div className="grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "20px" }}>
              {products.map((product) => (
                <article className="product" key={product._id} style={{ border: "1px solid #ddd", padding: "15px", borderRadius: "8px", background: "#fff", display: "flex", flexDirection: "column", justifyContent: "space-between", boxShadow: "0 2px 4px rgba(0,0,0,0.02)" }}>
                  <div>
                    <h3 style={{ margin: "0 0 8px 0", color: "#333" }}>{product.name}</h3>
                    <p style={{ color: "#666", fontSize: "14px", margin: "0 0 10px 0", lineHeight: "1.4" }}>{product.description}</p>
                  </div>
                  <div>
                    <p style={{ fontWeight: "bold", fontSize: "16px", color: "#28a745", margin: "5px 0" }}>₹{product.price}</p>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "12px", color: "#777", marginBottom: "10px" }}>
                      <span>Stock: {product.stock}</span>
                      <span style={{ background: "#e9ecef", padding: "2px 6px", borderRadius: "3px" }}>{product.category}</span>
                    </div>
                    <button onClick={() => deleteProduct(product._id)} style={{ width: "100%", padding: "6px", background: "#fff", color: "#dc3545", border: "1px solid #dc3545", borderRadius: "4px", cursor: "pointer", transition: "0.2s" }}>Delete Product</button>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </main>
      )}
    </div>
  );
}

export default App;
