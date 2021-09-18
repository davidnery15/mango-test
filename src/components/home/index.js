import React from "react";
import { Link } from "react-router-dom";

const Home = () => (
  <section className="mainSection">
    <div className="centerContent">
      <h1 className="title">Select one...</h1>
      <Link className="link" to="exercise1">
        Normal range
      </Link>
      <Link className="link" to="exercise2">
        Fixed values range
      </Link>
    </div>
  </section>
);

export default Home;
