import React, {useEffect, useState} from "react";
import Header from "./header/Header";
import Sidebar from "./sidebar/Sidebar";
import {getUser} from "./hooks/user.actions";

function Layout(props) {
  const user = getUser();
  /**
   * Sidebar toggle
   */
  const toggleSidebar = () => {
    document.querySelector("body").classList.toggle("toggle-sidebar");
  };

  if (!user)
    return <div>Loading ...</div>

  return (
    <>
      <Header toggleSidebar={toggleSidebar} user={user}/>

      <Sidebar/>

      <main id="main" className="main">
        <section className="section">{props.children}</section>
      </main>
    </>
  );
}

export default Layout;
