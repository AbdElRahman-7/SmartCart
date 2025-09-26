// src/pages/ProductsListPage.jsx
import { useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { paginate, PRODUCTS, unique } from "../../../utils/utils";


const ProductsListPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const q = searchParams.get("q") || "";
  const selectedCategory = searchParams.get("category") || "All";
  const selectedBrand = searchParams.get("brand") || "All";
  const pageParam = parseInt(searchParams.get("page") || "1", 10);
  const perPageParam = parseInt(searchParams.get("perPage") || "6", 10);

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

  return (
    <div className="max-w-6xl mx-auto p-4">
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <h1 className="text-2xl font-bold">Products</h1>
        <SearchBar
          initialValue={q}
          onSearch={(value) => updateParams({ q: value })}
          onClear={() => updateParams({ q: "" })}
        />
      </header>

      <section className="flex flex-col lg:flex-row gap-6">
        <Product
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={(val) => updateParams({ category: val })}
          brands={brands}
          selectedBrand={selectedBrand}
          onBrandChange={(val) => updateParams({ brand: val })}
          total={total}
        />

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
          <Pagination
            page={page}
            totalPages={totalPages}
            onPageChange={(val) => updateParams({ page: val })}
          />
        </main>
      </section>
    </div>
  );
};

export default ProductsListPage;
