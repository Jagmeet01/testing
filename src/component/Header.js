import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { IoCartOutline } from "react-icons/io5";
import { FiLogIn } from "react-icons/fi";
import Search from "../Pages/Search";
import UserOptions from "./UserOptions";

const Header = () => {
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <div className="navbar-logo">
            <h1>
              <NavLink to="/">
                <span className="text-orange-600">One</span> Store
              </NavLink>
            </h1>
          </div>
          <div className="menu-icon" onClick={toggleMenu}>
            {isOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                <path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" />
              </svg>
            )}
            <i class="fa-regular fa-xmark"></i>
          </div>
          <ul className={isOpen ? "nav-menu active" : "nav-menu"}>
            <div className="flex-div gap-[2rem]">
              <li className="nav-item">
                <NavLink to="/" className="nav-links" onClick={toggleMenu}>
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/products"
                  className="nav-links"
                  onClick={toggleMenu}
                >
                  Products
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/about" className="nav-links" onClick={toggleMenu}>
                  About
                </NavLink>
              </li>
            </div>

            <div className="flex-div">
              <li className="nav-item nav-item-search">
                <Search className="nav-links-search" onClick={toggleMenu} />
              </li>

              <li className="nav-item nav-item-a">
                <NavLink
                  to="/cart"
                  className="nav-links nav-links-a"
                  onClick={toggleMenu}
                >
                  <IoCartOutline className="h-7 w-7 hover:text-orange-600" />
                </NavLink>
              </li>

              {isAuthenticated ? (
                <UserOptions user={user} />
              ) : (
                <li className="nav-item nav-item-a">
                  <a
                    href="/Login"
                    className="nav-links nav-links-a"
                    onClick={toggleMenu}
                  >
                    <FiLogIn className="h-7 w-7 hover:text-orange-600" />
                  </a>
                </li>
              )}
            </div>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Header;
