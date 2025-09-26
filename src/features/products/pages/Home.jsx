// src/pages/Home.jsx

import ProductsListPage from "./ProductsListPage";
const Home = () => {
  return (
    <div className="p-6 text-center">
      <h1 className="text-3xl font-bold mb-4">Welcome to My Store</h1>
      <p className="mb-4">Browse our amazing products!</p>
      
        <ProductsListPage/>
      
    </div>
  );
};

export default Home;
