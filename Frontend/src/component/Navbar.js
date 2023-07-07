import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const auth = localStorage.getItem("user");
  const logout = () => {
    localStorage.clear();
    navigate("/signup");
  };
  return (
    <div>
      {auth ? (
        <ul className="nav-ul">
          <img src="https://img.freepik.com/free-vector/golden-bird-logo-design_1195-336.jpg?w=2000"alt="logo"className="logo"/>
          <li>
            <Link to="/product"> product </Link>
          </li>
          <li>
            <Link to="/add"> add product </Link>
          </li>
          <li>
            <Link to="/update/:id"> update product </Link>
          </li>
          <li>
            <Link to="/profile"> profile </Link>
          </li>
          <li> 
            <Link onClick={logout} to="/signup">logout</Link>
          </li>
        </ul>
      ) : (
        <ul className="nav-ul nav-right">
          <img src="https://img.freepik.com/free-vector/golden-bird-logo-design_1195-336.jpg?w=2000"alt="logo"className="logo"/>
          <li>   
            <Link to="/signup"> sign up </Link>
          </li>
          <li>
            <Link to="/login"> login </Link>
          </li>
        </ul>
      )}
    </div>
  );
}

export default Navbar;
