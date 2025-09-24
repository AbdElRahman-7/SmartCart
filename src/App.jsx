import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ProductsListPage from "./components/ProductsListPage";
import ProductDetailsPage from "./components/ProductDetailsPage";

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
            <Route path="/" element={<ProductsListPage />} />
            <Route path="/product/:id" element={<ProductDetailsPage />} />
            <Route path="*" element={<div className="p-6">Page not found. <Link to="/">Go home</Link></div>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
