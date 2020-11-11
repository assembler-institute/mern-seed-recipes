import React from "react";
import { NavLink } from "react-router-dom";

import ROUTES from "../../utils/routes";
import Button from "../Button/Button";

function Header({ currentUserState: { isAuthenticated } = {}, signout }) {
  return (
    <header className="navbar navbar-light navbar-expand sticky-top bg-white border-bottom">
      <nav className="container">
        <NavLink
          to={ROUTES.HOME}
          activeClassName="active"
          className="navbar-brand"
        >
          Assembler School Recipes 🍜
        </NavLink>

        <ul className="navbar-nav ml-auto">
          {isAuthenticated ? (
            <Button
              additionalClasses="nav-item"
              variant="light"
              onClick={() => signout()}
            >
              Salir
            </Button>
          ) : (
            <>
              <li className="nav-item">
                <NavLink
                  to={ROUTES.LOGIN}
                  activeClassName="active"
                  className="nav-link"
                >
                  Login
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to={ROUTES.SIGNUP}
                  activeClassName="active"
                  className="nav-link"
                >
                  Registrar
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
