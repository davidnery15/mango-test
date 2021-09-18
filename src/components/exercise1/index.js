import React, { useState, useEffect } from "react";
import Range from "../range";

const NormalRange = () => {
  const [values, setValues] = useState({});

  useEffect(() => {
    fetch("http://demo8847434.mockable.io/get-min-max-values")
      .then((res) => res.json())
      .then((data) => setValues(data));
  }, []);

  return (
    <section className="mainSection">
      <div className="centerContent">
        <h2 className="subtitle">Normal Range</h2>
        <Range values={values} rangeWidth={300} delta={1} />
      </div>
    </section>
  );
};

export default NormalRange;
