// src/components/Header.jsx
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="p-4 bg-gray-200 flex gap-4">
      <Link to="/">Home</Link>
      <Link to="/products">Products</Link>
      <Link to="/about">About</Link>
    </header>
  );
};

export default Header;