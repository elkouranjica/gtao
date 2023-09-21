import React from "react";
import {Link} from "react-router-dom";

function Sidebar() {
  return (
    <>
      <aside id="sidebar" className="sidebar">
        <ul className="sidebar-nav" id="sidebar-nav">
          {/*<li className="nav-item">*/}
          {/*  <Link to={"/dashboard/"} className="nav-link">*/}
          {/*    <i className="bi bi-grid"/>*/}
          {/*    <span>Dashboard</span>*/}
          {/*  </Link>*/}
          {/*</li>*/}

          <li className="nav-heading">Menu</li>
          <li className="nav-item">
            <Link to={"/missions/"} className="nav-link">
              <i className="bi bi-car-front-fill"/>
              <span>Missions</span>
            </Link>
          </li>

          <li className="nav-item">
            <Link to={"/personnel/"} className="nav-link">
              <i className="bi bi-person"/>
              <span>Personnel</span>
            </Link>
          </li>
        </ul>
      </aside>
    </>
  );
}

export default Sidebar;
