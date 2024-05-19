import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className=" bg-gray-200 text-black p-4 fixed top-0 w-full h-[60px] shadow-xl">
      <div>
        <Link to="/" className="mr-4 hover:text-gray-700">
          Home
        </Link>
        <Link to="/adding-entity" className="hover:text-gray-700">
          Add New Entity
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
