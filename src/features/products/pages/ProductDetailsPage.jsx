import { useParams, useNavigate } from "react-router-dom";
import { PRODUCTS } from "../../../utils/utils";

const ProductDetailsPage = () => {
  const { id } = useParams();
  const product = PRODUCTS.find((p) => p.id === id);
  const navigate = useNavigate();

  if (!product) return <div className="p-6">Product not found.</div>;
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex flex-col lg:flex-row gap-6">
        <img
          src={product.image}
          alt={product.title}
          className="w-full lg:w-1/2 rounded-xl"
        />
        <div className="lg:w-1/2">
          <h1 className="text-2xl font-bold">{product.title}</h1>
          <p>
            {product.brand} • {product.category}
          </p>
          <p className="text-3xl font-bold">${product.price.toFixed(2)}</p>
          <p className="mt-4">{product.description}</p>
          <div className="mt-6 flex gap-3">
            <button className="bg-indigo-600 px-4 py-2 rounded-xl">
              Add to cart
            </button>
            <button
              onClick={() => navigate(-1)}
              className="border px-4 py-2 rounded-xl"
            >
              Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
