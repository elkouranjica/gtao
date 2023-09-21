import React from "react";
import {getUser, useUserActions} from "../hooks/user.actions";
import {Link} from "react-router-dom";


function Header({ toggleSidebar }) {
  const userActions = useUserActions();
  const user = getUser();

  // const logout = () => {
  //   userActions.logout()
  //     .then((res) => console.log(res))
  //     .catch(err => console.log(err))
  // }

  return (
    <>
      <header
        id="header"
        className="header fixed-top d-flex align-items-center"
      >
        <div className="d-flex align-items-center justify-content-between">
          <Link to={"/"} className="logo d-flex align-items-center">
            <img src="logo.jpeg" alt="logo" />
            <span className="d-none d-lg-block">DGFS</span>
          </Link>
          <i className="bi bi-list toggle-sidebar-btn" onClick={() => toggleSidebar()}/>
        </div>

        <nav className="header-nav ms-auto">
          <ul className="d-flex align-items-center">
            <li className="nav-item d-block d-lg-none">
              <a className="nav-link nav-icon search-bar-toggle " href="#">
                <i className="bi bi-search"/>
              </a>
            </li>

            <li className="nav-item dropdown pe-3">
              <a
                className="nav-link nav-profile d-flex align-items-center pe-0"
                href="#"
                data-bs-toggle="dropdown"
              >
                {/*<img*/}
                {/*  src="assets/img/profile-img.jpg"*/}
                {/*  alt="Profile"*/}
                {/*  className="rounded-circle"*/}
                {/*/>*/}
                <span className="d-none d-md-block dropdown-toggle ps-2">
                  {user.email}
                </span>
              </a>

              <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
                {/*<li className="dropdown-header">*/}
                {/*  <h6>Kevin Anderson</h6>*/}
                {/*  <span>Web Designer</span>*/}
                {/*</li>*/}
                <li>
                  <button
                    className="dropdown-item d-flex align-items-center"
                    onClick={userActions.logout}
                  >
                    <i className="bi bi-box-arrow-right"/>
                    <span>Sign Out</span>
                  </button>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}

export default Header;
