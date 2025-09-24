import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ProductsListPage from "./pages/ProductsListPage";
import ProductsDetailsPage from "./pages/ProductDetailsPage";


import Home from "./pages/Home";
export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-zinc-950 text-zinc-100">
        <nav className="bg-zinc-900 p-4">
          <div className="max-w-6xl mx-auto flex justify-between">
            <Link to="/" className="font-bold text-lg">Store</Link>
            <Link to="/" className="px-3 py-1 border rounded-md">Products</Link>
          </div>
        </nav>

        <main className="py-8">
          <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductsListPage />} />
          <Route path="/product/:id" element={<ProductsDetailsPage />} />
        </Routes>
        </main>
      </div>
    </Router>
  );
}