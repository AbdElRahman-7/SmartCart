import React, { useMemo, useState } from "react";
import ProductDetailsPage from "./ProductDetailsPage";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { paginate, PRODUCTS, unique } from "../utils/utils";

const ProductsListPage = () => {
 const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const q = searchParams.get("q") || "";
  const selectedCategory = searchParams.get("category") || "All";
  const selectedBrand = searchParams.get("brand") || "All";
  const pageParam = parseInt(searchParams.get("page") || "1", 10);
  const perPageParam = parseInt(searchParams.get("perPage") || "6", 10);

  const [searchText, setSearchText] = useState(q);

  const categories = useMemo(
    () => ["All", ...unique(PRODUCTS, "category")],
    []
  );
  const brands = useMemo(() => ["All", ...unique(PRODUCTS, "brand")], []);

  const filtered = useMemo(() => {
    const lowerQ = q.trim().toLowerCase();

    return PRODUCTS.filter((p) => {

      const matchQ =
        !lowerQ ||
        p.title.toLowerCase().includes(lowerQ) ||
        p.brand.toLowerCase().includes(lowerQ) ||
        p.category.toLowerCase().includes(lowerQ);
      const matchCat =
        selectedCategory === "All" || p.category === selectedCategory;
      const matchBrand = selectedBrand === "All" || p.brand === selectedBrand;
      return matchQ && matchCat && matchBrand;
    }).sort((a, b) => b.rating - a.rating);
  }, [q, selectedCategory, selectedBrand]);

  
  const {
    data: pageItems,
    total,
    totalPages,
    page,
  } = useMemo(
    () => paginate(filtered, pageParam, perPageParam),
    [filtered, pageParam, perPageParam]
  );

  function updateParams(changes) {
    const next = Object.fromEntries(searchParams.entries());
    Object.entries(changes).forEach(([k, v]) => {
      if (!v) delete next[k];
      else next[k] = String(v); 
    });
    if (!("page" in changes) && !("perPage" in changes)) next.page = "1";
    setSearchParams(next);
  }

  function onSearchSubmit(e) {
    e.preventDefault();
    updateParams({ q: searchText });
  }
  return (
    <div className="max-w-6xl mx-auto p-4">
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <h1 className="text-2xl font-bold">Products</h1>

        <form
          onSubmit={onSearchSubmit}
          className="flex items-center gap-2 w-full sm:w-auto"
        >
          <input
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="w-full sm:w-64 px-3 py-2 rounded-lg border bg-zinc-900"
            placeholder="Search..."
          />
          <button type="submit" className="px-3 py-2 rounded-lg bg-indigo-600">
            Search
          </button>
          <button
            type="button"
            className="px-3 py-2 rounded-lg border"
            onClick={() => {
              setSearchText("");
              updateParams({ q: "" });
            }}
          >
            Clear
          </button>
        </form>
      </header>

      <section className="flex flex-col lg:flex-row gap-6">
        <aside className="w-full lg:w-64 p-4 bg-zinc-900 rounded-xl">
          <h3 className="font-semibold mb-2">Filters</h3>
          <label className="block text-sm mb-1">Category</label>
          <select
            value={selectedCategory}
            onChange={(e) => updateParams({ category: e.target.value })}
            className="w-full px-3 py-2 rounded-md bg-zinc-800"
          >
            {categories.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>

          <label className="block text-sm mb-1 mt-4">Brand</label>
          <select
            value={selectedBrand}
            onChange={(e) => updateParams({ brand: e.target.value })}
            className="w-full px-3 py-2 rounded-md bg-zinc-800"
          >
            {brands.map((b) => (
              <option key={b}>{b}</option>
            ))}
          </select>

          <p className="mt-6 text-sm text-zinc-400">Total: {total} items</p>
        </aside>

        <main className="flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {pageItems.map((p) => (
              <article key={p.id} className="bg-zinc-900 rounded-2xl p-4">
                <img
                  src={p.image}
                  alt={p.title}
                  className="h-40 w-full object-cover rounded-md mb-3"
                />
                <h3 className="font-semibold">{p.title}</h3>
                <p className="text-sm text-zinc-400">
                  {p.brand} • {p.category}
                </p>
                <div className="mt-2 flex items-center justify-between">
                  <span className="font-bold">${p.price.toFixed(2)}</span>
                  <button
                    onClick={() => navigate(`/product/${p.id}`)}
                    className="px-3 py-1 bg-indigo-600 rounded-md"
                  >
                    View
                  </button>
                </div>
              </article>
            ))}
          </div>
          <footer className="mt-6 flex justify-between items-center">
            <span>
              Page {page} of {totalPages}
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => updateParams({ page: page - 1 })}
                disabled={page <= 1}
              >
                Prev
              </button>
              <button
                onClick={() => updateParams({ page: page + 1 })}
                disabled={page >= totalPages}
              >
                Next
              </button>
            </div>
          </footer>
        </main>
      </section>
    </div>
  );
};

export default ProductsListPage;
