/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import React from "react";
import { Link } from "react-router-dom";

export const PageNotFound = () => {
  return (
    <section className="section error-404 min-vh-100 d-flex flex-column align-items-center justify-content-center">
      <h1>404</h1>
      <h2>The page you are looking for doesn't exist.</h2>
      <Link to={"/"} className="btn">
        Back to home
      </Link>
      <img
        src="./logo-dgfs.png"
        className="img-fluid py-5"
        width={"500"}
        alt="Page Not Found"
      ></img>
    </section>
  );
};
