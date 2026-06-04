import { Link, NavLink } from "react-router-dom";
import "./PublicLayout.css";

export function PublicNavbar() {
  return (
    <header className="public-navbar">
      <div className="public-navbar__container">
        <div className="public-navbar__left">
          <Link className="public-navbar__logo" to="/">
            TravelHub
          </Link>

          <NavLink
            className={({ isActive }) =>
              `public-navbar__link ${
                isActive ? "public-navbar__link--active" : ""
              }`
            }
            to="/"
            end
          >
            Catalog
          </NavLink>
        </div>

        <nav className="public-navbar__actions" aria-label="Authentication">
          <Link className="public-navbar__login" to="/login">
            Login
          </Link>

          <Link className="public-navbar__register" to="/register">
            Register
          </Link>
        </nav>
      </div>
    </header>
  );
}