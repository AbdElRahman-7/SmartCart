// src/pages/Home.jsx

import ProductsListPage from "../../products/pages/ProductsListPage"

const Home = () => {
  return (
    <div className="p-6 text-center ">
      <h1 className="text-3xl font-bold">Welcome to My Store</h1>
      <p className="">Browse our amazing products!</p>
        <ProductsListPage/>

    </div>
  );
};

export default Home;